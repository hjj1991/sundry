'use client'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter } from "lucide-react";

export default function SearchField() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useRouter();

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== 'ALL') {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            params.set('page', '0');
            return params.toString();
        },
        [searchParams]
    );

    const handleInputChange = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const selectType = params.get('selectType') || 'companyName';
        if (value) {
            params.set(selectType, value);
        } else {
            params.delete(selectType);
        }
        params.set('page', '0');
        push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return (
        <div className="p-4 bg-card border rounded-lg shadow-sm">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="filters">
                    <AccordionTrigger>
                        <h3 className="text-lg font-medium flex items-center gap-2"><Filter className="w-5 h-5" />필터 및 정렬</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                            <div className="col-span-full md:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* 금융 그룹 */}
                                <Select onValueChange={(value) => push(`${pathname}?${createQueryString('financialGroupType', value)}`, { scroll: false })} defaultValue={searchParams.get('financialGroupType') || 'ALL'}>
                                    <SelectTrigger><SelectValue placeholder="금융 그룹" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">전체 그룹</SelectItem>
                                        <SelectItem value="BANK">은행</SelectItem>
                                        <SelectItem value="SAVING_BANK">저축은행</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* 금융 상품 유형 */}
                                <Select onValueChange={(value) => push(`${pathname}?${createQueryString('financialProductType', value)}`, { scroll: false })} defaultValue={searchParams.get('financialProductType') || 'ALL'}>
                                    <SelectTrigger><SelectValue placeholder="금융 상품 유형" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">전체 상품</SelectItem>
                                        <SelectItem value="SAVINGS">예금</SelectItem>
                                        <SelectItem value="INSTALLMENT_SAVINGS">적금</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-full md:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* 예치 기간 */}
                                <Select onValueChange={(value) => push(`${pathname}?${createQueryString('depositPeriodMonths', value)}`, { scroll: false })} defaultValue={searchParams.get('depositPeriodMonths') || 'ALL'}>
                                    <SelectTrigger><SelectValue placeholder="예치 기간" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">전체 기간</SelectItem>
                                        <SelectItem value="6">6개월</SelectItem>
                                        <SelectItem value="12">12개월</SelectItem>
                                        <SelectItem value="24">24개월</SelectItem>
                                        <SelectItem value="36">36개월</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* 가입 제한 */}
                                <Select onValueChange={(value) => push(`${pathname}?${createQueryString('joinRestriction', value)}`, { scroll: false })} defaultValue={searchParams.get('joinRestriction') || 'ALL'}>
                                    <SelectTrigger><SelectValue placeholder="가입 제한" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">전체</SelectItem>
                                        <SelectItem value="NO_RESTRICTION">제한없음</SelectItem>
                                        <SelectItem value="LOW_INCOME_ONLY">서민전용</SelectItem>
                                        <SelectItem value="PARTIALLY_RESTRICTED">일부제한</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* 정렬 */}
                            <div className="col-span-full">
                                <Select onValueChange={(value) => push(`${pathname}?${createQueryString('sort', value)}`, { scroll: false })} defaultValue={searchParams.get('sort') || undefined}>
                                    <SelectTrigger><SelectValue placeholder="정렬 기준" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">기본 정렬</SelectItem>
                                        <SelectItem value="options.maxRate,desc">최고 금리순</SelectItem>
                                        <SelectItem value="options.initRate,desc">기본 금리순</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="flex items-center space-x-2 mt-4">
                <Select onValueChange={(value) => push(`${pathname}?${createQueryString('selectType', value)}`, { scroll: false })} defaultValue={searchParams.get('selectType') || 'companyName'}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="검색 조건" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="companyName">회사명</SelectItem>
                        <SelectItem value="financialProductName">상품명</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    onChange={(e) => handleInputChange(e.target.value)}
                    defaultValue={searchParams.get(searchParams.get('selectType') || 'companyName') || ''}
                    className="w-full"
                    placeholder="검색어를 입력하세요..."
                />
            </div>
        </div>
    );
}