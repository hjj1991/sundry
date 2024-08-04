// components/ui/footer.tsx
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-footer-background text-footer-text py-4 px-6 text-center">
            <p>&copy; {new Date().getFullYear()} 잡다창고. All rights reserved.</p>
        </footer>
    );
}
