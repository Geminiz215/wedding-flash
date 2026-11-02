import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Juliet & Christian — Wedding Invitation',
  description: 'Hand-Drawn Animated Digital Wedding Invitation for Juliet Paladino & Christian Morelli',
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="paper-texture antialiased selection:bg-[#E7CFC1] selection:text-[#102F70]">
        {children}
      </body>
    </html>
  );
}

