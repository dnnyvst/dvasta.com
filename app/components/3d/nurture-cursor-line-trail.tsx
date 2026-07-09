"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const MAX_POINTS = 180;

export const NurtureCursorLineTrail = () => {
  const lineRef = useRef<THREE.Line>(null);
  const points = useRef<THREE.Vector3[]>(
    Array.from({ length: MAX_POINTS }, () => new THREE.Vector3(0, 0, 0)),
  );

  const hasMoved = useRef<boolean>(false);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useFrame(({ pointer, viewport }) => {
    if (!lineRef.current) return;

    // convert normalized coordinates to viewport coordinates
    const targetX = (pointer.x * viewport.width) / 2;
    const targetY = (pointer.y * viewport.height) / 2;

    if (
      targetX === lastMousePosition.current.x &&
      targetY === lastMousePosition.current.y
    ) {
      return;
    }

    lastMousePosition.current.x = targetX;
    lastMousePosition.current.y = targetY;

    if (!hasMoved.current) {
      if (pointer.x === 0 && pointer.y === 0) return;

      for (let i = 0; i < MAX_POINTS; i++) {
        points.current[i].set(targetX, targetY, 0);
      }
      hasMoved.current = true;
    } else {
      // remove oldest, add newest
      points.current.shift();
      points.current.push(new THREE.Vector3(targetX, targetY, 0));
    }

    const geometry = lineRef.current.geometry;
    const position = geometry.getAttribute("position") as THREE.BufferAttribute;

    if (position) {
      for (let i = 0; i < points.current.length; i++) {
        const point = points.current[i];
        position.setXYZ(i, point.x, point.y, point.z);
      }
      position.needsUpdate = true;
    }

    geometry.computeBoundingSphere();
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry onUpdate={(self) => self.setFromPoints(points.current)} />
      <lineBasicMaterial color="white" />
    </line>
  );
};
