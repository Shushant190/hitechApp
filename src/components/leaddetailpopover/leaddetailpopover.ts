import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { CallLogsListPage } from '../../pages/Sales-User/leads/call-logs-list/call-logs-list';
// import { CreatFolowupPage } from '../../pages/Sales-User/creat-folowup/creat-folowup';
import { NavParams } from 'ionic-angular';
import { ActivityagainstPage } from '../../pages/Sales-User/activityagainst/activityagainst';
import { CreatOrderPage } from '../../pages/Sales-User/order/creat-order/creat-order';

@Component({
  selector: 'leaddetailpopover',
  templateUrl: 'leaddetailpopover.html'
})
export class LeaddetailpopoverComponent {
  
  items:any;
  text: string;
  leadId:any;
  activityModule:any;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController,public navParams: NavParams) {

    this.leadId=this.navParams.get('leadId');
    console.log(this.leadId);

    // this.id=this.navParams.get('referenceId');
    this.activityModule=this.navParams.get('activityModule');

    console.log(this.leadId, "&" ,this.activityModule);
    
    this.items = [
    ]
  }

  itemclick(){
    this.navCtrl.push(ActivityagainstPage,{activityModule:this.activityModule,referenceId:this.leadId});
    
  }

  leadCallLogs(){
    this.navCtrl.push(CallLogsListPage);
  }

  createOrder(){
    this.navCtrl.push(CreatOrderPage);
  }

}
