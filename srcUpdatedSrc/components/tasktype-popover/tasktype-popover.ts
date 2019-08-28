import { Component } from '@angular/core';
import { Storage } from  '@ionic/storage';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';
// import { TasklistPage } from '../../pages/Sales-User/task/tasklist/tasklist';

@Component({
  selector: 'tasktype-popover',
  templateUrl: 'tasktype-popover.html'
})
export class TasktypePopoverComponent {
  text: string;
  filter:any={};
  userId:any;
  userRole:any;

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
  
  taskList123(check)
  {
    console.log(check);
    // this.navctrl.push(TasklistPage,{data:check});
    this.viewCtrl.dismiss({data:check});
  }

}
