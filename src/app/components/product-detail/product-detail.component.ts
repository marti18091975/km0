import { Component,Output, EventEmitter, OnInit,Input,OnDestroy } from '@angular/core';
import {Product} from '../../models/product.model';
import { Store } from '@ngrx/store';
import * as actions from './../../actions';
import { AppState } from './../../app.reducers';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit,OnDestroy {
@Input()
public id: string;
@Output() newItemEvent = new EventEmitter<string>();
public productSubscription:Subscription;
public product:Product={
  _id:null,
  name:null,
  subName:null,
  type:null,
  description:null,
  producerEmail:null,
  producerName:null,
  producerLatitude:null,
  producerLongitude:null,
  producerCity:null,
  urlImage:null,
  price:null,
  active:null

 }
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(actions.getProduct({id:this.id}));
    this.productSubscription=this.store.select('product').subscribe(({product})=>{this.product=product})
  }
  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
  comeback(){
    this.addNewItem(this.product.producerEmail);
    //this.router.navigate(['/redirect']);
  }
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

}
