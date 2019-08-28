import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTaskPage } from './add-task';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  declarations: [
    AddTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTaskPage),
    IonicSelectableModule,

  ],
})
export class AddTaskPageModule {}
