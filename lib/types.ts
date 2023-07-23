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
interface Company {
  slug: string; // text from the SQL table (required)
  created_at?: Date; // timestamp with time zone from the SQL table (optional)
  name?: string | null; // text from the SQL table (optional)
  description?: string | null; // text from the SQL table (optional)
  logo?: string | null; // character varying from the SQL table (optional)
  city_name?: string | null; // text from the SQL table (optional)
  staff_count?: number | null; // integer from the SQL table (optional)
  website?: string | null; // text from the SQL table (optional)
  content?: string | null; // text from the SQL table (optional)
  email?: string | null; // text from the SQL table (optional)
  twitter?: string | null; // text from the SQL table (optional)
  instagram?: string | null; // text from the SQL table (optional)
  youtube?: string | null; // text from the SQL table (optional)
}

export type { Job, Company };
