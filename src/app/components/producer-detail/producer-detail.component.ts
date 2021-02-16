import { Component, OnInit,Input,Output, EventEmitter,OnDestroy  } from '@angular/core';
import {User} from '../../models/user.model';
import {Product} from '../../models/product.model';
import { Store } from '@ngrx/store';
import * as actions from './../../actions';
import { AppState } from './../../app.reducers';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-producer-detail',
  templateUrl: './producer-detail.component.html',
  styleUrls: ['./producer-detail.component.css']
})
export class ProducerDetailComponent implements OnInit {
  @Input() 
  public email:string;
  public productId:string=null;
 
  
  public producer:User={
    _id:null,
    name:null,
    email:null,
    city:null,
    street:null,
    number:null,
    phone:null,
    urlImage:null,
    presentation:null,
    lat:null,
    lon:null
  }
  public products:Product[]=[];
  public productsFirstGroup:Product[]=[];
  public productsSecondGroup:Product[]=[];
  public productsThirdGroup:Product[]=[];
  public productsFourthGroup:Product[]=[];
  public producerSubscription:Subscription;
  public producerProductsSubscription:Subscription;
  
   

  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit(): void {
    
    this.store.dispatch(actions.getProducer_by_email({ email: this.email }));
    this.producerSubscription=this.store.select('producer').subscribe(({producer})=>{this.producer=producer;});
    this.store.dispatch(actions.getProductsByProducer({email:this.email}));
    this.producerProductsSubscription=this.store.select('producerProducts').subscribe(({producerProducts})=>{
      
      this.products=producerProducts
      console.log('producerProducts',this.products);
      
   
    if(this.products){
      this.productsFirstGroup[0]=this.products[0];
      if(this.products[1])this.productsFirstGroup[1]=this.products[1];
      if(this.products[2])this.productsFirstGroup[2]=this.products[2];
      if(this.products[3])this.productsSecondGroup[0]=this.products[3];
      if(this.products[4])this.productsSecondGroup[1]=this.products[4];
      if(this.products[5])this.productsSecondGroup[2]=this.products[5];
      if(this.products[6])this.productsThirdGroup[0]=this.products[6];
      if(this.products[7])this.productsThirdGroup[1]=this.products[7];
      if(this.products[8])this.productsThirdGroup[2]=this.products[8];
      if(this.products[9])this.productsFourthGroup[0]=this.products[9];
      if(this.products[10])this.productsFourthGroup[1]=this.products[10];
      if(this.products[11])this.productsFourthGroup[2]=this.products[11];
      
    }
  })

  }
  visitProduct(productId:string){
    console.log('productId',productId);
    this.productId=productId;

  }
  comeback(){
    
    this.router.navigate(['/redirect']);
  }
  addItem(newItem: string) {
    this.email=newItem;
    this.productId=null;
  }
  ngOnDestroy() {
    this.producerSubscription.unsubscribe();
    this.producerProductsSubscription.unsubscribe();
    
  }
  

}
