import { Component } from '@angular/core';
import { GetCompanyNotificationsService } from '../services/get-company-notifications.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Notification Schedular';
  startingDateValue = "";
  prevName = "";
  companyData: any = [];
  diffDays:any;
  totalNumberOfDays:any;
 constructor(
    private httpClient: HttpClient,
    private notificationService: GetCompanyNotificationsService
  ) {}
  ngOnInit() {
      this.notificationService
        .getAllCompanyNotifications()
        .subscribe((response) => {
          this.companyData = response;
        });
    }
  getDateFromString(sDate: any) {
    let mdy = sDate.split('/');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
  }

  isCompleted(date: any, isLast: any) {
    let cDate: any = new Date();
    let nDate: any = new Date(this.getDateFromString(date));
    let status = (cDate > nDate) ? 'completed' : 'in-progress';
    if (isLast) { status += ' last'; }
    return status;
  }

  calculateDiff(date: any, cName: any) {
    let nDate: any = this.getDateFromString(date);
    if(this.prevName !== cName) {
      this.prevName = cName;
      this.startingDateValue = "";
      this.totalNumberOfDays = 0;
    }

    if (this.startingDateValue === '') {
      this.startingDateValue = date;
      return 0;
    }

    let pDate: any = this.getDateFromString(this.startingDateValue);
    this.startingDateValue = date;
    this.diffDays = Math.round((nDate - pDate) / (1000 * 60 * 60 * 24));
    this.totalNumberOfDays += this.diffDays;
    console.log('totalNumberOfDays:' , this.totalNumberOfDays)
    return this.diffDays;

  }
}
