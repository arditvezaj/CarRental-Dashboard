"use client";

import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { List } from "@styled-icons/bootstrap";
import { Button } from "@/components/ui/button";
import {
  ColumnsGap,
  Building,
  People,
  PersonCircle,
  BoxArrowInRight,
} from "@styled-icons/bootstrap";

import { useGetUserQuery } from "@/redux/services/auth/api";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: <ColumnsGap size={20} /> },
  { name: "Companies", href: "/companies", icon: <Building size={20} /> },
  { name: "Users", href: "/users", icon: <People size={20} /> },
  { name: "My Profile", href: "/profile", icon: <PersonCircle size={20} /> },
];

const DashboardHeader = () => {
  const [openSheet, setOpenSheet] = useState(false);

  const onOpenSheet = () => {
    setOpenSheet(!openSheet);
  };

  const handleLogout = async () => {
    await Cookies.remove("access_token");
    window.location.href = "/login";
  };

  const { data: profile } = useGetUserQuery({});

  // const words = profile?.name?.trim().split(" ");

  // let nameInitials = "";

  // if (profile) {
  //   const firstNameInitial = words[0][0].toUpperCase();
  //   const lastNameInitial = words[1][0].toUpperCase();

  //   nameInitials = firstNameInitial + lastNameInitial;
  // }

  return (
    <header className="bg-white shadow-md shadow-neutral-500/5 border border-neutral-100">
      <nav
        className="mx-auto flex items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between gap-x-12 w-full">
          <Link href="/dashboard" className="-m-1.5 p-1.5">
            <Image
              src="/logo.png"
              alt="Logo"
              width="120"
              height="50"
              priority
            />
          </Link>
          <div className="hidden sm:flex sm:flex-row gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:bg-primary-100 hover:text-primary-600 rounded-md py-2 px-3"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Button className="sm:hidden" onClick={onOpenSheet}>
            <List size={25} />
          </Button>
          <div className={`sm:hidden ${!openSheet && "hidden"}`}>
            <Sheet open={openSheet} onOpenChange={onOpenSheet}>
              <SheetContent>
                <Link href="/dashboard">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width="120"
                    height="50"
                    className="mb-8"
                  />
                </Link>
                <div className="flex flex-col gap-x-6">
                  {navigation.map((item) => (
                    <Link
                      onClick={onOpenSheet}
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 font-semibold leading-6 text-gray-900 hover:bg-primary-100 hover:text-primary-600 rounded-md py-3 px-3"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div
                  className="flex items-center gap-3 cursor-pointer font-semibold leading-6 text-gray-900 hover:bg-primary-100 hover:text-primary-600 rounded-md my-7 py-3 px-3"
                  onClick={handleLogout}
                >
                  <BoxArrowInRight size={22} />
                  <span>Logout</span>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden sm:flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    {profile?.profilePhoto ? (
                      <Image
                        src={profile?.profilePhoto}
                        alt="profile"
                        className="h-full w-full"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <AvatarFallback>{profile?.name}</AvatarFallback>
                    )}
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem>
                  <div
                    className="flex items-center py-1 px-1 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <BoxArrowInRight size={20} />
                    <span className="ml-3">Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
