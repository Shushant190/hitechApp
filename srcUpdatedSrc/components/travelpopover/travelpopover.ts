import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Storage } from  '@ionic/storage';
/**
 * Generated class for the TravelpopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'travelpopover',
  templateUrl: 'travelpopover.html'
})
export class TravelpopoverComponent {

  text: string;
  userId:any;
  userRole:any;
  data:any={}
  constructor(public navctrl:NavController,  public viewCtrl: ViewController, public storage:Storage) {
    this.storage.get('userId').then((r)=>{
      console.log(r);
      this.userId=r;
    })
    this.storage.get('role').then((r)=>{
      console.log(r);
      this.userRole=r;
    })
  }

  taskList123(status,check)
  {
    console.log(status,check);
    this.data.status=status;
    this.data.MTP=check;
    this.viewCtrl.dismiss({data:this.data});
  }

}
