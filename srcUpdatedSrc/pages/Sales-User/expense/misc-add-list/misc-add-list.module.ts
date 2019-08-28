import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiscAddListPage } from './misc-add-list';

@NgModule({
  declarations: [
    MiscAddListPage,
  ],
  imports: [
    IonicPageModule.forChild(MiscAddListPage),
  ],
})
export class MiscAddListPageModule {}
