import { Component,OnInit}      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import { UserModel, RegisterUserModel } from './../index';
import {MainService} from "./../../services/main.service";

@Component({
    selector: "ads",
    templateUrl: "app/Pages/register/register.component.html",
    providers: [HttpService]
})

export class RegisterComponent implements OnInit{
    ngOnInit(): void {
    }
    constructor(private router: Router,
        private mainService: MainService){}
    RegisterUser(email:string,password:string,fname:string,lname:string,phone:string)
    {
        let user : RegisterUserModel = new RegisterUserModel(email,password,fname,lname,phone);
        console.log(JSON.stringify(user));
        this.mainService.CreateUser(user)
            .then(x=>{
                console.log(JSON.stringify(x));
                this.router.navigate(['login']);
            });
    }
}