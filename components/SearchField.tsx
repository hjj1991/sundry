"use client"
import {ToggleGroup, ToggleGroupItem} from "../components/ui/toggle-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select";
import {Input} from "../components/ui/input";
import React from "react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export default function SearchField() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

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
        if(searchParams.has("companyName")) {
            setSelectType('companyName');
            setInputValue(searchParams.get("companyName") || "");
        }else if(searchParams.has('financialProductName')) {
            setSelectType('financialProductName');
            setInputValue(searchParams.get("financialProductName") || "")
        }else{
            setSelectType("")
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
            params.set(selectType, "")
        }
        params.set('page', '0');
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    function handleToggleChange(group: string, value: string) {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'ALL') {
            params.set(group, value);
        } else {
            params.delete(group);
        }
        params.set('page', '0');
        replace(`${pathname}?${params.toString()}`);
    }

    function handleSelectChange(value: string) {
        setSelectType(value);
        setInputValue("")
    }


    return (
        <div>
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <ToggleGroup type="single" value={financialGroupType}  onValueChange={(value) => handleToggleChange('financialGroupType', value)}>
                        <ToggleGroupItem value="ALL" aria-label="Toggle bold">
                            전체
                        </ToggleGroupItem>
                        <ToggleGroupItem value="BANK" aria-label="Toggle bold">
                            은행
                        </ToggleGroupItem>
                        <ToggleGroupItem value="SAVING_BANK" aria-label="Toggle bold">
                            저축은행
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <ToggleGroup type="single" value={depositPeriodMonths}  onValueChange={(value) => handleToggleChange('depositPeriodMonths', value)}>
                        <ToggleGroupItem value="ALL" aria-label="Toggle bold">
                            전체
                        </ToggleGroupItem>
                        <ToggleGroupItem value="6" aria-label="Toggle bold">
                            6개월
                        </ToggleGroupItem>
                        <ToggleGroupItem value="12" aria-label="Toggle italic">
                            12개월
                        </ToggleGroupItem>
                        <ToggleGroupItem value="24" aria-label="Toggle underline">
                            24개월
                        </ToggleGroupItem>
                        <ToggleGroupItem value="36" aria-label="Toggle underline">
                            36개월
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <ToggleGroup type="single" value={joinRestriction} onValueChange={(value) => handleToggleChange('joinRestriction', value)}>
                    <ToggleGroupItem value="ALL" aria-label="Toggle bold">
                        전체
                    </ToggleGroupItem>
                    <ToggleGroupItem value="NO_RESTRICTION" aria-label="Toggle bold">
                        제한없음
                    </ToggleGroupItem>
                    <ToggleGroupItem value="LOW_INCOME_ONLY" aria-label="Toggle italic">
                        서민전용
                    </ToggleGroupItem>
                    <ToggleGroupItem value="PARTIALLY_RESTRICTED" aria-label="Toggle underline">
                        일부제한
                    </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" value={financialProductType} onValueChange={(value) => handleToggleChange('financialProductType', value)}>
                    <ToggleGroupItem value="ALL" aria-label="Toggle bold">
                        전체
                    </ToggleGroupItem>
                    <ToggleGroupItem value="SAVINGS" aria-label="Toggle bold">
                        예금
                    </ToggleGroupItem>
                    <ToggleGroupItem value="INSTALLMENT_SAVINGS" aria-label="Toggle italic">
                        적금
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Select value={selectType} onValueChange={handleSelectChange}>
                    <SelectTrigger value="" className="w-[180px]">
                        <SelectValue placeholder="검색조건"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="companyName">회사명</SelectItem>
                        <SelectItem value="financialProductName">상품명</SelectItem>
                    </SelectContent>
                </Select>
                <Input onChange={(e) => {
                    setInputValue(e.target.value); // 입력된 값 바로 업데이트
                    debouncedHandleSearch(e.target.value); // 디바운싱 적용된 검색 호출
                }} value={inputValue} />
            </div>
        </div>
    )
}
