import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveRuleDetailPage } from './leave-rule-detail';

@NgModule({
  declarations: [
    LeaveRuleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveRuleDetailPage),
  ],
})
export class LeaveRuleDetailPageModule {}
