'use client';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute right-0 top-0 w-full sm:w-1/2 h-full flex items-center justify-center pointer-events-none sm:pointer-events-auto mt-10 sm:mt-0">
        {/* @ts-ignore */}
        <model-viewer
          ref={(el: any) => {
            if (el?.shadowRoot && !el.__cursorPatched) {
              const s = document.createElement('style');
              s.textContent = '*, *::before, *::after { cursor: default !important; }';
              el.shadowRoot.appendChild(s);
              el.__cursorPatched = true;
            }
          }}
          src="/sneaker_main.glb?v=11"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          interaction-prompt="none"
          tone-mapping="neutral"
          poster="/poster.webp"
          shadow-intensity="1"
          auto-rotate
          rotation-per-second="30deg"
          camera-orbit="-45deg 75deg auto"
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent', cursor: 'default' }}
          className="z-10"
        >
        {/* @ts-ignore */}
        </model-viewer>
      </div>
      
      {/* Background radial gradient to give it a stage-like feel */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-red-900/10 rounded-full blur-[100px] -z-10"></div>
    </div>
  );
}
