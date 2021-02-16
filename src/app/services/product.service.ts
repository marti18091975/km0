import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
  })
  export class ProductService{
      http:HttpClient;
      
      constructor(http: HttpClient) {
        this.http = http;
      }
      createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>('/api/product', {
          product
        });
      }
      getProducts(): Observable<Product[]> {
        
        return this.http.get<Product[]>('/api/product');
      }
      updateProduct(productId: string | number, changes: Partial<Product>): Observable<any> {
        return this.http.put(`/api/product/byId/${productId}`, changes);
      }
      
      getProduct(productKey) {
        return this.http.get(`/api/product/byId/${productKey}`);
      }
      getProductsByCity(city:string):Observable<Product[]>{
        return this.http.get<Product[]>(`/api/product/byCity/${city}`);
      }
      getProductsByProducerEmail(email:string):Observable<Product[]>{
        return this.http.get<Product[]>(`/api/product/byProducer/${email}`);
      }
      getProductsByUserEmail(email:string):Observable<Product[]>{
        return this.http.get<Product[]>(`/api/product/byUser/${email}`);
      }
  }
