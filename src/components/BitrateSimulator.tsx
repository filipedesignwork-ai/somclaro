import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Gauge, Music2, AlertTriangle } from "lucide-react";

const BitrateSimulator = () => {
  const [bitrate, setBitrate] = useState(320);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const freqCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const phaseRef = useRef(0);

  const quality = bitrate >= 256 ? "Alta" : bitrate >= 128 ? "Média" : "Baixa";
  const qualityColor =
    bitrate >= 256
      ? "text-primary"
      : bitrate >= 128
        ? "text-secondary"
        : "text-destructive";

  // Normalized 0..1 from bitrate
  const compressionFactor = 1 - (bitrate - 32) / (320 - 32);

  const drawCanvases = useCallback(() => {
    const waveCanvas = waveCanvasRef.current;
    const freqCanvas = freqCanvasRef.current;
    if (!waveCanvas || !freqCanvas) return;

    const dpr = window.devicePixelRatio || 1;

    // Wave canvas
    {
      const ctx = waveCanvas.getContext("2d")!;
      const rect = waveCanvas.getBoundingClientRect();
      waveCanvas.width = rect.width * dpr;
      waveCanvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const midY = h / 2;
      const amplitude = h * 0.35;

      ctx.clearRect(0, 0, w, h);

      // Grid
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

      phaseRef.current += 0.015;
      const phase = phaseRef.current;

      // Steps depend on bitrate — fewer steps = more pixelated
      const minSteps = 8;
      const maxSteps = 80;
      const steps = Math.round(maxSteps - compressionFactor * (maxSteps - minSteps));
      const stepWidth = w / steps;

      // Quantization levels
      const minLevels = 4;
      const maxLevels = 60;
      const levels = Math.round(maxLevels - compressionFactor * (maxLevels - minLevels));
      const quantStep = (amplitude * 2) / levels;

      const hue = 187 - compressionFactor * 157; // cyan → red
      const color = `hsl(${hue} 80% 55%)`;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let i = 0; i < steps; i++) {
        const x = i * stepWidth;
        const rawY =
          Math.sin(((i / steps) * Math.PI * 4) + phase) * amplitude +
          Math.sin(((i / steps) * Math.PI * 8) + phase * 1.3) * amplitude * 0.3 +
          Math.sin(((i / steps) * Math.PI * 16) + phase * 0.7) * amplitude * 0.15;

        const quantized = Math.round(rawY / quantStep) * quantStep;
        const y = midY + quantized;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        ctx.lineTo(x + stepWidth, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Frequency canvas
    {
      const ctx = freqCanvas.getContext("2d")!;
      const rect = freqCanvas.getBoundingClientRect();
      freqCanvas.width = rect.width * dpr;
      freqCanvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "hsl(220 15% 14%)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      const numBars = 32;
      const barWidth = (w - 20) / numBars;
      const gap = 2;

      // High frequencies cut off by compression
      const cutoffBar = Math.round(numBars * (1 - compressionFactor * 0.6));

      for (let i = 0; i < numBars; i++) {
        const baseHeight =
          (1 - (i / numBars) * 0.7) *
          (0.5 + 0.5 * Math.sin(i * 0.4 + phaseRef.current * 0.5));

        const isAboveCutoff = i >= cutoffBar;
        const barHeight = isAboveCutoff
          ? baseHeight * 0.05 * h
          : baseHeight * h * 0.8;

        const hue = isAboveCutoff ? 0 : 187 - (i / numBars) * 80;
        const alpha = isAboveCutoff ? 0.15 : 0.8;

        ctx.fillStyle = `hsla(${hue}, 80%, 55%, ${alpha})`;
        ctx.fillRect(
          10 + i * barWidth + gap / 2,
          h - barHeight,
          barWidth - gap,
          barHeight
        );
      }

      // Cutoff line
      if (compressionFactor > 0.05) {
        const cutoffX = 10 + cutoffBar * barWidth;
        ctx.strokeStyle = "hsl(0 84% 60% / 0.6)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cutoffX, 0);
        ctx.lineTo(cutoffX, h);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = "hsl(0 84% 60% / 0.8)";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillText("Corte", cutoffX + 4, 14);
      }

      // Labels
      ctx.fillStyle = "hsl(215 15% 45%)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText("Graves", 12, h - 4);
      ctx.fillText("Agudos", w - 50, h - 4);
    }

    animRef.current = requestAnimationFrame(drawCanvases);
  }, [compressionFactor]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(drawCanvases);
    return () => cancelAnimationFrame(animRef.current);
  }, [drawCanvases]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Gauge className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Simulador de Taxa de Bits
          </h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Ajuste a taxa de bits para ver o efeito da compressão MP3 no sinal e no
          espectro de frequências
        </p>
      </div>

      {/* Slider */}
      <div className="mb-6 rounded-md border border-border bg-muted/30 p-4">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Taxa de Bits
          </label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-bold text-foreground">
              {bitrate}
            </span>
            <span className="text-sm text-muted-foreground">kbps</span>
          </div>
        </div>
        <Slider
          value={[bitrate]}
          onValueChange={(v) => setBitrate(v[0])}
          min={32}
          max={320}
          step={8}
          className="w-full"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>32 kbps</span>
          <div className="flex items-center gap-1">
            <Music2 className="h-3 w-3" />
            <span className={qualityColor}>Qualidade: {quality}</span>
          </div>
          <span>320 kbps</span>
        </div>
      </div>

      {/* Canvases */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Forma de Onda
            </span>
            <Badge
              variant="outline"
              className="border-border font-mono text-[10px]"
            >
              {bitrate >= 256 ? "Sem perdas visíveis" : bitrate >= 128 ? "Compressão moderada" : "Compressão agressiva"}
            </Badge>
          </div>
          <div className="overflow-hidden rounded-md border border-border bg-background">
            <canvas
              ref={waveCanvasRef}
              className="h-48 w-full"
              style={{ display: "block" }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Espectro de Frequências
            </span>
            {compressionFactor > 0.3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3 text-destructive" />
                <span className="text-[10px] text-destructive">
                  Perda de agudos
                </span>
              </motion.div>
            )}
          </div>
          <div className="overflow-hidden rounded-md border border-border bg-background">
            <canvas
              ref={freqCanvasRef}
              className="h-48 w-full"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>

      {/* Info strip */}
      <motion.div
        layout
        className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-border bg-muted/30 px-4 py-2.5"
      >
        <InfoChip label="Amostragem" value={bitrate >= 192 ? "44.1 kHz" : bitrate >= 96 ? "22 kHz" : "11 kHz"} />
        <div className="hidden h-4 w-px bg-border sm:block" />
        <InfoChip label="Prof. de Bits" value={bitrate >= 192 ? "16 bit" : bitrate >= 96 ? "12 bit" : "8 bit"} />
        <div className="hidden h-4 w-px bg-border sm:block" />
        <InfoChip label="Ficheiro 3 min" value={`~${Math.round((bitrate * 180) / 8 / 1024 * 10) / 10} MB`} />
      </motion.div>
    </motion.div>
  );
};

const InfoChip = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-muted-foreground">{label}:</span>
    <span className="font-mono text-xs font-semibold text-foreground">{value}</span>
  </div>
);

export default BitrateSimulator;
