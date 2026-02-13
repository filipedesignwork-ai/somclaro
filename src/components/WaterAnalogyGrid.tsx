import { motion } from "framer-motion";
import { Zap, Circle, Fingerprint } from "lucide-react";

const cards = [
  {
    icon: Zap,
    title: "Velocidade do Impacto",
    analogy: "Frequência / Tom",
    description:
      "Quanto mais rápido a pedra atinge a água, mais rápidas são as ondulações — frequências mais altas produzem sons mais agudos.",
    color: "primary",
  },
  {
    icon: Circle,
    title: "Tamanho da Pedra",
    analogy: "Amplitude / Volume",
    description:
      "Uma pedra maior cria ondas maiores — maior amplitude significa maior volume sonoro.",
    color: "secondary",
  },
  {
    icon: Fingerprint,
    title: "Massa e Tipo de Pedra",
    analogy: "Timbre",
    description:
      "A forma e o material da pedra alteram o padrão das ondulações — cada instrumento tem um timbre único.",
    color: "accent",
  },
];

const WaterAnalogyGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          🪨 A Analogia da Pedra no Lago
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Imagine uma pedra a cair num lago. As ondulações que se formam na
          superfície ajudam a entender as propriedades do som.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className={`h-5 w-5 text-${card.color}`} />
              </div>
              <h4 className="font-semibold text-foreground">{card.title}</h4>
              <p className="mt-1 font-mono text-xs text-primary">
                ≈ {card.analogy}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WaterAnalogyGrid;
