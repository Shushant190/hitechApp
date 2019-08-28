import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DvrAddPage } from './dvr-add';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    DvrAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DvrAddPage),
    IonicSelectableModule
  ],
})
export class DvrAddPageModule {}
