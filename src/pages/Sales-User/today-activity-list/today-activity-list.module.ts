import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayActivityListPage } from './today-activity-list';

@NgModule({
  declarations: [
    TodayActivityListPage,
  ],
  imports: [
    IonicPageModule.forChild(TodayActivityListPage),
  ],
})
export class TodayActivityListPageModule {}
