import type { Metadata, Viewport } from 'next';
import '../index.css';
import Providers from './Providers';

export const viewport: Viewport = {
  themeColor: 'black',
};

export const metadata: Metadata = {
  title: 'Patrogonia',
  description:
    'Chronicles of Patrogonia is a classic RPG where you gain experience and gold by defeating enemies in battle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
