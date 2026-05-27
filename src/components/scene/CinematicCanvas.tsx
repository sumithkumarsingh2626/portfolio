'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, type RootState } from '@react-three/fiber';
import * as THREE from 'three';

type NetworkInformationLike = { saveData?: boolean } | null | undefined;

function getPointer(state: RootState) {
  return state.pointer;
}

function Dust({ count = 900 }: { count?: number }) {
  const points = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + rand(i * 3 + 1) * 2.6;
      const theta = rand(i * 3 + 2) * Math.PI * 2;
      const y = (rand(i * 3 + 3) - 0.5) * 2.2;
      positions[i * 3 + 0] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.012,
        color: new THREE.Color('#d9dde6'),
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      }),
    []
  );

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.035;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.06;
  });

  return <points ref={ref} geometry={points} material={material} />;
}

function GlassForms() {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#cfd5e2'),
      roughness: 0.25,
      metalness: 0.08,
      transparent: true,
      opacity: 0.13,
      clearcoat: 1,
      clearcoatRoughness: 0.4,
    });
    return m;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = getPointer(state);
    if (g1.current) {
      g1.current.position.y = 0.25 + Math.sin(t * 0.55) * 0.06;
      g1.current.rotation.y = 0.3 + t * 0.08 + p.x * 0.15;
      g1.current.rotation.x = -0.15 + p.y * 0.1;
    }
    if (g2.current) {
      g2.current.position.y = -0.35 + Math.sin(t * 0.45) * 0.05;
      g2.current.rotation.y = -0.4 - t * 0.06 + p.x * 0.12;
      g2.current.rotation.x = 0.2 + p.y * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={g1} position={[-0.8, 0.25, -0.8]} material={mat}>
        <boxGeometry args={[1.2, 0.18, 0.7]} />
      </mesh>
      <mesh ref={g2} position={[0.9, -0.35, -1.2]} material={mat}>
        <boxGeometry args={[1.0, 0.14, 0.6]} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const p = getPointer(state);
    const targetX = p.x * 0.35;
    const targetY = p.y * 0.22;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.06);
    state.camera.lookAt(0, 0, -1.1);
  });
  return null;
}

export function CinematicCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const compute = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmall = window.matchMedia('(max-width: 768px)').matches;
      const connection = (navigator as unknown as { connection?: NetworkInformationLike }).connection;
      const saveData = connection?.saveData === true;
      const cores = navigator.hardwareConcurrency ?? 8;
      return !prefersReducedMotion && !isSmall && !saveData && cores >= 6;
    };

    queueMicrotask(() => setEnabled(compute()));
  }, []);

  if (!enabled) return null;

  const eventSource = typeof document !== 'undefined' ? document.body : undefined;
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        eventSource={eventSource ?? undefined}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 2.8], fov: 42, near: 0.1, far: 30 }}
      >
        <fog attach="fog" args={['#07080a', 2.2, 7.2]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[2.5, 3.5, 2]} intensity={0.7} color={'#e9ecf4'} />
        <pointLight position={[-2.0, 0.5, 1.2]} intensity={0.6} color={'#9aa9ff'} />
        <Suspense fallback={null}>
          <CameraRig />
          <Dust />
          <GlassForms />
        </Suspense>
      </Canvas>
    </div>
  );
}
