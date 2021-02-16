import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IntroComponent } from './components/intro/intro.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { MainComponent } from './components/main/main.component';
import { OlMapsModule } from './ol-maps/ol-maps.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { EffectsArray } from './effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { appReducers } from './app.reducers';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProducerDetailComponent } from './components/producer-detail/producer-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HeaderComponent,
    RegisterComponent,
    MainComponent,
    EditProfileComponent,
    EditProductComponent,
    ProducerDetailComponent,
    ProductDetailComponent,
    RedirectComponent,
    CreateProductComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    OlMapsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    NgrxFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(EffectsArray),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
