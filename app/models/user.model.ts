import { Component } from "@angular/core";

import {IUser} from "./user.interface";

export class UserModel{
    public Id:number;
    public FullName: string;
    public Phone: string;
    public Email: string;
    public Logo: string;
    public Categories: string[];
    public About: string;
    public Rating: number;

}