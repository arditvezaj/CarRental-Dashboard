import "@/app/globals.css";
import { Providers } from "@/redux/provider";
import AuthLayout from "@/components/templates/AuthLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AuthLayout>{children}</AuthLayout>
    </Providers>
  );
}
