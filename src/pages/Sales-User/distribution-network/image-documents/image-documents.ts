import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { VisitingCardIagesPage } from '../visiting-card-iages/visiting-card-iages';
import { PopoverComponent } from '../../../../components/popover/popover';

@IonicPage()
@Component({
  selector: 'page-image-documents',
  templateUrl: 'image-documents.html',
})
export class ImageDocumentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDocumentsPage');
  }

  visitingCardImage(){
    this.navCtrl.push(VisitingCardIagesPage)
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
