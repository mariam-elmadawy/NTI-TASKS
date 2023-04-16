import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Output() sendingUserData = new EventEmitter<any>();
  userData = {
    username: '',
    email: '',
  };
  handlerClick() {
    console.log(this.userData);
    const userObj = {
      username: this.userData.username,
      email: this.userData.email,
    };
    this.sendingUserData.emit(userObj);
  }
}
