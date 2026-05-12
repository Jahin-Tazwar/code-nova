import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Sphere, Box, TorusKnot, Float, Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

// Existing Work Models
export function ModelNebula() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00F4FF" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8A2BE2" />
      <Icosahedron ref={meshRef} args={[1.5, 2]}>
        <meshStandardMaterial 
          color="#111" 
          wireframe={true} 
          emissive="#00F4FF" 
          emissiveIntensity={0.5}
        />
      </Icosahedron>
      <Icosahedron args={[1.4, 0]}>
         <meshStandardMaterial color="#00F4FF" transparent opacity={0.1} />
      </Icosahedron>
    </Float>
  );
}

export function ModelAura() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#8A2BE2" />
      <directionalLight position={[-5, -5, -5]} intensity={2} color="#00F4FF" />
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#3b0764"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#8A2BE2"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

export function ModelOmni() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} color="#4f46e5" />
      <directionalLight position={[0, -10, 0]} intensity={1} color="#00F4FF" />
      <group ref={groupRef}>
        <TorusKnot args={[1, 0.3, 128, 16]}>
           <meshStandardMaterial 
              color="#0a0a0a" 
              metalness={0.9} 
              roughness={0.1} 
              emissive="#4f46e5"
              emissiveIntensity={0.2}
              wireframe
           />
        </TorusKnot>
        <Box args={[1.5, 1.5, 1.5]}>
           <meshBasicMaterial color="#00F4FF" wireframe transparent opacity={0.15} />
        </Box>
      </group>
    </Float>
  );
}

// Services Models

export function ModelNeural() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 + (state.pointer.x * 0.5);
      ref.current.rotation.z = state.clock.elapsedTime * 0.2 + (state.pointer.y * 0.5);
    }
  });
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <group ref={ref}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00F4FF" intensity={1} />
        <TorusKnot args={[1, 0.1, 64, 8, 2, 3]}>
           <meshStandardMaterial color="#00F4FF" wireframe transparent opacity={0.6} />
        </TorusKnot>
        <Sphere args={[0.5, 16, 16]}>
          <meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={0.5} opacity={0.8} transparent />
        </Sphere>
      </group>
    </Float>
  );
}

export function ModelDecentralized() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <group ref={ref}>
        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 10, 10]} color="#8A2BE2" intensity={1} />
        <Icosahedron args={[1.2, 1]}>
           <meshStandardMaterial color="#8A2BE2" wireframe transparent opacity={0.5} />
        </Icosahedron>
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i} args={[0.2, 0.2, 0.2]} position={[Math.sin(i) * 1.5, Math.cos(i) * 1.5, Math.sin(i * 2) * 1.5]}>
            <meshStandardMaterial color="#00F4FF" emissive="#00F4FF" emissiveIntensity={0.8} />
          </Box>
        ))}
      </group>
    </Float>
  );
}

export function ModelAlgorithmic() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });
  return (
    <Float speed={5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 0]} color="#00F4FF" intensity={1} />
        <Sphere args={[1, 32, 32]}>
           <MeshDistortMaterial color="#111" emissive="#00F4FF" emissiveIntensity={0.2} wireframe distort={0.3} speed={4} />
        </Sphere>
        <Box args={[1.5, 1.5, 1.5]}>
           <meshBasicMaterial color="#8A2BE2" wireframe transparent opacity={0.3} />
        </Box>
      </group>
    </Float>
  );
}

export function ModelData() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 50;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      for (let i = 0; i < count; i++) {
        const time = state.clock.elapsedTime + i;
        const x = Math.sin(time * 0.5) * (i % 5);
        const y = Math.cos(time * 0.3) * (i % 5);
        const z = Math.sin(time * 0.4) * (i % 5);
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(0.2 + (Math.sin(time) * 0.1));
        dummy.updateMatrix();
        ref.current.setMatrixAt(i, dummy.matrix);
      }
      ref.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00F4FF" intensity={1} />
      <instancedMesh ref={ref} args={[new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshStandardMaterial({ color: '#8A2BE2', emissive: '#8A2BE2', emissiveIntensity: 0.5 }), count]} />
    </Float>
  );
}

// Process Models

export function ModelProcess1() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group ref={ref}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 10, 5]} color="#00F4FF" intensity={2} />
        <Icosahedron args={[1.2, 0]}>
          <meshStandardMaterial color="#00F4FF" wireframe />
        </Icosahedron>
        <Icosahedron args={[0.5, 0]}>
          <meshStandardMaterial color="#8A2BE2" wireframe />
        </Icosahedron>
      </group>
    </Float>
  );
}

export function ModelProcess2() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={ref}>
        <ambientLight intensity={0.5} />
        <pointLight position={[-5, 5, 5]} color="#FFF" intensity={1} />
        <Box args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial color="#111" wireframe transparent opacity={0.6} />
        </Box>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="#00F4FF" wireframe />
        </Box>
      </group>
    </Float>
  );
}

export function ModelProcess3() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
      <group ref={ref}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 5]} color="#8A2BE2" intensity={2} />
        <TorusKnot args={[0.8, 0.2, 100, 16]}>
          <meshStandardMaterial color="#8A2BE2" wireframe />
        </TorusKnot>
      </group>
    </Float>
  );
}

export function ModelProcess4() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <group ref={ref}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, -5, 5]} color="#00F4FF" intensity={1} />
        <pointLight position={[-5, 5, -5]} color="#8A2BE2" intensity={1} />
        <Sphere args={[1, 16, 16]}>
          <meshStandardMaterial color="#FFF" wireframe opacity={0.3} transparent />
        </Sphere>
        <Sphere args={[0.5, 8, 8]}>
          <meshStandardMaterial color="#00F4FF" emissive="#00F4FF" emissiveIntensity={1} />
        </Sphere>
      </group>
    </Float>
  );
}


export function ModelStats1() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
       <ambientLight intensity={0.5} />
       <pointLight position={[5, 5, 5]} color="#00F4FF" intensity={0.8} />
       <Icosahedron args={[1.5, 2]}>
          <meshStandardMaterial color="#00F4FF" wireframe opacity={0.3} transparent />
       </Icosahedron>
    </Float>
  );
}

export function ModelStats2() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
       <ambientLight intensity={0.5} />
       <pointLight position={[5, 5, 5]} color="#8A2BE2" intensity={0.8} />
       <TorusKnot args={[1, 0.2, 64, 16]}>
          <meshStandardMaterial color="#8A2BE2" wireframe opacity={0.3} transparent />
       </TorusKnot>
    </Float>
  );
}

export function ModelStats3() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
       <ambientLight intensity={0.5} />
       <pointLight position={[5, 5, 5]} color="#FFF" intensity={0.5} />
       <Sphere args={[1.2, 16, 16]}>
          <meshStandardMaterial color="#FFF" wireframe opacity={0.2} transparent />
       </Sphere>
    </Float>
  );
}

export function ModelContact() {
  const ref = useRef<THREE.Points>(null);
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 2 + Math.random() * 0.5;
        pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} color="#00F4FF" intensity={1} />
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#8A2BE2" transparent opacity={0.6} sizeAttenuation />
      </points>
      <Sphere args={[1.8, 32, 32]}>
         <meshBasicMaterial color="#000" />
      </Sphere>
      <Sphere args={[1.9, 32, 32]}>
         <meshBasicMaterial color="#00F4FF" wireframe transparent opacity={0.1} />
      </Sphere>
    </group>
  );
}

