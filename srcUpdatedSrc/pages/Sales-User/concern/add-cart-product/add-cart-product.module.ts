import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCartProductPage } from './add-cart-product';

@NgModule({
  declarations: [
    AddCartProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCartProductPage),
  ],
})
export class AddCartProductPageModule {}
