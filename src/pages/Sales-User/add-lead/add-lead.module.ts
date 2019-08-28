import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLeadPage } from './add-lead';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddLeadPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLeadPage),
    IonicSelectableModule
  ],
})
export class AddLeadPageModule {}
