
-- Create quiz_results table for storing student quiz submissions
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  session_number INTEGER NOT NULL DEFAULT 1,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quiz results (public quiz)
CREATE POLICY "Anyone can submit quiz results"
ON public.quiz_results
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read quiz results (for admin view - will be protected by app-level auth later)
CREATE POLICY "Anyone can read quiz results"
ON public.quiz_results
FOR SELECT
USING (true);
