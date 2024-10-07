import prisma from "../prisma/prismaClient";
import { User, Company } from "../models/userModel";

class UserService {
    static async createUserService(data: User) {
        const {
            user_id,
            first_name,
            last_name,
            email,
            phone,
            user_level,
        } = data;

        if (!user_id || !email) {
            throw new Error("ID or Email is missing");
        }

        const userAlreadyExists = await prisma.user.findFirst({
            where: { email }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = await prisma.user.create({
            data: {
                user_id,
                first_name,
                last_name,
                email,
                phone: phone ?? null,
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
    }

    static async getUserService(user_id: string) {
        if (!user_id) {
            throw new Error("User ID is missing");
        }

        const user = await prisma.user.findFirst({
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
    }

    static async updateUserService(user_id: string, data: Partial<User>) {
        if (!user_id) {
            throw new Error("User ID is missing");
        }

        const userExists = await prisma.user.findFirst({
            where: { user_id }
        });

        if (!userExists) {
            throw new Error("User not found");
        }

        const updatedUser = await prisma.user.update({
            where: { user_id },
            data: {
                first_name: data.first_name ?? userExists.first_name,
                last_name: data.last_name ?? userExists.last_name,
                email: data.email ?? userExists.email,
                phone: data.phone ?? userExists.phone,
                user_level: data.user_level ?? userExists.user_level,
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
    }

    static async createCompanyService(data: Company) {
        const { company_name, cnpj, fantasy_name, tax_rate, userId } = data;

        if (!company_name || !cnpj || !userId) {
            throw new Error("Company name, CNPJ or User ID is missing");
        }

        const companyAlreadyExists = await prisma.company.findFirst({
            where: { cnpj }
        });

        if (companyAlreadyExists) {
            throw new Error("Company with this CNPJ already exists");
        }

        const newCompany = await prisma.company.create({
            data: {
                company_name,
                cnpj,
                fantasy_name: fantasy_name ?? null,
                tax_rate: tax_rate ?? null,
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
    }

    static async getCompanyService(company_id: string) {
        if (!company_id) {
            throw new Error("Company ID is missing");
        }

        const company = await prisma.company.findFirst({
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
    }

    static async updateCompanyService(company_id: string, data: Partial<Company>) {
        if (!company_id) {
            throw new Error("Company ID is missing");
        }

        const companyExists = await prisma.company.findFirst({
            where: { company_id }
        });

        if (!companyExists) {
            throw new Error("Company not found");
        }

        const updatedCompany = await prisma.company.update({
            where: { company_id },
            data: {
                company_name: data.company_name ?? companyExists.company_name,
                cnpj: data.cnpj ?? companyExists.cnpj,
                fantasy_name: data.fantasy_name ?? companyExists.fantasy_name,
                tax_rate: data.tax_rate ?? companyExists.tax_rate,
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
    }
}

export { UserService };
