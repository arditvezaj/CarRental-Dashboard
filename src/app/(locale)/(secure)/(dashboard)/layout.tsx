import "@/app/globals.css";
import React from "react";
import DashboardHeader from "@/components/molecules/DashboardHeader";
import DashboardLayout from "@/components/templates/DashboardLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <main className="bg-gray-50 min-h-screen">
        <DashboardHeader />
        <div className="p-6 lg:px-8">{children}</div>
      </main>
    </DashboardLayout>
  );
}
