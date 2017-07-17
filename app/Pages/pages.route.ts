import {
    AdsComponent, UsersComponent, IndexComponent,
    UserDetailComponent, AdsDetailComponent, LoginComponent,
    RegisterComponent, CreateAdComponent, MyAdsComponent,
    UnauthorizedComponent, NotFoundComponent} from "./index";

export const routs = [
    { path:"ads",component: AdsComponent },
    { path:"users",component: UsersComponent },
    { path:"users/:id",component:UserDetailComponent},
    { path:'ads/:id',component: AdsDetailComponent },
    { path:'login',component: LoginComponent },
    { path:'register',component: RegisterComponent },
    { path:'my_ads', component: MyAdsComponent},
    { path: 'create_ad', component: CreateAdComponent},
    { path:"", pathMatch : "full",component:IndexComponent },
    { path: "401", component: UnauthorizedComponent},
    { path: "404", component: NotFoundComponent},
    {path: "**", component:NotFoundComponent}
];