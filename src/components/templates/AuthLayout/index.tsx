"use client";

import { ReactNode } from "react";
import Redirect from "@/components/atoms/Redirect";

import { useGetUserQuery } from "@/redux/services/auth/api";
import Spinner from "@/components/atoms/Spinner";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  // const { data: user, isLoading } = useGetUserQuery({});

  // const isLoggedIn = !!user;

  // if (isLoading)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spinner />
  //     </div>
  //   );

  // if (isLoggedIn) {
  //   return <Redirect to="/dashboard" />;
  // }

  return <>{children}</>;
};

export default AuthLayout;
