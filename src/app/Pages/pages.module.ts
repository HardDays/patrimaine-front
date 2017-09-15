import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpService} from '../services/http.service';
import { FormsModule }   from '@angular/forms';

import { RouterModule } from "@angular/router";


import { PageAccessGuard } from './page.guards';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './newsDetail/newsDetail.components';
import { CreateNewsComponent } from './createNews/createNews.component';
import { AdsComponent } from './ads/ads.component';
import { IndexComponent } from './index/index.component';
import { UsersComponent } from './users/users.component';
import { AdsDetailComponent } from './adsDetail/adsDetail.component';
import { UserDetailComponent } from './userDetail/userDetail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateAdComponent } from './createAd/createAd.component';
import { MyAdsComponent } from './myAds/myAds.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { MyNewsComponent } from './myNews/myNews.component';
import { CookieService } from 'ng2-cookies';
import { ProfileComponent } from './profile/profile.component';
import { TinymceModule } from 'angular2-tinymce';
import { EditNewsComponent } from './editNews/editNews.component';
import { EditAdComponent } from './editAd/editAd.component';
import { CreateReviewComponent } from './createReview/createReview.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { EditReviewComponent } from './editReview/editReview.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    imports:      [ CommonModule,FormsModule,RouterModule,TinymceModule.withConfig({ }) ],
    declarations: [
        AdsComponent, IndexComponent, UsersComponent, 
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent, NewsComponent,
        NewsDetailComponent, CreateNewsComponent, MyNewsComponent,
        ProfileComponent,EditNewsComponent, EditAdComponent, CreateReviewComponent,
        ReviewsComponent, EditReviewComponent,AboutComponent
    ],
    exports: [
        AdsComponent, IndexComponent, UsersComponent,
        AdsDetailComponent, UserDetailComponent, LoginComponent,
        RegisterComponent, CreateAdComponent, MyAdsComponent,
        UnauthorizedComponent, NotFoundComponent,NewsComponent,
        NewsDetailComponent, CreateNewsComponent, MyNewsComponent,
        ProfileComponent,EditNewsComponent, EditAdComponent,CreateReviewComponent,
        ReviewsComponent, EditReviewComponent,AboutComponent
    ],
    providers: [HttpService, PageAccessGuard,CookieService]
})

export class PageModule { }