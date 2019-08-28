import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, LoadingController } from 'ionic-angular';
// import { SalesOtpPage } from '../sales-otp/sales-otp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { SalesTabsPage } from '../sales-tabs/sales-tabs';
// import { SessionProvider } from '../../../providers/session/session';
import {Storage} from '@ionic/storage';
import { TabsPage } from '../../Product-catelouge/tabs/tabs';
// import { HomePage } from '.../Product-catelouge/home/home';
// import { CatelougeProvider } from '../../providers/catelouge/catelouge';

@IonicPage()
@Component({
  selector: 'page-sales-login',
  templateUrl: 'sales-login.html',
})
export class SalesLoginPage {
  
  data:any={};
  
  loginForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App,public formBuilder:FormBuilder,public alertCtrl: AlertController,public serve:CatelougeProvider,private storage:Storage,public loadingCtrl:LoadingController) {

      this.loginForm =this.formBuilder.group({
          mobileNo: ['', Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])]
      })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesLoginPage');
  }
  
  otpverification() : void 
  {
      let loading = this.loadingCtrl.create({
        spinner:'hide',
        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });

      loading.present();

      this.serve.Login(this.data,'login').then((result:any)=>{

           loading.dismiss();

          if(result['message']=="Success")
          {
                this.showSuccess("login");
                console.log(result);
                const userData = {};
                userData['userName'] = result.data['userName'];
                userData['user'] = result.data;
                console.log(userData)
                userData['expirationTime'] = (new Date().getTime()) + 60000 * 720;
                userData['salesUser'] = {};
                userData['salesUser']['designationName'] = result.data['salesUser']['designationName'];
                userData['salesUser']['mobile'] = result.data['salesUser']['mobile'];
                userData['salesUser']['email'] = result.data['salesUser']['email'];
                userData['salesUser']['password'] = result.data['salesUser']['password'];
                userData['salesUser']['street'] = result.data['salesUser']['street'];
                userData['salesUser']['city'] = result.data['salesUser']['city'];
                userData['salesUser']['district'] = result.data['salesUser']['district'];
                userData['salesUser']['state'] = result.data['salesUser']['state'];
                userData['salesUser']['pin'] = result.data['salesUser']['pin'];
                this.storage.set('token',result.data.token);
                this.storage.set('user', userData);
                this.storage.set('userId',result.data.userId);

console.log("+===========================")
                console.log(result.data.userId);
                console.log("+===========================")
                this.storage.set('userType',result.data.userType);
                this.storage.set('role',result.data.role);
                this.storage.set('userType',result.data.userType);
                this.storage.set('segments',result.data.salesUser.staffSegments);
                if(result.data.userType==3)
                {
                    this.storage.set('networkId',result.data.distributerNetwork.networkId);
                    this.storage.set('networkSegments',result.data.distributerNetwork.networkSegments);
                }
                
                console.log(result.data.token);
                this.serve.setSession(result.data.token);

                this.app.getRootNav().setRoot(SalesTabsPage);

          } else {
            this.showError();
          }
      })
  }


  showError() {
    
      let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Please enter correct User Name !',
          buttons: ['OK']
      });

      alert.present();
  }


  backToPrevious()
  {
    this.navCtrl.push(TabsPage);
  }

  MobileNumber(event: any) 
  {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) 
      {event.preventDefault(); }
  }

  showSuccess(text) {
      
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: text,
        buttons: ['OK']
      });
      alert.present();
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

}
