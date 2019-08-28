import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallLogsListPage } from './call-logs-list';

@NgModule({
  declarations: [
    CallLogsListPage,
  ],
  imports: [
    IonicPageModule.forChild(CallLogsListPage),
  ],
})
export class CallLogsListPageModule {}
