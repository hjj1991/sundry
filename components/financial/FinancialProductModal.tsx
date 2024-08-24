import React, {useEffect, useRef} from 'react';
import {FinancialProduct, FinancialProductOption, GroupedOptions} from "@/types/financials";
import {Share2} from 'lucide-react'; // 아이콘 추가

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: FinancialProduct;
}

export function FinancialProductModal({isOpen, onClose, data}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !data) return null;

    const groupedOptions: GroupedOptions = groupOptionsByType(data.financialProductOptions);
    const {financialCompany, postMaturityInterestRate, additionalNotes, specialCondition} = data;

    // URL 복사 함수
    const shareUrl = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('URL이 클립보드에 복사되었습니다!');
            })
            .catch(err => {
                console.error('URL 복사 실패:', err);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full relative max-h-screen overflow-y-auto"
                style={{maxHeight: '90vh'}}
            >
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    {/* URL 복사 버튼 추가 */}

                    <button
                        onClick={shareUrl}
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                        aria-label="Share URL"
                    >
                        <Share2 className="mr-2" size={20}/> {/* 아이콘 추가 */}
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">{data.financialProductName}</h2>
                <div className="space-y-4 mb-6">
                    <p><strong className="text-gray-700 dark:text-gray-300">가입 방법:</strong> {data.joinWay}</p>
                    <p><strong className="text-gray-700 dark:text-gray-300">가입 제한:</strong> {data.joinRestriction}</p>
                    <p><strong className="text-gray-700 dark:text-gray-300">상품 유형:</strong> {data.financialProductType}
                    </p>
                    <p><strong className="text-gray-700 dark:text-gray-300">가입 대상:</strong> {data.joinMember}</p>
                </div>

                {/* 특별 조건 섹션 */}
                <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">특별 조건</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{specialCondition}</p>
                </div>

                {/* 만기 후 이율 및 추가 사항 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">만기 후 이율</h3>
                        <p className="text-gray-700 dark:text-gray-300">{postMaturityInterestRate}</p>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">추가 사항</h3>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{additionalNotes}</p>
                    </div>
                </div>

                {/* 회사 정보 섹션 */}
                <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">회사 정보</h3>
                    <p><strong className="text-gray-700 dark:text-gray-300">회사명:</strong> {financialCompany.companyName}
                    </p>
                    <p><strong className="text-gray-700 dark:text-gray-300">공시 월:</strong> {financialCompany.dclsMonth}
                    </p>
                    <p><strong className="text-gray-700 dark:text-gray-300">담당자:</strong> {financialCompany.dclsChrgMan}
                    </p>
                    <p><strong className="text-gray-700 dark:text-gray-300">홈페이지:</strong> <a
                        href={financialCompany.hompUrl} target="_blank" rel="noopener noreferrer"
                        className="text-teal-500 hover:underline">{financialCompany.hompUrl}</a></p>
                    <p><strong className="text-gray-700 dark:text-gray-300">전화번호:</strong> {financialCompany.calTel}</p>
                    <p><strong
                        className="text-gray-700 dark:text-gray-300">유형:</strong> {financialCompany.financialGroupType}
                    </p>
                </div>

                {/* 이율 옵션 테이블 */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">이율 옵션</h3>
                    <div className="overflow-x-auto">
                        {Object.entries(groupedOptions).map(([interestRateType, reserveGroups]) => (
                            <div key={interestRateType} className="mb-6">
                                <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{interestRateType} 이율</h4>
                                {Object.entries(reserveGroups).map(([reserveType, options]) => (
                                    <div key={reserveType} className="mb-4">
                                        <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                            {reserveType === 'null' ? '' : reserveType} 적립식
                                        </h5>
                                        <table
                                            className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                                            <thead>
                                            <tr className="bg-gray-200 dark:bg-gray-600">
                                                <th className="py-3 px-4 border-b text-left text-gray-700 dark:text-gray-300">개월수</th>
                                                <th className="py-3 px-4 border-b text-left text-gray-700 dark:text-gray-300">기본
                                                    이율 (%)
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-gray-700 dark:text-gray-300">최대
                                                    우대 이율 (%)
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {options.map((option, index) => (
                                                <tr key={index}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
                                                    <td className="py-2 px-4 border-b text-gray-900 dark:text-gray-100">{option.depositPeriodMonths} 개월</td>
                                                    <td className="py-2 px-4 border-b text-gray-900 dark:text-gray-100">{option.baseInterestRate?.toFixed(2)} %</td>
                                                    <td className="py-2 px-4 border-b text-gray-900 dark:text-gray-100">{option.maximumInterestRate?.toFixed(2)} %</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                    닫기
                </button>
            </div>
        </div>
    )
        ;
}

const groupOptionsByType = (options: FinancialProductOption[]): GroupedOptions => {
    const groupedOptions: GroupedOptions = {};

    options.forEach(option => {
        const {interestRateType, reserveType} = option;

        if (!groupedOptions[interestRateType]) {
            groupedOptions[interestRateType] = {};
        }

        const key = reserveType || 'null'; // null 값을 'null'로 변환하여 키로 사용

        if (!groupedOptions[interestRateType][key]) {
            groupedOptions[interestRateType][key] = [];
        }

        groupedOptions[interestRateType][key].push(option);
    });

    return groupedOptions;
};
