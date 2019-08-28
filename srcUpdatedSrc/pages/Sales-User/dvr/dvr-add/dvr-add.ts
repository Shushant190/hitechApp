import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import { IonicSelectableComponent } from 'ionic-selectable';
import { DvrListPage } from '../dvr-list/dvr-list';
import { AddTaskPage } from '../../task/add-task/add-task';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';


@IonicPage()
@Component({
  selector: 'page-dvr-add',
  templateUrl: 'dvr-add.html',
})

export class DvrAddPage {
  isCheckDate:boolean=false;
  isCheckDateProcess:boolean=false;
  isDealerInfo:boolean=false;
  isDealerInfoProcess:boolean=false;
  datenotvalid:boolean=false;
  isCheckInfo:boolean=false;
  isCheckInfoProcess:boolean=false;
  dateoutnotvalid:boolean=false;
  datenottvalid:boolean=false;
  dvrData:any={};
  activityDetail:any=[];
  senddata:any;
  userId:any;
  currentDate:any;
  today:any;
  data:any;
  distributionList:any=[];
  OtherActivityDetail:any=[];
  rolelists:any=[];
  userType:any;
  followUp_Id:any;
  roleList:any=[];
  timecheckoutfirst:any='7:00';
  timecheckoutlast:any='23:00';
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public serve : CatelougeProvider,
    public store:Storage, public loadingCtrl:LoadingController, public toastCtrl: ToastController) {
      this.store.get('userId').then((userId)=>{
        console.log(userId);
        this.userId = userId;
      });


      this.store.get('userType').then((userType)=>{
        console.log(userType);
        this.userType = userType;
      });

      
      this.followUp_Id=this.navParams.get('followUp_Id');
      console.log("check this followup - ID "+ this.followUp_Id);
      this.dvrData.activityId=0;
      if(this.followUp_Id){
        console.log(this.followUp_Id);
        this.getActivityDetail();
      }
      
    this.isCheckDate=true;
    this.isCheckDateProcess=true;
    this.currentDate=new Date();
    this.today=moment(this.currentDate).format('YYYY-MM-DD')
    console.log( this.today);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad DvrAddPage');
  }

  showSuccess(text) {    
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  
  check1(time){
    console.log("check in time validation",time);
    console.log(this.dvrData.activityDate,this.dvrData)
    const activityDate = moment(this.dvrData.activityDate).format('Y-MM-D');
    console.log(activityDate);
    // this.dvrData.activityInTime = moment(this.dvrData.activityInTime).format('HH:mm');
    var checkinTimeSelected = new Date(this.dvrData.activityDate + ' ' + this.dvrData.activityInTime+':00').getTime();
    
    console.log(checkinTimeSelected); 
    
    console.log('Checkin Validate Start Time');
    
    const checkinTime1 = moment(this.dvrData.activityDate + ' 06:00:00').format('Y-MM-D H:mm:ss');
    var checkinMinimumTime = new Date(checkinTime1).getTime();
    
    const checkinTime2 = moment(this.dvrData.activityDate + ' 23:00:00').format('Y-MM-D H:mm:ss');
    var checkinMaximumTime = new Date(checkinTime2).getTime();
    
    console.log(checkinMinimumTime);
    console.log(checkinMaximumTime);
    
    if (checkinMinimumTime > checkinTimeSelected || checkinTimeSelected  > checkinMaximumTime) {
      this.datenotvalid=true;
      console.log(this.dvrData.activityInTime);
    } else{
      this.datenotvalid=false;
      this.dvrData.activityInTime=time;
      console.log(this.dvrData.activityInTime);
    }
    
  }
  check2(time2){
    console.log("check out time validation")
    console.log(this.dvrData.activityOutTime)
   
    var checkoutTimeSelected = new Date(this.dvrData.activityDate + ' ' + this.dvrData.activityOutTime+':00').getTime();
    var checkintimeSelected =new Date(this.dvrData.activityDate + ' ' + this.dvrData.activityInTime+':00').getTime();
    console.log(checkoutTimeSelected); 
    
    console.log('Checkin Validate Start Time');
    
    const checkinTime1 = moment(this.dvrData.activityDate + ' 07:00:00').format('Y-MM-D H:mm:ss');
    var checkinMinimumTime = new Date(checkinTime1).getTime();
    
    const checkinTime2 = moment( this.dvrData.activityDate + ' 23:00:00').format('Y-MM-D H:mm:ss');
    var checkinMaximumTime = new Date(checkinTime2).getTime();
    
    console.log(checkinMinimumTime);
    console.log(checkinMaximumTime);
    
    if (checkinMinimumTime > checkoutTimeSelected || checkoutTimeSelected  > checkinMaximumTime) {
      this.dateoutnotvalid=true;
      console.log(this.dvrData.activityOutTime);
    } else{
      this.dateoutnotvalid=false;
      this.dvrData.activityOutTime=time2;
      console.log(this.dvrData.activityOutTime);
    }
    if(checkintimeSelected > checkoutTimeSelected){
      this.datenottvalid=true;
    }
    else{
      this.datenottvalid=false;
    }
  }




  Next1(){
    if((this.datenottvalid==false && this.datenotvalid==false) && (this.dateoutnotvalid==false)){
    this.isDealerInfo=true;
    this.isDealerInfoProcess=true;
    this.isCheckDate=false;
    console.log(this.dvrData);
    if(!this.followUp_Id){
      this.rolelist();
    }
  }else{
    this.isCheckDate=true;
    this.isDealerInfo=false;
    this.isDealerInfoProcess=false;
  }
  }




  getActivityDetail()
    {
      this.serve.getData({'followupId':this.followUp_Id,'currentPage': 1,'pageSize': 50},"followup/list").then((result)=>{
        console.log(result);
        if(result['status']=='Success')
        {
          this.activityDetail=result['data'][0];
          console.log(this.activityDetail);

          this.dvrData.activityId=this.activityDetail.activityId;

              if(this.dvrData.activityId!=0){
                this.dvrData.network=10;
                this.serve.getData({'activityId':this.dvrData.activityId,'currentPage': 1,'pageSize': 50},"activity/list").then((result)=>{
                  console.log(result);
                  if(result['status']=='Success')
                    {
                      this.OtherActivityDetail=result['data'][0]
                      console.log(this.OtherActivityDetail)
                      this.dvrData.otherName=this.OtherActivityDetail.otherCustomer;
                      this.dvrData.mobile=this.OtherActivityDetail.mobile;
                    }
                  })
              }
              else
              {
                this.dvrData.network=this.activityDetail.referenceId;
              }
          if(this.activityDetail.activityModule==2){
            this.dvrData.role=11;
            this.dvrData.activityModule=2;
          }
          else if(this.activityDetail.activityModule==1){
            this.dvrData.role=12;
            this.dvrData.activityModule=1;
          }
          else if(this.activityDetail.activityModule=3){
            this.dvrData.role=13;
            this.dvrData.activityModule=3;
          }
          else if(this.activityDetail.activityModule==4){
            this.dvrData.role=14;
            this.dvrData.activityModule=4;
          }
          else if(this.activityDetail.activityModule=5){
            this.dvrData.role=15;
            this.dvrData.activityModule=5;
          }
          this.rolelist();
        }
        console.log(this.activityDetail.activityModule)
        console.log(this.dvrData.role)
        this.getnetworklist(this.dvrData.role);
        console.log(this.dvrData.network);
      })
    }
 
  



  rolelist()
  {
    this.serve.getValue('','usertype/list').then((r:any)=>{
      console.log(r);
      this.rolelists=r['data'];
      let rolelists1= this.rolelists.filter(x => x.userTypeId==3);
      this.roleList=rolelists1[0].roles;
      console.log(this.roleList);
    });
  }


  getnetworklist(role){
    console.log(role);
    this.distributionList=[]
    if(role==11){
      this.dvrData.activityModule=2
    }
    else if(role==12){
      this.dvrData.activityModule=1
    }
    else if(role==13){
      this.dvrData.activityModule=3
    }
    else if(role==14){
      this.dvrData.activityModule=4
    }
    else if(role==15){
      this.dvrData.activityModule=5
    }
    if(role==12)
    {
      if(this.userType==2){
        this.senddata={"role":this.dvrData.role,"salesUserId":this.userId};
        console.log(this.senddata);
        this.serve.getData(this.senddata,'mynetwork/detail').then((response)=>
        {
          console.log(response)
          if(response['data']){
          this.distributionList=response['data'];
          this.distributionList.push({"networkId":0,"establishment":"Other User"})
          console.log(this.distributionList);
        }
        else
        {
          this.distributionList.push({"networkId":0,"establishment":"Other User"})
          }
        });
      }else{
        this.senddata={"role":this.dvrData.role,};
        console.log(this.senddata);
        this.serve.getData(this.senddata,'network/list').then((response)=>
        {
          if(response['data']){
          console.log(response)
          this.distributionList=response['data'];
          this.distributionList.push({"networkId":0,"establishment":"Other User"})
          console.log(this.distributionList);
        }
        else
        {
          this.distributionList.push({"networkId":0,"establishment":"Other User"})
          }
        });
      }
    }
    else{
      if(this.userType==2)
      {
        this.serve.getData({'createdBy':this.userId,'filterOnAssignTo': false,"currentPage": 1,"pageSize": 500,'leadType':role,'isActive':1},"lead/list").then((result)=>{
          console.log(result);
          if(result['status']=='Success')
          {
            this.distributionList=result['data'];
            console.log("this data have been executed")
            this.distributionList.push({"networkId":0,"establishment":"Other User"})
          } 
          else
          {
            this.distributionList.push({"networkId":0,"establishment":"Other User"})
            }
        })
      }
      else{
        this.serve.getData({"currentPage": 1,"pageSize": 500,'leadType':role,'isActive':1},"lead/list").then((result)=>{
          console.log(result);
          if(result['status']=='Success')
          {
            this.distributionList=result['data'];
            this.distributionList.push({"networkId":0,"establishment":"Other User"})
          }
           else
          {
            this.distributionList.push({"networkId":0,"establishment":"Other User"})
            }
        })
      }
    }
    
  }
  MobileNumber(event: any) 
  {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) 
      {event.preventDefault(); }
      
  }
  back2(){
    console.log("hello");
    this.isCheckDate=true;
    this.isCheckDateProcess=true;
    this.isCheckInfo=false;
    this.isCheckInfoProcess=false;
    this.isDealerInfo=false;
    this.isDealerInfoProcess=false;
  }
  back3(){
    this.isCheckInfo=false;
    this.isCheckInfoProcess=false;
    this.isCheckDate=false;
    this.isCheckDateProcess=true;
    this.isDealerInfo=true;
    this.isDealerInfoProcess=true;
  }
 
  Next2(){
    console.log("hello");
    
    this.isCheckInfo=true;
    this.isCheckInfoProcess=true;
    this.isDealerInfo=false;
    console.log(this.dvrData);
  }

  Next3(){
    console.log("hello");
    this.isCheckInfo=true;
    this.isDealerInfo=false;
    console.log(this.dvrData);
  }


  segmentlist:any=[];
  getAllSegment(){
    console.log(this.dvrData.network.networkId);
    this.serve.getValue('','segment/list/').then((response)=>{
        console.log(response);
        this.segmentlist=response['data'];
    });
}




