import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const HoverableSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const [hovered, setHovered] = useState<boolean>(false);

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
      <sphereGeometry ref={geoRef} args={[3, 20, 20]} />
      <meshBasicMaterial wireframe color={hovered ? "white" : "white"} />
    </mesh>
  );
};

export default HoverableSphere;