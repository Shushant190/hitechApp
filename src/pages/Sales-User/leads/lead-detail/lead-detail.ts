import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, App } from 'ionic-angular';
import { LeaddetailpopoverComponent } from '../../../../components/leaddetailpopover/leaddetailpopover';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
// import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the LeadDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-lead-detail',
  templateUrl: 'lead-detail.html',
})
export class LeadDetailPage {

  leadId:any;
  leadDetail:any=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public popoverCtrl: PopoverController,
              public service:CatelougeProvider,
              public loadingCtrl:LoadingController,
              public store:Storage,
              public app: App) {

    this.leadId=this.navParams.get('leadId');
    console.log(this.leadId);
    if(this.leadId)
    {
      this.getLeadDetail();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadDetailPage');
  }

  leadOptionPopover(myEvent,id) {
    console.log(id);
    
    let popover = this.popoverCtrl.create(LeaddetailpopoverComponent,{activityModule:1,leadId:this.leadId});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(popoverData => {
      console.log(popoverData);
    })
  }
  tag:any;
  leadContact:any=[];
  segmentName:any=[];
  getLeadDetail()
  {
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    loading.present();
    
    this.service.getData({"leadId":this.leadId,'filterOnAssignTo':false},"lead/list").then((result)=>{
      console.log(result);

      setTimeout(() => {

         loading.dismiss();
          
        
      }, 1000);

      this.leadDetail=result['data'][0];


      let addressStr = '';

      const addressArr = ['street', 'state', 'district', 'city', 'pin'];

      for (let index = 0; index < addressArr.length; index++) {

             console.log(addressArr[index]);
            
            if(this.leadDetail[addressArr[index]] && this.leadDetail[addressArr[index]] != null) {

                console.log(this.leadDetail[addressArr[index]]);

                console.log(addressStr);

                if(addressStr) {

                    addressStr += ', ' + this.leadDetail[addressArr[index]];
                    
                } else {

                    addressStr = this.leadDetail[addressArr[index]];
                }
            }
      }

      console.log(addressStr);

      this.leadDetail['address'] = addressStr;

      this.leadContact= result['data'][0]['leadContacts'][0];
      console.log(this.leadContact);

      this.segmentName= result['data'][0]['leadSegments'];
      console.log(this.segmentName);

    })
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
