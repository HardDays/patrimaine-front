import { Component,OnInit,NgModule }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from './services/http.service';
import { UserModel } from './models/user.model';

import {MainService} from "./services/main.service";
     
@Component({
    selector: 'patrimoine',
    templateUrl: 'app/app.component.html',
    
})
export class AppComponent  implements OnInit {

    
    isLoggedIn:boolean = false;
    IsDropped = true;
    me: UserModel = new UserModel(null,"","","","",null,null,null); 
    constructor(private router: Router,
        private mainService: MainService){}
    ngOnInit(){
        this.mainService.onAuthChange$.subscribe(bool => {
             this.isLoggedIn = bool;
                if(this.isLoggedIn)
                    this.mainService.GetMe()
                        .subscribe((data:UserModel)=>{
                            console.log(JSON.stringify(data));
                            this.me = data;
                            //console.log(this.me);
                        });
        });
        this.mainService.TryToLoginWithToken();
    }

    Logout(){
        this.onMenuItemClick();
        this.mainService.Logout()
            .subscribe(()=>this.router.navigate(["/"]),
            (err)=>this.router.navigate(["/"]),
            ()=>this.router.navigate(["/"]));
    }

    //KASTIL', spasibo angularu za eto
    onMenuItemClick(){
        this.IsDropped = false;
        setTimeout(()=> this.IsDropped = true,250);
    }
}