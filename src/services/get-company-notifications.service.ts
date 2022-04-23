import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetCompanyNotificationsService {
  private url =
    'https://my-json-server.typicode.com/pamidipriya/demo/notifications';
  constructor(private httpClient: HttpClient) {}

  getAllCompanyNotifications(): Observable<any> {
    return this.httpClient.get(this.url);
  }

}
