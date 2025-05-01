export interface TimeOffEvent {
  id: number;
  title: string;
  type: string;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
  team_id: number;
  user_id: number;
  created_date: Date;
  updated_date: Date;
  deleted_date?: Date;
}

export type CreateTimeOffEventPayload = Pick<
  TimeOffEvent,
  'title' | 'type' | 'start_date' | 'end_date' | 'start_time' | 'end_time'
> & {
  team_id: number;
  user_id: number;
};

export type UpdateTimeOffEventPayload = Partial<
  Pick<
    TimeOffEvent,
    'title' | 'type' | 'start_date' | 'end_date' | 'start_time' | 'end_time'
  >
> & {
  timeOffEventId: number;
};
