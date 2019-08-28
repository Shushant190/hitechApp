import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { DistributionNetworkDetailPage } from '../../pages/Sales-User/distribution-network/distribution-network-detail/distribution-network-detail';
import { DistributorOrderListPage } from '../../pages/Sales-User/distribution-network/distributor-order-list/distributor-order-list';
import { DistributorPopEndGiftListPage } from '../../pages/Sales-User/distribution-network/distributor-pop-end-gift-list/distributor-pop-end-gift-list';
import { DistributorImageEndDocumentListPage } from '../../pages/Sales-User/distribution-network/distributor-image-end-document-list/distributor-image-end-document-list';
import { DistributorConcernListPage } from '../../pages/Sales-User/distribution-network/distributor-concern-list/distributor-concern-list';
/**
 * Generated class for the DistributorDetailPophoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'distributor-detail-pophover',
  templateUrl: 'distributor-detail-pophover.html'
})
export class DistributorDetailPophoverComponent {

  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello DistributorDetailPophoverComponent Component');
    this.text = 'Hello World';
  }


  seeDistOrderlist(){
    this.navCtrl.push(DistributorOrderListPage)
  }

  seeDistGiftlist(){
    this.navCtrl.push(DistributorPopEndGiftListPage)
  }
  seeDistDocumentlist(){
    this.navCtrl.push(DistributorImageEndDocumentListPage)
  }

  seeDistconcernlist(){
    this.navCtrl.push(DistributorConcernListPage)
  }

  seeDistNetworkdetail(){
    this.navCtrl.push(DistributionNetworkDetailPage)
  }
}
