import React from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { FinancialProduct } from '@/types/financials';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/components/ui/drawer';
import { FinancialProductDetailsContent } from './FinancialProductDetailsContent';

interface DetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: FinancialProduct | null;
}

export function FinancialProductDetails({ isOpen, onClose, data }: DetailsProps) {
  const width = useWindowWidth();
  const isDesktop = width > 768;

  if (!data) return null;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl p-0 border-0">
          <DialogTitle className="sr-only">{data.financialProductName}</DialogTitle>
          <DialogDescription className="sr-only">{data.financialCompany.companyName}의 {data.financialProductName} 상품 상세 정보</DialogDescription>
          <FinancialProductDetailsContent data={data} onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerTitle className="sr-only">{data.financialProductName}</DrawerTitle>
            <DrawerDescription className="sr-only">{data.financialCompany.companyName}의 {data.financialProductName} 상품 상세 정보</DrawerDescription>
            <div className="max-h-[80vh] overflow-y-auto">
                <FinancialProductDetailsContent data={data} onClose={onClose} isDrawer={true} />
            </div>
        </DrawerContent>
    </Drawer>
  );
}
