import { Component, OnInit,OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { User } from '../../models/user.model';

import { FirebaseStorageService } from '../../firebase-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as userActions from '../../actions';
import { Update } from '@ngrx/entity';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [AuthService],
})
export class EditProfileComponent implements OnInit,OnDestroy {
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  public userForm: FormGroup;
  public fileMessage = '';
  public dataForm = new FormData();
  public fileName = '';
  public URLPublic ;
  public percentage = 0;
  public ended = false;
  public userToBeUpdated: User;
  public email: string;
  public userAuth: any;
  public userKey: string;
  public user: User;
  public errorMessage: string;
  public presentation:string;
  public userSubscription:Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firebaseStorage: FirebaseStorageService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.userSubscription=this.store.select('user').subscribe(({ user }) => {
      this.user = user;
    });
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      street: [''],
      number: [''],
      phone: [''],
      presentation:['']
    });
  }
  /*async loadUserFields(userKey) {
    
  }*/

  onSubmit() {
    const { name, city, street, number, phone,presentation } = this.userForm.value;
    if (!(name === '')) this.user.name = name;
    if (!(city === '')) this.user.city = city;
    if (!(street === '')) this.user.street = street;
    if (!(number === '')) this.user.number = number;
    if (!(phone === '')) this.user.phone = phone;
    if (!(presentation === '')) this.user.presentation = presentation;
    if (this.URLPublic) {
      this.user.urlImage = this.URLPublic;
    }
    let cityC=this.user.city.charAt(0).toUpperCase() + this.user.city.slice(1);
    this.user.city=cityC;
    
    

    const update: Update<User> = {
      id: this.user._id,
      changes: {
        ...this.user,
      },
    };

    this.store.dispatch(userActions.updateUser({ update }));
    setTimeout(() => {
      this.redirect();
    }, 500);
  }
  redirect() {
    this.router.navigate(['/mainBis']);
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
  ngOnDestroy() {
    
    this.userSubscription.unsubscribe();
    
  }
}
