import { motion } from "framer-motion";
import { Ear } from "lucide-react";

const ranges = [
  { label: "Humano", min: "20 Hz", max: "22 kHz", width: "44%", left: "10%", color: "bg-primary", glow: "shadow-[0_0_10px_hsl(187_80%_55%/0.4)]" },
  { label: "Cão", min: "67 Hz", max: "45 kHz", width: "60%", left: "12%", color: "bg-secondary", glow: "shadow-[0_0_10px_hsl(30_90%_55%/0.4)]" },
  { label: "Morcego", min: "2 kHz", max: "110 kHz", width: "75%", left: "18%", color: "bg-accent-foreground", glow: "shadow-[0_0_10px_hsl(187_80%_75%/0.3)]" },
];

const HearingChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="mb-6 flex items-center gap-3">
        <Ear className="h-5 w-5 text-primary" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Gama de Audição</h3>
          <p className="text-sm text-muted-foreground">
            Comparação das gamas de frequência audíveis
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {ranges.map((range, i) => (
          <motion.div
            key={range.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{range.label}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {range.min} — {range.max}
              </span>
            </div>
            <div className="relative h-6 rounded-full bg-muted/50">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: range.width }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.2 }}
                className={`absolute h-full rounded-full ${range.color} ${range.glow} opacity-70`}
                style={{ left: range.left }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Frequency axis */}
      <div className="mt-4 flex justify-between text-xs text-muted-foreground font-mono">
        <span>1 Hz</span>
        <span>100 Hz</span>
        <span>1 kHz</span>
        <span>10 kHz</span>
        <span>100 kHz</span>
      </div>
    </motion.div>
  );
};

export default HearingChart;
