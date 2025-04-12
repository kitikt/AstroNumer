import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function HoverableSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const [hovered, setHovered] = useState(false);

  // Xoay hình cầu khi hover
  useFrame((state, delta) => {
    if (hovered && meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry ref={geoRef} args={[3, 8, 8]} />
      <meshBasicMaterial wireframe color={hovered ? "white" : "white"} />
    </mesh>
  );
}

export default HoverableSphere;