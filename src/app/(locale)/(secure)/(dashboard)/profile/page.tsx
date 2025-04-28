"use client";

import React, { useMemo, useState } from "react";
import { formatDate } from "@/utils/date-utils";
import { Button } from "@/components/ui/button";
import { PencilSquare, Plus, Person, Trash } from "@styled-icons/bootstrap";
import EmptyState from "@/components/organisms/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandom } from "@/utils/loading-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserEditModalForm from "@/components/organisms/UserEditModalForm";
import DeleteModal from "@/components/organisms/DeleteModal";

import Image from "next/image";

import { useGetUserQuery } from "@/redux/services/auth/api";
import { useDeleteUserMutation } from "@/redux/services/users/api";

interface ItemProps {
  label: string;
  value: string;
}

const Item = ({ label, value }: ItemProps) => {
  return (
    <div>
      <div className="text-gray-500 text-[15px]">{label}</div>
      <div>{value}</div>
    </div>
  );
};

export default function MyProfile() {
  const [openProfileEditFormModal, setOpenProfileEditFormModal] =
    useState<boolean>(false);
  const [deleteProfileModal, setDeleteProfileModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { data: profile } = useGetUserQuery({});

  const fields = [
    { label: "Name", value: profile && profile?.name },
    { label: "Phone Number", value: profile && profile?.phoneNumber },
    { label: "E-Mail Address", value: profile && profile?.email },
    {
      label: "Birthdate",
      value: profile?.birthDate && formatDate(profile?.birthDate),
    },
  ];

  const onClickEditModal = (id: string) => {
    setUserId(id);
    setOpenProfileEditFormModal(true);
  };

  const [deleteUser, { isLoading: isDeleteUser }] = useDeleteUserMutation();

  const deleteUserHandler = () => {
    setDeleteProfileModal(!deleteProfileModal);
  };

  const onClickDeleteUser = async (id: string | null) => {
    try {
      await deleteUser(id);
      setDeleteProfileModal(false);
    } catch (error) {
      console.error("Service failed:", error);
    }
  };

  const onClickDeleteModal = (id: string) => {
    setUserId(id);
    setDeleteProfileModal(true);
  };

  const amount = getRandom(1, 8);

  const rows = useMemo(
    () =>
      Array.from({ length: amount }, (__, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between space-x-4 px-4 py-5"
        >
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      )),
    [amount]
  );

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Mein Profil
          </h1>
        </div>
      </div>
      <div className="mt-4 flow-root">
        <div className="mx-0 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 space-y-6">
            {/* {isLoading ? (
              <Card className="overflow-hidden">
                <ul className="divide-y divide-gray-100">{rows}</ul>
              </Card>
            ) : */}
            {fields?.length ? (
              <Card className="overflow-hidden flex flex-col max-w-4xl">
                <CardHeader className="flex flex-row items-center justify-between pb-0">
                  <CardTitle>Details</CardTitle>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onClickEditModal(profile.id)}
                    >
                      <PencilSquare className="text-green-700 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onClickDeleteModal(profile.id)}
                    >
                      <Trash className="text-red-700 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6">
                  {profile?.profilePhoto && (
                    <Image
                      src={profile?.profilePhoto}
                      alt="profilbild"
                      priority
                      width={170}
                      height={250}
                      className="h-[250px] w-auto col-span-1 rounded-xl object-cover"
                    />
                  )}
                  {fields.map((field: ItemProps, index) => (
                    <Item key={index} label={field.label} value={field.value} />
                  ))}
                </CardContent>
              </Card>
            ) : (
              <EmptyState
                icon={Person}
                title="Your profile is empty"
                subtitle=""
              />
            )}
          </div>
        </div>
      </div>
      <UserEditModalForm
        open={openProfileEditFormModal}
        setShowUserEditForm={setOpenProfileEditFormModal}
        userId={userId}
      />
      <DeleteModal
        open={deleteProfileModal}
        onOpenChange={deleteUserHandler}
        title="Delete your account"
        description="Are you sure you want to delete your account?"
        disabled={isDeleteUser}
        onClick={() => onClickDeleteUser(userId)}
      />
    </>
  );
}
