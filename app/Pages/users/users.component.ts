import { Component } from "@angular/core";

import { UserModel} from "./../index";

@Component({
    selector: "users",
    templateUrl: "app/Pages/users/users.component.html"
})

export class UsersComponent{
    Users : UserModel[] = [{
        Id:1,
        FullName: "User Name1",
        Logo: "../images/demo/imgr.gif",
        Phone: "+00393939393939",
        Email: "lorem@ipsum.com",
        Categories: ["Fintech","Classique"],
        About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
        Rating: 4
    },
    {
        Id:2,
        FullName: "User Name2",
        Logo: "../images/demo/imgr.gif",
        Phone: "+00393939393939",
        Email: "lorem@ipsum.com",
        Categories: ["Fintech","Classique"],
        About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
        Rating: 4
    },
    {
        Id:3,
        FullName: "User Name3",
        Logo: "../images/demo/imgr.gif",
        Phone: "+00393939393939",
        Email: "lorem@ipsum.com",
        Categories: ["Fintech","Classique"],
        About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
        Rating: 4
    },
    {
        Id:4,
        FullName: "User Name4",
        Logo: "../images/demo/imgr.gif",
        Phone: "+00393939393939",
        Email: "lorem@ipsum.com",
        Categories: ["Fintech","Classique"],
        About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
        Rating: 4
    },
    {
        Id:5,
        FullName: "User Name5",
        Logo: "../images/demo/imgr.gif",
        Phone: "+00393939393939",
        Email: "lorem@ipsum.com",
        Categories: ["Fintech","Classique"],
        About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
        Rating: 4
    }];
}