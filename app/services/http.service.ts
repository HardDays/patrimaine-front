import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import {Response, Headers, URLSearchParams} from '@angular/http';
import {AdsModel} from "./../models/ads.model";
import {UserModel} from "./../models/user.model";
import {TokenModel} from "./../models/token.model";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService
{
    constructor(private http: Http){}
    headers:Headers;

    Login(email:string,password:string){
        let params = new URLSearchParams();
        params.set('email',email);
        params.set('password',password);
        let result:TokenModel;
        this.headers.append('Content-Type','application/json');
        this.PostData('/auth/login',params.toString()).subscribe((data: Response) => {
            result = data.json().data;
            this.headers.append('Authorization',result.token)
        });
    }

    
    PostData(method:string,data:string)
    {
        return this.http.post('url' + method,data, {headers:this.headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});
    }

    GetData(method:string,params:string)
    {
        return this.http.get('url' + method,{search:params,headers:this.headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});
    }

    PutData(method:string,data:string){
        return this.http.put('url' + method,data,{headers:this.headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});
    }
}