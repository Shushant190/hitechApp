import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatOrderPage } from './creat-order';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [
    CreatOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatOrderPage),
    IonicSelectableModule

  ],
})
export class CreatOrderPageModule {}
