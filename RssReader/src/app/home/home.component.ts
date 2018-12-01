import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
// import {MatInput,MatFormField, MatCheckboxModule} from '@angular/material';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {catchError,map,finalize} from 'rxjs/operators';
import {parse,formatPost} from '../services/parser.service';
import { get } from 'lodash';
import {Post} from '../models/postmodel'
// import { clearResolutionOfComponentResourcesQueue } from '@angular/core/src/metadata/resource_loading';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 inputurl:string;
 rssParsed: Post[] = [];
 showdata :boolean;
 loading : boolean=false;
 error: any = null;
 i:any;
 j:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  public onSubmit(input:string){
    console.log(input);
    this.loading = true;
    this.getRssFeed(input).pipe(finalize(() => this.loading = false))
    .subscribe(rssParsed => {
      this.rssParsed=rssParsed;
      // console.log(this.rssParsed)
      // for(this.i in this.rssParsed){
      //   for(this.j in this.rssParsed[this.i]){
      //     if(this.j.indexOf('media')>-1){
      //     console.log(this.rssParsed[this.i][this.j]);
      //     }
      //   }
      //   // break;
      // }
     if(this.rssParsed.length>0){
     this.showdata=true;
     }
    }, e => this.error = e);
  }
   private getRssFeed(inputvalue:string):Observable<any>{
      this.inputurl=inputvalue;
      // return this.http.get(this.inputurl).pipe(
      //   catchError(
      //     this.handleError("callingRssFeed")
      //     )
      //   );
      return this.http.get("https://cors-anywhere.herokuapp.com/" + this.inputurl, {responseType: 'text'})
      .pipe(map(xmlText => {
        // console.log(xmlText);
        const XML = new DOMParser().parseFromString(xmlText, 'text/xml');
        const obj = parse(XML);
        const items = get(obj, 'channel.item') || [];
        return items.map(formatPost);
      }));

    }
    private handleError<T>(operation='operation',result?:T){
      return (error:any): Observable<T> => {
        alert("An error occured while calling url :"+this.inputurl);
        return  of(result as T);
      }
    }
}

