import {PageAccessGuard} from "./page.guards";
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './newsDetail/newsDetail.components';
import { CreateNewsComponent } from './createNews/createNews.component';
import { AdsComponent } from './ads/ads.component';
import { AdsDetailComponent } from './adsDetail/adsDetail.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './userDetail/userDetail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyAdsComponent } from './myAds/myAds.component';
import { CreateAdComponent } from './createAd/createAd.component';
import { IndexComponent } from './index/index.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { MyNewsComponent } from './myNews/myNews.component';
import { EditNewsComponent } from './editNews/editNews.component';
import { EditAdComponent } from './editAd/editAd.component';


export const routs = [
    { path:"ad_list",component: AdsComponent, name: 'ad_list' },
    { path:'ads/:id',component: AdsDetailComponent },
    { path:"users",component: UsersComponent },
    { path:"users/:id",component:UserDetailComponent},
    { path: "profile", component: ProfileComponent, canActivate: [PageAccessGuard]},
    { path:'login',component: LoginComponent },
    { path:'register',component: RegisterComponent },
    { path:'my_ads', component: MyAdsComponent, canActivate: [PageAccessGuard]},
    { path: 'create_ad', component: CreateAdComponent, canActivate: [PageAccessGuard]},
    { path: 'news_list', component: NewsComponent},
    { path: 'news/:id', component: NewsDetailComponent},
    { path: 'create_news', component: CreateNewsComponent, canActivate:[PageAccessGuard]},
    { path: 'edit_news/:id', component: EditNewsComponent, canActivate:[PageAccessGuard]},
    { path: 'edit_ads/:id', component: EditAdComponent, canActivate:[PageAccessGuard]},
    { path:'my_annonces',component: MyNewsComponent, canActivate: [PageAccessGuard]},
    { path:"", pathMatch : "full",component:IndexComponent },
    { path: "401", component: UnauthorizedComponent},
    { path: "404", component: NotFoundComponent},
    {path: "**", component:NotFoundComponent}
];