import { Component, OnInit } from '@angular/core';
import { Observable,Subscription} from 'rxjs';
import { Store,select } from '@ngrx/store';
import { Header } from './../../models/header.model';
import { AppState } from '../../app.reducers';
import { User } from '../../models/user.model';
import {Types} from '../../models/types.model';
import {Product} from '../../models/product.model';
import * as actions from '../../actions';
import * as selectors from '../../reducers';
import {filter} from 'rxjs/operators';
import { ProductState } from '../../reducers';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public headers: Observable<Header[]>;
  public isShown: boolean;
  public user: User;
  public itemsSelected:number=0;
  public isFruitsSelected: boolean;
  public isMilkSelected:boolean=false;
  public isDrinksSelected: boolean=false;
  public isArtSelected:boolean=false;
  public isMeatSelected: boolean=false;
  public isOilSelected:boolean=false;
  public isBreadSelected:boolean=false;
  public types:Types;
  public products:Product[];
  public productsFiltered:Product[]=[];
  public productsFilteredSubscription:Subscription;
  public wordToFind:any="";
  constructor(private store: Store<AppState>,private router: Router) {
    this.store.select('header').subscribe(({ isShown }) => {
      this.isShown = isShown;
    });
    this.store.select('user').subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.isFruitsSelected=false;
    this.types={
      fruits:null,
      milk:null,
      drinks:null,
      art:null,
      oil:null,
      meat:null,
      bread:null
    }
  }
  selectFruits(){
    
    this.isFruitsSelected?this.isFruitsSelected=false:this.isFruitsSelected=true;
    this.isFruitsSelected?this.itemsSelected++:this.itemsSelected--;
    console.log('itemsSelected',this.itemsSelected);
  }
  selectMilk(){
    this.isMilkSelected?this.isMilkSelected=false:this.isMilkSelected=true;
    this.isMilkSelected?this.itemsSelected++:this.itemsSelected--;
  }
  selectDrinks(){
    this.isDrinksSelected?this.isDrinksSelected=false:this.isDrinksSelected=true;
    this.isDrinksSelected?this.itemsSelected++:this.itemsSelected--;
  }
  selectArt(){
    this.isArtSelected?this.isArtSelected=false:this.isArtSelected=true;
    this.isArtSelected?this.itemsSelected++:this.itemsSelected--;
  }
  selectOil(){
    this.isOilSelected?this.isOilSelected=false:this.isOilSelected=true;
    this.isOilSelected?this.itemsSelected++:this.itemsSelected--;
  }
  selectMeat(){
    this.isMeatSelected?this.isMeatSelected=false:this.isMeatSelected=true;
    this.isMeatSelected?this.itemsSelected++:this.itemsSelected--;
  }
  selectBread(){
    this.isBreadSelected?this.isBreadSelected=false:this.isBreadSelected=true;
    this.isBreadSelected?this.itemsSelected++:this.itemsSelected--;
  }
  findByTypes(){
    this.productsFiltered=[];
    this.wordToFind=(<HTMLInputElement>document.getElementById("finder__word--box")).value;
    
    if(this.itemsSelected>0){
      this.types.fruits=this.isFruitsSelected?true:false;
      this.types.milk=this.isMilkSelected?true:false;
      this.types.drinks=this.isDrinksSelected?true:false;
      this.types.art=this.isArtSelected?true:false;
      this.types.oil=this.isOilSelected?true:false;
      this.types.meat=this.isMeatSelected?true:false;
      this.types.bread=this.isBreadSelected?true:false;
    }
    
    
    this.productsFilteredSubscription=this.store.select('product').subscribe(({products})=>{
      
        this.products=products;
        for (let n in products){
           if(this.itemsSelected>0){
           if(this.wordToFind===""){
            switch(this.products[n].type){
              case 'fruites i verdures':
                 if (this.types.fruits) this.productsFiltered.push(this.products[n]);
                 break;
              case 'lactics':
                if (this.types.milk) this.productsFiltered.push(this.products[n]);
                break;
              case 'begudes':
                if (this.types.drinks) this.productsFiltered.push(this.products[n]);
                break;
              case 'artesania':
                if (this.types.art) this.productsFiltered.push(this.products[n]);
                break;
              case 'olis':
                if (this.types.oil) this.productsFiltered.push(this.products[n]);
                break;
              case 'carns':
                if (this.types.meat) this.productsFiltered.push(this.products[n]);
                break;
              case 'reposteria':
                if (this.types.bread) this.productsFiltered.push(this.products[n]);
                break;                 
            }
          }else{
            let pos = this.products[n].name.search(this.wordToFind);
            if(pos>-1){
              switch(this.products[n].type){
                case 'fruites i verdures':
                   if (this.types.fruits) this.productsFiltered.push(this.products[n]);
                   break;
                case 'lactics':
                  if (this.types.milk) this.productsFiltered.push(this.products[n]);
                  break;
                case 'begudes':
                  if (this.types.drinks) this.productsFiltered.push(this.products[n]);
                  break;
                case 'artesania':
                  if (this.types.art) this.productsFiltered.push(this.products[n]);
                  break;
                case 'olis':
                  if (this.types.oil) this.productsFiltered.push(this.products[n]);
                  break;
                case 'carns':
                  if (this.types.meat) this.productsFiltered.push(this.products[n]);
                  break;
                case 'reposteria':
                  if (this.types.bread) this.productsFiltered.push(this.products[n]);
                  break;  
                                
              }

            }
            
          }
        }else{
          if(this.wordToFind===''){
              this.productsFiltered=this.products;
            }else{
              let pos = this.products[n].name.search(this.wordToFind);
              if(pos>-1){
                this.productsFiltered.push(this.products[n]);
              }
            }
        }
          }
        console.log('productsFiltered',this.productsFiltered)
        
        this.store.dispatch(actions.setProductsFiltered({productsFiltered:this.productsFiltered}));
        
    })
    setTimeout(() =>{
      this.router.navigate(['/redirect']);
      this.productsFilteredSubscription.unsubscribe();

    },1000);
  }
  editProfile(){
    this.router.navigate(['/editProfile']);

  }
  createProduct(){
    this.router.navigate(['/createProduct']);
  }
  updateProduct(){
    this.router.navigate(['/editProduct']);
  }
}
