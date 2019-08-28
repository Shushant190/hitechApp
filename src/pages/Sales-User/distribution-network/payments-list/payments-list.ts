import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AddPaymentsPage } from '../../add-payments/add-payments';
import { PopoverComponent } from '../../../../components/popover/popover';


/**
* Generated class for the PaymentsListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-payments-list',
  templateUrl: 'payments-list.html',
})
export class PaymentsListPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsListPage');
  }
  
  addPayment(){
    this.navCtrl.push(AddPaymentsPage)
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(popoverData => {
      console.log(popoverData);
    })
  }
  
}
