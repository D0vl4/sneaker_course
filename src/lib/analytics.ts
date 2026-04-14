// src/lib/analytics.ts

export interface AnalyticsEvent {
  timestamp: string;      // ISO string
  eventType: string;      // e.g. "slide_enter", "interaction", "quiz_answer"
  slideIndex: number;     // The slide number where it happened
  component: string;      // The name of the component
  action: string;         // e.g. "clicked", "flipped", "submitted"
  details: string;        // Additional stringified detail (like the answer itself)
}

class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private sessionStart: number;

  constructor() {
    this.sessionStart = Date.now();
    this.track(0, "app", "session_start", "User started the course");
  }

  /**
   * Main tracking function.
   */
  public track(slideIndex: number, component: string, action: string, details: string = "") {
    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      eventType: "interaction",
      slideIndex,
      component,
      action,
      details,
    };
    
    // Convert slide_enter / slide_duration actions into eventTypes if needed
    if (action === "slide_enter" || action === "slide_exit" || action === "session_start") {
      event.eventType = "navigation";
    }
    
    this.events.push(event);
    // Optionally console.log for debugging during dev
    console.log(`[Analytics] slide:${slideIndex} | ${component} -> ${action}`, details ? `| Details: ${details}` : "");
  }

  /**
   * Generates a CSV blob and triggers a download.
   */
  public exportToCSV() {
    if (this.events.length === 0) return;

    // Build header
    const headers = ["Timestamp", "Event Type", "Slide Index", "Component", "Action", "Details"];
    
    // Build rows
    const rows = this.events.map(e => [
      e.timestamp,
      e.eventType,
      e.slideIndex.toString(),
      `"${e.component}"`, // quote strings to avoid CSV injection/comma breaking
      `"${e.action}"`,
      `"${e.details.replace(/"/g, '""')}"` // escape quotes
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Modern Chrome/Edge: Native File System API
    if ('showSaveFilePicker' in window) {
      try {
        window.showSaveFilePicker({
          suggestedName: 'report.csv',
          types: [{
            description: 'CSV File',
            accept: { 'text/csv': ['.csv'] },
          }],
        }).then(async (handle) => {
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
        }).catch(err => console.error("Save picker cancelled", err));
        return;
      } catch (err) {
        console.warn("File System API failed, falling back to anchor tag", err);
      }
    }

    // Fallback for Safari/Firefox
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = "report.csv";
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    // Dispatch native click event
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);
  }

  /**
   * Get all events
   */
  public getEvents() {
    return [...this.events];
  }
}

// Export singleton instance
export const analytics = new AnalyticsTracker();
