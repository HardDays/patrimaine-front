import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { AdsModel } from '../../models/ads.model';

@Component({
    moduleId: module.id,
    selector: "createad",
    templateUrl: "./createAd.component.html",
    providers: [HttpService]
})

export class CreateAdComponent implements OnInit{
    createError = false;
    isLoading = true;
    errorMsg:string = "";
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('create_ad');
    }

    ngOnInit() {
        this.isLoading = false;
    }

    OncreateAdButtonClick(title:string,description:string){
        this.createError = false;
        this.isLoading = true;
        if(!title || !description){
            this.errorMsg = "Input valid data! You have to input: ";
            let len = this.errorMsg.length;
            if(!title)
                this.errorMsg = this.errorMsg + " Title";
            if(!description){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Description !";
            }
            this.createError = true;
            this.isLoading = false;
            window.scrollTo(0,0);
            return;
        }
        console.log(description);
        this.service.CreateAd(title,description)
            .subscribe((result:AdsModel)=>{
                this.router.navigate(['ads',result.id]);
            },
            (err)=>{
                if(err.status == 401){
                    this.errorMsg = "You have to be logged in! We will reddirect you to login page soon!";
                    setTimeout(()=> this.router.navigate(["/login"]),3000);
                }
                else{
                    this.errorMsg = "Something went wrong! Try again!";
                }
                this.createError = true;
                this.isLoading = false;
            });
            
    }
}