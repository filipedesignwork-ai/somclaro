import { motion } from "framer-motion";
import { FileAudio, Check, X, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const comparisons = [
  {
    property: "Formato",
    wav: "WAV (PCM)",
    mp3: "MP3 (MPEG-1 Layer 3)",
  },
  {
    property: "Tipo de Compressão",
    wav: "Sem perdas (Lossless)",
    mp3: "Com perdas (Lossy)",
    wavGood: true,
    mp3Good: false,
  },
  {
    property: "Tamanho (3 min)",
    wav: "~30 MB",
    mp3: "~3–7 MB",
    wavGood: false,
    mp3Good: true,
  },
  {
    property: "Taxa de Bits",
    wav: "1411 kbps",
    mp3: "128–320 kbps",
    wavGood: true,
    mp3Good: false,
  },
  {
    property: "Fidelidade Sonora",
    wav: "100% do original",
    mp3: "~90% a 320 kbps",
    wavGood: true,
    mp3Good: false,
  },
  {
    property: "Frequências Preservadas",
    wav: "20 Hz – 22 kHz",
    mp3: "20 Hz – 16 kHz*",
    wavGood: true,
    mp3Good: false,
  },
  {
    property: "Ideal Para",
    wav: "Produção / Arquivo",
    mp3: "Streaming / Portátil",
  },
];

const FileComparison = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="mb-6 flex items-center gap-3">
        <FileAudio className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Comparação de Ficheiros
          </h2>
          <p className="text-sm text-muted-foreground">
            WAV (sem perdas) vs MP3 (com perdas)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-muted-foreground">Propriedade</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-primary/40 bg-primary/10 font-mono text-primary"
                  >
                    WAV
                  </Badge>
                  <span className="text-xs text-muted-foreground">Sem perdas</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-secondary/40 bg-secondary/10 font-mono text-secondary"
                  >
                    MP3
                  </Badge>
                  <span className="text-xs text-muted-foreground">Com perdas</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisons.map((row, i) => (
              <motion.tr
                key={row.property}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-border hover:bg-muted/20"
              >
                <TableCell className="font-medium text-foreground">
                  {row.property}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {row.wavGood === true && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    )}
                    {row.wavGood === false && (
                      <X className="h-3.5 w-3.5 shrink-0 text-destructive" />
                    )}
                    {row.wavGood === undefined && (
                      <Minus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="text-sm text-foreground">{row.wav}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {row.mp3Good === true && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    )}
                    {row.mp3Good === false && (
                      <X className="h-3.5 w-3.5 shrink-0 text-destructive" />
                    )}
                    {row.mp3Good === undefined && (
                      <Minus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="text-sm text-foreground">{row.mp3}</span>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        * A compressão MP3 remove frequências acima de ~16 kHz consideradas menos
        perceptíveis pelo ouvido humano (modelo psicoacústico).
      </p>
    </motion.div>
  );
};

export default FileComparison;
