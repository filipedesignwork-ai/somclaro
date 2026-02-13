import HeroSection from "@/components/HeroSection";
import WaveVisualizer from "@/components/WaveVisualizer";
import BitrateSimulator from "@/components/BitrateSimulator";
import FileComparison from "@/components/FileComparison";
import WaterAnalogyGrid from "@/components/WaterAnalogyGrid";
import SoundSpeedTable from "@/components/SoundSpeedTable";
import SampleRateList from "@/components/SampleRateList";
import FormatsTabs from "@/components/FormatsTabs";
import HearingChart from "@/components/HearingChart";
import SessionQuiz from "@/components/SessionQuiz";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <HeroSection />

      <main className="container mx-auto max-w-5xl space-y-10 px-4 py-10">
        {/* Section 1: Water Analogy */}
        <section>
          <SectionHeader
            number="01"
            title="Analogia da Água"
            description="A pedra no lago: uma forma intuitiva de entender as propriedades do som."
          />
          <WaterAnalogyGrid />
        </section>

        {/* Section 2: Sound Physics */}
        <section>
          <SectionHeader
            number="02"
            title="Comportamento Físico do Som"
            description="Como o som se propaga em diferentes meios e os fenómenos de refração e difração."
          />
          <SoundSpeedTable />
        </section>

        {/* Section 3: Analog vs Digital */}
        <section>
          <SectionHeader
            number="03"
            title="Áudio Analógico vs Digital"
            description="Compare visualmente a diferença entre um sinal analógico contínuo e a sua representação digital discretizada."
          />
          <WaveVisualizer />
          <div className="mt-6">
            <SampleRateList />
          </div>
        </section>

        {/* Section 4: Bitrate Simulator */}
        <section>
          <SectionHeader
            number="04"
            title="Simulador de Compressão"
            description="Experimente o efeito da taxa de bits na qualidade do áudio."
          />
          <BitrateSimulator />
        </section>

        {/* Section 5: Formats & Codecs */}
        <section>
          <SectionHeader
            number="05"
            title="Formatos e Codecs"
            description="Entenda a diferença entre o contentor (formato) e o algoritmo (codec)."
          />
          <FormatsTabs />
          <div className="mt-6">
            <FileComparison />
          </div>
        </section>

        {/* Section 6: Hearing */}
        <section>
          <SectionHeader
            number="06"
            title="Audição Humana"
            description="A gama de frequências perceptíveis pelo ouvido humano comparada com outros animais."
          />
          <HearingChart />
        </section>

        {/* Section 7: Quiz */}
        <section>
          <SectionHeader
            number="07"
            title="Avaliação"
            description="Testa os teus conhecimentos com um mini-quiz interativo."
          />
          <SessionQuiz />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground">Bibliografia / Webgrafia</h3>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>• Pohlmann, K. — <em>Principles of Digital Audio</em>, McGraw-Hill</li>
              <li>• Roads, C. — <em>The Computer Music Tutorial</em>, MIT Press</li>
              <li>• Katz, B. — <em>Mastering Audio: The Art and the Science</em></li>
              <li>• Documentação técnica MPEG / ISO/IEC 11172-3</li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Recurso educativo sobre áudio digital</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Produção: <span className="text-foreground">Filipe Ramos</span> · Plataforma Som Claro
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
