import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFollowupPage } from './add-followup';

@NgModule({
  declarations: [
    AddFollowupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFollowupPage),
  ],
})
export class AddFollowupPageModule {}
