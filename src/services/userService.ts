import prisma from "../prisma/prismaClient";
import { User } from "../models/userModel";



class UserService {
    static async createUserService(data: User) {
        const {
            user_id, nickname, first_name, last_name, gender, 
            country_id: countryId, email, identification, 
            address,  // Agora, apenas verificamos se o campo `address` existe
            phone, alternative_phone, 
            user_type, tags, logo, points, site_id, permalink, seller_experience, 
            bill_data, seller_reputation, buyer_reputation, status, secure_email, 
            company, credit, context, thumbnail, registration_identifiers
        } = data;
        
        const registration_date = new Date(); 
        const country_id = countryId ? parseInt(countryId, 10) : null;

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
                nickname: nickname ?? null,
                first_name,
                last_name,
                gender: gender ?? null,
                country_id,
                email,
                identification_type: identification?.type ?? null,  // Verifica se `identification` existe
                identification_number: identification?.number ?? null,  // Verifica se `identification` existe
                address: address?.address ?? null,  // Verifica se `address` existe
                phone_area_code: phone?.area_code ?? null,  // Verifica se `phone` existe
                phone_number: phone?.number ?? null,
                phone_verified: phone?.verified ?? false,
                alternative_phone_area_code: alternative_phone?.area_code ?? null,
                alternative_phone_number: alternative_phone?.number ?? null,
                user_type: user_type ?? null,
                tags: tags?.join(",") ?? null,
                logo: logo ?? null,
                points: points ?? 0,
                site_id: site_id ?? null,
                permalink: permalink ?? null,
                seller_experience: seller_experience ?? null,
                bill_data: bill_data ? JSON.stringify(bill_data) : null,
                seller_reputation: seller_reputation ? JSON.stringify(seller_reputation) : null,
                buyer_reputation: buyer_reputation ? JSON.stringify(buyer_reputation) : null,
                status: status ? JSON.stringify(status) : null,
                secure_email: Boolean(secure_email),
                company: company ? JSON.stringify(company) : null,
                credit: credit ?? null,
                context: context ? JSON.stringify(context) : null,
                thumbnail: thumbnail?.picture_url ?? null,
                registration_identifiers: registration_identifiers?.join(",") ?? null
            },
            select: {
                email: true,
                nickname: true,
                first_name: true,
                last_name: true,
            }
        });

        return user;
    }


    static async getUserService(user_id: string) {
        if (!user_id) {
            throw new Error("User ID is missing");
        }

        const user = await prisma.user.findFirst({
            where: { user_id: user_id },
            select: {
                user_id: true,
                email: true,
                nickname: true,
                first_name: true,
                last_name: true,
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}

export { UserService };
