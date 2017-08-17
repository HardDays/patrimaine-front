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
import { AllLikesModel } from '../../models/alllikes.model';
import { AllRatesModel } from '../../models/allrates.model';

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
    MyRates:number[] = [];
    MyLikes:boolean[]=[];
    isAdvancedSearch = false;
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

    RefreshMyLikesAndRates(){
        this.RefreshMyLikes();
        this.RefreshMyRates();
    }
    RefreshMyRates(){
        this.MyRates = [];
        this.mainService.GetMyRates()
            .subscribe((result:AllRatesModel[])=>{
                for(let i of result)
                    this.MyRates[i.user_id] = i.rate;
            });

    }
    RefreshMyLikes(){
        this.MyLikes = [];
        this.mainService.GetMyLikes()
            .subscribe((result:AllLikesModel[])=>{
                for(let i of result)
                    this.MyLikes[i.user_id] = true; 
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
                
                this.RefreshMyLikesAndRates();
                while(i<res.total_count){
                    this.Pages.push(i/10+1);
                    i+=10;
                }
                if(this.Pages.length == 1)this.Pages = [];
                else if(this.Pages.length == 0)this.IsLoading = false;
                let total:number = 0;
                let current:number = 0;

                for(let i in this.UsersObservable){
                    if(this.UsersObservable[i].company){
                        this.UsersObservable[i].company.agrements = this.mainService.GetCheckboxNamesFromCheckboxModel(this.UsersObservable[i].company.agrements,this.Agreements);
                        this.UsersObservable[i].company.expertises = this.mainService.GetCheckboxNamesFromCheckboxModel(this.UsersObservable[i].company.expertises,this.Expertises);
                        let sub = this.mainService.GetCheckboxNamesFromCheckboxModel([this.UsersObservable[i].company.sub_category],this.Subcategory);
                        if(sub.length > 0)
                            this.UsersObservable[i].company.sub_category = sub[0];
                    }
                }

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

        if(this.Params.address)
            this.Params.address = this.Params.address.toLowerCase();
        if(this.Params.email)
            this.Params.email = this.Params.email.toLowerCase();
        if(this.Params.name)
            this.Params.name = this.Params.name.toLowerCase();

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
    
    LikeOrUnlikeUser(id:number){
        if(!this.MyLikes[id])
            this.LikeUser(id);
        else 
            this.UnlikeUser(id);
    }

    LikeUser(id:number){
        
        this.mainService.LikeUser(id)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                    this.MyLikes[id] = true;
                },
                (err)=>{
                    if(err.status == 409){
                        this.UnlikeUser(id);
                    }
                },
                ()=>{
                }
            );
    }
    UnlikeUser(id:number){
        
        this.mainService.UnlikeUser(id)
            .subscribe((result: UserModel)=>{
                this.RefreshUserData(result);
                this.MyLikes[id] = false;
            },
        (err)=>{
            if(err.status == 409){
                this.LikeUser(id);
            }
        });
    }

    RateOrUnrateUser(id:number,event:any){
        if(!this.MyRates[id]){
            this.RateUser(id,event);
        }
        else
            this.UnrateUser(id);
    }
    RateUser(id:number,event:any)
    {
        this.ErrorMesages = [];
        let fullWidth:number = event.toElement.clientWidth;
        let posX:number = event.offsetX;
        let rate =  4 * posX / fullWidth + 1;
        this.mainService.RateUser(id,rate)
            .subscribe(
                (result: UserModel)=>{
                    this.MyRates[result.id] = rate;
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 409){
                        this.ErrorMesages[id] = "Already voted";
                    }
                },
                ()=>{
                }
            );
    }
    UnrateUser(id:number){
        this.ErrorMesages = [];
        this.mainService.UnrateUser(id)
            .subscribe(
                (result: UserModel)=>{
                    this.MyRates[id] = 0;
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 404){
                        this.ErrorMesages[id] = "Cant cancel vote";
                    }
                },
                ()=>{
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
        if(user.company){
            user.company.agrements = this.mainService.GetCheckboxNamesFromCheckboxModel(user.company.agrements,this.Agreements);
            user.company.expertises = this.mainService.GetCheckboxNamesFromCheckboxModel(user.company.expertises,this.Expertises);
            let sub = this.mainService.GetCheckboxNamesFromCheckboxModel([user.company.sub_category],this.Subcategory);
            if(sub.length > 0)
                user.company.sub_category = sub[0];
        }
        this.UsersObservable[index] = user;
    }
}