import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkDetailPopoverPage } from './network-detail-popover';

@NgModule({
  declarations: [
    NetworkDetailPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkDetailPopoverPage),
  ],
})
export class NetworkDetailPopoverPageModule {}
