"use client";

import React, { useMemo, useState } from "react";
import { formatDate } from "@/utils/date-utils";
import { Button } from "@/components/ui/button";
import { PencilSquare, Plus, Trash, Person } from "@styled-icons/bootstrap";
import {
  Table,
  TableBody,
  TableCellExpand,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import EmptyState from "@/components/organisms/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandom } from "@/utils/loading-utils";
import { Card } from "@/components/ui/card";
import UserAddModalForm from "@/components/organisms/UserAddModalForm";
import UserEditModalForm from "@/components/organisms/UserEditModalForm";
import DeleteModal from "@/components/organisms/DeleteModal";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useDeleteUserImagesMutation,
} from "@/redux/services/users/api";
import { useGetUserQuery } from "@/redux/services/auth/api";
import Link from "next/link";
// import { UserProps } from "@/lib/User";

interface UserProps {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  role: string;
  profilePhoto: string;
}

export default function UsersList() {
  const { data: users, isLoading } = useGetUsersQuery({});
  const { data: profile } = useGetUserQuery({});

  const [openUserFormModal, setOpenUserFormModal] = useState<boolean>(false);
  const [openUserEditFormModal, setOpenUserEditFormModal] =
    useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [publicIds, setPublicIds] = useState<Array<String>>([]);

  const [deleteUser, { isLoading: isDeleteUser }] = useDeleteUserMutation();
  const [deleteUserImage] = useDeleteUserImagesMutation();

  const deleteUserHandler = () => {
    setDeleteUserModal(!deleteUserModal);
  };

  const onClickEditModal = (id: string) => {
    setUserId(id);
    setOpenUserEditFormModal(true);
  };

  const onClickDeleteModal = (id: string, fileUrls: Array<String>) => {
    setUserId(id);
    const publicIDs = fileUrls.map((fileUrl) => {
      const urlWithoutBase = fileUrl?.replace(/^.*\/(?:v[0-9]+\/)?/, "");
      return urlWithoutBase?.replace(/\.[^/.]+$/, "");
    });

    setPublicIds(publicIDs);
    setDeleteUserModal(true);
  };

  const onClickDeleteUser = async (
    id: string | null,
    publicIDs: Array<String>
  ) => {
    try {
      await deleteUser(id);
      setDeleteUserModal(false);

      await deleteUserImage(publicIDs);
    } catch (error) {
      console.error("Service failed:", error);
    }
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
      <div className="flex items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Users
          </h1>
        </div>
        <div className="flex gap-5 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={() => setOpenUserFormModal(true)}>
            <Plus className="-ml-0.5 mr-1.5 w-5 h-5" />
            <span>Add new user</span>
          </Button>
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
            {users?.length ? (
              <>
                <Card className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="md:pl-10">Name Surname</TableHead>
                        <TableHead>E-Mail Address</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Birthdate</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="w-44"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users?.map((user: UserProps) => (
                        <TableRow key={user.id} className="cursor-pointer">
                          <TableCellExpand className="hover:underline md:pl-10 whitespace-nowrap">
                            <Link
                              href={`/users/${user.id}`}
                              className="flex items-center gap-3 w-[200px]"
                            >
                              {user.profilePhoto && (
                                <Image
                                  src={user.profilePhoto}
                                  alt="profile"
                                  width={40}
                                  height={40}
                                  className="rounded-[100%] w-12 h-12"
                                />
                              )}
                              <span>{user.name}</span>
                            </Link>
                          </TableCellExpand>
                          <TableCellExpand className="whitespace-nowrap">
                            {user.email}
                          </TableCellExpand>
                          <TableCellExpand className="whitespace-nowrap">
                            {user.phoneNumber}
                          </TableCellExpand>
                          <TableCellExpand>
                            {formatDate(user.birthDate)}
                          </TableCellExpand>
                          <TableCellExpand>{user.role}</TableCellExpand>
                          <TableCellExpand className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onClickEditModal(user.id)}
                            >
                              <PencilSquare className="text-green-700 h-4 w-4" />
                            </Button>
                            <Button
                              disabled={isDeleteUser}
                              // onClick={() =>
                              //   onClickDeleteModal(user.id, [
                              //     user.profilePhoto,
                              //     user.cardFront,
                              //     user.cardBack,
                              //     user.ahvCard,
                              //     user.signature,
                              //   ])
                              // }
                              variant="outline"
                              size="icon"
                            >
                              <Trash height={17} className="text-red-600" />
                            </Button>
                          </TableCellExpand>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </>
            ) : (
              <EmptyState
                icon={Person}
                title="No user founded."
                subtitle=""
                buttonContent={
                  <Button onClick={() => setOpenUserFormModal(true)}>
                    <Plus className="-ml-0.5 mr-1.5 w-5 h-5" />
                    <span>Add new user</span>
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>
      <UserAddModalForm
        open={openUserFormModal}
        setShowUserAddForm={setOpenUserFormModal}
      />
      <UserEditModalForm
        open={openUserEditFormModal}
        setShowUserEditForm={setOpenUserEditFormModal}
        userId={userId}
      />
      <DeleteModal
        open={deleteUserModal}
        onOpenChange={deleteUserHandler}
        title="Delete User"
        description="Are you sure you want to delete this user?"
        disabled={isDeleteUser}
        onClick={() => onClickDeleteUser(userId, publicIds)}
      />
    </>
  );
}
