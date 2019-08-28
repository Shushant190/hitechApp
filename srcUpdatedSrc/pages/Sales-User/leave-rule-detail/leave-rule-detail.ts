import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';

/**
* Generated class for the LeaveRuleDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-leave-rule-detail',
  templateUrl: 'leave-rule-detail.html',
})
export class LeaveRuleDetailPage {
  ruleId:any;
  detailedData:any={};
  constructor(public service:CatelougeProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.ruleId=this.navParams.get('ruleId');
    console.log(this.ruleId);    
    this.service.getData({'ruleId':this.ruleId},'leave/list').then((response)=>
    {
      console.log("==========================================");
      console.log(response);
      this.detailedData = response['data'][0];
      console.log(this.detailedData);
      console.log("==========================================");
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveRuleDetailPage');
  }
  
}
