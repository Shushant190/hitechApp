import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutstationAddListPage } from './outstation-add-list';

@NgModule({
  declarations: [
    OutstationAddListPage,
  ],
  imports: [
    IonicPageModule.forChild(OutstationAddListPage),
  ],
})
export class OutstationAddListPageModule {}
