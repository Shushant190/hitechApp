import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewArrivalListPage } from './new-arrival-list';

@NgModule({
  declarations: [
    NewArrivalListPage,
  ],
  imports: [
    IonicPageModule.forChild(NewArrivalListPage),
  ],
})
export class NewArrivalListPageModule {}
