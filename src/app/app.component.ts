import { Component,OnInit,NgModule }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from './services/http.service';
import { UserModel } from './models/user.model';


import {MainService} from "./services/main.service";

     
@Component({
    moduleId:module.id,
    selector: 'patrimoine',
    templateUrl: './app.component.html'
    
})
export class AppComponent  implements OnInit {

    
    isLoggedIn:boolean = false;
    IsDropped = true;
    cookies:Object;
    currentMenu = "index";
    me: UserModel = new UserModel(null,"","","","",null,null,null,null,null);
    createAdAccess:boolean = false;
    createNewsAccess:boolean = false;
    constructor(private router: Router,
        private mainService: MainService){}
    ngOnInit(){
        this.mainService.onAuthChange$.subscribe(bool => {
             this.isLoggedIn = bool;
                if(this.isLoggedIn)
                    this.mainService.GetMe()
                        .subscribe((data:UserModel)=>{
                            this.me = data;
                            this.mainService.GetMyAccess()
                                .subscribe((result:string[])=>{
                                    this.createAdAccess = result.find(x=> x=="can_create_ads") != null;
                                    this.createNewsAccess = result.find(x=> x=="can_create_news") != null;
                                });
                        });
        });
        this.mainService.onPageChange$
            .subscribe(page=>{
                this.currentMenu = page;
            })
        this.mainService.TryToLoginWithToken();
        
    }

    Logout(){
        //this.onMenuItemClick('index');
        this.mainService.Logout();/*
            .subscribe(()=>this.router.navigate(["/"]),
            (err)=>this.router.navigate(["/"]),
            ()=>this.router.navigate(["/"]));*/
    }



    //KASTIL', spasibo angularu za eto
    onMenuItemClick(item:string){
        this.mainService.ChangePage(item);
        this.IsDropped = false;
        setTimeout(()=> this.IsDropped = true,250);
    }
}