import { Component } from '@angular/core';
import { GetCompanyNotificationsService } from '../services/get-company-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Notification Scheduler';
  startingDateValue = "";
  prevName = "";
  companyData: any = [];
  diffDays: any;
  constructor(
    private notificationService: GetCompanyNotificationsService
  ) { }

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
    // cDate - Current Date , nDate = Next Date
    let cDate: any = new Date();
    let nDate: any = new Date(this.getDateFromString(date));
    let status = (cDate > nDate) ? 'completed' : 'in-progress';
    if (isLast) { status += ' last'; }
    return status;
  }

  calculateDiff(date: any, cName: any) {
    // cDate - Current Date , nDate - Next Date , pDate = Previous Date
    let nDate: any = this.getDateFromString(date);
    if (this.prevName !== cName) {
      this.prevName = cName;
      this.startingDateValue = "";
    }

    if (this.startingDateValue === '') {
      this.startingDateValue = date;
      return 0;
    }

    let pDate: any = this.getDateFromString(this.startingDateValue);
    this.startingDateValue = date;
    this.diffDays = Math.round((nDate - pDate) / (1000 * 60 * 60 * 24));
    return this.diffDays;
  }
}
