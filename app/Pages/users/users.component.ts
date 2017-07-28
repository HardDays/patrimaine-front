import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RouterModule } from '@angular/router';
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
    UsersObservable: UserModel[];
    Category: string = "";
    Page: number;
    IsLoading = true;
    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}

    ngOnInit(){
        this.params.params.forEach((params:Params) => {
            this.Category = params["category"]?params["category"]:"";
            this.Page = params["page"]?(params["page"]):1;
            this.mainService.GetAllUsers({}).subscribe(
                (data:AllUsersModel)=>{
                    this.Users = data.users;
                    console.log(this.Users);
                    this.mainService.GetAllUsers({limit:10,offset:((this.Page - 1)*10)})
                        .subscribe((res:AllUsersModel)=>{
                            console.log(res);
                            this.UsersObservable = res.users;
                            this.IsLoading = false;
                        });
                });
        });
            
    }
    OnSelectUser(sel:UserModel)
    {
        this.router.navigate(["users",sel.id]);
    }
}