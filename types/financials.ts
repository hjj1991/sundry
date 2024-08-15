export type FinancialProductResponse = {
    content: FinancialProduct[]
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
};

export type FinancialProduct = {
    financialProductId: number;
    financialProductName: string;
    joinWay: string;
    postMaturityInterestRate: string;
    specialCondition: string;
    joinRestriction: string;
    financialProductType: string;
    joinMember: string;
    additionalNotes: string;
    maxLimit: number;
    dclsMonth: string;
    dclsStartDay: string;
    dclsEndDay: string;
    financialCompany: FinancialCompany
    financialProductOptions: FinancialProductOption[];
}

export type FinancialCompany = {
    dclsMonth: string;
    companyName: string;
    dclsChrgMan: string;
    hompUrl: string;
    calTel: string;
    financialGroupType: string;
}

export type FinancialProductOption = {
    interestRateType: string;
    reserveType: string | null;
    depositPeriodMonths: string;
    baseInterestRate: number | null;
    maximumInterestRate: number | null;
}

export type SearchParams = {
    financialGroupType: string;
    joinRestriction: string;
    depositPeriodMonths: string;
    financialProductType: string;
    page: string | "0";
    pageSize: string | "20";
}

export type GroupedOptions = {
    [interestRateType: string]: {
        [reserveType: string]: FinancialProductOption[];
    };
};