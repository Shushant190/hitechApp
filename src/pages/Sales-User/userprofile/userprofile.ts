import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
user:any={};
salesUser:any={};
seniorDetail:any=[];
  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.storage.get('user').then((r)=>{
      console.log(r)
      this.user=r;
      this.salesUser=this.user['salesUser']
      console.log(this.salesUser);
      this.seniorDetail=this.user.user.salesUser.seniors
      console.log(this.seniorDetail);


      
    });
    


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
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
