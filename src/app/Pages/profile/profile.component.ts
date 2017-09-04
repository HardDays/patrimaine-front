import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';
import {MainService} from "./../../services/main.service";
import { TokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';
import { Base64ImageModel } from '../../models/base64image.model';
import { CheckboxModel } from '../../models/checkbox.model';

@Component({
    moduleId:module.id,
    selector: "profile",
    templateUrl: "./profile.component.html",
    providers: [HttpService]
})

export class ProfileComponent implements OnInit {
    me:UserModel = new UserModel();
    isLoading  = false;
    currentTab = "password";
    ImageBase64:string = null;
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
    
    changePwOk = false;
    changePwErr = false;
    changePwErrMsg = "";

    changeUserOk = false;
    changeUserErr = false;
    changeUserErrMsg = "";

    changeCompanyOk = false;
    changeCompanyErr = false;
    changeCompanyErrMsg = "";

    constructor(private router: Router,
        private service: MainService)
    {
        this.service.ChangePage('profile');
    }
    ngOnInit(): void 
    {
        this.service.onAuthChange$
            .subscribe((res:boolean)=>{
                if(!res)
                    this.router.navigate(["/"]);
            });
        this.service.GetMe()
            .subscribe((res:UserModel)=>{
                this.RefreshUser(res);
            })
    }


    ChangeTabTo(tab:string)
    {
        if(this.currentTab == tab)
            return;
        this.currentTab = tab;
        this.ReloadAllResources();
    }
    
    ChangePassword(old_pw:string,new_pw:string){
        this.ReloadAllResources();
        this.isLoading = true;
        if(!old_pw || (!new_pw || new_pw.length < 6)){
            this.InputCorrectDataError();
            this.isLoading = false;
            return;
        }
        this.service.ChangePassword({old_password:old_pw,new_password:new_pw})
            .subscribe((res:UserModel)=>{
                this.RefreshUser(res);
                this.changePwOk = true;
            },
        (err)=>{
            this.changePwErrMsg = "Old password is incorrect!";
            this.changePwErr = true;
            this.isLoading = false;
        });
    }

    InputCorrectDataError(){
        this.changePwErrMsg = "Input correct data";
        this.changePwErr = true;
    }

    ReloadAllResources(){
        this.changePwOk = false;
        this.changePwErr = false;
        this.changePwErrMsg = "";

        this.changeUserOk = false;
        this.changeUserErr = false;
        this.changeUserErrMsg = "";

        this.changeCompanyOk = false;
        this.changeCompanyErr = false;
        this.changeCompanyErrMsg = "";
    }
    UpdateUserInfo(){
        this.isLoading = true;
        let params = {
            email:this.me.email,
            first_name:this.me.first_name,
            last_name:this.me.last_name,
            phone:this.me.phone,
            pcategory:this.me.pcategory
        }
        this.service.UpdateMe(params)
            .subscribe((res:UserModel)=>{
                this.RefreshUser(res);
                this.changeUserOk = true;
            },
            (err)=>{
                this.changeUserErrMsg = "Input correct data!";
                this.changeUserErr = true;
                this.isLoading = false;
            })
    }

    RefreshUser(user:UserModel){
        
        this.ReloadAllResources();
        this.me = user;
        if(this.me.company){
            this.Expertises = this.service.GetCheckboxesFromChecked(this.me.company.expertises,this.Expertises);
            this.Agreements = this.service.GetCheckboxesFromChecked(this.me.company.agrements,this.Agreements);
            if(this.me.company.image_id){
                this.service.GetImageById(this.me.company.image_id)
                    .subscribe((result:Base64ImageModel)=>{
                        
                        this.ImageBase64 = result.base64?result.base64:"images/demo/patrimoineLogo.png";
                        this.isLoading = false;
                    });
            }
            else{
                this.ImageBase64="images/demo/patrimoineLogo.png";
                this.isLoading = false;
            }
        }
        else{
            this.ImageBase64="images/demo/patrimoineLogo.png";
            this.isLoading = false;
        }
    }

    changeListener($event: any) : void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        let file:File = inputValue.files[0];
        if(!file) return;
        let myReader:FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.ImageBase64 = myReader.result;
        }
        myReader.readAsDataURL(file);
    }

    UpdateUserCompany(){
        this.isLoading = true;
        let company = {
            name:this.me.company.name,
            address:this.me.company.address,
            other_address:this.me.company.other_address,
            email:this.me.company.email,
            phone:this.me.company.phone,
            description:this.me.company.description,
            links:this.me.company.links,
            base64: this.ImageBase64,
            c_type:this.me.company.c_type,
            sub_category:this.me.company.sub_category
        }
        let params = {
            company:company,
            expertises:this.service.GetCheckedCheckboxes(this.Expertises),
            agrements:this.service.GetCheckedCheckboxes(this.Agreements)
        };
        this.service.UpdateMe(params)
        .subscribe((res:UserModel)=>{
            this.RefreshUser(res);
            this.changeCompanyOk = true;
        },
        (err)=>{
            this.changeCompanyErrMsg = "Input correct data!";
            this.changeCompanyErr = true;
            this.isLoading = false;
        })
    }

}