import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributionNetworkListPage } from './distribution-network-list';

@NgModule({
  declarations: [
    DistributionNetworkListPage,
  ],
  imports: [
    IonicPageModule.forChild(DistributionNetworkListPage),
  ],
})
export class DistributionNetworkListPageModule {}
