"use client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Archive,
  Circle,
  CircleDot,
  CircleFadingPlusIcon,
} from "lucide-react";
// import { DataTable } from "@/components/ui/data-table";
// import { PatientColumns } from "@/app/patient/PatientColumns";
// import { patient_data } from "@/data";
// import { LabProp } from "@/amaryllis-types";

const filterProps: any = [
  {
    id: 1,
    column_name: "client",
    title: "Origin",
    options: [
      {
        value: "Jambo Labs",
        label: "Jambo Labs",
        icon: Archive,
      },
    ],
  },
  {
    id: 2,
    column_name: "gender",
    title: "Gender",
    options: [
      {
        value: "Male",
        label: "Male",
        icon: CircleDot,
      },
      {
        value: "Female",
        label: "Female",
        icon: Circle,
      },
    ],
  },
];

const Patient = ({}) => {
  return (
    <Layout>
      <div className="px-4 py-2 sm:px-4 lg:px-6">
        <div className="flex flex-row items-end justify-between">
          <div>
            <h1 className="text-2xl font-medium">Patients</h1>
            <span className="text-sm text-muted-foreground">
              Laboratory Patients Section
            </span>
          </div>
          <div className="space-x-2">
            <Button size="sm" className="uppercase shadow-sm">
              <CircleFadingPlusIcon className="h-4 w-4" />
              Register Patient
            </Button>
          </div>
        </div>
        <div className="mt-5 w-full">
          {/* <DataTable
            columns={PatientColumns}
            data={patient_data ?? []}
            searchField={"fullName"}
            fieldName={"Patient Name"}
            filterProperties={filterProps}
          /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Patient;
