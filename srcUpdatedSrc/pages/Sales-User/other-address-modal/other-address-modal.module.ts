import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherAddressModalPage } from './other-address-modal';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    OtherAddressModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OtherAddressModalPage),
    IonicSelectableModule
  ],
})
export class OtherAddressModalPageModule {}
