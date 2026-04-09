import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "01",
    title: "The Design Brief",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    content:
      "Every sneaker starts with a design brief — a document that outlines the target market, performance requirements, price point, and brand positioning. The brief acts as a north star for the entire design team, aligning creative vision with business goals. A well-crafted brief considers the consumer's lifestyle, the competitive landscape, and seasonal trends. Designers use it to establish constraints that actually fuel creativity, turning broad ideas into focused, executable concepts that resonate with their audience.",
  },
  {
    id: "02",
    title: "Sketching & Ideation",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    content:
      "Ideation is where raw creativity meets discipline. Sneaker designers produce dozens — sometimes hundreds — of thumbnail sketches exploring silhouette, proportion, and detail. This phase embraces quantity over quality: wild ideas sit alongside refined ones. Designers pull inspiration from architecture, nature, automotive design, and street culture. Digital tools like Procreate and Adobe Illustrator complement traditional hand sketching. The goal is to generate a range of directions that can be narrowed down through team critiques and consumer insight testing.",
  },
  {
    id: "03",
    title: "Material Selection",
    img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    content:
      "Materials define how a sneaker looks, feels, and performs. Designers work closely with material scientists and suppliers to source everything from engineered mesh and Flyknit to premium tumbled leather and recycled polyester. Each material choice impacts breathability, weight, durability, and cost. Sustainability has become a major driver — brands now prioritize recycled content, plant-based alternatives, and low-waste manufacturing. Understanding material properties at a technical level separates good designers from great ones, as the right fabric can elevate a concept from sketch to icon.",
  },
  {
    id: "04",
    title: "Prototyping & Testing",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    content:
      "Once a design is selected, it moves into prototyping — a hands-on phase where 2D concepts become 3D reality. Pattern engineers translate flat drawings into precise templates that wrap around a last (the foot-shaped mold). Initial prototypes are evaluated for fit, comfort, and aesthetics. Wear-testing with athletes and consumers provides critical feedback on cushioning, traction, and support. Multiple rounds of revision are standard; even small adjustments to collar height or tongue padding can transform the wearer's experience. This iterative process ensures the final product meets both creative and functional standards.",
  },
  {
    id: "05",
    title: "Colorways & Storytelling",
    img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    content:
      "Color is one of the most powerful tools in a sneaker designer's arsenal. A single silhouette can feel entirely different across colorways — from understated earth tones to bold neon statements. Designers develop color stories that align with seasonal palettes, cultural moments, and brand heritage. Collaborations with artists, musicians, and athletes add narrative depth. The colorway process involves precise Pantone matching, material-specific dye testing, and careful consideration of how colors interact across different textures. A great colorway doesn't just look good — it tells a story and creates emotional connection with the consumer.",
  },
];

export function SneakerAccordion() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border"
      style={{
        borderColor: "var(--slide-card-border)",
        backgroundColor: "var(--slide-card-bg)",
      }}
    >
      <Accordion
        type="single"
        defaultValue="01"
        collapsible
        className="w-full"
      >
        {items.map((item) => (
          <AccordionItem
            className="relative border-b cursor-pointer"
            style={{ borderColor: "var(--slide-card-border)" }}
            value={item.id}
            key={item.id}
          >
            <AccordionTrigger
              className="pl-5 pr-4 py-3 hover:no-underline [&>svg]:hidden cursor-pointer transition-all duration-300 hover:bg-white/[0.03] data-[state=open]:bg-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-red-400 font-mono text-xs shrink-0"
                  style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace" }}
                >
                  {item.id}
                </span>
                <h3
                  className="text-base md:text-lg font-semibold text-left"
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    color: "var(--slide-text)",
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="w-full h-full grid md:grid-cols-2">
              <div className="px-5 pt-2 pb-4 space-y-3">
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    color: "var(--slide-text-muted)",
                    fontSize: "var(--fs-body)",
                  }}
                >
                  {item.content}
                </p>
              </div>
              <img
                className="hidden md:block h-full md:border-l md:absolute md:w-1/2 object-cover right-0 top-0"
                style={{ borderColor: "var(--slide-card-border)" }}
                src={item.img}
                alt={item.title}
                aria-hidden="true"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
