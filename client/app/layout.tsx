import "./globals.css";
import LayoutClient from "@/components/layout/layoutClient";

export const metadata = {
  title: "Frontend App",
  description: "Next.js Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
