import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayLitPage } from './holiday-lit';

@NgModule({
  declarations: [
    HolidayLitPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayLitPage),
  ],
})
export class HolidayLitPageModule {}
