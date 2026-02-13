import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Send, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual a velocidade do som no aço?",
    options: ["343 m/s", "1500 m/s", "6000 m/s"],
    correct: 2,
  },
  {
    id: 2,
    question: "Na analogia da pedra, o que define o volume?",
    options: ["Velocidade do impacto", "Tamanho da pedra", "Tipo de pedra"],
    correct: 1,
  },
  {
    id: 3,
    question: "Qual destes é um formato sem perdas?",
    options: ["MP3", "AAC", "WAV"],
    correct: 2,
  },
];

const SessionQuiz = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const score = questions.filter((q) => answers[q.id] === q.correct).length;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Preencha o nome e o email antes de submeter.");
      return;
    }
    if (!allAnswered) {
      toast.error("Responda a todas as perguntas.");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("quiz_results").insert({
        student_name: name.trim(),
        student_email: email.trim(),
        session_number: 1,
        score,
        total_questions: questions.length,
        answers: questions.map((q) => ({
          question: q.question,
          selected: q.options[answers[q.id]],
          correct: q.options[q.correct],
          isCorrect: answers[q.id] === q.correct,
        })),
      });

      if (error) throw error;
      setSubmitted(true);
      toast.success("Respostas enviadas com sucesso!");
    } catch {
      toast.error("Erro ao guardar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setName("");
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        🧪 Mini-Quiz — Sessão 1
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Testa os teus conhecimentos sobre os conceitos abordados.
      </p>

      {!submitted ? (
        <div className="space-y-6">
          {/* Questions */}
          {questions.map((q, qi) => (
            <div key={q.id}>
              <p className="mb-2 text-sm font-medium text-foreground">
                <span className="font-mono text-xs text-primary mr-2">
                  {qi + 1}.
                </span>
                {q.question}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: oi }))
                    }
                    className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                      answers[q.id] === oi
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Student info */}
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <p className="mb-3 text-sm font-medium text-foreground">
              Identificação do Aluno
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="quiz-name" className="text-xs text-muted-foreground">
                  Nome
                </Label>
                <Input
                  id="quiz-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="O teu nome"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="quiz-email" className="text-xs text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="quiz-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.pt"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!allAnswered || !name.trim() || !email.trim() || saving}
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            {saving ? "A enviar..." : "Submeter Respostas"}
          </Button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-4">
              {score === questions.length ? (
                <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              ) : (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-secondary">
                  <span className="font-mono text-2xl font-bold text-secondary">
                    {score}/{questions.length}
                  </span>
                </div>
              )}
            </div>
            <h4 className="text-lg font-semibold text-foreground">
              {score === questions.length
                ? "Parabéns! Tudo correcto! 🎉"
                : `Obtiveste ${score} de ${questions.length} respostas correctas.`}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Obrigado, {name}! As tuas respostas foram registadas.
            </p>

            {/* Show correct answers */}
            <div className="mt-6 space-y-2 text-left">
              {questions.map((q) => {
                const isCorrect = answers[q.id] === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`flex items-start gap-2 rounded-md border p-3 ${
                      isCorrect
                        ? "border-primary/30 bg-primary/5"
                        : "border-destructive/30 bg-destructive/5"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    )}
                    <div>
                      <p className="text-sm text-foreground">{q.question}</p>
                      {!isCorrect && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Resposta correcta:{" "}
                          <span className="text-primary">{q.options[q.correct]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="outline" onClick={handleReset} className="mt-6">
              <RotateCcw className="mr-2 h-4 w-4" />
              Tentar Novamente
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default SessionQuiz;
