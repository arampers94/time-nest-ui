import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getUsersByOrganizationId(organizationId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users/organization/${organizationId}`
    );
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/user/${id}`);
  }
}
