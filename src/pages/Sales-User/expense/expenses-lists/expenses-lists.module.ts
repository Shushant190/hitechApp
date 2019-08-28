import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesListsPage } from './expenses-lists';

@NgModule({
  declarations: [
    ExpensesListsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensesListsPage),
  ],
})
export class ExpensesListsPageModule {}
