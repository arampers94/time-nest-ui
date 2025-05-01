import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrganizationPayload, Organization } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.baseUrl}/organizations`);
  }

  public getOrganizationById(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${this.baseUrl}/organizations/${id}`);
  }

  public createOrganization(
    payload: CreateOrganizationPayload
  ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/organizations`, payload);
  }

  public updateOrganization(
    id: number,
    payload: CreateOrganizationPayload
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/organizations/${id}`, payload);
  }

  public deleteOrganization(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/organizations/${id}`);
  }
}
