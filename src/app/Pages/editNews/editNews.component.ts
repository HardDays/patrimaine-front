import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {MainService} from "./../../services/main.service";
import { NewsModel } from '../../models/news.model';
import { NewsComponent } from '../news/news.component';
import { Base64ImageModel } from '../../models/base64image.model';

@Component({
    moduleId: module.id,
    selector: "editNews",
    templateUrl: "./editNews.component.html",
    providers: [HttpService]
})

export class EditNewsComponent implements OnInit{
    createError = false;
    isLoading = true;
    editOk = false;
    errorMsg:string = "";
    isOkEnabled:boolean = true;
    image:string = "";
    News:NewsModel = new NewsModel();
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('edit_news');
    }

    ngOnInit() {
        this.isLoading = false;
        this.isOkEnabled = true;
        this.editOk = false;
        this.activatedRoute.params.forEach((params:Params) => {
            window.scrollTo(0,0);
            let newsId = params["id"];
            this.service.GetNewsById(newsId)
                .subscribe((data) => {
                    this.News = data;

                    if(this.News.image_id){
                        this.service.GetImageById(this.News.image_id)
                            .subscribe((res:Base64ImageModel)=>{
                                this.image = res.base64?res.base64:"images/demo/patrimoineLogo.png";
                                 this.isLoading = false;
                            });
                    }
                    else{
                        this.image = "images/demo/patrimoineLogo.png";
                        this.isLoading = false;
                    }
                }
            )
        }
    )
    }

    changeListener($event: any) : void {
        
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        this.isOkEnabled = false;
        var file:File = inputValue.files[0];
        if(!file){
            this.isOkEnabled = true;
             return;
        }
        var myReader:FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
            this.isOkEnabled = true;
        }
        myReader.readAsDataURL(file);
    }

    UpdateNews(){
        
        window.scrollTo(0,0);
        this.editOk = false;
        this.createError = false;
        this.isLoading = true;
        if(!this.News.title || !this.News.description || !this.News.subtitle || !this.News.links){

            this.errorMsg = "Input valid data! You have to input: ";
            let len = this.errorMsg.length;
            if(!this.News.title)
                this.errorMsg = this.errorMsg + " Title";
            if(!this.News.subtitle){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Subtitle";
            }
            if(!this.News.links){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Links";
            }
            if(!this.News.description){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Description !";
            }
            this.createError = true;
            this.isLoading = false;
            window.scrollTo(0,0);
            return;
        }
        let annonce = {
            title:this.News.title,
            subtitle:this.News.subtitle,
            base64:this.image,
            links:this.News.links,
            ncategory:this.News.ncategory,
            ntype:this.News.ntype,
            description:this.News.description
        };
        console.log(annonce);
        this.service.UpdateNews(this.News.id,annonce)
            .subscribe((result:NewsModel)=>{
                this.News = result;
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