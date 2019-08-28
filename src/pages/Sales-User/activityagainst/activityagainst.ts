import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { DvrListPage } from '../dvr/dvr-list/dvr-list';

/**
 * Generated class for the ActivityagainstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activityagainst',
  templateUrl: 'activityagainst.html',
})
export class ActivityagainstPage {

  data:any={};
  referenceId:any;
  activityModule:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:CatelougeProvider,public storage:Storage,public alertCtrl: AlertController) {

    this.data['referenceId']=this.navParams.get('referenceId');
    this.data['activityModule']=this.navParams.get('activityModule');

    console.log(this.data);
    this.storage.get('userId').then((userId) => 
    { 
      console.log(userId);
      this.data['userId']=userId;
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityagainstPage');
  }

  submit()
  {
    console.log(this.data);
    this.service.getData(this.data,"activity/add").then((response)=>{
      console.log(response);
      if(response['status']=="Success")
      {
          console.log("Success");
          this.showSuccess("Add Activity");
          this.navCtrl.push(DvrListPage);
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
}
