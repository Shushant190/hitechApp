import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelPlanListPage } from './travel-plan-list';

@NgModule({
  declarations: [
    TravelPlanListPage,
  ],
  imports: [
    IonicPageModule.forChild(TravelPlanListPage),
  ],
})
export class TravelPlanListPageModule {}
