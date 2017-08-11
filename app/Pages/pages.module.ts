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
import { CreateNewsComponent } from './createNews/createNews.component';

@NgModule({
    imports:      [ CommonModule,FormsModule,RouterModule ],
    declarations: [
        AdsComponent, IndexComponent, UsersComponent, 
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent, NewsComponent,
        NewsDetailComponent, CreateNewsComponent
    ],
    exports: [
        AdsComponent, IndexComponent, UsersComponent,
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent,NewsComponent,
        NewsDetailComponent, CreateNewsComponent
    ],
    providers: [HttpService, PageAccessGuard]
})

export class PageModule { }