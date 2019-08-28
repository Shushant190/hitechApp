import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../../../components/popover/popover';

@IonicPage()
@Component({
  selector: 'page-visiting-card-iages',
  templateUrl: 'visiting-card-iages.html',
})
export class VisitingCardIagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitingCardIagesPage');
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