type:any;
othercustomer:any;
message:any;
onSubmit(){
  this.dvrData.OtherObjective=this.dvrData.otherremark;
  this.dvrData.remarks=this.dvrData.remark;
    this.dvrData.userId=this.userId;
  console.log(this.dvrData);
  let inTime=moment(this.dvrData.activitydate).format('YYYY-MM-DD')+' '+this.dvrData.activityInTime;
  console.log(inTime);
  let outTime=moment(this.dvrData.activitydate).format('YYYY-MM-DD')+' '+this.dvrData.activityOutTime;
  console.log(outTime);
  console.log(this.dvrData.network.networkId)
  console.log(this.dvrData.network);
  
  this.dvrData.networkId=this.dvrData.network.networkId;
  this.dvrData.referenceId=this.dvrData.network.networkId;

  
  if(this.dvrData.nextFollowUpType==4){
    this.type=this.dvrData.nextFollowUpType;
    this.dvrData.nextFollowUpType='';
  } 
  if(this.dvrData.network.networkId==0){
    this.dvrData.otherCustomer=this.dvrData.otherCustomer;
    this.othercustomer=this.dvrData.network;
    this.dvrData.network='';
  }

  if(this.dvrData.activityInTime<this.dvrData.activityOutTime){
    this.dvrData.status=1;
    this.dvrData.activityDate=moment(this.dvrData.activityDate).format('YYYY-MM-DD');
  }
  console.log(this.dvrData.activityInTime);
  this.dvrData.checkInTime=inTime;
  this.dvrData.checkOutTime=outTime;
  if(this.dvrData.nextFollowUpDate){
    this.dvrData.isFollowUp=true;
    this.dvrData.nextFollowUpDate=moment(this.dvrData.nextFollowUpDate).format('YYYY-MM-DD');
  }
  else{
    this.dvrData.isFollowUp=false;
  }
  console.log(this.dvrData);
  const activityTempArr = JSON.parse(JSON.stringify(this.dvrData));
  if(this.type==4){
    delete activityTempArr['nextFollowUpType'];
  }
  console.log(this.othercustomer);

  if(this.othercustomer){
    delete activityTempArr['networkId'];
    delete activityTempArr['referenceId'];
  }
  

  if(this.dvrData.network){
    delete activityTempArr['network'];
  }

  console.log(activityTempArr);
  this.serve.getData(activityTempArr,'activity/add').then((response)=>
  {
    console.log(response)
    this.message=response['message'];
    if(response['status']=='Success')
    {
      if(this.type!=4){
        this.presentToast();
        
        this.navCtrl.push(DvrListPage);
        // this.navCtrl.push(DvrListPage).then(() => {
        //   const index = this.navCtrl.getActive().index;
        //   this.navCtrl.remove(0, index);
        // });
      }else{
        this.presentToast();
        // this.navCtrl.pop();
        this.navCtrl.push(AddTaskPage);
      }
    }
    else
    {
      this.showSuccess("DVR Not added ");
    };
  });
}


presentToast() {
  let toast = this.toastCtrl.create({
    message: 'DVR Added Successfully',
    duration: 3000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  toast.present();
}

}
