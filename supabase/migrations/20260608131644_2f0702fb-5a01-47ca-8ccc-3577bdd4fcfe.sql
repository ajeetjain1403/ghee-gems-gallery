ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock integer NOT NULL DEFAULT 0;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;