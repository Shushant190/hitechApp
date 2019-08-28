import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelMonthPage } from './travel-month';
import { TravelDetailModalPage } from '../travel-detail-modal/travel-detail-modal';

@NgModule({
  declarations: [
    TravelMonthPage,
  ],
  imports: [
    IonicPageModule.forChild(TravelMonthPage),

  ],
})
export class TravelMonthPageModule {}
