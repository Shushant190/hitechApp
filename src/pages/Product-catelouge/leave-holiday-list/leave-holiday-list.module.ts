import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveHolidayListPage } from './leave-holiday-list';

@NgModule({
  declarations: [
    LeaveHolidayListPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveHolidayListPage),
  ],
})
export class LeaveHolidayListPageModule {}
