import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatelougeListPage } from './catelouge-list';

@NgModule({
  declarations: [
    CatelougeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CatelougeListPage),
  ],
})
export class CatelougeListPageModule {}
