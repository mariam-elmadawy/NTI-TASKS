import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts = [
    {
      title: 'title one',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
    {
      title: 'title two',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
    {
      title: 'title three',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
    {
      title: 'title four',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
  ];
}
