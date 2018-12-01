import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
// import {MatInput,MatFormField, MatCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    // MatInput,MatFormField, MatCheckboxModule,
    // FormControl,
    // FormGroupDirective,
    // NgForm, Validators,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([ //localhost/path1/path2 localhost/path1
      {
        path:'',
        component: HomeComponent
      }
    ])
  ],
 
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
