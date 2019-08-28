import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowupPopoverPage } from './followup-popover';

@NgModule({
  declarations: [
    FollowupPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowupPopoverPage),
  ],
})
export class FollowupPopoverPageModule {}
