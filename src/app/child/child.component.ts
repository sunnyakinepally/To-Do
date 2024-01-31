import { Component, Input } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-child',
  template: `
    <div>{{ item }}</div>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
 

  @Input() item = '';
  ngOnInit() {
   console.log(this.item)
  }
}
