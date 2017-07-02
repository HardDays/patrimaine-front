"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UsersComponent = (function () {
    function UsersComponent() {
        this.Users = [{
                Id: 1,
                FullName: "User Name1",
                Logo: "../images/demo/imgr.gif",
                Phone: "+00393939393939",
                Email: "lorem@ipsum.com",
                Categories: ["Fintech", "Classique"],
                About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
                Rating: 4
            },
            {
                Id: 2,
                FullName: "User Name2",
                Logo: "../images/demo/imgr.gif",
                Phone: "+00393939393939",
                Email: "lorem@ipsum.com",
                Categories: ["Fintech", "Classique"],
                About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
                Rating: 4
            },
            {
                Id: 3,
                FullName: "User Name3",
                Logo: "../images/demo/imgr.gif",
                Phone: "+00393939393939",
                Email: "lorem@ipsum.com",
                Categories: ["Fintech", "Classique"],
                About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
                Rating: 4
            },
            {
                Id: 4,
                FullName: "User Name4",
                Logo: "../images/demo/imgr.gif",
                Phone: "+00393939393939",
                Email: "lorem@ipsum.com",
                Categories: ["Fintech", "Classique"],
                About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
                Rating: 4
            },
            {
                Id: 5,
                FullName: "User Name5",
                Logo: "../images/demo/imgr.gif",
                Phone: "+00393939393939",
                Email: "lorem@ipsum.com",
                Categories: ["Fintech", "Classique"],
                About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam nibh diam, sit amet pellentesque lacus porta id. Nunc at porttitor ante. Donec non magna vel nulla tristique elementum ac vitae lectus. Etiam mattis rutrum nunc, ut tempor ipsum. Ut ut odio orci. Maecenas quis sollicitudin ante, vel fermentum diam.",
                Rating: 4
            }];
    }
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        selector: "users",
        templateUrl: "app/Pages/users/users.component.html"
    })
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map