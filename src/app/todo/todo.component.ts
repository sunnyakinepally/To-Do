import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks: any;
  taskdata: any;
  updateform: any
  constructor(private fb: FormBuilder, private userservice: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initform(),
      this.gettask()
  }
  initform() {
    this.tasks = this.fb.group({
      task: ["", [Validators.required]]
    })
    this.updateform = this.fb.group({
      id: ["", Validators.required],
      task: ["", Validators.required]
    })
  }
  updating(name: any) {
    // console.log('dtas',name.task)
    this.updateform = this.fb.group({
      id: name.id,
      task: name.task
    })
  }
  clearinput() {
    this.tasks.reset()
  }
  gettask() {
    this.userservice.gettasks().subscribe({
      next: (res: any) => {
        console.log('getting data', res.trackdetails);
        this.taskdata = res.trackdetails;
      },
      error: (error) => {
        console.error('Error getting tasks:', error);
      }
    });

  }

  insertdata() {
    let data = this.tasks.value
    // console.log('task is',data.task.length)
    if (data.task.length==0) {
      alert('Please add Task');
    } else {
      this.userservice.postdata(data).subscribe((res: any) => {
        this.gettask();
        this.tasks.reset();
      });
    }



  }

  edit(name: any) {
    console.log('edit', name)

    this.gettask()

  }
  update() {
    this.userservice.update(this.updateform.value).subscribe((res: any) => {
    });
    this.gettask()


  }

  delete(id: any) {
    this.userservice.delete(id).subscribe((res: any) => {
    });
    this.gettask()
  }


}
