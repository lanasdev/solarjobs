interface Job {
  id: number;
  created_at: string | null;
  name: string | null;
  slug: string;
  description: string | null;
  is_active: boolean;
  lat: number | null;
  long: number | null;
}

export type { Job };
