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
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit,OnDestroy {

  /*public prodImgForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });*/

  public productForm: FormGroup;
  public prodImgForm:FormGroup;
  public fileMessage = '';
  public dataForm = new FormData();
  public fileName = '';
  public URLPublic = '';
  public percentage = 0;
  public ended = false;
  public productToBeUpdated: Product;
  public email: string;
  public user:User;
  
  public productKey: string;
  public product: Product;
  public errorMessage: string;
  public coordinateSubscription:Subscription;
  public userSubscription:Subscription;
  public productSubscription:Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firebaseStorage: FirebaseStorageService,
    private store: Store<AppState>
  ) {
    this.product={
      _id:null,
      name:'', 
      subName:'',
      description:'',
      price:'',
      type:'',
      producerEmail:'',
      producerName:'',
      producerLatitude:0,
      producerLongitude:0,
      producerCity:'',
      active:'',
      urlImage:''
    }
    this.store.dispatch(productActions.createProduct({product:this.product}));
  }

  ngOnInit() {
    this.productSubscription=this.store.select('product').subscribe(({ product }) => {
      this.product = product;
    });
    this.userSubscription=this.store.select('user').subscribe(({ user }) => {this.user=user})

    
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      subName: [''],
      type: ['', Validators.required],
      description:[''],
      price: [''],
      
    });
    this.prodImgForm=this.fb.group({
      prodImg:['']
    })
  }
  

  onSubmit() {
    const { name, subName, type, description, price} = this.productForm.value;
    this.store.dispatch(productActions.getCoordinates({city:this.user.city,street:this.user.street,number:this.user.number}));
    this.coordinateSubscription=this.store.select('coordinates').subscribe(({coordinates})=>{
      this.product.producerLongitude=coordinates[0].lon;
      this.product.producerLatitude=coordinates[0].lat;
      if (!(name === '')) this.product.name = name;
      if (!(subName === '')) this.product.subName = subName;
      if (!(type === '')) this.product.type = type;
      if (!(description === '')) this.product.description = description;
      if (!(price === '')) this.product.price = price;
      if (this.URLPublic) {
        this.product.urlImage = this.URLPublic;
      }
      this.product.producerName=this.user.name;
      this.product.producerEmail=this.user.email;
      this.product.producerCity=this.user.city;
      this.product.active="true";
      
      const update: Update<Product> = {
        id: this.product._id,
        changes: {
          ...this.product,
        },
      };
  
      this.store.dispatch(productActions.updateProduct({ update }));
      setTimeout(() => {
        this.productSubscription.unsubscribe();
        this.redirect();
      });
    })
       
  }
  redirect() {
    this.router.navigate(['/main']);
  }
  public prodImgChange(event) {
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
  public prodImgUpload() {
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
  ngOnDestroy() {
    if(this.coordinateSubscription)
    this.coordinateSubscription.unsubscribe();
    if(this.userSubscription)
    this.userSubscription.unsubscribe();
    if(this.productSubscription)
    this.productSubscription.unsubscribe();
  }
}
