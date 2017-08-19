"use strict";
var RegisterUserModel = (function () {
    function RegisterUserModel(email, password, first_name, last_name, phone) {
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
    }
    return RegisterUserModel;
}());
exports.RegisterUserModel = RegisterUserModel;
//# sourceMappingURL=register.user.model.js.map