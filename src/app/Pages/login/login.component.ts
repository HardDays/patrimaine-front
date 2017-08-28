import { Component,OnInit, Input, Output, EventEmitter}      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';
import {MainService} from "./../../services/main.service";
import { TokenModel } from '../../models/token.model';

@Component({
    moduleId:module.id,
    selector: "ads",
    templateUrl: "./login.component.html",
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
            .subscribe((data:TokenModel)=>{
                if(data && data.token){
                    this.mainService.BaseInitAfterLogin(data);
                   // this.router.navigate(["/"]);
                }
            },
        (err)=>{
            if(err.status == 401){
                this.isLoginErr = true;
            }
            this.isLoading = false;
        },
        ()=>{
            this.isLoading = false;
        });
        
        
    }
}