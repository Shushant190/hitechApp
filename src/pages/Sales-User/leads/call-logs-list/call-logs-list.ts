import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaddetailpopoverComponent } from '../../../../components/leaddetailpopover/leaddetailpopover';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

/**
 * Generated class for the CallLogsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-logs-list',
  templateUrl: 'call-logs-list.html',
})
export class CallLogsListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallLogsListPage');
  }

  leadOptionPopover(myEvent) {
    let popover = this.popoverCtrl.create(LeaddetailpopoverComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(popoverData => {
      console.log(popoverData);
    })
  }

}
