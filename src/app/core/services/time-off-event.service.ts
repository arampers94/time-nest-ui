import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateTimeOffEventPayload,
  TimeOffEvent,
  UpdateTimeOffEventPayload,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TimeOffEventService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getTimeOffEventById(timeOffEventId: number): Observable<TimeOffEvent> {
    return this.http.get<TimeOffEvent>(
      `${this.baseUrl}/time-off-events/${timeOffEventId}`
    );
  }

  public getCurrentTimeOffEventsByTeamId(
    teamId: number
  ): Observable<TimeOffEvent[]> {
    return this.http.get<TimeOffEvent[]>(
      `${this.baseUrl}/time-off-events/current/${teamId}`
    );
  }

  public getFutureTimeOffEventsByTeamId(
    teamId: number
  ): Observable<TimeOffEvent[]> {
    return this.http.get<TimeOffEvent[]>(
      `${this.baseUrl}/time-off-events/future/${teamId}`
    );
  }

  public createTimeOffEvent(
    payload: CreateTimeOffEventPayload
  ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/time-off-events`, payload);
  }

  public updateTimeOffEvent(
    payload: UpdateTimeOffEventPayload
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/time-off-events/${payload.timeOffEventId}`,
      payload
    );
  }

  public deleteTimeOffEvent(timeOffEventId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/time-off-events/${timeOffEventId}`
    );
  }
}
