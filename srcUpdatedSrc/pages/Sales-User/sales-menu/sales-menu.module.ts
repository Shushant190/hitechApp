import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesMenuPage } from './sales-menu';

@NgModule({
  declarations: [
    SalesMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesMenuPage),
  ],
})
export class SalesMenuPageModule {}
