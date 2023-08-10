import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CustomTableDataComponent } from './components/custom-table-data/custom-table-data.component';
import { CreateComponent } from './components/create/create.component';
import { HeaderComponent } from './components/header/header.component';
import { ExampleInterceptorInterceptor } from './example-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    CustomTableDataComponent,
    CreateComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExampleInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
