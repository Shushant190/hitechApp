import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributionNetworkDetailPage } from './distribution-network-detail';

@NgModule({
  declarations: [
    DistributionNetworkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DistributionNetworkDetailPage),
  ],
})
export class DistributionNetworkDetailPageModule {}
