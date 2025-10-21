"use client";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { TestRequestColumns } from "@/app/testorder/TestRequestColumns";
import { lab_orders } from "@/data";

const Testorder = ({}) => {

  return (
    <Layout>
      <div className="flex flex-row justify-between items-end">
        <div>
          <h1 className="text-2xl font-medium"> Laboratory Test Requests</h1>
          <span className="text-sm text-muted-foreground">
            Laboratory Test Request Orders Section
          </span>
        </div>
        <div className="space-x-2">
          <Button className="shadow-sm" variant="outline" disabled>
            <UploadCloud className="h-4 w-4 mr-2" />
            Import Test Request
          </Button>
        </div>
      </div>
      <DataTable
        columns={TestRequestColumns}
        data={lab_orders}
        searchField={"patient_name"}
        fieldName={"Patient Name"}
      />
    </Layout>
  );
};

export default Testorder;
