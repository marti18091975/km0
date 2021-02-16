import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Coordinates} from '../models/coordinates.model'
@Injectable({
    providedIn: 'root',
  })
  export class CoordinateService{
      http: HttpClient;
      private url="https://nominatim.openstreetmap.org/search?";
      constructor(http:HttpClient){
          this.http=http;
      }
      getCoordinates(city:String,street:String,number:Number):Observable<any>{
          return this.http.get(`${this.url}q=${number}+${street},+${city}&format=json`)
      }
  }