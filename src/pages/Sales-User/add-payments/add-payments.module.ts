import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPaymentsPage } from './add-payments';

@NgModule({
  declarations: [
    AddPaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPaymentsPage),
  ],
})
export class AddPaymentsPageModule {}
