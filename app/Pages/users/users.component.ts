import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RouterModule } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel} from "./../index";
import { AllUsersModel} from "./../../models/allusers.model";

import {MainService} from "./../../services/main.service";
import { Base64ImageModel } from '../../models/base64image.model';

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
    Images: string[] = [];
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
                            let total:number = 0;
                            let current:number = 0;
                            for(let item of this.UsersObservable){
                                total+=1;
                                if(item.company && item.company.image_id){
                                    this.mainService.GetImageById(item.company.image_id)
                                        .subscribe((result:Base64ImageModel)=>{
                                            this.Images[item.id] = result.base64;
                                            current+=1;
                                            if(total == current)this.IsLoading = false;
                                        });
                                }
                                else {
                                    this.Images[item.id]="";
                                    current+=1;
                                    if(total == current)this.IsLoading = false;
                                }
                            }
                            //this.Pages = Array(res.total_count/10 + 1);
                            
                        });
        });
            
    }
}