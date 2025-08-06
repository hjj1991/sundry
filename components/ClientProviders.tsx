'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import MobileHeader from '@/components/ui/mobile-header';
import Sidebar from '@/components/ui/header';
import Providers from '@/app/utils/providers';
import Footer from '@/components/ui/footer';
import ScrollToTopAndShareButton from '@/components/ScrollToTopAndShareButton';
import { AIChatProvider } from '@/components/financial/AIChatContext';

import { AIChatModal } from '@/components/financial/AIChatModal';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <ThemeProvider>
      <AIChatProvider>
        <AIChatModal isOpen={isAIChatOpen} onOpenChange={setIsAIChatOpen} />
        <MobileHeader />
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Providers>
                <main className="flex-1 pt-24 md:pt-8">
                  <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {children}
                  </div>
                </main>
              </Providers>
              <Footer />
            </div>
          </div>
        </div>
        <ScrollToTopAndShareButton onAIChatOpen={() => setIsAIChatOpen(true)} />
      </AIChatProvider>
    </ThemeProvider>
  );
}
