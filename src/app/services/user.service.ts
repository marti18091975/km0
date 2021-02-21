import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient;
  private url = 'https://km-0.herokuapp.com/api';
  constructor(http: HttpClient) {
    this.http = http;
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/detailUser`, {
      email: user.email,name: user.name,city: user.city,street:'',number:0    });
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/detailUser`);
  }
  updateUser(userId: string | number, changes: Partial<User>): Observable<any> {
    return this.http.put(`${this.url}/detailUser/byId/${userId}`, changes);
  }
  getCurrentUser(email) {
    return this.http.get(`${this.url}/detailUser/current/${email}`);
  }
  getUser(userKey) {
    return this.http.get(`${this.url}/detailUser/byId/${userKey}`);
  }
}
