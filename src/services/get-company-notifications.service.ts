import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetCompanyNotificationsService {
  // Mock API
  private url =
    'https://my-json-server.typicode.com/pamidipriya/demo/notifications';
  constructor(private httpClient: HttpClient) {}

  getAllCompanyNotifications(): Observable<any> {
    return this.httpClient.get(this.url);
  }

}
