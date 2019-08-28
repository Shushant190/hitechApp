import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

/**
 * Generated class for the LeavePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'leave-popover',
  templateUrl: 'leave-popover.html'
})
export class LeavePopoverComponent {

  text: string;

  constructor(public viewCtrl:ViewController) {
    console.log('Hello LeavePopoverComponent Component');
    this.text = 'Hello World';
  }


  LeaveListPage(status)
  {
    console.log(status);
    this.viewCtrl.dismiss({status: status})
}
}
