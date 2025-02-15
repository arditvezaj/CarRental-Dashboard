"use client";

import { useEffect, ReactNode, PropsWithChildren } from "react";
import Redirect from "@/components/atoms/Redirect";
import { loginAuth, selectCurrentUser } from "@/redux/modules/auth/slice";
import { useGetUserQuery } from "@/redux/services/auth/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Spinner from "@/components/atoms/Spinner";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const userSelector = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const { data: user, isLoading, isFetching, isError } = useGetUserQuery({});

  const isLoggedIn = !!user || !!userSelector;

  // useEffect(() => {
  //   if (user && !userSelector) dispatch(loginAuth({ user }));
  // }, [user, userSelector, dispatch]);

  // if (isLoading || isFetching) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (isError || !isLoggedIn || !user) {
  //   return <Redirect to="/login" />;
  // }

  return <>{children}</>;
};

export default DashboardLayout;
