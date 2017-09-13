import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { ReviewModel } from '../../models/review.model';

@Component({
    moduleId: module.id,
    selector: "createReview",
    templateUrl: "./createReview.component.html",
    providers: [HttpService]
})

export class CreateReviewComponent implements OnInit{
    createError = false;
    isLoading = true;
    errorMsg:string = "";
    createOk = false;
    Review:ReviewModel = new ReviewModel();
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('create_review');
    }

    ngOnInit() {
        this.isLoading = false;
    }

    OncreateReviewButtonClick(){
        console.log(this.Review);
        this.createError = false;
        this.isLoading = true;
        this.createOk = false;
        if(!this.Review.author || !this.Review.title || !this.Review.body){
            this.errorMsg = "Input valid data! You have to input: ";
            let len = this.errorMsg.length;
            if(!this.Review.title)
                this.errorMsg = this.errorMsg + " Title";
            if(!this.Review.body){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Body";
            }
            if(!this.Review.author){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Author";
            }
            this.errorMsg += "!";
            this.createError = true;
            this.isLoading = false;
            window.scrollTo(0,0);
            return;
        }
        this.service.CreateReview({
            title:this.Review.title,
            body:this.Review.body,
            author:this.Review.author
        })
            .subscribe((result:ReviewModel)=>{
                this.createOk = true;
                setTimeout(this.router.navigate(['/']),3000);
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