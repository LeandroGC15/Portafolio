import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import { ProgrammerDesktop } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { useGLTF } from "@react-three/drei";

// Componente para el fondo decorativo 3D
function ProgrammerDesktopBG({ isMobile }) {
  // Ajustes para que el modelo siempre abarque el fondo
  const cameraZ = isMobile ? 18 : 18;
  const cameraY = isMobile ? 2 : 2;
  const scale = isMobile ? 8 : 8;
  const position = [0, -2, 0];
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <Canvas className="w-full h-full" camera={{ position: [0, cameraY, cameraZ], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <ProgrammerDesktop scale={scale} position={position} />
        </Suspense>
      </Canvas>
    </div>
  );
}

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space relative">
      {/* Fondo 3D absoluto decorativo */}
      <div className="absolute inset-0 w-full h-full -z-50 opacity-30 pointer-events-none">
        <ProgrammerDesktopBG isMobile={isMobile} />
        {/* Overlay oscuro para mayor contraste */}
        <div className={`absolute inset-0 ${isMobile ? 'bg-black/60' : 'bg-black/80'}`} />
      </div>
      {/* Contenido principal por encima */}
      <HeroText />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 0, 19], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 7.5]} intensity={1.2} castShadow />
          <Suspense fallback={<Loader />}> 
            <Float>
              <ProgrammerDesktop
                scale={isMobile ? 0.23 : 0.15}  // Ajustado para que el modelo sea más pequeño en web
                position={isMobile ? [1, 0, 1] : [0.5, 0.5, 1.5]}  // Centrado en la vista web
                rotation={[0, 0, 0]}  // Asegurar que no haya rotación adicional
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

// Necesario para que React Three Fiber cargue el modelo solo una vez
useGLTF.preload("/models/sci-fi_computer_room.glb");

export default Hero;
