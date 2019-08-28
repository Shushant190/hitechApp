import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesHomePage } from './sales-home';

@NgModule({
  declarations: [
    SalesHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SalesHomePage),
  ],
})
export class SalesHomePageModule {}
