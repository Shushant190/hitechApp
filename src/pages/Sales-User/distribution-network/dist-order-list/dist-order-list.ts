import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverComponent } from '../../../../components/popover/popover';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

@IonicPage()
@Component({
  selector: 'page-dist-order-list',
  templateUrl: 'dist-order-list.html',
})
export class DistOrderListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistOrderListPage');
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
