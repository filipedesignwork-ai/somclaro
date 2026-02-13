import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, RefreshCw, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface QuizResult {
  id: string;
  student_name: string;
  student_email: string;
  session_number: number;
  score: number;
  total_questions: number;
  created_at: string;
}

const Admin = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar resultados.");
    } else {
      setResults(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const exportCSV = () => {
    if (results.length === 0) {
      toast.error("Sem dados para exportar.");
      return;
    }
    const headers = ["Nome", "Email", "Sessão", "Resultado", "Data"];
    const rows = results.map((r) => [
      r.student_name,
      r.student_email,
      `Sessão ${r.session_number}`,
      `${r.score}/${r.total_questions}`,
      new Date(r.created_at).toLocaleString("pt-PT"),
    ]);
    const csv = [headers, ...rows].map((row) => row.join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resultados_somclaro_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado com sucesso!");
  };

  const exportPDF = () => {
    if (results.length === 0) {
      toast.error("Sem dados para gerar relatório.");
      return;
    }

    const content = `
      <html>
      <head>
        <title>Relatório Som Claro</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #222; }
          h1 { color: #0ea5e9; font-size: 24px; }
          h2 { color: #666; font-size: 14px; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #0ea5e9; color: white; padding: 10px; text-align: left; font-size: 13px; }
          td { border-bottom: 1px solid #ddd; padding: 8px 10px; font-size: 13px; }
          .footer { margin-top: 30px; font-size: 11px; color: #999; }
        </style>
      </head>
      <body>
        <h1>📊 Relatório de Resultados — Som Claro</h1>
        <h2>Gerado em ${new Date().toLocaleString("pt-PT")}</h2>
        <table>
          <tr><th>Nome</th><th>Email</th><th>Sessão</th><th>Resultado</th><th>Data</th></tr>
          ${results
            .map(
              (r) =>
                `<tr>
                  <td>${r.student_name}</td>
                  <td>${r.student_email}</td>
                  <td>Sessão ${r.session_number}</td>
                  <td>${r.score}/${r.total_questions}</td>
                  <td>${new Date(r.created_at).toLocaleString("pt-PT")}</td>
                </tr>`
            )
            .join("")}
        </table>
        <div class="footer">Total de submissões: ${results.length} · Plataforma Som Claro</div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
    toast.success("Relatório PDF gerado!");
  };

  const scoreBadge = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct === 100) return <Badge className="bg-primary/20 text-primary border-primary/30">{score}/{total}</Badge>;
    if (pct >= 50) return <Badge className="bg-secondary/20 text-secondary border-secondary/30">{score}/{total}</Badge>;
    return <Badge className="bg-destructive/20 text-destructive border-destructive/30">{score}/{total}</Badge>;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Área do Formador
            </h1>
          </div>
          <p className="mb-8 text-sm text-muted-foreground">
            Painel de resultados dos quizzes submetidos pelos alunos.
          </p>

          {/* Actions */}
          <div className="mb-6 flex flex-wrap gap-3">
            <Button variant="outline" onClick={fetchResults} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button variant="outline" onClick={exportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
            <Button variant="outline" onClick={exportPDF}>
              <FileText className="mr-2 h-4 w-4" />
              Gerar Relatório PDF
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Total Submissões</p>
              <p className="font-mono text-2xl font-bold text-foreground">{results.length}</p>
            </div>
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Média de Pontuação</p>
              <p className="font-mono text-2xl font-bold text-primary">
                {results.length > 0
                  ? `${Math.round((results.reduce((a, r) => a + (r.score / r.total_questions) * 100, 0) / results.length))}%`
                  : "—"}
              </p>
            </div>
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Nota Máxima</p>
              <p className="font-mono text-2xl font-bold text-secondary">
                {results.length > 0
                  ? `${results.filter((r) => r.score === r.total_questions).length} alunos`
                  : "—"}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
                  <TableHead className="text-muted-foreground">Nome</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Sessão</TableHead>
                  <TableHead className="text-muted-foreground">Resultado</TableHead>
                  <TableHead className="text-muted-foreground">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {loading ? "A carregar..." : "Sem submissões de quiz ainda."}
                    </TableCell>
                  </TableRow>
                ) : (
                  results.map((r) => (
                    <TableRow key={r.id} className="border-border hover:bg-muted/20">
                      <TableCell className="font-medium text-foreground">{r.student_name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.student_email}</TableCell>
                      <TableCell className="font-mono text-sm text-foreground">Sessão {r.session_number}</TableCell>
                      <TableCell>{scoreBadge(r.score, r.total_questions)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(r.created_at).toLocaleString("pt-PT")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
