import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelDetailModalPage } from './travel-detail-modal';

@NgModule({
  declarations: [
    TravelDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TravelDetailModalPage),
  ],
})
export class TravelDetailModalPageModule {}
