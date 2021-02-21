import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducers';
import * as userActions from './../../actions';
import {Subscription} from 'rxjs';
import swal from 'sweetalert2';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit,OnDestroy {
  public email: string;
  public password: string;
  public passwordR: string;
  public user: User;
  public userL: any;
  public userSubscription:Subscription;
  
 
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private store: Store<AppState>
    
  ) {
    this.user = {
      _id: '',
      name: '',
      email: '',
      city:'',
      street:'',
      number:0,
      phone:0,
      lat:0,
      lon:0,
      presentation:'',
      
      urlImage:''
    };
    this.userL={
      
      email:'',
      password:''
    }
  }

  ngOnInit(): void {}
  async redirect() {
    this.userL = await this.authSvc.getCurrentUser();
    if (this.userL) {
      
      this.router.navigate(['/main']);
    }
  }
  onSubmit() {
    this.user.email=this.userL.email;
    let cityC=this.user.city.charAt(0).toUpperCase() + this.user.city.slice(1);
    this.user.city=cityC;
    
    
    this.authSvc.register(this.userL.email, this.userL.password).then((res) => {
      
      if (res===0){swal.fire(
        'Email ja registrat',
        'L`email utilitzat en el registre ja consta com a registrat',
        'error'
      );}else{
      this.store.dispatch(userActions.createUser({user:this.user}));
     this.userSubscription=this.store.select('user').subscribe(({user})=>{this.redirect();},(error)=>{console.log('error',error)})}
    });
  }
  ngOnDestroy() {
    
    this.userSubscription.unsubscribe();
    
  }
  
}
