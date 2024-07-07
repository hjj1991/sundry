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
    financialProductCode: string;
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
    financialCompanyId: number;
    financialCompanyCode: string;
    dclsMonth: string;
    companyName: string;
    dclsChrgMan: string;
    hompUrl: string;
    calTel: string;
    financialGroupType: string;
}

export type FinancialProductOption = {
    financialProductOptionId: number;
    interestRateType: string;
    reserveType: string;
    depositPeriodMonths: string;
    baseInterestRate: number;
    maximumInterestRate: number | null;
}