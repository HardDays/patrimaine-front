import { Component,OnInit,NgModule }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from './services/http.service';
import {UserModel} from './models/user.model';

import {MainService} from "./services/main.service";
     
@Component({
    selector: 'patrimoine',
    templateUrl: 'app/app.component.html',
    
})
export class AppComponent  implements OnInit {

    
    isLoggedIn:boolean = false;
    me: UserModel = new UserModel(null,"","","","",null,null,null); 
    constructor(
        private mainService: MainService){}
    ngOnInit(){
        this.mainService.onAuthChange$.subscribe(bool => {
            if(bool){
                this.isLoggedIn = bool;
                this.mainService.GetMe()
                    .subscribe((data:UserModel)=>{
                        console.log(data);
                        this.me = data;
                    });
            }
        })
    }
}