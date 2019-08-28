import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { TravelPlanDetailPage } from '../travel-plan-detail/travel-plan-detail';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-edit-model',
  templateUrl: 'edit-model.html',
})
export class EditModelPage {

  data:any={}
  mode:any;
  networkSegments:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public service:CatelougeProvider,public storage:Storage) {

  this.data=this.navParams.get("data");
  console.log(this.data);
  this.mode="readonly";
  // networkSegments
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditModelPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onClick()
  {
      this.service.getData(this.data,"traveldetail/update").then((result)=>{
        console.log(result);
        if(result['status']=='Success')
        {
         this.navCtrl.push(TravelPlanDetailPage,{travelPlanID:this.data.travelPlanID})
        }
        
      })

  }

}
