import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpService} from '../services/http.service';
import { FormsModule }   from '@angular/forms';

import { RouterModule } from "@angular/router";

import {AdsComponent, IndexComponent, UsersComponent,
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent} from './index';
import { PageAccessGuard } from './page.guards';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './newsDetail/newsDetail.components';

@NgModule({
    imports:      [ CommonModule,FormsModule,RouterModule ],
    declarations: [
        AdsComponent, IndexComponent, UsersComponent, 
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent, NewsComponent,
        NewsDetailComponent
    ],
    exports: [
        AdsComponent, IndexComponent, UsersComponent,
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent,NewsComponent,
        NewsDetailComponent
    ],
    providers: [HttpService, PageAccessGuard]
})

export class PageModule { }