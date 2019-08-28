import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams, LoadingController, Loading, ToastController, App } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { TasklistPage } from '../tasklist/tasklist';
import { RemarkUpdatePage } from '../remark-update/remark-update';



@IonicPage()
@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html',
})
export class TaskdetailPage {

  taskId:any;
  task_detail:any=[];
  data:any={};
  userId:any;
  userRole:any;
  filter:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:CatelougeProvider,public storage:Storage,public alertCtrl: AlertController,public loadingCtrl:LoadingController, public toastCtrl: ToastController, public app:App) {
    this.taskId=this.navParams.get("taskId");
    console.log(this.taskId);
    if(this.taskId)
    {
      this.getTaskDetail();
    }

    this.storage.get('userId').then((userId) => 
    {
      this.storage.get('role').then((role) => {
        console.log(role);
        this.userRole=role;
     })
      console.log(userId);
      this.userId=userId;
     });
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailPage');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 3000);
    setTimeout(() => {
      this.presentToast('Refreshed Successfully');
    }, 3500);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


tag:any;
form:any={};
  getTaskDetail()
  {
    this.lodingPersent();
    this.service.getValue('',"/task/detail/"+this.taskId).then((result)=>{
      console.log(result);
      if(result['status']=="Success")
      {
        this.task_detail=result['data'];
        console.log(this.task_detail);
        this.tag=this.task_detail['userName'][0];
        console.log(this.tag);
      }
    })
  }


sand_data:any=[];
UpdateRemarksDiv(indes){
  console.log(this.task_detail.taskDetails[indes]);
  this.navCtrl.push(RemarkUpdatePage,{'data':this.task_detail.taskDetails[indes]});
}




  delete_remarks(taskDetailId){
    console.log(taskDetailId);
        var retVal = confirm("Do You Want Delete Remark ?");
        if( retVal == true){
                  this.service.getValue(taskDetailId,'taskdetail/delete/').then((response)=>{
                    console.log(response);
                    if(response['status']=='Success')
                    {
                      this.presentToast("Remarks Deleted Successfully ")
                      this.getTaskDetail();
                    }else{
                      this.presentToast("Remarks Not Deleted !!! ")
                    }
                    })
              }else{
                this.presentToast("Remarks Not Deleted !!! ")
                this.getTaskDetail();
              }
        }

  reOpenTask(taskId)
  {
    console.log("reopen Function call");
    let value={"taskId":taskId,"userId":this.userId,"remarks":this.data.remarks,"taskStatus":3};
    console.log(value);
    this.service.getData(value,"taskdetail/add").then((result)=>{
      console.log(result);
      if(result['status']='Success')
      {
        this.presentToast("Task Re-Opened Successfully !!! ")
        this.getTaskDetail();
      }else{
        this.presentToast("Task Not Re-Opened Successfully !!! ")
        this.getTaskDetail();
      }
    })
  }



  actionOnTask(value)
  {
    console.log(value);
  }

  reopenDiv2:any=false
  reOpenDiv2()
  {
    this.reopenDiv2=true;
  }
  

closeTask(taskId){
  console.log(taskId);
  let value={"taskId":this.task_detail.taskId,"userId":this.userId,"taskStatus":2,'taskType':this.task_detail.taskType,"remarks": this.data.remarks};
    console.log(value);
    this.service.getData(value,"task/update").then((result)=>{
      console.log(result);
      if(result['status']=='Success')
      {
        this.presentToast('Task Closed Successfully');
        this.task_detail.action=null;
        this.navCtrl.push(TasklistPage);
      }else{
        this.presentToast('Task Not Closed ...');
      }
    })
}




closeLead(taskId){
  console.log("this is lead");
  this.task_detail.task_id=this.taskId;
  let value={"taskId":taskId,"userId":this.userId,"taskStatus":2,"leadConverted":this.data.leadConverted,"referenceId":this.task_detail.referenceId,'taskType':this.task_detail.taskType,'remarks':this.data.remarks};
  console.log(value);
  this.service.getData(value,"task/update").then((result)=>{
    console.log(result);
    if(result['status']=='Success')
    {
    this.presentToast('Lead Closed Successfully');
    this.task_detail.action=null;
    this.navCtrl.push(TasklistPage);
    }else{
      this.presentToast('Lead Not Closed ...');
    }
  })
}

UpdateRemark(taskId){
  console.log(taskId);
  let value={"taskId":taskId,"remarks": this.data.remarks,"taskStatus":1,"userId":this.userId}
  console.log(value);
    this.service.getData(value,"taskdetail/add").then((result)=>{
      console.log(result);
      if(result['status']=='Success')
      {
        this.presentToast('Remark Updated Successfully');
        this.task_detail.action=null;
        this.navCtrl.push(TasklistPage);
      }else{
        this.presentToast('Remark Not Updated ...');
      }
    })
}


  
  lodingPersent()
  {
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
     }, 1500);
  }

  hello()
  {
    console.log("hello");
    
  }

  ionViewDidLeave() {

    let nav = this.app.getActiveNav();
    let activeView = nav.getActive().name;

    let previuosView = '';
    if(nav.getPrevious() && nav.getPrevious().name) {
       previuosView = nav.getPrevious().name;
    }
   
    console.log(previuosView);


    console.log(activeView);
    console.log('its leaving');

    if((activeView == 'SalesHomePage' || activeView == 'DistributionNetworkListPage' || activeView == 'OrderListPage' || activeView == 'SalesMenuPage') && (previuosView != 'SalesHomePage' && previuosView != 'DistributionNetworkListPage'  && previuosView != 'OrderListPage' && previuosView != 'SalesMenuPage')) {

        console.log(previuosView);
        this.navCtrl.popToRoot();
    }
  }

}
