import { motion } from "framer-motion";
import { Wind, Droplets, Hammer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const media = [
  { name: "Ar", speed: "343 m/s", icon: Wind, temp: "20°C" },
  { name: "Água", speed: "1500 m/s", icon: Droplets, temp: "25°C" },
  { name: "Aço", speed: "6000 m/s", icon: Hammer, temp: "20°C" },
];

const definitions = [
  {
    term: "Refração",
    definition:
      "Mudança de direcção da onda sonora ao passar de um meio para outro (ex.: ar para água).",
  },
  {
    term: "Difração",
    definition:
      "Capacidade do som contornar obstáculos. Sons graves (ondas longas) difractam mais facilmente.",
  },
];

const SoundSpeedTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="mb-3 text-lg font-semibold text-foreground">
        Velocidade do Som em Diferentes Meios
      </h3>

      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-muted-foreground">Meio</TableHead>
              <TableHead className="text-muted-foreground">Velocidade</TableHead>
              <TableHead className="text-muted-foreground">Temperatura</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {media.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.tr
                  key={m.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="border-border hover:bg-muted/20"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{m.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {m.speed}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {m.temp}
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {definitions.map((d) => (
          <div
            key={d.term}
            className="rounded-md border border-border bg-muted/30 p-3"
          >
            <h4 className="text-sm font-semibold text-primary">{d.term}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{d.definition}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SoundSpeedTable;
