import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define una interfaz para el tipo de dato Producto
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

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea un singleton a nivel de la aplicación
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; // La URL de tu API backend

  constructor(private http: HttpClient) { }

  // Función para obtener todos los productos desde la API
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}