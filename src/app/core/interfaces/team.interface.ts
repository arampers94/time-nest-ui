import { User } from './user.interface';

export interface Team {
  id: number;
  name: string;
  description: string;
  organizationId: number;
  users: User[];
  created_date: Date;
  updated_date: Date;
  deleted_date?: Date;
}

export type CreateTeamPayload = Pick<
  Team,
  'name' | 'description' | 'organizationId'
> & {
  user_ids: number[];
};

export type UpdateTeamDetailsPayload = Pick<Team, 'name' | 'description'> & {
  id: number;
};
