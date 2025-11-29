// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Precision — Green Fintech',
  description: 'MVP — agriculture precision impact investing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
