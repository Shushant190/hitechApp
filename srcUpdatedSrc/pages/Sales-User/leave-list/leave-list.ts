import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { LeaveDetailPage } from '../leave-detail/leave-detail';
import { LeavePopoverComponent } from '../../../components/leave-popover/leave-popover';
/**
 * Generated class for the LeaveListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-list',
  templateUrl: 'leave-list.html',
})
export class LeaveListPage {
userId:any;
activeTab:any=1;
status:any=0;


  constructor(public storage : Storage, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public service :CatelougeProvider ) {
   this.storage.get('userId').then((userId)=>{
     this.userId= userId;
     console.log(this.userId);
     this.LeaveListPage(this.status,this.activeTab);
  // this.getJuniorList();

 
   })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveListPage');
  }
// pending:any={};
AllLeaveList:any=[];
url:any={};
data:any={};
  LeaveListPage(status,value)
  {
      console.log(status,this.userId, value);

      if(value == 1)
      {
       this.data= {'userId':this.userId, 'approvalStatus': status};
       this.url="getAllLeaves";
      }
      else if(value == 2)
      {
        this.data= {'userId':this.userId, 'approvalStatus': status};
        this.url="GetAllAssignedLeaveRequests";
      }
      this.service.getData( this.data,this.url).then((r)=>
    {
      console.log(r);
      this.AllLeaveList= r['data'];
      console.log(this.AllLeaveList);
    });
  }
  goToLeaveDetail(leaveApplicationId)
  {
    this.navCtrl.push(LeaveDetailPage,{'lpa_id':leaveApplicationId,'myJunList':2});
  }





//   getCountUserLeave(userId)
// {
     
//   this.serve.getData({'userId':userId},'getUserRemainingLeaves').then((r)=>{
//   console.log("this is the type wise count");
//   console.log(r);
//   // this.loader=false
//   this.leaveCountLeft= r['data'];
//   this.currentyear = r['data'][0]['year'];
//   // this.currentyear = moment().format('MM YYYY');
//   console.log(this.currentyear);
//   console.log("this is the type wise count",this.leaveCountLeft);
//   for (var i=0;i<this.leaveCountLeft.length;i++)
//   {
//     if(this.leaveCountLeft[i].year==this.currentyear)
//     {
//       this.myLeavLeft.push(this.leaveCountLeft[i]);
//     }
//   }
//   console.log("this is remaining leaves",this.myLeavLeft);
//   });
  
// }

presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(LeavePopoverComponent);
  popover.present({
    ev: myEvent
  });
}

}
