import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, ToastController } from 'ionic-angular';
import { TaskdetailPage } from '../taskdetail/taskdetail';
import {Storage} from '@ionic/storage';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';

@IonicPage()
@Component({
  selector: 'page-remark-update',
  templateUrl: 'remark-update.html',
})
export class RemarkUpdatePage {
task:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:CatelougeProvider,public storage:Storage,public toastCtrl: ToastController) {
    this.task=this.navParams.get("data");
    console.log(this.task);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemarkUpdatePage');
  }




  edit_remarks(){
    console.log(this.task.remarks);
    let sand_data={"taskId":this.task.taskId,"taskDetailId":this.task.taskDetailId,"remarks":this.task.remarks,"taskStatus":3};
    console.log(sand_data);
    this.service.getData(sand_data,'taskdetail/update').then((response)=>{
      console.log(response);
      if(response['status']=="Success")
      {
        this.presentToast("Remarks Updated !!! ")
        this.navCtrl.push(TaskdetailPage,{taskId:this.task.taskId});
      }
      else
      {
        this.presentToast("Remarks Not Updated !!! ")
      }
    });
    }


    Cancelupdate(){
      this.presentToast("Remark Not Updated !!")
      this.navCtrl.push(TaskdetailPage,{taskId:this.task.taskId});
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

}
