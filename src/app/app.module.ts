import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GetCompanyNotificationsService } from '../services/get-company-notifications.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [GetCompanyNotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
