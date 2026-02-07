import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity, BarChart3 } from "lucide-react";

type SignalType = "analog" | "digital";

const WaveVisualizer = () => {
  const [signalType, setSignalType] = useState<SignalType>("analog");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const phaseRef = useRef(0);

  const drawWave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const midY = h / 2;
    const amplitude = h * 0.35;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "hsl(220 15% 14%)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center line
    ctx.strokeStyle = "hsl(220 15% 22%)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    phaseRef.current += 0.02;
    const phase = phaseRef.current;

    if (signalType === "analog") {
      // Smooth sine wave
      const gradient = ctx.createLinearGradient(0, midY - amplitude, 0, midY + amplitude);
      gradient.addColorStop(0, "hsl(187 90% 65%)");
      gradient.addColorStop(0.5, "hsl(187 80% 55%)");
      gradient.addColorStop(1, "hsl(187 90% 65%)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "hsl(187 80% 55%)";
      ctx.shadowBlur = 12;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const y = midY + Math.sin((x / w) * Math.PI * 4 + phase) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second harmonic (subtle)
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = midY + Math.sin((x / w) * Math.PI * 8 + phase * 1.5) * amplitude * 0.3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      // Digital staircase
      const steps = 24;
      const stepWidth = w / steps;

      ctx.strokeStyle = "hsl(30 90% 55%)";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "hsl(30 90% 55%)";
      ctx.shadowBlur = 12;
      ctx.beginPath();

      for (let i = 0; i < steps; i++) {
        const x = i * stepWidth;
        const samplePoint = (i / steps) * Math.PI * 4 + phase;
        const y = midY + Math.round(Math.sin(samplePoint) * amplitude / 15) * 15;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(x + stepWidth, y);
      }
      ctx.stroke();

      // Sample points
      ctx.shadowBlur = 8;
      ctx.fillStyle = "hsl(30 95% 65%)";
      for (let i = 0; i < steps; i++) {
        const x = i * stepWidth;
        const samplePoint = (i / steps) * Math.PI * 4 + phase;
        const y = midY + Math.round(Math.sin(samplePoint) * amplitude / 15) * 15;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.shadowBlur = 0;
    animationRef.current = requestAnimationFrame(drawWave);
  }, [signalType]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(drawWave);
    return () => cancelAnimationFrame(animationRef.current);
  }, [drawWave]);

  useEffect(() => {
    const handleResize = () => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(drawWave);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawWave]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Visualizador de Ondas</h2>
          <p className="text-sm text-muted-foreground">
            Compare o sinal contínuo com o sinal discretizado
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={signalType === "analog" ? "default" : "outline"}
            onClick={() => setSignalType("analog")}
            className={
              signalType === "analog"
                ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(187_80%_55%/0.3)]"
                : "border-border text-muted-foreground hover:text-foreground"
            }
          >
            <Activity className="mr-2 h-4 w-4" />
            Sinal Analógico
          </Button>
          <Button
            variant={signalType === "digital" ? "default" : "outline"}
            onClick={() => setSignalType("digital")}
            className={
              signalType === "digital"
                ? "bg-secondary text-secondary-foreground shadow-[0_0_16px_hsl(30_90%_55%/0.3)]"
                : "border-border text-muted-foreground hover:text-foreground"
            }
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Sinal Digital
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md border border-border bg-background">
        <canvas
          ref={canvasRef}
          className="h-64 w-full sm:h-80"
          style={{ display: "block" }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={signalType}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute bottom-3 left-3 rounded-md border border-border bg-card/90 px-3 py-1.5 backdrop-blur-sm"
          >
            <span
              className={`font-mono text-xs font-medium ${
                signalType === "analog" ? "text-primary" : "text-secondary"
              }`}
            >
              {signalType === "analog"
                ? "Onda Sinusoidal Contínua"
                : "Onda Discretizada (Escada)"}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <motion.div
          animate={{
            borderColor:
              signalType === "analog"
                ? "hsl(187 80% 55% / 0.4)"
                : "hsl(220 15% 18%)",
          }}
          className="rounded-md border bg-muted/30 p-3"
        >
          <h3 className="text-sm font-medium text-primary">Analógico</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Sinal contínuo que preserva todas as variações da onda sonora original.
            Sem perdas de informação na representação.
          </p>
        </motion.div>
        <motion.div
          animate={{
            borderColor:
              signalType === "digital"
                ? "hsl(30 90% 55% / 0.4)"
                : "hsl(220 15% 18%)",
          }}
          className="rounded-md border bg-muted/30 p-3"
        >
          <h3 className="text-sm font-medium text-secondary">Digital</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Sinal discretizado por amostragem. A resolução depende da taxa de
            amostragem e da profundidade de bits.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WaveVisualizer;
