import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import {AdsModel} from "./../models/ads.model";
import {UserModel} from "./../models/user.model";
import {TokenModel} from "./../models/token.model";
import {AllUsersModel} from "./../models/allusers.model";
import {RegisterUserModel} from "./../models/register.user.model";
import {RegisterCompanyModel} from "./../models/register.company.model";
import { HttpService } from "./http.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

let Ads = [
            new AdsModel(1,"Test1","Test1Test1","",25,1,1,null,null,"toutes",[""],[""]),
            new AdsModel(2,"Test2","Test2Test2","",25,1,1,null,null,"toutes",[""],[""]),
            new AdsModel(3,"Test3","Test3Test3","",25,1,1,null,null,"ecologique",[""],[""]),
            new AdsModel(4,"Test4","Test4Test4","",25,1,1,null,null,"finance",[""],[""]),
            new AdsModel(5,"Test5","Test5Test5","",25,1,1,null,null,"immobilier",[""],[""]),
            new AdsModel(6,"Test6","Test6Test6","",25,1,1,null,null,"plaisir",[""],[""]),
        ];
let AdsPromise: Promise<AdsModel[]> = Promise.resolve(Ads);
    @Injectable()
    export class MainService{

        public onAuthChange$: Subject<boolean>;
        constructor(
            private httpService : HttpService,
            private router: Router
        ){
            this.onAuthChange$ = new Subject();
            this.onAuthChange$.next(false);
        }
        public me: UserModel;

        GetAllAds(text:string, category: string):Promise<AdsModel[]>{
            return AdsPromise
                .then(Ads => Ads.filter(x => x.description.includes(text) && 
                    ((category.length > 0)?(x.sub_category == category):true))
                );
            //return this.httpService.GetData('/ads/all',params);
        }

        GetAdsById(id:number): Promise<AdsModel>{
            return AdsPromise
                .then(Ads => Ads.find(x => x.id == id));
            /*return this.httpService.GetData('/ads/info/'+id,"")
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});*/
        }

        GetAllAdByUserId(id:number):Promise<AdsModel[]>{
                return AdsPromise
                    .then(Ads => Ads.filter(x => x.user_id == id));
        }

        CreateAd(title:string, desc:string){
            let ad = {title:title,description:desc};
            let id = Ads.length;
                
            return AdsPromise
                .then(Ads => Ads.push(new AdsModel(id+1,title,desc,"",this.me.id,1,1,null,null,"fintech",[""],[""])));
            //let params = new URLSearchParams();
            //params.set('ad',JSON.stringify(ad));
            /*return this.httpService.PostData('/ads/create',JSON.stringify(params))
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});*/
        }

        DeleteAd(ad:AdsModel){
            return AdsPromise
                .then(Ads => {
                    let index = Ads.indexOf(ad,0);
                    if(index > -1)
                        Ads.splice(index,1);
                })
        }

        UpdateAd(id:number,title:string,desc:string){
            let ad = {title:title,description:desc};
            let params = new URLSearchParams();
            params.set('ad',JSON.stringify(ad));
            return this.httpService.PutData('/ads/update/' + id,JSON.stringify(params))
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }

        GetAllUsers(params:string)
        {
            /*return this.httpService.GetData('/users/all',params).toArray<UserModel>();*/
            return this.httpService.GetData('/users/all',params);
        }

        GetUserById(id:number){
            return this.httpService.GetData('/users/info/'+id,"");
        }

        GetMe(){
            return this.httpService.GetData('/users/my_info',"");
        }

        CreateUser(user:RegisterUserModel): Promise<UserModel>{
            let params = {
                user: user,
                expertises: ["placement"],
                agrements: ["CJA"]
            };
            console.log(JSON.stringify(params));
            return this.httpService.PostData('/users/create',JSON.stringify(params)).toPromise<UserModel>();
        }

        CreateUserCompany(user:RegisterUserModel, company:RegisterCompanyModel, expertises:string[], agrements:string[]): Promise<UserModel>{
            let params = {
                user: user,
                company: company,
                expertises: expertises,
                agrements: agrements
            };
            console.log(JSON.stringify(params));
            return this.httpService.PostData('/users/create',JSON.stringify(params)).toPromise<UserModel>();
        }


        UpdateUser(user:UserModel): Promise<UserModel>{
            return this.httpService.PutData('/users/update',JSON.stringify(user)).toPromise<UserModel>();
        }

        UserLogin(email:string, password:string){
            
            return this.httpService.Login(email,password)
                .add((data:TokenModel)=>{
                    this.GetMe()
                        .subscribe((user:UserModel)=>{
                                this.me = user;
                                this.onAuthChange$.next(true);
                                this.router.navigate(["users","me"]);
                            });
                        
                });
                
        }
    }
