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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
class UserService {
    static createUserService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, first_name, last_name, email, phone, user_level, } = data;
            if (!user_id || !email) {
                throw new Error("ID or Email is missing");
            }
            const userAlreadyExists = yield prismaClient_1.default.user.findFirst({
                where: { email }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            const user = yield prismaClient_1.default.user.create({
                data: {
                    user_id,
                    first_name,
                    last_name,
                    email,
                    phone: phone !== null && phone !== void 0 ? phone : null,
                    user_level,
                },
                select: {
                    user_id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    user_level: true,
                }
            });
            return user;
        });
    }
    static getUserService(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user_id) {
                throw new Error("User ID is missing");
            }
            const user = yield prismaClient_1.default.user.findFirst({
                where: { user_id },
                select: {
                    user_id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    phone: true,
                    user_level: true,
                    companies: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    static updateUserService(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            if (!user_id) {
                throw new Error("User ID is missing");
            }
            const userExists = yield prismaClient_1.default.user.findFirst({
                where: { user_id }
            });
            if (!userExists) {
                throw new Error("User not found");
            }
            const updatedUser = yield prismaClient_1.default.user.update({
                where: { user_id },
                data: {
                    first_name: (_a = data.first_name) !== null && _a !== void 0 ? _a : userExists.first_name,
                    last_name: (_b = data.last_name) !== null && _b !== void 0 ? _b : userExists.last_name,
                    email: (_c = data.email) !== null && _c !== void 0 ? _c : userExists.email,
                    phone: (_d = data.phone) !== null && _d !== void 0 ? _d : userExists.phone,
                    user_level: (_e = data.user_level) !== null && _e !== void 0 ? _e : userExists.user_level,
                },
                select: {
                    user_id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    phone: true,
                    user_level: true,
                    updatedAt: true,
                }
            });
            return updatedUser;
        });
    }
    static createCompanyService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_name, cnpj, fantasy_name, tax_rate, userId } = data;
            if (!company_name || !cnpj || !userId) {
                throw new Error("Company name, CNPJ or User ID is missing");
            }
            const companyAlreadyExists = yield prismaClient_1.default.company.findFirst({
                where: { cnpj }
            });
            if (companyAlreadyExists) {
                throw new Error("Company with this CNPJ already exists");
            }
            const newCompany = yield prismaClient_1.default.company.create({
                data: {
                    company_name,
                    cnpj,
                    fantasy_name: fantasy_name !== null && fantasy_name !== void 0 ? fantasy_name : null,
                    tax_rate: tax_rate !== null && tax_rate !== void 0 ? tax_rate : null,
                    userId,
                },
                select: {
                    company_id: true,
                    company_name: true,
                    cnpj: true,
                    fantasy_name: true,
                    tax_rate: true,
                    userId: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
            return newCompany;
        });
    }
    static getCompanyService(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!company_id) {
                throw new Error("Company ID is missing");
            }
            const company = yield prismaClient_1.default.company.findFirst({
                where: { company_id },
                select: {
                    company_id: true,
                    company_name: true,
                    cnpj: true,
                    fantasy_name: true,
                    tax_rate: true,
                    userId: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
            if (!company) {
                throw new Error("Company not found");
            }
            return company;
        });
    }
    static updateCompanyService(company_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (!company_id) {
                throw new Error("Company ID is missing");
            }
            const companyExists = yield prismaClient_1.default.company.findFirst({
                where: { company_id }
            });
            if (!companyExists) {
                throw new Error("Company not found");
            }
            const updatedCompany = yield prismaClient_1.default.company.update({
                where: { company_id },
                data: {
                    company_name: (_a = data.company_name) !== null && _a !== void 0 ? _a : companyExists.company_name,
                    cnpj: (_b = data.cnpj) !== null && _b !== void 0 ? _b : companyExists.cnpj,
                    fantasy_name: (_c = data.fantasy_name) !== null && _c !== void 0 ? _c : companyExists.fantasy_name,
                    tax_rate: (_d = data.tax_rate) !== null && _d !== void 0 ? _d : companyExists.tax_rate,
                },
                select: {
                    company_id: true,
                    company_name: true,
                    cnpj: true,
                    fantasy_name: true,
                    tax_rate: true,
                    updatedAt: true,
                }
            });
            return updatedCompany;
        });
    }
}
exports.UserService = UserService;
