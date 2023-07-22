interface Job {
  id: number; // bigint from the SQL table
  created_at?: Date; // timestamp with time zone from the SQL table (optional)
  name?: string | null; // text from the SQL table (optional)
  slug: string; // text from the SQL table (required)
  description?: string | null; // character varying from the SQL table (optional)
  is_active: boolean; // boolean from the SQL table (required)
  lat?: number | null; // real from the SQL table (optional)
  long?: number | null; // real from the SQL table (optional)
  company_name?: string | null; // text from the SQL table (optional)
  content: string; // text from the SQL table in Markdown (required)
}

export type { Job };
