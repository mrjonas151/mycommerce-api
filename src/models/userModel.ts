

class User {
    user_id!: string;
    nickname!: string;
    registration_date!: string;
    first_name!: string;
    last_name!: string;
    gender!: string;
    country_id!: string;
    email!: string;
    identification!: {
        number: string;
        type: string;
    };
    address!: {
        address: string;
        city: string;
        state: string;
        zip_code: string;
    };
    phone!: {
        area_code: string | null;
        extension: string | null;
        number: string | null;
        verified: boolean;
    };
    alternative_phone!: {
        area_code: string;
        extension: string;
        number: string;
    };
    user_type!: string;
    tags!: string[];
    logo!: string | null;
    points!: number;
    site_id!: string;
    permalink!: string;
    seller_experience!: string;
    bill_data!: {
        accept_credit_note: string;
    };
    seller_reputation!: {
        level_id: string;
        power_seller_status: string;
        transactions: {
            canceled: number;
            completed: number;
            period: string;
            ratings: {
                negative: number;
                neutral: number;
                positive: number;
            };
            total: number;
        };
        metrics: {
            sales: {
                period: string;
                completed: number;
            };
            claims: {
                period: string;
                rate: number;
                value: number;
            };
            delayed_handling_time: {
                period: string;
                rate: number;
                value: number;
            };
            cancellations: {
                period: string;
                rate: number;
                value: number;
            };
        };
    };
    buyer_reputation!: {
        canceled_transactions: number;
        tags: string[];
        transactions: {
            canceled: {
                paid: number | null;
                total: number | null;
            };
            completed: number | null;
            not_yet_rated: {
                paid: number | null;
                total: number | null;
                units: number | null;
            };
            period: string;
            total: number | null;
            unrated: {
                paid: number | null;
                total: number | null;
            };
        };
    };
    status!: {
        billing: {
            allow: boolean;
            codes: string[];
        };
        buy: {
            allow: boolean;
            codes: string[];
            immediate_payment: {
                reasons: string[];
                required: boolean;
            };
        };
        confirmed_email: boolean;
        shopping_cart: {
            buy: string;
            sell: string;
        };
        immediate_payment: boolean;
        list: {
            allow: boolean;
            codes: string[];
            immediate_payment: {
                reasons: string[];
                required: boolean;
            };
        };
        mercadoenvios: string;
        mercadopago_account_type: string;
        mercadopago_tc_accepted: boolean;
        required_action: string;
        sell: {
            allow: boolean;
            codes: string[];
            immediate_payment: {
                reasons: string[];
                required: boolean;
            };
        };
        site_status: string;
        user_type: string;
        restrictions_coliving: {
            verification_status: string;
            user_tags: string[];
            user_internal_tags: string[];
            user_status_attributes: string[];
        };
    };
    secure_email!: string;
    company!: {
        brand_name: string;
        city_tax_id: string;
        corporate_name: string;
        identification: string;
        state_tax_id: string;
        cust_type_id: string;
        soft_descriptor: string;
    };
    credit!: {
        consumed: number;
        credit_level_id: string;
        rank: string;
    };
    context!: {
        ip_address: string;
    };
    thumbnail!: {
        picture_id: string;
        picture_url: string;
    };
    registration_identifiers!: any[];

    constructor(payload: User) {
        Object.assign(this, payload);
    }
}

export { User };
