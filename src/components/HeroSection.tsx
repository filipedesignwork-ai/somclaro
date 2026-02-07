import { motion } from "framer-motion";
import { Waves, Headphones } from "lucide-react";

const HeroSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden border-b border-border bg-card py-16 sm:py-24"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow effect */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/50"
          >
            <Headphones className="h-8 w-8 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Áudio Analógico{" "}
            <span className="text-primary text-glow-analog">vs</span>{" "}
            Digital
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Descubra como o som é convertido, comprimido e o que se perde no
            processo. Uma exploração interativa da ciência do áudio.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-primary">Analógico</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse-glow" />
              <span className="text-secondary">Digital</span>
            </div>
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Interativo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default HeroSection;
