"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const MAX_POINTS = 200;

export const NurtureCursorLineTrail = () => {
  const [setupComplete, setSetupComplete] = useState<boolean>(false);

  const points = useRef<THREE.Vector3[]>(
    Array.from({ length: MAX_POINTS }, () => new THREE.Vector3(0, 0, 0)),
  );
  const lineGeometry = useRef<THREE.BufferGeometry | null>(null);
  const hasMoved = useRef<boolean>(false);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const buffer = new THREE.BufferGeometry();
    buffer.setFromPoints(points.current);
    buffer.setDrawRange(0, 0);
    lineGeometry.current = buffer;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSetupComplete(true);
  }, []);

  useFrame(({ pointer, viewport }) => {
    if (!lineGeometry?.current || !points?.current) return;

    // convert normalized coordinates to viewport coordinates
    const targetX = (pointer.x * viewport.width) / 2;
    const targetY = (pointer.y * viewport.height) / 2;

    if (
      targetX === lastMousePosition.current.x &&
      targetY === lastMousePosition.current.y
    ) {
      console.log("paused");
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

    const positionAttribute = lineGeometry.current.getAttribute(
      "position",
    ) as THREE.BufferAttribute;

    for (let i = 0; i < points.current.length; i++) {
      const point = points.current[i];
      positionAttribute.setXYZ(i, point.x, point.y, point.z);
    }

    lineGeometry.current.setDrawRange(0, MAX_POINTS);
    positionAttribute.needsUpdate = true;
  });

  if (!setupComplete) return null;
  return (
    <line geometry={lineGeometry.current}>
      <lineBasicMaterial color="white" />
    </line>
  );
};
