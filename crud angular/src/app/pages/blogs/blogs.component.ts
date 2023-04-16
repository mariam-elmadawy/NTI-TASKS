import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent {
  arr = [1, 2];
  change = false;
  num = 5;
  numArr = [1, 2, 3, 4, 5];
  monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // month = this.monthArr[new Date().getMonth()];
  month = new Date().getMonth();
}
