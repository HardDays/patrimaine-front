import {AdsComponent, UsersComponent, IndexComponent, UserDetailComponent, AdsDetailComponent} from "./index";

export const routs = [
    { path:"ads",component: AdsComponent },
    { path:"users",component: UsersComponent },
    { path:"", pathMatch : "full",component:IndexComponent },
    { path:"user_detail",component: UserDetailComponent },
    { path:"ads_detail",component: AdsDetailComponent }
];