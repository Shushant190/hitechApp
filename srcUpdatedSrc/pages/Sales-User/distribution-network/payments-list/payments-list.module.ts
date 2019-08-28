import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentsListPage } from './payments-list';

@NgModule({
  declarations: [
    PaymentsListPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsListPage),
  ],
})
export class PaymentsListPageModule {}
