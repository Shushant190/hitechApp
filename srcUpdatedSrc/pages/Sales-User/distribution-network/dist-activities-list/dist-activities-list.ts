import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../../../components/popover/popover';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-dist-activities-list',
  templateUrl: 'dist-activities-list.html',
})
export class DistActivitiesListPage {
  distId:any;
  dvrList:any=[];
  constructor(public serve:CatelougeProvider,public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.distId=this.navParams.get('distId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistActivitiesListPage');
    console.log(this.distId);
    this.distDvrList();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(popoverData => {
      console.log(popoverData);
    })
  }
 distDvrList(){
  this.serve.getData({"currentPage": 1,"pageSize": 500,"userId":this.distId},"activity/list").then((r:any)=>{
    console.log(r);
    this.dvrList=r['data'];
    for(let i=0;i<this.dvrList.length;i++)
    {
      this.dvrList[i].checkinDuration=moment.utc(moment.duration(moment(this.dvrList[i].checkOutTime).diff(moment(this.dvrList[i].checkInTime))).asMilliseconds()).format('HH:mm')
    }
    });
 }
}
