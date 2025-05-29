import { PortfolioProvider } from '../context/PortfolioContext';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
