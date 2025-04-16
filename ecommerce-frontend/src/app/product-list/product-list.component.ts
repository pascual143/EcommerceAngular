import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common'; // Importa NgFor

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, NgFor], // Añade NgFor a los imports
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}