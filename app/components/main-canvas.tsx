"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

// const SpinningCube = () => {
//   const mesh = useRef<THREE.Mesh>(null);

//   useFrame(({ pointer }, delta) => {
//     if (!mesh?.current) return;
//     mesh.current.rotation.y -= delta / 2;
//     mesh.current.rotation.z += delta / 4;

//     mesh.current.position.x = pointer.x;
//     mesh.current.position.y = pointer.y;
//   });

//   return (
//     <mesh ref={mesh} castShadow>
//       <boxGeometry />
//       <meshStandardMaterial color="pink" />
//     </mesh>
//   );
// };

export const MainCanvas = () => {
  return (
    <div id="main-canvas-container" className="fixed inset-0 z-0">
      <Canvas
        gl={{
          alpha: true,
        }}
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 2, 10] }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[2, 5, 2]} castShadow />

        {/* <SpinningCube /> */}
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
