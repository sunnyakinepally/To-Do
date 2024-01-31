import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  constructor(private route:Router){}
  inputData:string='hey child'
  submitData() {
  this.route.navigate(['/child'])
  }

}
