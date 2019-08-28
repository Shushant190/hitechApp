import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CatelougeListPage } from '../catelouge-list/catelouge-list';
import { ContactPage } from '../contact/contact';
import { EnquiryFormPage } from '../enquiry-form/enquiry-form';
import { NavController } from 'ionic-angular';

// import { ContactPage } from '../Product-catelouge/contact/contact';
// import { HomePage } from '../Product-catelouge/home/home';
// import { CatelougeListPage } from '../Product-catelouge/catelouge-list/catelouge-list';
// import { EnquiryFormPage } from '../Product-catelouge/enquiry-form/enquiry-form';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootPage:any = TabsPage;
  tab1Root = HomePage;
  tab2Root = CatelougeListPage;
  tab3Root = ContactPage;
  tab4Root = EnquiryFormPage;

  constructor(public navCtrl:NavController) {

  }

 



}
