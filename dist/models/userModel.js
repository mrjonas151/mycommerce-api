"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = exports.User = void 0;
class User {
    constructor(payload) {
        Object.assign(this, payload);
    }
}
exports.User = User;
class Company {
    constructor(payload) {
        Object.assign(this, payload);
    }
}
exports.Company = Company;
