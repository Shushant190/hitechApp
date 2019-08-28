import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesDetailsPage } from './expenses-details';

@NgModule({
  declarations: [
    ExpensesDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensesDetailsPage),
  ],
})
export class ExpensesDetailsPageModule {}
