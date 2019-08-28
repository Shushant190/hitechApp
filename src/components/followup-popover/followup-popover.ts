import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from  '@ionic/storage';
import { TodayFolowupPage } from '../../pages/Sales-User/today-folowup/today-folowup';

@IonicPage()
@Component({
  selector: 'page-followup-popover',
  templateUrl: 'followup-popover.html',
})
export class FollowupPopoverPage {
  senddata:any=[];
  userId:any;
  userRole:any;

  constructor(public navctrl:NavController,public storage:Storage) {
    console.log('Hello TasktypePopoverComponent Component');
    this.storage.get('userId').then((r)=>{
      console.log(r);
      this.userId=r;
    })
    this.storage.get('role').then((r)=>{
      console.log(r);
      this.userRole=r;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowupPopoverPage');
  }
 
  followupList(check)
  {
      this.navctrl.push(TodayFolowupPage,{data:check});
  }
}
