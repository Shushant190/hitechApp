import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesUserPage } from './sales-user';

@NgModule({
  declarations: [
    SalesUserPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesUserPage),
  ],
})
export class SalesUserPageModule {}
