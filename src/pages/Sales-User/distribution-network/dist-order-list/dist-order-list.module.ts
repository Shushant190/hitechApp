import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistOrderListPage } from './dist-order-list';

@NgModule({
  declarations: [
    DistOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(DistOrderListPage),
  ],
})
export class DistOrderListPageModule {}
