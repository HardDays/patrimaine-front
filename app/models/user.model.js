"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel = (function () {
    function UserModel(id, email, first_name, last_name, phone, created_at, updated_at, company) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.company = company;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map