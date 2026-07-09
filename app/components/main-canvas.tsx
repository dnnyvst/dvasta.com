"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { NurtureCursorLineTrail } from "@/motifs";
import { useTheme } from "next-themes";

export const MainCanvas = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div id="main-canvas-container" className="fixed inset-0 z-10">
      <Canvas
        gl={{
          alpha: true,
        }}
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 0, 1] }}
      >
        {/* <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[2, 5, 2]} castShadow /> */}
        {/* <OrbitControls /> */}

        {resolvedTheme?.includes("nurture") && <NurtureCursorLineTrail />}

        {/* floor */}
        {/* <mesh
          position={[0, -3, 0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
          receiveShadow
        >
          <planeGeometry args={[20, 20, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh> */}
      </Canvas>
    </div>
  );
};
