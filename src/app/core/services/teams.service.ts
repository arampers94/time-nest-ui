import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import {
  CreateTeamPayload,
  Team,
  UpdateTeamDetailsPayload,
} from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeamsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getTeamsByOrganizationId(organizationId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams/${organizationId}`);
  }

  public getTeamById(teamId: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${teamId}`);
  }

  public createTeam(payload: CreateTeamPayload): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/teams`, payload);
  }

  public updateTeamDetails(
    teamId: number,
    payload: UpdateTeamDetailsPayload
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/teams/${teamId}`, payload);
  }

  public addTeamUsers(teamId: number, userIds: number[]): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/teams/${teamId}/users`,
      userIds
    );
  }

  public removeTeamUsers(teamId: number, userIds: number[]): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/teams/${teamId}/users`,
      userIds
    );
  }

  public deleteTeam(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teams/${teamId}`);
  }
}
