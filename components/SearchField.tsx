"use client";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export default function SearchField() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {push} = useRouter();

    const [financialGroupType, setFinancialGroupType] = React.useState("ALL");
    const [depositPeriodMonths, setDepositPeriodMonths] = React.useState("ALL");
    const [joinRestriction, setJoinRestriction] = React.useState("ALL");
    const [financialProductType, setFinancialProductType] = React.useState("ALL");
    const [selectType, setSelectType] = React.useState("ALL");
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        setFinancialGroupType(searchParams.get("financialGroupType") || "ALL");
        setDepositPeriodMonths(searchParams.get("depositPeriodMonths") || "ALL");
        setJoinRestriction(searchParams.get("joinRestriction") || "ALL");
        setFinancialProductType(searchParams.get("financialProductType") || "ALL");
        if (searchParams.has("companyName")) {
            setSelectType('companyName');
            setInputValue(searchParams.get("companyName") || "");
        } else if (searchParams.has('financialProductName')) {
            setSelectType('financialProductName');
            setInputValue(searchParams.get("financialProductName") || "");
        } else {
            setSelectType("");
        }
    }, [searchParams]);

    const debouncedHandleSearch = useDebouncedCallback((inputValue: string) => {
        const params = new URLSearchParams(searchParams);
        setInputValue(inputValue);
        if (inputValue && selectType) {
            params.delete("companyName");
            params.delete("financialProductName");
            params.set(selectType, inputValue);
        } else if (selectType && !inputValue) {
            params.set(selectType, "");
        }
        params.set('page', '0');
        push(`${pathname}?${params.toString()}`, {scroll: false});
    }, 500);

    function handleToggleChange(group: string, value: string) {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'ALL') {
            params.set(group, value);
        } else {
            params.delete(group);
        }
        params.set('page', '0');
        push(`${pathname}?${params.toString()}`, {scroll: false});
    }

    function handleSelectChange(value: string) {
        setSelectType(value);
        setInputValue("");
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-medium">금융 그룹</label>
                    <div className="flex flex-wrap gap-2">
                        <ToggleGroup type="single" value={financialGroupType}
                                     onValueChange={(value) => handleToggleChange('financialGroupType', value)}>
                            <ToggleGroupItem value="ALL"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                전체
                            </ToggleGroupItem>
                            <ToggleGroupItem value="BANK"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                은행
                            </ToggleGroupItem>
                            <ToggleGroupItem value="SAVING_BANK"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                저축은행
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-medium">예치 기간</label>
                    <div className="flex flex-wrap gap-2">
                        <ToggleGroup type="single" value={depositPeriodMonths}
                                     onValueChange={(value) => handleToggleChange('depositPeriodMonths', value)}>
                            <ToggleGroupItem value="ALL"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                전체
                            </ToggleGroupItem>
                            <ToggleGroupItem value="6"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                6개월
                            </ToggleGroupItem>
                            <ToggleGroupItem value="12"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                12개월
                            </ToggleGroupItem>
                            <ToggleGroupItem value="24"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                24개월
                            </ToggleGroupItem>
                            <ToggleGroupItem value="36"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                36개월
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-medium">가입 제한</label>
                    <div className="flex flex-wrap gap-2">
                        <ToggleGroup type="single" value={joinRestriction}
                                     onValueChange={(value) => handleToggleChange('joinRestriction', value)}>
                            <ToggleGroupItem value="ALL"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                전체
                            </ToggleGroupItem>
                            <ToggleGroupItem value="NO_RESTRICTION"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                제한없음
                            </ToggleGroupItem>
                            <ToggleGroupItem value="LOW_INCOME_ONLY"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                서민전용
                            </ToggleGroupItem>
                            <ToggleGroupItem value="PARTIALLY_RESTRICTED"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                일부제한
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-medium">금융 상품 유형</label>
                    <div className="flex flex-wrap gap-2">
                        <ToggleGroup type="single" value={financialProductType}
                                     onValueChange={(value) => handleToggleChange('financialProductType', value)}>
                            <ToggleGroupItem value="ALL"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                전체
                            </ToggleGroupItem>
                            <ToggleGroupItem value="SAVINGS"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                예금
                            </ToggleGroupItem>
                            <ToggleGroupItem value="INSTALLMENT_SAVINGS"
                                             className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 max-sm:text-xs">
                                적금
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Select value={selectType} onValueChange={handleSelectChange}>
                    <SelectTrigger
                        className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                        <SelectValue placeholder="검색조건"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="companyName">회사명</SelectItem>
                        <SelectItem value="financialProductName">상품명</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    onChange={(e) => {
                        setInputValue(e.target.value); // 입력된 값 바로 업데이트
                        debouncedHandleSearch(e.target.value); // 디바운싱 적용된 검색 호출
                    }}
                    value={inputValue}
                    className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
                    placeholder="검색어를 입력하세요"
                />
            </div>
        </div>
    );
}
