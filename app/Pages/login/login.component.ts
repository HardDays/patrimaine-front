import { Component,OnInit, Input, Output, EventEmitter}      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import {AdsModel, TokenModel} from './../index';
import {MainService} from "./../../services/main.service";

@Component({
    selector: "ads",
    templateUrl: "app/Pages/login/login.component.html",
    providers: [HttpService]
})

export class LoginComponent implements OnInit{
    isLoading  = false;
    isLoginErr = false;
    ngOnInit(): void {
    }
    constructor(private router: Router,
        private mainService: MainService){}

    @Output() onLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
    OnLoginButtonClick(username: string, password:string)
    {
        this.isLoading = true;
        this.isLoginErr = false;
        this.mainService.UserLogin(username,password)
            .add((data:TokenModel)=>{
                if(!data && !data.token){
                    this.isLoginErr = true;
                }
                this.isLoading = false;
            });
        
        
    }
}