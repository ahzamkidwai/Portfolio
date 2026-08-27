"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

interface NodeGraphSceneProps {
  nodeCount?: number;
  interactive?: boolean;
  onNodeClick?: (index: number) => void;
  activeIndex?: number | null;
}

function generateNodes(count: number) {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.2 + Math.sin(i * 1.7) * 0.9;
    const y = Math.sin(i * 2.3) * 1.3;
    positions.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
  }
  return positions;
}

function Nodes({ interactive, onNodeClick, activeIndex, nodeCount }: NodeGraphSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const isDark = useIsDarkMode();
  const signalColor = isDark ? "#6385FF" : "#3454D1";
  const inactiveNodeColor = isDark ? "#F5F5F4" : "#121214";
  const positions = useMemo(() => generateNodes(nodeCount ?? 5), [nodeCount]);

  const edges = useMemo(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < positions.length; i++) {
      pairs.push([i, (i + 1) % positions.length]);
    }
    // A few cross-connections for a "network" feel
    if (positions.length > 3) {
      pairs.push([0, Math.floor(positions.length / 2)]);
    }
    return pairs;
  }, [positions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0018;
    // Gentle response to mouse position — subtle, not distracting
    const targetX = mouse.y * 0.15;
    const targetY = mouse.x * 0.15;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {edges.map(([a, b], i) => {
        const posA = positions[a];
        const posB = positions[b];
        if (!posA || !posB) return null;
        const start = new THREE.Vector3(...posA);
        const end = new THREE.Vector3(...posB);
        const points = [start, end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`edge-${i}`}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial color={signalColor} transparent opacity={0.25} />
          </line>
        );
      })}
      {positions.map((pos, i) => {
        const isActive = activeIndex === i;
        return (
          <mesh
            key={`node-${i}`}
            position={pos}
            onClick={interactive ? () => onNodeClick?.(i) : undefined}
            onPointerOver={(e) => {
              if (interactive) document.body.style.cursor = "pointer";
              e.stopPropagation();
            }}
            onPointerOut={() => {
              if (interactive) document.body.style.cursor = "auto";
            }}
          >
            <sphereGeometry args={[isActive ? 0.14 : 0.09, 16, 16]} />
            <meshBasicMaterial color={isActive ? signalColor : inactiveNodeColor} transparent opacity={isActive ? 1 : 0.55} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function NodeGraphScene(props: NodeGraphSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1} />
      <Nodes {...props} />
    </Canvas>
  );
}
