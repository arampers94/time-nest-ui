export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  title?: string;
  status?: string;
  created_date: Date;
  updated_date: Date;
  deleted_date?: Date;
}
