import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {MainService} from "./../../services/main.service";
import { NewsModel } from '../../models/news.model';
import { NewsComponent } from '../news/news.component';
import { Base64ImageModel } from '../../models/base64image.model';
import { AdsModel } from '../../models/ads.model';

@Component({
    moduleId: module.id,
    selector: "editAd",
    templateUrl: "./editAd.component.html",
    providers: [HttpService]
})

export class EditAdComponent implements OnInit{
    createError = false;
    isLoading = true;
    editOk = false;
    errorMsg:string = "";
    isOkEnabled:boolean = true;
    image:string = "";
    Ad:AdsModel = new AdsModel();
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('edit_ad');
    }

    ngOnInit() {
        this.isLoading = false;
        this.isOkEnabled = true;
        this.editOk = false;
        this.activatedRoute.params.forEach((params:Params) => {
            window.scrollTo(0,0);
            let newsId = params["id"];
            this.service.GetAdsById(newsId)
                .subscribe((data) => {
                    this.Ad = data;
                    this.isLoading = false;
                }
            )
        }
    )
    }

    

    UpdateNews(){
        
        window.scrollTo(0,0);
        this.editOk = false;
        this.createError = false;
        this.isLoading = true;
        if(!this.Ad.title || !this.Ad.description ){

            this.errorMsg = "Input valid data! You have to input: ";
            let len = this.errorMsg.length;
            if(!this.Ad.title)
                this.errorMsg = this.errorMsg + " Title";
            if(!this.Ad.description){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Description !";
            }
            this.createError = true;
            this.isLoading = false;
            window.scrollTo(0,0);
            return;
        }
        let body = {
            ad:{
                title:this.Ad.title,
                description:this.Ad.description
            }
        };
        console.log(body);
        this.service.UpdateAd(this.Ad.id,body)
            .subscribe((result:AdsModel)=>{
                this.Ad = result;
                this.editOk = true;
            },
            (err)=>{
                console.log(err);
                if(err.status == 401){
                    this.errorMsg = "You have to be logged in! We will reddirect you to login page soon!";
                    setTimeout(()=> this.router.navigate(["/login"]),3000);
                }
                else{
                    this.errorMsg = "Something went wrong! Try again!";
                }
                this.createError = true;
                this.isLoading = false;
            },
        ()=>{

            this.isLoading = false;
            window.scrollTo(0,0);
        });
    }
}