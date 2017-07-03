import {AdsComponent, UsersComponent, IndexComponent, UserDetailComponent, AdsDetailComponent} from "./index";

export const routs = [
    { path:"ads",component: AdsComponent },
    { path:"users",component: UsersComponent },
    { path:"users/:id",component: UserDetailComponent },
    { path:'ads/:id',component: AdsDetailComponent },
    { path:"", pathMatch : "full",component:IndexComponent },
    {path: "**", redirectTo: "/"}
];