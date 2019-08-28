import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributorOrderListPage } from './distributor-order-list';

@NgModule({
  declarations: [
    DistributorOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(DistributorOrderListPage),
  ],
})
export class DistributorOrderListPageModule {}
