import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as React from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

function FloatingGeometry({ position, color, speed = 1 }: FloatingGeometryProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <dodecahedronGeometry args={[0.5, 0]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function AnimatedText() {
  const textRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={textRef}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-1.5, 0, 0]}
      >
        NeonO
        <MeshDistortMaterial
          color="#7C7CF2"
          distort={0.2}
          speed={1.5}
          roughness={0}
          metalness={0.5}
        />
      </Text3D>
    </group>
  );
}

interface Scene3DProps {
  className?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
}

export function Scene3D({ 
  className = "h-96 w-full", 
  enableControls = true,
  autoRotate = true 
}: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} color="#7C7CF2" intensity={0.3} />
        
        <Environment preset="city" />
        
        {/* Floating geometries */}
        <FloatingGeometry position={[-2, 1, -1]} color="#7C7CF2" speed={1.2} />
        <FloatingGeometry position={[2, -1, 1]} color="#22D3A9" speed={0.8} />
        <FloatingGeometry position={[0, 1.5, -2]} color="#FF6B6B" speed={1.5} />
        
        {/* Animated text (optional - requires font file) */}
        {/* <AnimatedText /> */}
        
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>
    </div>
  );
}

// Simpler 3D background component
export function Scene3DBackground({ className = "absolute inset-0" }: { className?: string }) {
  return (
    <div className={className} style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.3 }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#7C7CF2" />
        
        {/* Subtle floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingGeometry
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
            ]}
            color={i % 2 === 0 ? "#7C7CF2" : "#22D3A9"}
            speed={0.3 + Math.random() * 0.7}
          />
        ))}
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}