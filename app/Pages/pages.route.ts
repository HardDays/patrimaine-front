import {
    AdsComponent, UsersComponent, IndexComponent,
    UserDetailComponent, AdsDetailComponent, LoginComponent,
    RegisterComponent, CreateAdComponent, MyAdsComponent,
    UnauthorizedComponent, NotFoundComponent} from "./index";
import {PageAccessGuard} from "./page.guards";
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './newsDetail/newsDetail.components';
import { CreateNewsComponent } from './createNews/createNews.component';

export const routs = [
    { path:"ad_list",component: AdsComponent, name: 'ad_list', canActivate: [PageAccessGuard] },
    { path:'ads/:id',component: AdsDetailComponent, canActivate: [PageAccessGuard] },
    { path:"users",component: UsersComponent, canActivate: [PageAccessGuard] },
    { path:"users/:id",component:UserDetailComponent, canActivate: [PageAccessGuard]},
    { path:'login',component: LoginComponent },
    { path:'register',component: RegisterComponent },
    { path:'my_ads', component: MyAdsComponent, canActivate: [PageAccessGuard]},
    { path: 'create_ad', component: CreateAdComponent, canActivate: [PageAccessGuard]},
    { path: 'news_list', component: NewsComponent, canActivate: [PageAccessGuard]},
    { path: 'news/:id', component: NewsDetailComponent, canActivate:[PageAccessGuard]},
    { path: 'create_news', component: CreateNewsComponent, canActivate:[PageAccessGuard]},
    { path:"", pathMatch : "full",component:IndexComponent },
    { path: "401", component: UnauthorizedComponent},
    { path: "404", component: NotFoundComponent},
    {path: "**", component:NotFoundComponent}
];