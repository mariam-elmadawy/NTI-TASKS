import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products = [
    {
      title: ' product title one',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
    {
      title: 'product title two',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
    {
      title: 'product title three',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
    {
      title: 'product title four',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, omnis!',
    },
  ];
}
