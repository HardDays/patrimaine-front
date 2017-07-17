import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel} from "./../index";
import { AllUsersModel} from "./../../models/allusers.model";

import {MainService} from "./../../services/main.service";

@Component({
    selector: "users",
    templateUrl: "app/Pages/users/users.component.html",
    providers: [HttpService]
})

export class UsersComponent implements OnInit{
    Users : UserModel[];

    constructor(private router: Router,
        private mainService: MainService){}
    ngOnInit(){
        
        this.mainService.GetAllUsers("").subscribe(
            (data:AllUsersModel)=>{
                this.Users = data.users;
                console.log(this.Users);
            });
            
    }
    OnSelectUser(sel:UserModel)
    {
        this.router.navigate(["users",sel.id]);
    }
}