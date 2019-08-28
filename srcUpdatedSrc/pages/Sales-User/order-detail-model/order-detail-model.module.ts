import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailModelPage } from './order-detail-model';

@NgModule({
  declarations: [
    OrderDetailModelPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailModelPage),
  ],
})
export class OrderDetailModelPageModule {}
