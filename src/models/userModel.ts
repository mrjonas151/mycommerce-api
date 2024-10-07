class User {
    user_id!: string;
    first_name!: string;
    last_name!: string;
    email!: string;
    phone?: string; 
    user_level!: string; 

    companies!: Company[]; 

    createdAt!: Date;
    updatedAt!: Date;

    constructor(payload: User) {
        Object.assign(this, payload);
    }
}

class Company {
    company_id!: string;
    company_name!: string; 
    cnpj!: string; 
    fantasy_name?: string; 
    tax_rate?: number; 
    userId!: string;

    createdAt!: Date;
    updatedAt!: Date;

    constructor(payload: Company) {
        Object.assign(this, payload);
    }
}

export { User, Company };
