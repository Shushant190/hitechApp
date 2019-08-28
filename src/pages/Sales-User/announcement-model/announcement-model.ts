import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-announcement-model',
  templateUrl: 'announcement-model.html',
})
export class AnnouncementModelPage {

  constructor(public navCtrl: NavController,public service:CatelougeProvider, public navParams: NavParams, public viewCtrl:ViewController, public store:Storage) {
    console.log("this is newController");
  }
  announcementId:any;
  message:any;
  finalResult:any=[];
  userId:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementModelPage');

    this.announcementId= this.navParams.get('announcementId');
    this.message= this.navParams.get('message') ;

this.store.get('userId').then((userId)=>{
  this.userId = userId;
  this.AcknowlegdeWeb(this.userId,this.announcementId);
});

    this.finalResult = {'message':this.message,'announcementId':this.announcementId};
    console.log(this.finalResult);
   
  }


  AcknowlegdeWeb(u_id,a_id)
  {
       console.log(u_id, a_id);
      //  this.service.getValue({'announcementId':a_id,'userId':u_id},"announcement/markread/").then((result)=>{
      this.service.getValue("","announcement/markread/"+a_id+"/"+u_id).then((result)=>{
       console.log("this is result ")
        console.log(result);
        console.log("this is result ")
      })
  }

  CloseAnnounceMentDetail()
  {
    // array must be null 

    console.log("this is first Time  ")
    let data = {};
    this.viewCtrl.dismiss(data);
  }

  

}
