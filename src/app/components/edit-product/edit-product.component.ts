import { Component, OnInit,OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { Product } from '../../models/product.model';

import { FirebaseStorageService } from '../../firebase-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as productActions from '../../actions';
import { Update } from '@ngrx/entity';
import {User} from '../../models/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit,OnDestroy {
  public prodImgForm = new FormGroup({
    prodImg: new FormControl(null, Validators.required),
  });
  public productsUser:Product[]=[];
  public productSelected:Product=null;
  public email:any;
  public emailSubscription:Subscription;
  public productsListSubscription:Subscription;
  public userSubscription:Subscription;
  public userProductForm: FormGroup
  public fileMessage = '';
  public dataForm = new FormData();
  public fileName = '';
  public URLPublic = null;
  public percentage = 0;
  public ended = false;
  public errorMessage: string;
  public user:User;
  constructor(private store: Store<AppState>,private fb: FormBuilder,private firebaseStorage: FirebaseStorageService){}
  ngOnInit() {
    this.emailSubscription=this.store.select('user').subscribe((user)=>{
      this.email=user.user.email;
    })
    this.userProductForm = this.fb.group({
      name: ['', Validators.required],
      subName: ['', Validators.required],
      type: [''],
      description: [''],
      urlImage: [''],
      price:[''],
      active:['']
    });
    if(this.email){
      this.store.dispatch(productActions.getProductsByUser({email:this.email}));
      this.productsListSubscription=this.store.select('userProducts').subscribe(({userProducts})=>{
        this.productsUser=userProducts;
        console.log("userProducts",this.productsUser);
      })
    }
    
   
  }
  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
    this.productsListSubscription.unsubscribe();
  }
  editProductSelected(productId){
    
    for(let product in this.productsUser){
      if(this.productsUser[product]._id===productId){
        this.productSelected=this.productsUser[product];
        console.log('productSelected',this.productSelected);
      }
    }
  }
  onSubmit(){
    const { name, subName,type,description,urlImage,price,active } = this.userProductForm.value;
    if (!(name === '')) this.productSelected.name = name;
    if (!(subName === '')) this.productSelected.subName = subName;
    if (!(type === '')) this.productSelected.type = type;
    if (!(description === '')) this.productSelected.description = description;
    if (!(price === '')) this.productSelected.price = price;
    if (!(active=== '')) this.productSelected.active= active;
    if (this.URLPublic) {
      this.productSelected.urlImage = this.URLPublic;
    }
    const update: Update<Product> = {
      id: this.productSelected._id,
      changes: {
        ...this.productSelected,
      },
    };
    this.store.dispatch(productActions.updateProduct({ update }));
    setTimeout(() => {
      this.redirect();
    }, 500);
  }
  redirect(){
    this.userSubscription=this.store.select('user').subscribe(({ user }) => {
      this.user=user;
      this.store.dispatch(productActions.getProductsByCity({city:this.user.city}));
    },(error)=>console.log(error));
    this.productSelected=null;

  }
  public fileChange(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.fileMessage = `Arxiu preparat: ${event.target.files[i].name}`;
        this.fileName = event.target.files[i].name;
        this.dataForm.delete('arxiu');
        this.dataForm.append(
          'arxiu',
          event.target.files[i],
          event.target.files[i].name
        );
      }
    } else {
      this.fileMessage = 'No hi ha cap arxiu seleccionat';
    }
  }

  //Sube el archivo a Cloud Storage
  public fileUpload() {
    let file = this.dataForm.get('arxiu');
    let reference = this.firebaseStorage.referenciaCloudStorage(
      this.fileName
    );
    let task = this.firebaseStorage.tareaCloudStorage(
      this.fileName,
      file
    );

    //Cambia el porcentaje
    task.percentageChanges().subscribe((percentage) => {
      this.percentage = Math.round(percentage);
      this.errorMessage='';
    
      if (this.percentage == 100) {
        this.ended = true;
        reference.getDownloadURL().subscribe((URL) => {
          this.URLPublic= URL;
          
          
        },(error)=>{
          swal.fire('Error al cargar la imatge','torna a cargar la imatge, hi ha hagut un problema amb el servidor','error');
        });
      }
    });
  }
}
