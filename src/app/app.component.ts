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
    constructor(private router: Router,
        private mainService: MainService){}
    ngOnInit(){
        this.mainService.onAuthChange$.subscribe(bool => {
             this.isLoggedIn = bool;
                if(this.isLoggedIn)
                    this.mainService.GetMe()
                        .subscribe((data:UserModel)=>{
                            this.me = data;
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