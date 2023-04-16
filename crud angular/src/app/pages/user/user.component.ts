import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  users: any = [];
  handlerUser(event: any) {
    this.users.push(event);
  }
  deleteUser(eve: any) {
    this.users.splice(eve, 1);
  }

  editUser(eve: any) {
    this.users[eve].username = prompt('enter your name');
    this.users[eve].email = prompt('enter your email');
  }
  
}
