import "@/app/globals.css";
import { Providers } from "@/redux/provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
