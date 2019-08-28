import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController, LoadingController, App } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {HomePage} from '../home/home'

/**
 * Generated class for the EnquiryFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enquiry-form',
  templateUrl: 'enquiry-form.html',
})
export class EnquiryFormPage {

  formDetails:any={};
  productId:any;
  constructor( public toastCtrl: ToastController,
               public alertCtrl: AlertController,
               public navCtrl: NavController, 
               public navParams: NavParams, 
               public serv:CatelougeProvider,
               public formBuilder:FormBuilder,
               public loadingCtrl : LoadingController,
               public app:App) {

    this.productId = navParams.get('prodId');
    console.log(this.productId);
  }
  MobileNumber(event: any) 
  {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) 
      {event.preventDefault(); }
      
  }
  putEnquiry()
  {
        console.log(this.formDetails);
        this.formDetails.productId=this.productId;


        let loading = this.loadingCtrl.create({
            spinner:'hide',
            content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });

        loading.present();

        this.serv.getData(this.formDetails,'enquiry/add').then(resp=>{

              console.log(resp);

              loading.dismiss();

              if(resp['status']=='Success')
              {
                  this.presentToast();
                  this.navCtrl.push(HomePage);

              } else {
                this.showSuccess("Enquiry Not added ");
              };
        });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
        message: 'Enquiry Generated Successfully!',
        duration: 3000,
        position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  showSuccess(text) {    
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryFormPage');
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

    if((activeView == 'HomePage' || activeView == 'CatelougeListPage' || activeView == 'ContactPage' || activeView == 'EnquiryFormPage') && (previuosView != 'HomePage' && previuosView != 'CatelougeListPage'  && previuosView != 'ContactPage' && previuosView != 'EnquiryFormPage')) {

        console.log(previuosView);
        this.navCtrl.popToRoot();
    }
  }

}
