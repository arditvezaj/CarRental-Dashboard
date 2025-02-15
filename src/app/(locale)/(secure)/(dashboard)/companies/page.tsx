"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PencilSquare, Plus, Building, Trash } from "@styled-icons/bootstrap";
import {
  Table,
  TableBody,
  TableCellExpand,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/organisms/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandom } from "@/utils/loading-utils";
import { Card } from "@/components/ui/card";
import CompanyAddModalForm from "@/components/organisms/CompanyAddModalForm";
import CompanyEditModalForm from "@/components/organisms/CompanyEditModalForm";
import DeleteModal from "@/components/organisms/DeleteModal";
import Link from "next/link";

import { useGetUserQuery } from "@/redux/services/auth/api";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
  useDeleteCompanyLogoMutation,
} from "@/redux/services/companies/api";
import Input from "@/components/atoms/Input";

interface CompanyProps {
  id: string;
  name: string;
  logo: string;
}

export default function CompaniesList() {
  const [searchInput, setSearchInput] = useState("");
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [publicId, setPublicId] = useState("");
  const { data: profile } = useGetUserQuery({});

  const [openCompanyFormModal, setOpenCompanyFormModal] =
    useState<boolean>(false);
  const [openCompanyEditFormModal, setOpenCompanyEditFormModal] =
    useState<boolean>(false);
  const [deleteCompanyModal, setDeleteCompanyModal] = useState<boolean>(false);

  const { data: companies, isLoading: isLoadingCompanies } =
    useGetCompaniesQuery(searchInput.toLowerCase());

  const [deleteCompany, { isLoading: isDeleteCompany }] =
    useDeleteCompanyMutation();

  const [deleteCompanyLogo] = useDeleteCompanyLogoMutation();

  const onClickDeleteModal = (id: string, fileUrl: string) => {
    setCompanyId(id);
    const urlWithoutBase = fileUrl?.replace(/^.*\/(?:v[0-9]+\/)?/, "");
    const publicID = urlWithoutBase?.replace(/\.[^/.]+$/, "");

    setPublicId(publicID);
    setDeleteCompanyModal(true);
  };

  const deleteCompanyHandler = () => {
    setDeleteCompanyModal(!deleteCompanyModal);
  };

  const onClickDeleteCompany = async (id: string | null, publicID: string) => {
    try {
      await deleteCompany(id);
      setDeleteCompanyModal(false);

      await deleteCompanyLogo(publicID);
    } catch (error) {
      console.error("Service failed:", error);
    }
  };

  const onClickAddModal = () => {
    setOpenCompanyFormModal(true);
  };

  const onClickEditModal = (id: string, fileUrl: string) => {
    setCompanyId(id);
    const urlWithoutBase = fileUrl?.replace(/^.*\/(?:v[0-9]+\/)?/, "");
    const publicID = urlWithoutBase?.replace(/\.[^/.]+$/, "");

    setPublicId(publicID);
    setOpenCompanyEditFormModal(true);
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
    <div className="">
      <div className="flex items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Companies
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onClickAddModal}
            color="primary"
            className="flex gap-1"
          >
            <Plus className="-ml-0.5 mr-1 w-5 h-5" />
            <span>Add company</span>
          </Button>
        </div>
      </div>
      <Input
        placeholder="Search company..."
        value={searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
        className="w-full md:w-[20rem] mt-2"
      />
      <div className="mt-4 flow-root">
        <div className="mx-0 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 space-y-6">
            {!companies ? (
              <Card className="overflow-hidden">
                <ul className="divide-y divide-gray-100">{rows}</ul>
              </Card>
            ) : companies?.length > 0 ? (
              <>
                <Card className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center w-[200px] md:w-[450px]">
                          Logo
                        </TableHead>
                        <TableHead className="w-[500px] md:w-auto text-left pl-6 md:pl-20">
                          Name
                        </TableHead>
                        <TableHead className="w-44"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companies.map((company: CompanyProps) => (
                        <TableRow key={company.id} className="cursor-pointer">
                          <TableCellExpand className="flex justify-center w-[200px] md:w-[450px] pt-5 pb-5">
                            <Link href={`companies/${company.id}`}>
                              {company.logo && (
                                <Image
                                  src={company.logo}
                                  alt="logo"
                                  width={100}
                                  height={100}
                                  className="h-12 w-auto rounded-md"
                                />
                              )}
                            </Link>
                          </TableCellExpand>
                          <TableCellExpand className="hover:underline pl-3 w-[500px] md:w-auto whitespace-nowrap">
                            <Link
                              href={`companies/${company.id}`}
                              className="text-[17px] pl-2 pr-2 md:pl-20 md:pr-20 md:pt-8 md:pb-8"
                            >
                              {company.name}
                            </Link>
                          </TableCellExpand>
                          <TableCellExpand>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                onClickEditModal(company.id, company.logo)
                              }
                            >
                              <PencilSquare className="text-green-700 h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                onClickDeleteModal(company.id, company.logo)
                              }
                              className="ml-4"
                            >
                              <Trash className="text-red-600 h-4 w-4" />
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
                icon={Building}
                title="Keine companies gefunden"
                subtitle="Neues Unternehme hinzufügen"
                buttonContent={
                  <Button onClick={onClickAddModal}>
                    <Plus className="-ml-0.5 mr-1.5 w-5 h-5" />
                    <span>Neues Unternehme</span>
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>

      <CompanyAddModalForm
        open={openCompanyFormModal}
        setShowCompanyAddForm={setOpenCompanyFormModal}
      />
      <CompanyEditModalForm
        open={openCompanyEditFormModal}
        setShowCompanyEditForm={setOpenCompanyEditFormModal}
        companyId={companyId}
        publicId={publicId}
      />
      <DeleteModal
        open={deleteCompanyModal}
        onOpenChange={deleteCompanyHandler}
        title="Delete Company"
        description="Are you sure you want to delete this company?"
        onClick={() => onClickDeleteCompany(companyId, publicId)}
        disabled={isDeleteCompany}
      />
    </div>
  );
}
