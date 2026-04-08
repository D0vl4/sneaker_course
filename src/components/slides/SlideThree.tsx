import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import type { Group } from "three";

function SneakerModel() {
  const { scene } = useGLTF("/sneakers.glb");
  const group = useRef<Group>(null);
  const isMobile = window.innerWidth < 640;
  const modelScale = isMobile ? 2.45 : 3.5;

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={group} scale={modelScale} position={[0, -0.3, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-white/50 text-xs font-mono tracking-wider">
          LOADING MODEL...
        </span>
      </div>
    </div>
  );
}

export default function SlideThree() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Top bar — lesson label */}
      <div className="absolute top-0 left-0 right-0 z-20 backdrop-blur-sm transition-colors duration-500" style={{ backgroundColor: 'var(--slide-bar-bg)', borderBottom: '1px solid var(--slide-bar-border)' }}>
        <div className="px-4 sm:px-8 py-2.5 sm:py-3">
          <span
            className="text-xs sm:text-sm font-medium tracking-wide transition-colors duration-500"
            style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text)' }}
          >
            Sneaker Design and the Designer Brief
          </span>
        </div>
      </div>

      {/* 3D Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0.5, 2.5], fov: 40 }}
          className="absolute inset-0"
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-3, 3, -3]} intensity={0.3} />
          <SneakerModel />
          <ContactShadows
            position={[0, -0.45, 0]}
            opacity={0.4}
            scale={3}
            blur={2.5}
          />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>

      {/* Center label */}
      <div className="absolute top-[12%] sm:top-[14%] left-0 right-0 z-10 flex flex-col items-center pointer-events-none">
        <span className="text-white/40 text-[10px] sm:text-xs font-mono tracking-[0.3em]">
          INTERACTIVE 3D VIEW
        </span>
        <span
          className="text-white mt-2 sm:mt-3"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "clamp(1.25rem, 3vw, 2.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          Drag to explore
        </span>
      </div>

      {/* Bottom lesson info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 backdrop-blur-sm transition-colors duration-500" style={{ backgroundColor: 'var(--slide-bar-bg)', borderTop: '1px solid var(--slide-bar-border)' }}>
        <div className="px-4 sm:px-8 py-2 flex items-center justify-between">
          <span
            className="text-[10px] sm:text-xs transition-colors duration-500"
            style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text-muted)' }}
          >
            <span className="text-red-400 font-semibold">Lesson 1:</span>{" "}
            Tools of the Design Cycle
          </span>
          <span className="text-[10px] sm:text-xs font-mono transition-colors duration-500" style={{ color: 'var(--slide-text-faint)' }}>
            05/33
          </span>
        </div>
      </div>
    </div>
  );
}

// Preload the model so it starts downloading early
useGLTF.preload("/sneakers.glb");
