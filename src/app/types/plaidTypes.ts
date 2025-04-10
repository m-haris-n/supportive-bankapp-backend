export interface PlaidTransaction {
    id: string;
    account: string;
    amount: number;
    date: string;
    name: string;
    merchant_name: string;
    payment_channel: string;
    personal_finance_category: string;
    personal_finance_category_detailed: string;
    category: string | string[];
    currency: string;
    pending: boolean;
}

export interface PlaidAccount {
    id: string;
    name: string;
    official_name: string;
    type: string;
    subtype: string;
    available_balance: number;
    current_balance: number;
    currency: string;
}


