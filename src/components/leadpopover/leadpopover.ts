import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  selector: 'leadpopover',
  templateUrl: 'leadpopover.html'
})
export class LeadpopoverComponent {
  
  items:any;
  text: string;
  
  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {
    this.items = [
      
    ]
  }

  itemclick(item){
    console.log(item)
    this.viewCtrl.dismiss({data:item});
  }
  
}
