import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CustomTableDataComponent } from './components/custom-table-data/custom-table-data.component';
import { CreateComponent } from './components/create/create.component';



const routes: Routes = [  
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'login', component: SignInComponent},
  {path:'signup', component: SignUpComponent},
  {path:'ctable', component: CustomTableDataComponent},
  {path:'create/:id', component: CreateComponent},

  {path:'**', component: HomeComponent},]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
