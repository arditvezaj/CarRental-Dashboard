"use client";

import { useGetCompaniesQuery } from "@/redux/services/companies/api";
// import { useGetAllBuildingsQuery } from "@/redux/services/buildings/api";
// import { useGetUsersQuery } from "@/redux/services/users/api";

export default function Dashboard() {
  const { data: companies, isLoading: isLoadingCompanies } =
    useGetCompaniesQuery("");
  // const { data: buildings } = useGetAllBuildingsQuery({});
  // const { data: users } = useGetUsersQuery({});

  const users = ["Ardit", "Ardit", "Ardit", "Ardit", "Ardit"];

  const stats = [
    { name: "Total Companies", stat: companies?.length },
    { name: "Total Users", stat: users?.length },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Dashboard
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
