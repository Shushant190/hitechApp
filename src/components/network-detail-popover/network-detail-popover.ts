import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { CatelougeProvider } from '../../providers/catelouge/catelouge';
import { Storage } from  '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-network-detail-popover',
  templateUrl: 'network-detail-popover.html',
})
export class NetworkDetailPopoverPage {
  networkId:any;
  userId:any;
  pageName:any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public navParams: NavParams,public service : CatelougeProvider,  public storage:Storage) {
    this.networkId=this.navParams.get('networkId');
    this.userId=this.navParams.get('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkDetailPopoverPage');
  }

  tabcontroll(check){
    console.log(check);
      this.viewCtrl.dismiss({'networkId': this.networkId,'userId':this.userId,'data':check});
    }
    

  

}
