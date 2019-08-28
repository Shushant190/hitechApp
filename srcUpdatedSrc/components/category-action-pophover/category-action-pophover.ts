import { Component } from '@angular/core';

/**
 * Generated class for the CategoryActionPophoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'category-action-pophover',
  templateUrl: 'category-action-pophover.html'
})
export class CategoryActionPophoverComponent {

  text: string;

  constructor() {
    console.log('Hello CategoryActionPophoverComponent Component');
    this.text = 'Hello World';
  }

}
