import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DistributorDetailPophoverComponent } from '../../../../components/distributor-detail-pophover/distributor-detail-pophover';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
/**
 * Generated class for the DistributorConcernListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distributor-concern-list',
  templateUrl: 'distributor-concern-list.html',
})
export class DistributorConcernListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistributorConcernListPage');
  }

  presentsPopover(myEvent) {
    let popover = this.popoverCtrl.create(DistributorDetailPophoverComponent);
    popover.present({
      ev: myEvent
    });
  }

}
