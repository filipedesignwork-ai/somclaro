import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const FormatsTabs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        Formatos e Codecs
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        O <strong className="text-foreground">Codec</strong> é o algoritmo de
        codificação/descodificação. O{" "}
        <strong className="text-foreground">Formato</strong> é a arquitectura do
        ficheiro (contentor).
      </p>

      <Tabs defaultValue="lossless" className="w-full">
        <TabsList className="mb-4 w-full grid grid-cols-2 bg-muted">
          <TabsTrigger value="lossless" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Sem Perdas
          </TabsTrigger>
          <TabsTrigger value="lossy" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
            Com Perdas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lossless">
          <div className="space-y-3">
            <FormatCard
              name="WAV (PCM)"
              codec="Linear PCM (sem compressão)"
              size="~30 MB / 3 min"
              pros={["Qualidade original preservada", "Padrão industrial", "Sem artefactos"]}
              cons={["Ficheiros muito grandes", "Sem metadados avançados"]}
              color="primary"
            />
            <FormatCard
              name="FLAC"
              codec="Free Lossless Audio Codec"
              size="~18 MB / 3 min"
              pros={["Sem perdas com compressão", "Metadados e tags", "Open source"]}
              cons={["Compatibilidade limitada", "Maior que MP3"]}
              color="primary"
            />
          </div>
        </TabsContent>

        <TabsContent value="lossy">
          <div className="space-y-3">
            <FormatCard
              name="MP3 (MPEG-1 Layer 3)"
              codec="Modelo Psicoacústico"
              size="~3-7 MB / 3 min"
              pros={["Ficheiros muito pequenos", "Compatibilidade universal"]}
              cons={["Perda irreversível de dados", "Artefactos em bitrates baixos"]}
              color="secondary"
            />
            <FormatCard
              name="AAC (Advanced Audio Coding)"
              codec="AAC-LC / HE-AAC"
              size="~3-6 MB / 3 min"
              pros={["Melhor qualidade que MP3 ao mesmo bitrate", "Suporte nativo Apple/YouTube"]}
              cons={["Menos universal que MP3", "Perda de dados"]}
              color="secondary"
            />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

const FormatCard = ({
  name,
  codec,
  size,
  pros,
  cons,
  color,
}: {
  name: string;
  codec: string;
  size: string;
  pros: string[];
  cons: string[];
  color: string;
}) => (
  <div className="rounded-md border border-border bg-muted/30 p-4">
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-foreground">{name}</h4>
      <Badge variant="outline" className={`border-${color}/40 text-${color} font-mono text-xs`}>
        {size}
      </Badge>
    </div>
    <p className="mt-1 text-xs text-muted-foreground">
      Codec: <span className="font-mono text-foreground">{codec}</span>
    </p>
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div>
        {pros.map((p) => (
          <div key={p} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
            <span>{p}</span>
          </div>
        ))}
      </div>
      <div>
        {cons.map((c) => (
          <div key={c} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <X className="mt-0.5 h-3 w-3 shrink-0 text-destructive" />
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FormatsTabs;
