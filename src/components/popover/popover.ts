import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
// import { ImageDocumentsPage } from '../../pages/Sales-User/distribution-network/image-documents/image-documents';
import { DistOrderListPage } from '../../pages/Sales-User/distribution-network/dist-order-list/dist-order-list';
import { DistPopandgiftListPage } from '../../pages/Sales-User/distribution-network/dist-popandgift-list/dist-popandgift-list';
import { DistActivitiesListPage } from '../../pages/Sales-User/distribution-network/dist-activities-list/dist-activities-list';
import { PaymentsListPage } from '../../pages/Sales-User/distribution-network/payments-list/payments-list';
import { ActivityagainstPage } from '../../pages/Sales-User/activityagainst/activityagainst';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {


  items:any;
  text: string;
  id:any;
  activityModule:any;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController,public navParams: NavParams) {

    this.id=this.navParams.get('referenceId');
    this.activityModule=this.navParams.get('activityModule');

    console.log(this.id, "&" ,this.activityModule);
    
    this.items = [
  //     {item:'Profile'},
  //     {item:'Image & Documents'},
  //     {item:'Orders'},
  //     {item:'POP & Gift'},
  //     {item:'Paymaster'},
  //     {item:'Call Logs / Activities'},
    ]
  }

  // creatActivity(){
  //   this.viewCtrl.dismiss();
  // }

  creatActivity(){
    this.navCtrl.push(ActivityagainstPage,{activityModule:this.activityModule,referenceId:this.id});
  }

  distOrderList(){
    this.navCtrl.push(DistOrderListPage)
  }

  distActivitiesList(){
    let distId=this.id
    this.navCtrl.push(DistActivitiesListPage,{distId})
  }

  distPopAndGiftsList(){
    this.navCtrl.push(DistPopandgiftListPage)
  }

  distPaymentsList(){
    this.navCtrl.push(PaymentsListPage)
  }


}
