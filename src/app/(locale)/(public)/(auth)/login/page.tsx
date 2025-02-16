"use client";

import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Input from "@/components/atoms/Input";
import Spinner from "@/components/atoms/Spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useAdminLoginMutation } from "@/redux/services/auth/api";
import { loginAuth } from "@/redux/modules/auth/slice";
import Cookies from "js-cookie";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted, dirtyFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errors, setErrors] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [login] = useAdminLoginMutation();

  const onSubmitLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(loginAuth({ user: response }));
      Cookies.set("access_token", response.access_token);
      router.push("/dashboard");
    } catch (error) {
      setErrors("Email or password is incorrect!");
    }
  };

  const requiredFields = () => {
    const requiredFields = ["email", "password"];

    return requiredFields.every(
      (fieldName) => dirtyFields[fieldName as keyof typeof dirtyFields]
    );
  };

  return (
    <div className="sm:grid sm:grid-cols-2 flex flex-col justify-center items-center  gap-10 h-screen w-screen overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:h-screen items-center flex flex-col">
        <Image
          src="/extra.jpg"
          alt="bg"
          className="hidden sm:block w-full"
          width={700}
          height={200}
        />
        <div className="absolute top-12 sm:top-[43%] p-0 sm:p-5 sm:bg-gray-300 rounded-xl">
          <Image
            src="/logo.png"
            alt="Logo"
            priority
            width={300}
            height={200}
            className="w-[200px] sm:w-[300px]"
          />
        </div>

        {/* <h2 className=" text-center text-xl leading-9 tracking-tight text-gray-900">
          Anmelden zu dashboard nutzen
        </h2> */}
      </div>
      <div className="flex flex-col justify-center items-center bg-white">
        <div className="w-80">
          <h1 className="text-center mb-10 text-3xl font-bold">Anmeldung</h1>
          <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-6">
            <div className="space-y-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    label="E-Mail Adresse"
                    placeholder="E-Mail Adresse"
                    errorText="E-Mail ist falsch!"
                    error={false}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Passwort"
                    placeholder="********"
                    errorText="Passwort ist falsch!"
                    error={false}
                    type="password"
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            {errors !== null && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      E-Mail oder Passwort ist falsch!
                    </h3>
                  </div>
                </div>
              </div>
            )}
            <div>
              <Button
                type="submit"
                className="disabled:bg-gray-400 w-full"
                disabled={
                  !requiredFields() || (errors !== null ? false : isSubmitted)
                }
              >
                {errors !== null ? (
                  <span>Anmelden</span>
                ) : isSubmitted ? (
                  <Spinner inButton />
                ) : (
                  <span>Anmelden</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
