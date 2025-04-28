"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/date-utils";
import { Button } from "@/components/ui/button";
import {
  PencilSquare,
  Plus,
  Person,
  ChevronLeft,
} from "@styled-icons/bootstrap";
import EmptyState from "@/components/organisms/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandom } from "@/utils/loading-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserEditModalForm from "@/components/organisms/UserEditModalForm";
import { useGetUserQuery } from "@/redux/services/users/api";
import ImageModal from "@/components/organisms/ImageModal";
import Image from "next/image";

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

const UserDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = params.id;

  const { data: worker, isLoading } = useGetUserQuery(id);

  const fields = [
    { label: "Name", value: worker?.name.split(" ")[0] },
    { label: "Vorname", value: worker?.name.split(" ")[1] },
    { label: "Telefon", value: worker?.phoneNumber },
    { label: "E-Mail Adresse", value: worker?.email },
    {
      label: "Geburtstag",
      value: worker?.birthDate && formatDate(worker?.birthDate),
    },
    { label: "AHV-Versichertennummer", value: worker?.ahv },
  ];

  const [openUserFormModal, setOpenUserFormModal] =
    useState<boolean>(false);
  const [openPayrollEditFormModal, setOpenPayrollEditFormModal] =
    useState<boolean>(false);
  const [workerId, setUserId] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [imageModalTitle, setImageModalTitle] = useState<string>("");

  const onClickEditModal = (id: string) => {
    setUserId(id);
    setOpenPayrollEditFormModal(true);
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
      <Button variant="link" onClick={() => router.back()} className="mb-3 p-0">
        <ChevronLeft size={20} />
        <span className="ml-2 text-lg">Zurück</span>
      </Button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Details zum Mitarbeiter
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
            {worker?.name.length ? (
              <Card className="overflow-hidden flex flex-col max-w-4xl">
                <CardHeader className="flex flex-row items-center justify-between pb-0">
                  <CardTitle>Details</CardTitle>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onClickEditModal("DS")}
                  >
                    <PencilSquare className="text-green-700 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6">
                  <Image
                    src={worker?.profilePhoto}
                    alt="mitarbeiter-profil"
                    width={350}
                    height={100}
                    className="col-span-1 rounded-xl w-auto h-[300px]"
                  />
                  <div className="col-span-1 flex flex-col justify-center gap-4">
                    {[
                      "Identitätsausweis - Vorderseite",
                      "Identitätsausweis - Rückseite",
                      "Foto - Unterschrift",
                      "AHV - Ausweis Vorderseite",
                    ].map((text: string, index: number) => (
                      <Button
                        key={index}
                        variant="outline"
                        color="primary"
                        className="w-full sm:w-[21rem]"
                        onClick={() => {
                          setShowImageModal(true);
                          setImageModalTitle(text);
                          setImage(() => {
                            switch (index) {
                              case 0:
                                return worker.cardFront;
                              case 1:
                                return worker.cardBack;
                              case 2:
                                return worker?.signature;
                              case 3:
                                return worker?.ahvCard;
                              default:
                                return worker?.cardFront;
                            }
                          });
                        }}
                      >
                        <span>{text}</span>
                      </Button>
                    ))}
                  </div>
                  {fields.map((field: ItemProps, index) => (
                    <Item key={index} label={field.label} value={field.value} />
                  ))}
                  <div className="font-semibold col-span-2">
                    Aufenhaltsbewilligung
                  </div>
                  <Item
                    label="Gültig-Bis"
                    value={formatDate(worker.residenceDate)}
                  />
                  <Item
                    label="Bewilligung"
                    value={worker.residenceType.toUpperCase()}
                  />
                </CardContent>
              </Card>
            ) : (
              <EmptyState
                icon={Person}
                title="No user founded."
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
      <ImageModal
        open={showImageModal}
        setShowImageModal={setShowImageModal}
        image={image}
        title={imageModalTitle}
      />
      <UserEditModalForm
        open={openPayrollEditFormModal}
        setShowUserEditForm={setOpenPayrollEditFormModal}
        workerId={workerId}
      />
    </>
  );
};

export default UserDetails;
