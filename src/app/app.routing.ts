import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { IntroComponent } from './components/intro/intro.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {CreateProductComponent} from './components/create-product/create-product.component';
import { AuthGuard } from './guards/authGuard';
import {ProducerDetailComponent} from './components/producer-detail/producer-detail.component';
import {RedirectComponent} from './components/redirect/redirect.component';
import {MainBisComponent} from './components/main-bis/main-bis.component';
const appRoutes: Routes = [
  { path: '',component: IntroComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  {path:'mainBis',component:MainBisComponent},
  { path: 'editProfile', component: EditProfileComponent },
  {path:'editProduct',component: EditProductComponent},
  {path:'createProduct',component:CreateProductComponent},
  {path:'producerDetail',component:ProducerDetailComponent},
  {path:'redirect',component:RedirectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouting {}
