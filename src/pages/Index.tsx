import HeroSection from "@/components/HeroSection";
import WaveVisualizer from "@/components/WaveVisualizer";
import BitrateSimulator from "@/components/BitrateSimulator";
import FileComparison from "@/components/FileComparison";
import { motion } from "framer-motion";
import { BookOpen, Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main className="container mx-auto max-w-5xl space-y-8 px-4 py-10">
        {/* Section 1: Wave Visualizer */}
        <section>
          <SectionHeader
            number="01"
            title="Visualizador de Ondas"
            description="Compare visualmente a diferença entre um sinal analógico contínuo e a sua representação digital discretizada."
          />
          <WaveVisualizer />
        </section>

        {/* Section 2: Bitrate Simulator */}
        <section>
          <SectionHeader
            number="02"
            title="Simulador de Compressão"
            description="Experimente o efeito da taxa de bits na qualidade do áudio. Observe como a forma de onda e o espectro de frequências mudam."
          />
          <BitrateSimulator />
        </section>

        {/* Section 3: File Comparison */}
        <section>
          <SectionHeader
            number="03"
            title="Comparação de Formatos"
            description="Entenda as diferenças práticas entre ficheiros WAV e MP3."
          />
          <FileComparison />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Recurso educativo sobre áudio digital</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Feito com fins educativos · Áudio Analógico vs Digital
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SectionHeader = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="mb-4"
  >
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs font-semibold text-primary">{number}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
    <h2 className="mt-2 text-lg font-semibold text-foreground">{title}</h2>
    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

export default Index;
