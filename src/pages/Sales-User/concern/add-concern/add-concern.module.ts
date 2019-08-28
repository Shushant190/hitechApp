import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddConcernPage } from './add-concern';

@NgModule({
  declarations: [
    AddConcernPage,
  ],
  imports: [
    IonicPageModule.forChild(AddConcernPage),
  ],
})
export class AddConcernPageModule {}
