import { Component, ComponentFactoryResolver  } from '@angular/core';
import { IonicPage, NavController, NavParams, setupTapClick } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
// import { T } from '@angular/core/src/render3';

import * as moment from 'moment';
import { Storage } from '@ionic/storage'
import { LeaveListPage } from '../leave-list/leave-list';

// import { Route } from '@angular/compiler/src/core';


// import { LeaveListPage } from '../leave-list/leave-list';


/**
* Generated class for the AddLeavePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-add-leave',
  templateUrl: 'add-leave.html',
})
export class AddLeavePage {
  userId:any;
  currentDate:any;
  TodayDate:any;
  iseligible:any= false;
  updateData:any = {};
  constructor(public store: Storage ,public serve : CatelougeProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.TodayDate = moment(this.currentDate).format('YYYY-MM-DD'); 
    this.form = this.navParams.get("updateData");
    console.log(this.form );
    
console.log( this.TodayDate);
    this.store.get('userId').then((userId)=>{
      this.userId= userId;
      this.getAllTypeLeaves();
      this.getCountUserLeave(this.userId);
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLeavePage');
  }
  
  form:any={};
  AddLeave()
  {
    this.serve.getData(this.form,"applyLeave").then((r)=>{
      console.log(r);
    });
  }
  
  newArrayList:any=[];
  getAllTypeLeaves()
  {
    this.serve.getData({},'leave/list').then((r)=>{
      this.newArrayList=r['data'];
    });
  }
  
  diffrence:any;
  ApplyLeave()
  {
    console.log(this.form);
    
    this.diffrence=  moment( this.form.EndDate).diff(moment( this.form.startDate), 'days');
    const currentDate = moment().format('YYYY-MM-DD');
    console.log(this.form.startDate,this.form.endDate);
    this.form= { 'leaveType':this.form.leave_type,'startDate':this.form.startDate,'endDate':moment(this.form.EndDate).format("YYYY-MM-DD"),'remarks':this.form.remark,
    'userId':this.userId,
 'numberOfDays':this.diffrence +1,'ApplicationDate':currentDate,
 'approvalStatus':0, 'leaveApplicationId':0}  

 console.log(this.form);
    this.serve.getData(this.form,"applyLeave").then((r)=>{
      console.log(r);

      if(r["message"] == "Success")
      {
        this.navCtrl.push(LeaveListPage);
      }
      else{
          this.navCtrl.pop(); 
      }
    })
  }




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



  leaveName:any;
limitdate:any=[];
msg:any;
isDescription:boolean=false;
limitdate1:any={};
LeaveTypeData:any;
subdata:any=[];
test(ruleId)

{
  for(var i=0;i<this.newArrayList.length;i++)
    {
      if(ruleId==this.newArrayList[i].ruleId){
        this.subdata=this.newArrayList[i]
      }
    }
  
  console.log(ruleId);
  console.log(this.subdata.subject);
  this.LeaveTypeData = ruleId;
  // this.isDescription = true;
  // return false;
this.form.EndDate='';
this.form.StartDate='';

  console.log(ruleId,this.form);
   let index=this.newArrayList.findIndex(x=>x.ruleId==ruleId);
   this.form.description=this.newArrayList[index].description;
   this.isDescription=true;
   console.log(this.form.isDescription);
  for( var i=0;i<=this.myLeavLeft.length; i++)
  {
    // console.log(this.myLeavLeft[i].leaveTypeID);
    // console.log(ruleId);
    // console.log(this.myLeavLeft[i].leaveTypeID == ruleId);
    if(this.myLeavLeft[i].leaveTypeID==ruleId)
    {
    //  console.log("test");
    //   console.log(this.myLeavLeft[i].remainingLeaves);
      this.limitdate = this.myLeavLeft[i].remainingLeaves;
      this.leaveName=this.myLeavLeft[i].leaveType;
      // console.log(this.limitdate);
      // this.loader=false;
      break;
    }
   
  }
  
  console.log(this.limitdate);
  if(this.limitdate==0){
    this.msg="You Don't Have Any Pending "+this.leaveName;
   
    this.iseligible=true;
  }
  else{
    this.iseligible=false;
  }
  console.log("this is limit date", this.limitdate);
}




endDate:any;
endDate1:any;
date:any;
MyStartDate:any
onDateChangeHandler(date) {
  console.log(date);

  this.MyStartDate = date

  if(this.form.LeaveType == 'other')
  {
    console.log("hii");
    this.endDate="";
  }
  else
  {
    console.log("hello");
    console.log(   "This Is Start Date ",date);
      var myDate= moment(date, 'YYYY-MM-DD').add(this.limitdate-1, 'days');
      console.log(myDate);
        this.endDate1=myDate["_d"];
        console.log(this.endDate1);
        // this.endDate=myDate["YYYY-MM-DD"];
        this.endDate = moment( this.endDate1).format('YYYY-MM-DD');
        console.log( "This Is end Date " ,  this.endDate);
      // return this.endDate;
  }

//Casula Leave Reuirement 
      if(this.subdata.subject == "Subject 1" )  // casual leave
      {
          console.log(this.MyStartDate);
          console.log(this.endDate);
 



          this.MyStartDate = new Date();
          this.MyStartDate.setDate(this.MyStartDate.getDate() + 2);
           this.MyThreeDayLeave = moment(this.MyStartDate).format('YYYY-MM-DD');
           console.log(this.MyThreeDayLeave)

          







          // console.log(date);
      }
        
          

              else if(this.subdata.subject == "Sick Leaves")
              {
                console.log("This iS For Sick Leaves ")
                    
                      this.medicalCert = 2;

              }


              else if( this.subdata.subject == "SUNBJECT @")  // EARNED LEAVES
              {
                console.log("This iS For SUNBJECT @ ")

                this.MyThreeDayLeave = this.endDate; //  this Block Is For Earned Leave Type 
              }



              else if( this.subdata.subject == "Subject 1 ")  // SUBJECT 1 
              {
                console.log("This iS For Subject 1 ")
              }



              else if( this.subdata.subject == "Subject 2 ")  // SUBJECT 1 
              {
                console.log("This iS For Subject 2 ");
              }


              else if( this.subdata.subject == "Subject 3 ")  // SUBJECT 1 
              {
                console.log("This iS For Subject 3 ")
              }


      else{
// 
      }

}
DiffrenceDate:any;
medicalCert:any =1;

MyThreeDayLeave:any;
holidayCountAsLeave:any;
TabActiveValue:any = 1 ;
  getActiveTab(value) 
  {
    this.TabActiveValue = value;
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
}



// pendingCounter:any =[];
// count:any= [];
// LeaveCounterMaxFun()
// {

//   setTimeout(()=>{
//     console.log("LeaveCounterMaxFun")
//     console.log(this.myLeavLeft);


//     for(let i= 0; i< this.myLeavLeft.length;i++)
//     {
//       console.log(this.count.push(this.myLeavLeft[i].totalAllowed)); 
//     }
//     console.log(this.pendingCounter);

//   },2000)
  
// }






}
