import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { LeaveListPage } from '../leave-list/leave-list';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AddLeadPage } from '../add-lead/add-lead';
import { AddLeavePage } from '../add-leave/add-leave';

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
    this.storage.get('userId').then((userId)=>{
      console.log(userId);
      this.userId = userId;
      console.log(this.userId);
      this.getCountUserLeave(this.userId);
      this.GetDetailById();
    });

  
    

    // this.GetDetailById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveDetailPage');
  }
  DetailedData:any=[];
  GetDetailById()
  {
    console.log(this.userId, this.LpaId);
    this.serve.getData({'approvalStatus':3,'leaveApplicationId':this.LpaId},"getAllLeaves").then((r)=>{
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
      this.minYear = this.leaveCountLeft[i].year;
      console.log(this.minYear);
    }

    else if(this.leaveCountLeft[i].year!=this.currentyear){
        this.myLeavLeft.push(this.leaveCountLeft[i]);
        this.maxyear = this.leaveCountLeft[i].year;
        console.log(this.maxyear);
    }
  }
  console.log(this.currentyear, this.minYear,this.maxyear);
// myLeaveList = list of current Year Leave,  leavecountLeft = total leave Count thisyear and next year As Well


  console.log(this.currentyear);        
  });
  
}
maxyear:any;
minYear:any;

increment()
{
  let datayear=this.currentyear;
  if(this.currentyear < this.maxyear ){
    this.currentyear = this.currentyear + 1;
  }else{
    this.currentyear=datayear;
  }
  
  
  


}
decrement()
{

  let datayear=this.currentyear;
  if(  this.minYear < this.currentyear ){
    this.currentyear = this.currentyear - 1;
  }else{
    this.currentyear=datayear;
  }




  // this.currentyear = this.currentyear - /
}
status:boolean=false;
myTabValue:any = 1;
clickEvent(value)
{
  this.status =! this.status;
  this.myTabValue = value;
}



goToLeaveadd(updateData)
{
  this.navCtrl.push(AddLeavePage,{"updateData":updateData})
}






}
