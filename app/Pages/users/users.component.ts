import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';

import { UserModel} from "./../index";

import {MainService} from "./../../services/main.service";

@Component({
    selector: "users",
    templateUrl: "app/Pages/users/users.component.html"
})

export class UsersComponent implements OnInit{
    Users : UserModel[];

    constructor(private router: Router,
        private mainService: MainService){}
    ngOnInit(){
        this.mainService
            .GetAllUsers("")
            .subscribe((data) => {this.Users = data});
    }
    OnSelectUser(sel:UserModel)
    {
        this.router.navigate(["users",sel.id]);
    }
}