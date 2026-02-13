import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const rates = [
  { rate: "8 kHz", use: "Telefone (voz)", quality: "Baixa" },
  { rate: "22.05 kHz", use: "Rádio AM / Voz", quality: "Média" },
  { rate: "44.1 kHz", use: "CD Áudio", quality: "Alta" },
  { rate: "48 kHz", use: "DVD / Vídeo", quality: "Alta" },
  { rate: "96 kHz", use: "Estúdio Profissional", quality: "Muito Alta" },
  { rate: "192 kHz", use: "Masterização Hi-Res", quality: "Ultra" },
];

const qualityColor: Record<string, string> = {
  Baixa: "border-destructive/40 text-destructive",
  Média: "border-secondary/40 text-secondary",
  Alta: "border-primary/40 text-primary",
  "Muito Alta": "border-primary/40 text-primary",
  Ultra: "border-primary/40 text-primary",
};

const SampleRateList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="mb-3 text-lg font-semibold text-foreground">
        Taxas de Amostragem (Sample Rates)
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        A taxa de amostragem define quantas vezes por segundo o sinal analógico é
        medido. Pelo Teorema de Nyquist, deve ser pelo menos o dobro da
        frequência máxima desejada.
      </p>
      <div className="space-y-2">
        {rates.map((r, i) => (
          <motion.div
            key={r.rate}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-foreground">
                {r.rate}
              </span>
              <span className="text-sm text-muted-foreground">{r.use}</span>
            </div>
            <Badge variant="outline" className={qualityColor[r.quality]}>
              {r.quality}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SampleRateList;
