import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DistributorDetailPophoverComponent } from '../../../../components/distributor-detail-pophover/distributor-detail-pophover';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
/**
 * Generated class for the DistributorImageEndDocumentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distributor-image-end-document-list',
  templateUrl: 'distributor-image-end-document-list.html',
})
export class DistributorImageEndDocumentListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistributorImageEndDocumentListPage');
  }


  presentsPopover(myEvent) {
    let popover = this.popoverCtrl.create(DistributorDetailPophoverComponent);
    popover.present({
      ev: myEvent
    });
  }

}
