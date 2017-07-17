import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpService} from '../services/http.service';
import { FormsModule }   from '@angular/forms';

import {AdsComponent, IndexComponent, UsersComponent,
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent} from './index';

@NgModule({
    imports:      [ CommonModule,FormsModule ],
    declarations: [
        AdsComponent, IndexComponent, UsersComponent, 
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent
    ],
    exports: [
        AdsComponent, IndexComponent, UsersComponent,
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent
    ],
    providers: [HttpService]
})

export class PageModule { }