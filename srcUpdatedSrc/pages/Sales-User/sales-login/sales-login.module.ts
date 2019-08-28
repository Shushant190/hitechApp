import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesLoginPage } from './sales-login';

@NgModule({
  declarations: [
    SalesLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesLoginPage),
  ],
})
export class SalesLoginPageModule {}
