"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const newUser = yield userService_1.UserService.createUserService(userData);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.user_id;
                const user = yield userService_1.UserService.getUserService(userId);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(404).json({ message: error.message });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.user_id;
                const userData = req.body;
                const updatedUser = yield userService_1.UserService.updateUserService(userId, userData);
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    static createCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyData = req.body;
                const newCompany = yield userService_1.UserService.createCompanyService(companyData);
                res.status(201).json(newCompany);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    static getCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyId = req.params.company_id;
                const company = yield userService_1.UserService.getCompanyService(companyId);
                res.status(200).json(company);
            }
            catch (error) {
                res.status(404).json({ message: error.message });
            }
        });
    }
    static updateCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyId = req.params.company_id;
                const companyData = req.body;
                const updatedCompany = yield userService_1.UserService.updateCompanyService(companyId, companyData);
                res.status(200).json(updatedCompany);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
