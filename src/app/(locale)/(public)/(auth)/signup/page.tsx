"use client";

import React from "react";
import Spinner from "@/components/atoms/Spinner";

import { Controller, useForm } from "react-hook-form";
import Input from "@/components/atoms/Input";

// import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

function Signup() {
  // const t = useTranslations("Signup");

  const {
    control,
    handleSubmit,
    formState: { isSubmitted, dirtyFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agree: false,
    },
  });

  const requiredFields = () => {
    const requiredFields = ["name", "email", "password", "agree"];

    return requiredFields.every(
      (fieldName) => dirtyFields[fieldName as keyof typeof dirtyFields]
    );
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 mb-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-md items-center flex flex-col">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width="180" height="50" priority />
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {/* {t("title")} */}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="lg:bg-white bg-transparent px-6 lg:py-12 lg:shadow lg:rounded-lg sm:px-12">
          <form className="space-y-6">
            <div className="space-y-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    // label={t("name.label")}
                    // placeholder={t("name.placeholder")}
                    // errorText={t("name.errorText")}
                    error={false}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    // label={t("email.label")}
                    // placeholder={t("email.placeholder")}
                    // errorText={t("email.errorText")}
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
                    // label={t("password.label")}
                    placeholder="********"
                    // errorText={t("password.errorText")}
                    error={false}
                    type="password"
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
              <fieldset>
                <div className="relative flex items-start">
                  <Controller
                    name="agree"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                            required
                            checked={field.value} // Use checked instead of value
                            onChange={(e) => field.onChange(e.target.checked)} // Update the value when the checkbox changes
                          />
                        </div>
                        <div className="ml-3 text-sm text-gray-500 leading-6">
                          {/* {t("checkBoxLabel")} */}
                        </div>
                      </>
                    )}
                    rules={{ required: true }}
                  />
                </div>
              </fieldset>
            </div>
            <div className="flex flex-col gap-x-10">
              <Button
                type="submit"
                className="disabled:bg-gray-400 w-full mb-3"
                disabled={isSubmitted || !requiredFields()}
              >
                {isSubmitted ? (
                  <Spinner inButton />
                ) : (
                  <span></span>
                  // <span>{t("signupButton")}</span>
                )}
              </Button>
            </div>
            <div className="text-center text-sm flex items-center justify-center gap-x-2">
              {/* <div>{t("haveAccount")}</div> */}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
              >
                {/* {t("login")} */}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
