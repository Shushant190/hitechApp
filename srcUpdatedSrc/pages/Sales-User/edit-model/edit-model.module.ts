import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditModelPage } from './edit-model';

@NgModule({
  declarations: [
    EditModelPage,
  ],
  imports: [
    IonicPageModule.forChild(EditModelPage),
  ],
})
export class EditModelPageModule {}
