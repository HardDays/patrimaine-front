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
    serverUrl: string = "https://patrimoine.herokuapp.com";
    constructor(private http: Http){}
    headers:Headers = new Headers([]);
    private token: TokenModel = new TokenModel('');

    Login(email:string,password:string){
        /*let params = new URLSearchParams();
        params.set('email',email);
        params.set('password',password);*/
        let params = {
            email: email,
            password: password
        };

        if(!this.headers.has('Content-Type'))
            this.headers.append('Content-Type','application/json');
        return this.http.post(this.serverUrl + '/auth/login',JSON.stringify(params), {headers:this.headers})
            .map((resp:Response)=>resp.json())
            .subscribe((data:TokenModel) => {
                if(this.headers.has('Authorization'))
                    this.headers.delete('Authorization');
                this.headers.append('Authorization',data.token);
                this.token = data;
                console.log(JSON.stringify(this.headers));
            })
    }

    GetToken():TokenModel{
        return this.token;
    }
    
    PostData(method:string,data:string)
    {
        if(!this.headers.has('Content-Type'))
            this.headers.append('Content-Type','application/json');
        return this.http.post(this.serverUrl + method,data, {headers:this.headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});
    }

    GetData(method:string,params:string)
    {
        if(!this.headers.has('Content-Type'))
            this.headers.append('Content-Type','application/json');
        return this.http.get(this.serverUrl + method,{search:params,headers:this.headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});
    }

    PutData(method:string,data:string){
        if(!this.headers.has('Content-Type'))
            this.headers.append('Content-Type','application/json');
        return this.http.put(this.serverUrl + method,data,{headers:this.headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});
    }
}