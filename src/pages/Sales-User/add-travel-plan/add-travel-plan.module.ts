import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTravelPlanPage } from './add-travel-plan';

@NgModule({
  declarations: [
    AddTravelPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTravelPlanPage),
  ],
})
export class AddTravelPlanPageModule {}
