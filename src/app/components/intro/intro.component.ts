import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Header } from './../../models/header.model';
import * as HeaderActions from './../../actions/header-actions';
import { AppState } from './../../app.state';
import swal from 'sweetalert2';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
  providers: [AuthService],
})
export class IntroComponent implements OnInit {
  public email: string;
  public password: string;
  public user: any;
  public userL: any;
  public isIntro: boolean;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.user = {
      email: '',
      password: '',
    };

    this.store.dispatch(HeaderActions.HydeHeader({ isShown: false }));
  }
  ngOnInit(): void {}

  async redirect() {
    this.userL = await this.authSvc.getCurrentUser();
    if (this.userL) {
     
      this.router.navigate(['/main']);
    }
  }
  onSubmit() {
    this.authSvc
      .login(this.user.email, this.user.password)
      .then((res) => {
        (res===0)?window.alert("contrassenya incorrecte"):this.redirect()});
  }
  async onGoogleLogin() {
    try {
      this.authSvc.loginGoogle().then(() => this.redirect());
      /* if (this.authSvc.loginGoogle()) {
        this.redirect();
      }*/
    } catch (error) {
      console.log(error);
    }
  }
  async onFacebookLogin() {
    try {
      this.authSvc.loginFacebook().then(() => this.redirect());
    } catch (error) {
      console.log(error);
    }
  }
  onAnonLogin() {
    try {
      this.authSvc.loginAnon();
      this.redirect();
    } catch (error) {
      console.log(error);
    }
  }
  recoverPassword(){
    
    if(!this.user.email){swal.fire('Inserta el teu e-mail','Per recuperar la contrassenya cal que insertis el teu e-mail','error');
    }else{this.authSvc.recoverPassword(this.user.email).then((res)=>{
      res===0?swal.fire('El teu e-mail no està registrat','clicka a registre per crear un nou usuari amb aquest e-mail','error'):swal.fire('Mira el teu correu','has rebut un e-mail per restablir la contrassenya','success')
    })}

    }
  }

