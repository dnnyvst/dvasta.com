/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useTheme } from "next-themes";

const MAX_POINTS = 180;

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const intersection = new THREE.Vector3();

export const NurtureCursorLineTrail = () => {
  const { resolvedTheme } = useTheme();
  const { camera } = useThree();

  const lineRef = useRef<any>(null);

  const points = useRef<THREE.Vector3[]>(
    Array.from({ length: MAX_POINTS }, () => new THREE.Vector3(0, 0, 0)),
  );

  const hasMoved = useRef<boolean>(false);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameCount = useRef(0);

  useFrame(({ pointer }, delta) => {
    if (!lineRef.current) return;

    // rotate that point around the Y axis
    camera.position.applyAxisAngle(Y_AXIS, delta * 0.25);
    // apply to camera
    camera.lookAt(0, 0, 0);

    if (
      pointer.x === lastMousePosition.current.x &&
      pointer.y === lastMousePosition.current.y
    ) {
      return;
    }

    frameCount.current++;

    if (frameCount.current % 3 !== 0) {
      return;
    }

    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, intersection);
    const targetX = intersection.x;
    const targetY = intersection.y;
    const targetZ = intersection.z;

    camera.getWorldDirection(intersection);

    plane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()),
      camera.position
        .clone()
        .add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(5)),
    );

    lastMousePosition.current.x = targetX;
    lastMousePosition.current.y = targetY;

    if (!hasMoved.current) {
      if (pointer.x === 0 && pointer.y === 0) return;

      for (let i = 0; i < MAX_POINTS; i++) {
        points.current[i].set(targetX, targetY, targetZ);
      }

      hasMoved.current = true;
    } else {
      // remove oldest and add newest while reusing the vector
      const newPoint = points.current.shift()!;
      newPoint.set(targetX, targetY, targetZ);
      points.current.push(newPoint);
    }

    lineRef.current.geometry.setPositions(
      points.current.flatMap((point) => [point.x, point.y, point.z]),
    );
  });

  return (
    <Line
      ref={lineRef}
      // eslint-disable-next-line react-hooks/refs
      points={points.current}
      color={resolvedTheme === "nurture-dark" ? "white" : "black"}
    />
  );
};
