import { Injectable } from '@angular/core';
import { environment as env } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public apiVersion = 'v1';
  public baseUrl = `${env.apiUrl}`;
}
