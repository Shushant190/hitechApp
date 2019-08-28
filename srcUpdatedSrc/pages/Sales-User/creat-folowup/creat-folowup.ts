import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
// import { ActivityListPage } from '../activity-list/activity-list';
import { TodayFolowupPage } from '../today-folowup/today-folowup';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
/**
 * Generated class for the CreatFolowupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creat-folowup',
  templateUrl: 'creat-folowup.html',
})
export class CreatFolowupPage {

  userId:any;
  data:any={};
  lead:any={};
  userTypelist:any=[];
  u_type:boolean=false;
  leadListActive:boolean=false;
  salesListActive:boolean=false;
  lead_user_List:any=[];
  sales_user_List:any=[];

  // followup/add
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:CatelougeProvider,public storage:Storage,public alertCtrl: AlertController) {

    // this.leadId=this.navParams.get('leadId');
    // console.log(this.leadId);
    this.storage.get('userId').then((userId) => 
    { 
      console.log(userId);
      this.userId=userId;
     })
     this.getuserTypeList();
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatFolowupPage');
    this.getAllSegment();
  }

  submit()
  {
      console.log("test validation")
      this.data.userId=this.userId;
      if(this.data.referenceId.leadId){
        this.data.referenceId=this.data.referenceId.leadId;
      }
      
      if(this.data.referenceId.networkId){
        this.data.referenceId=this.data.referenceId.networkId;
      }
      if(this.data.OtherCustomer){
        this.data.referenceId=0;
      }
      console.log(this.data);
      this.service.getData(this.data,"followup/add").then((response)=>{
        console.log(response);
        if(response['status']=="Success")
        {
          console.log("Success");
          this.showSuccess("Follow -Up Added");
          // this.navCtrl.pop();
          // this.navCtrl.push(TodayFolowupPage);




          // bunny


          this.navCtrl.push(TodayFolowupPage).then(() => {
            const index = this.navCtrl.getActive().index;
            this.navCtrl.remove(0, index);
          });

        

          // bunny
        }
      })
  }



  showSuccess(text) {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }



  // divActive(value)
  // {  
  //   console.log(this.u_type);
  //   if(value)
  //   {
  //     this.u_type=true;
  //   }
  // }




  userList(role)
  {
    console.log(role);
    if(role==11){
      this.data.activityModule=2
      this.leadUserList(role);
    }
    else if(role==12){
      this.data.activityModule=1
      this.distributorUser(role);
    }
    else if(role==13){
      this.data.activityModule=3
      this.leadUserList(role);
    }
    else if(role==14){
      this.data.activityModule=4
      this.leadUserList(role);
    }
    else if(role==15){
      this.data.activityModule=5
      this.leadUserList(role);
    }
    
  }
  check(){
    console.log(this.data);
  }

  leadUserList(roleId)
  {
    console.log(roleId);
    this.service.getData({"leadType": roleId,"createdBy":this.userId,"filterOnAssignTo":false,"currentPage": 1,"pageSize": 50},"lead/list").then((response)=>{
      console.log(response);
      if(response['status']=='Success')
      {
        this.lead_user_List=response['data'];
        this.lead_user_List.push({"leadId":0,"establishment":"Other User"})
        this.leadListActive=true;
        this.salesListActive=false;
      }
      else
      {
      this.lead_user_List.push({"leadId":0,"establishment":"Other User"})
      }
      
    })
  }


  MobileNumber(event: any) 
  {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) 
      {event.preventDefault(); }
      
  }

  segmentlist:any=[];
  getAllSegment(){
    this.service.getValue('','segment/list/').then((response)=>{
        console.log(response);
        this.segmentlist=response['data'];
    });
  }


  distributorUser(roleId)
  {
    console.log(roleId);
    this.service.getData({"role": roleId,"salesUserId":this.userId,'isActive': true,"currentPage": 1,"pageSize": 50},"network/list").then((response)=>{
      console.log(response);
      if(response['status']=='Success')
      {
        this.sales_user_List=response['data'];
        this.sales_user_List.push({"networkId":0,"establishment":"Other User"})
        this.salesListActive=true;
        this.leadListActive=false;
        }
        else
        {
        this.sales_user_List.push({"networkId":0,"establishment":"Other User"})
        }
    })
  }





  getuserTypeList()
  {
    this.service.getValue('',"usertype/list").then((result)=>{
      console.log(result['data'][2]['roles']);
      this.userTypelist=result['data'][2]['roles'];
      console.log(this.userTypelist);
      
    })
  }




}
