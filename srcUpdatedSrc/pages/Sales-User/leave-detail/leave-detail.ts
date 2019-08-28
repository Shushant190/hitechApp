import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { LeaveListPage } from '../leave-list/leave-list';

/**
 * Generated class for the LeaveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-detail',
  templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {
  LpaId:any;
  juiorList:any;
  userId:any;
  form:any={}
  constructor(public storage:Storage,public serve: CatelougeProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.LpaId=this.navParams.get('lpa_id');
    this.juiorList=this.navParams.get('myJunList');
    console.log( this.juiorList);
    console.log(this.LpaId);
    this.storage.get('userId').then((userId)=>{
      console.log(userId);
      this.userId = userId;
      console.log(this.userId);
      this.getCountUserLeave(this.userId);
    });

  
    

    this.GetDetailById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveDetailPage');
  }
  DetailedData:any=[];
  GetDetailById()
  {
    console.log(this.userId, this.LpaId);
    this.serve.getData({'userId':this.userId,'leaveApplicationId':this.LpaId},"getAllLeaves").then((r)=>{
      console.log(r);
      this.DetailedData= r['data'][0];
      console.log(this.DetailedData);
    });
  }

 

  update_status(status,la_id)
  { 
  
   
  console.log(status,la_id);
  if(status==1)
  {
    this.form.reason="";
  }

  this.serve.getData({approvalStatus:status,'leaveApplicationId':la_id,reason:this.form.reason},'approveLeave').then((rep)=>
  console.log(rep));
  this.navCtrl.push(LeaveListPage);
}

newArrayList:any={}
leaveCountLeft:any=[];
  currentyear;
  myLeavLeft:any=[];
getCountUserLeave(userId)
{
     
  this.serve.getData({'userId':userId},'getUserRemainingLeaves').then((r)=>{
  console.log("this is the type wise count");
  console.log(r);
  // this.loader=false
  this.leaveCountLeft= r['data'];
  this.currentyear = r['data'][0]['year'];
  // this.currentyear = moment().format('MM YYYY');
  console.log(this.currentyear);
  console.log("this is the type wise count",this.leaveCountLeft);
  for (var i=0;i<this.leaveCountLeft.length;i++)
  {
    if(this.leaveCountLeft[i].year==this.currentyear)
    {
      this.myLeavLeft.push(this.leaveCountLeft[i]);
    }
  }
  console.log("this is remaining leaves",this.myLeavLeft);
  });
  
}
}
