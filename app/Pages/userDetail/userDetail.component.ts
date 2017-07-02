import { Component } from "@angular/core";

import { UserModel, IUser } from "./../index";

@Component({
    selector: "userDetail",
    templateUrl: "app/Pages/userDetail/userDetail.component.html"
})

export class UserDetailComponent{
    User : UserModel = {
        Id:1,
        FullName: "User Name",
        Logo: "../images/demo/imgr.gif",
        Phone: "+00393939393939",
        Email: "lorem@ipsum.com",
        Categories: ["Fintech","Classique"],
        About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
        Rating: 4
    };

}