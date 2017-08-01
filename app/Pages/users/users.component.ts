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
    Pages: number[] = [];
    IsLoading = true;
    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}

    ngOnInit(){
        this.params.params.forEach((params:Params) => {
            this.Category = params["category"]?params["category"]:"";
            this.Page = params["page"]?(params["page"]):1;
                    this.mainService.GetAllUsers({limit:10,offset:((this.Page - 1)*10)})
                        .subscribe((res:AllUsersModel)=>{
                            this.UsersObservable = res.users;
                            let i = 0;
                            this.Pages = [];
                            while(i<res.total_count){
                                this.Pages.push(i/10+1);
                                i+=10;
                            }
                            //this.Pages = Array(res.total_count/10 + 1);
                            this.IsLoading = false;
                        });
        });
            
    }
}