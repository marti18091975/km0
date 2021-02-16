import { Injectable } from '@angular/core';
import auth from 'firebase/app';
import User from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User.User;
  constructor(public afAuth: AngularFireAuth) {}
  async loginGoogle() {
    try {
      return this.afAuth.signInWithPopup(new auth.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }
  async loginFacebook() {
    try {
      return this.afAuth.signInWithPopup(new auth.auth.FacebookAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }
  async loginAnon() {
    try {
      return this.afAuth.signInAnonymously;
    } catch (error) {
      console.log(error);
    }
  }
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      return 0;
    }
  }
  async recoverPassword(email:string){
    try{
      const result=await this.afAuth.sendPasswordResetEmail(email);
      return result;
    }catch(error){
      return 0;
    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      return 0;
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser() {
    
    return User.auth().currentUser;
  }
  isAuth() {
    return this.afAuth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
