import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public app: App) {

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
