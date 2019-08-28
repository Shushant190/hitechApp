import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { SalesTabsPage } from '../Sales-User/sales-tabs/sales-tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesTabsPage } from '../sales-tabs/sales-tabs';

/**
 * Generated class for the SalesOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-otp',
  templateUrl: 'sales-otp.html',
})
export class SalesOtpPage {

  rootPage:any = SalesTabsPage;
  otpData:any;
  otp_values = {one: '', two: '', three: '', four: '', five: '', six: ''};
  otp_value:any=[];

  otpForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.otp_value.push(navParams.get('otp'));
    this.otpForm = formBuilder.group({
      one: ['', Validators.compose([Validators.required])],
      two: ['', Validators.compose([Validators.required])],
      three: ['', Validators.compose([Validators.required])],
      four: ['', Validators.compose([Validators.required])],
      five: ['', Validators.compose([Validators.required])],
      six: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesOtpPage');
  }

  goToHomePage(){
    this.navCtrl.push(SalesTabsPage);
  }
  

}
