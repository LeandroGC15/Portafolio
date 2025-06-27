import { motion, useScroll, useSpring, useTransform } from "motion/react";

const captureImages = [
  "/assets/Captura%20desde%202025-06-20%2015-07-56.png",
  "/assets/Captura%20desde%202025-06-20%2015-08-41.png",
  "/assets/Captura%20desde%202025-06-20%2015-09-03.png",
  "/assets/Captura%20desde%202025-06-20%2015-09-23.png",
  "/assets/Captura%20desde%202025-06-20%2015-09-40.png",
];

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });

  // Definir transformaciones para cada capa (más profundidad = más movimiento)
  const transforms = [
    useTransform(x, [0, 0.5], ["0%", "80%"]),   // capa más lejana
    useTransform(x, [0, 0.5], ["0%", "60%"]),
    useTransform(x, [0, 0.5], ["0%", "40%"]),
    useTransform(x, [0, 0.5], ["0%", "20%"]),
    useTransform(x, [0, 0.5], ["0%", "0%"]),    // capa más cercana
  ];

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Overlay morado eléctrico */}
        <div
          className="absolute inset-0 pointer-events-none -z-40"
          style={{
            background:
              "radial-gradient(circle at 100% 40%, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.25) 60%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
        {captureImages.map((img, idx) => (
          <motion.div
            key={img}
            className={`absolute inset-0 -z-${50 - idx * 10}`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              y: transforms[idx],
              opacity: 0.8 - idx * 0.1, // capas más profundas más tenues
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ParallaxBackground;
