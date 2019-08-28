import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello LeavePopoverComponent Component');
    this.text = 'Hello World';
  }

}
