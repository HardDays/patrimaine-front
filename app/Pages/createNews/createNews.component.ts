import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {MainService} from "./../../services/main.service";
import { NewsModel } from '../../models/news.model';

@Component({
    moduleId: module.id,
    selector: "createNews",
    templateUrl: "./createNews.component.html",
    providers: [HttpService]
})

export class CreateNewsComponent implements OnInit{
    createError = false;
    isLoading = true;
    errorMsg:string = "";
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }

    ngOnInit() {
        this.isLoading = false;
    }

    OncreateNewsButtonClick(title:string,description:string){
        this.isLoading = true;
        this.service.CreateNews(title,description)
            .subscribe((result:NewsModel)=>{
                console.log("Result of creation: " + JSON.stringify(result));
                this.router.navigate(['news',result.id]);
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
            });
    }
}