export interface Organization {
  id: number;
  name: string;
  email_domain: string;
  created_date: Date;
  updated_date: Date;
  deleted_date?: Date | null;
}

export interface CreateOrganizationPayload {
  name: string;
  email_domain: string;
}
