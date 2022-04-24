import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetCompanyNotificationsService } from '../services/get-company-notifications.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Notification Scheduler'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Notification Scheduler');
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(GetCompanyNotificationsService);
    spyOn(service, "getAllCompanyNotifications").and.callFake(() => {
      return of({
        "statusCode": 200
      });
    })
    app.ngOnInit();
    expect(app.companyData).toEqual({
      "statusCode": 200
    });
  })

  it('should call isCompleted', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let date = '2022-04-26T00:00:00.000Z';
    let last = 'last'
    let response =  app.isCompleted(date , last);   
    expect(response).toBe("in-progress last");
  })

  it('should call calculateDiff', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let date = '2022-04-26T00:00:00.000Z';
    let company = 'denmark'
    let response =  app.calculateDiff(date , company);
    expect(response).toBe(0);
  })
});
