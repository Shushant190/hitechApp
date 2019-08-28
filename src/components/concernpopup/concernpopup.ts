import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ConcernpopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-concernpopup',
  templateUrl: 'concernpopup.html',
})
export class ConcernpopupPage {

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcernpopupPage');
  }

  gotolistPage(data)
  {
    console.log(data);
    this.viewCtrl.dismiss(data);
  }


}
