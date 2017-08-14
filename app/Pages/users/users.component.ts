import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RouterModule } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {MainService} from "./../../services/main.service";
import { Base64ImageModel } from '../../models/base64image.model';
import { SearchUserParamsModel } from '../../models/searchUserParams.model';
import { AllUsersModel } from '../../models/allusers.model';
import { CheckboxModel } from '../../models/checkbox.model';
import { UserModel } from '../../models/user.model';

@Component({
    selector: "users",
    templateUrl: "app/Pages/users/users.component.html",
    providers: [HttpService]
})

export class UsersComponent implements OnInit{
    UsersObservable: UserModel[];
    Category: string = "";
    Page: number = 1;
    Pages: number[] = [];
    Images: string[] = [];
    IsLoading = true;
    Params: SearchUserParamsModel = new SearchUserParamsModel(0,null,null,null,null,null,null,null,null,null,null,null);
    Expertises: CheckboxModel[] = [
        new CheckboxModel("Credit","credit",false),
        new CheckboxModel("Retraite","retraite",false),
        new CheckboxModel("Placement","placement",false),
        new CheckboxModel("Allocation","allocation",false),
        new CheckboxModel("Epargne","epargne",false),
        new CheckboxModel("Investissement","investissement",false),
        new CheckboxModel("Defiscalisation","defiscalisation",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Assurance","assurance",false),
        new CheckboxModel("Investissement plaisir","investissement_plaisir",false)
    ];
    Agreements:CheckboxModel[]=[
        new CheckboxModel("CJA","CJA",false),
        new CheckboxModel("CIF","CIF",false),
        new CheckboxModel("Courtier","Courtier",false),
        new CheckboxModel("IOSB","IOSB",false),
        new CheckboxModel("Carte-T","Carte_T",false)
    ];
    Subcategory:CheckboxModel[]=[
        new CheckboxModel("Classique","classique",false),
        new CheckboxModel("E-brooker","e_brooker",false),
        new CheckboxModel("Fintech","fintech",false),
        new CheckboxModel("Crowdfunding","crowdfunding",false),
        new CheckboxModel("Lendfunding","lendfunding",false),
        new CheckboxModel("Institutionnels","institutionnels",false)
    ];
    ErrorMesages:string[] = [];

    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}

    ngOnInit(){
        this.params.params.forEach((params:Params) => {
            this.Category = params["category"]?params["category"]:"";
            this.Page = params["page"]?(params["page"]):1;
            this.GetUsers();
        });
            
    }

    GetUsers(){
        window.scrollTo(0,0);
        this.Params.limit = 10;
        this.Params.offset = (this.Page - 1)*10;
        this.ErrorMesages = [];
        this.mainService.GetAllUsers(this.Params)
            .subscribe((res:AllUsersModel)=>{
                this.UsersObservable = res.users;
                let i = 0;
                this.Pages = [];
                console.log(res);
                while(i<res.total_count){
                    this.Pages.push(i/10+1);
                    i+=10;
                }
                if(this.Pages.length == 1)this.Pages = [];
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
                        this.Images[item.id]="images/demo/patrimoineLogo.png";
                        current+=1;
                        if(total == current)this.IsLoading = false;
                    }
                }
            });
    }

    OnSearchSubmit(){
        window.scrollTo(0,0);
        this.IsLoading = true;
        this.Page = 1;
        this.Params.expertises = this.mainService.GetCheckedCheckboxes(this.Expertises);
        this.Params.agrements = this.mainService.GetCheckedCheckboxes(this.Agreements);
        this.Params.sub_categories = this.mainService.GetCheckedCheckboxes(this.Subcategory);
        console.log(this.Params);
        this.GetUsers();
    }
    
    ChangePageNumber(page:number){
        this.IsLoading = true;
        this.Page = page;
        this.GetUsers();
    }
    PrevOrNextPage(next:boolean)
    {
        this.IsLoading = true;
        this.Page += next?1:-1;
        this.GetUsers();
    }
    RateUser(id:number,conc:any,event:any)
    {
        this.ErrorMesages = [];
        let fullWidth:number = event.toElement.clientWidth;
        let posX:number = event.offsetX;
        let rate =  5 * posX / fullWidth;
        this.mainService.RateUser(id,rate)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 409){
                        this.ErrorMesages[id] = "Already voted";
                    }
                    console.log(this.ErrorMesages);
                    //this.DisplayError(err);
                },
                ()=>{
                    //console.log("finished");
                }
            );
    }
    LikeUser(id:number){
        this.mainService.LikeUser(id)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 409){
                        this.mainService.UnlikeUser(id)
                            .subscribe((result: UserModel)=>{
                                this.RefreshUserData(result);
                            });
                    }
                },
                ()=>{
                    //console.log("finished");
                }
            );
    }
    UnrateUser(id:number){
        this.ErrorMesages = [];
        this.mainService.UnrateUser(id)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 404){
                        this.ErrorMesages[id] = "Cant cancel vote";
                    }
                },
                ()=>{
                    //console.log("finished");
                }
            );
    }
    
    DisplayError(err:any){
        if(err.status == 409){

        }
    }

    RefreshUserData(user:UserModel)
    {
        let findUser = this.UsersObservable.find(x=>x.id == user.id);
        let index = this.UsersObservable.indexOf(findUser);
        this.UsersObservable[index] = user;
    }
}