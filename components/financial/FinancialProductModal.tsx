import React, { useEffect, useRef } from 'react';
import { FinancialProduct } from '@/types/financials';
import {
  BadgeCheck,
  Calendar,
  ClipboardCopy,
  Info,
  Paperclip,
  PiggyBank,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FinancialProduct;
}

export function FinancialProductModal({ isOpen, onClose, data }: ModalProps) {
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

  const maxRate = Math.max(...data.financialProductOptions.map(o => o.maximumInterestRate || 0));

  const shareUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert('URL이 클립보드에 복사되었습니다!'))
      .catch(err => console.error('URL 복사 실패:', err));
  };

  const DetailItem = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="flex items-start space-x-4 py-3">
      <div className="flex-shrink-0 text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{label}</p>
        <div className="text-muted-foreground text-sm whitespace-pre-line">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        className="bg-background p-8 rounded-2xl shadow-2xl max-w-3xl w-full relative border max-h-[90vh] flex flex-col"
      >
        <div className="flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant="secondary">{data.financialProductType}</Badge>
                <h2 className="text-3xl font-bold text-foreground">{data.financialProductName}</h2>
              </div>
              <p className="text-base text-muted-foreground">{data.financialCompany.companyName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={shareUrl}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share URL"
              >
                <ClipboardCopy size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="my-8 p-6 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">최고 연</p>
            <p className={cn('text-6xl font-bold', maxRate > 5 ? 'text-primary' : 'text-foreground')}>
              {maxRate.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">상품 상세</TabsTrigger>
              <TabsTrigger value="rates">금리 정보</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="divide-y">
                <DetailItem icon={<Info size={20} />} label="가입 방법">
                  {data.joinWay}
                </DetailItem>
                <DetailItem icon={<UserCheck size={20} />} label="가입 대상">
                  {data.joinMember}
                </DetailItem>
                <DetailItem icon={<Sparkles size={20} />} label="우대 조건">
                  {data.specialCondition}
                </DetailItem>
                <DetailItem icon={<Calendar size={20} />} label="만기 후 이자율">
                  {data.postMaturityInterestRate}
                </DetailItem>
                <DetailItem icon={<Paperclip size={20} />} label="기타 유의사항">
                  {data.additionalNotes}
                </DetailItem>
              </div>
            </TabsContent>
            <TabsContent value="rates" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">저축 기간</TableHead>
                    <TableHead className="text-center">기본 금리</TableHead>
                    <TableHead className="text-center">최고 금리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.financialProductOptions.map((option, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{option.depositPeriodMonths}개월</TableCell>
                      <TableCell className="text-center">{option.baseInterestRate?.toFixed(2)}%</TableCell>
                      <TableCell className="text-center font-bold text-primary">
                        {option.maximumInterestRate?.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
