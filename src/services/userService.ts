import prisma from "../prisma/prismaClient";
import { User } from "../models/userModel";



class UserService {
    static async createUserService(data: User) {
        const {
            user_id, nickname, first_name, last_name, gender, 
            country_id: countryId, email, identification, 
            address: { address },
            phone, alternative_phone, 
            user_type, tags, logo, points, site_id, permalink, seller_experience, 
            bill_data, seller_reputation, buyer_reputation, status, secure_email, 
            company, credit, context, thumbnail, registration_identifiers
        } = data;
        
        const registration_date = new Date(); 
        
        const country_id = parseInt(countryId, 10);

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
                nickname,
                first_name,
                last_name,
                gender,
                country_id,
                email,
                identification_type: identification.type,
                identification_number: identification.number, 
                address,
                 phone_area_code: phone?.area_code,
                phone_number: phone?.number, 
                phone_verified: phone?.verified ?? false,
                alternative_phone_area_code: alternative_phone?.area_code, 
                alternative_phone_number: alternative_phone?.number, 
                user_type,
                tags: tags.join(","),
                logo,
                points,
                site_id,
                permalink,
                seller_experience,
                bill_data: JSON.stringify(bill_data),
                seller_reputation: JSON.stringify(seller_reputation),
                buyer_reputation: JSON.stringify(buyer_reputation),
                status: JSON.stringify(status),
                secure_email: Boolean(secure_email),
                company: JSON.stringify(company),
                credit,
                context: JSON.stringify(context),
                thumbnail:thumbnail.picture_url,
                registration_identifiers: registration_identifiers.join(",")
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
