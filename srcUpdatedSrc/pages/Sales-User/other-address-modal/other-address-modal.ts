import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';

/**
 * Generated class for the OtherAddressModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-address-modal',
  templateUrl: 'other-address-modal.html',
})
export class OtherAddressModalPage {

  ports = [];
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
  }

  cs_name_data: any = ['one','two','three'];

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherAddressModalPage');
  }

  CloseAddressModal() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
  }
 

}
