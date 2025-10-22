"use client";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle2,
  Combine,
  EllipsisIcon,
  FilesIcon,
  ShieldAlertIcon,
  SquareDotIcon,
  Syringe,
  XCircle,
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { RequestItemColumn } from "@/app/testorder/details/[id]/RequestItemColumn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IRequestItems } from "@/amaryllis-types";
import { useState } from "react";
import { specimen_list } from "@/data";

const filterProps: any = [
  {
    id: 1,
    column_name: "status",
    title: "Status",
    options: [
      {
        value: "Pending",
        label: "Pending",
        icon: AlertTriangle,
      },
      {
        value: "Collected",
        label: "Collected",
        icon: SquareDotIcon,
      },
      {
        value: "Received",
        label: "Received",
        icon: ShieldAlertIcon,
      },
      {
        value: "Rejected",
        label: "Rejected",
        icon: ShieldAlertIcon,
      },
    ],
  },
];
const CollectSpecimen = ({}) => {
  const [selected, setSelected] = useState<any>([]);

  return (
    <div className="mb-2 grid grow grid-cols-1 gap-x-3 sm:grid-cols-8">
      <div className="border-grid col-span-2 h-[calc(100vh-26vh)] space-y-2 border-x py-3">
        <div className="flex flex-row items-center justify-between px-5">
          <span className="text-muted-foreground"> Request Date </span>
          <span className="font-medium uppercase">2025-01-01</span>
        </div>
        <Separator className="bg-input/40" />
        <div className="flex flex-row items-center justify-between px-5">
          <span className="text-muted-foreground"> Location </span>
          <section className="flex flex-col items-end justify-end font-medium uppercase">
            <p> OPD </p>
            <p> 008 </p> {/* <p> client number </p> */}
          </section>
        </div>
        <Separator className="bg-input/40" />
        <div className="flex flex-row items-center justify-between px-5">
          <span className="text-muted-foreground"> Priority </span>
          <span className="flex flex-row items-center font-medium uppercase">
            <AlertTriangle className="mr-2 h-4 w-4" /> Urgency
          </span>
        </div>
        <Separator className="bg-input/40" />
        <div className="flex flex-row items-center justify-between px-5">
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-sm">Order Number</p>
            <span className="font-medium">
              008 {/* <p> request number </p> */}
            </span>
          </div>
          <div className="flex flex-col items-end px-5">
            <p className="text-muted-foreground text-sm">Status</p>
            <span className="font-medium"> Incomplete </span>
          </div>
        </div>
        <Separator className="bg-input/40" />
        <div className="flex flex-row items-center justify-between px-5">
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-sm"> Requested By</p>
            <span className="font-medium"> Dr. Chen</span>
          </div>
          <div className="flex flex-col items-end px-5">
            <p className="text-muted-foreground text-sm">Total Tests</p>
            <span className="font-medium">
              {" "}
              1{/* {requestData?.completedTests ?? 0} */}
              {" / "}3{/* {requestData?.totalTests ?? 0} Test(s){' '} */}
            </span>
          </div>
        </div>
        <Separator className="bg-input/40" />
        <div className="px-5">
          <p> Request Notes </p>
          <span className="text-muted-foreground text-sm"> Notes </span>
        </div>
        <div className="px-5">
          <p>Attachment</p>
          <span className="text-muted-foreground text-sm">No attachments</span>
        </div>
      </div>
      <div className="col-span-6 flex flex-col">
        <div className="border-grid flex flex-row justify-end space-x-2 border-2 py-2">
          <div className="inline-flex -space-x-px rounded-md rtl:space-x-reverse">
            <Button
              className="rounded-none uppercase shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              variant="outline"
              disabled={true}
            >
              <FilesIcon
                className="-ms-1 opacity-60"
                size={16}
                aria-hidden="true"
              />{" "}
              Ward
            </Button>
            <Button
              className="rounded-none uppercase shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              variant="outline"
              disabled={true}
            >
              <Combine
                className="-ms-l opacity-60"
                size={16}
                aria-hidden="true"
              />{" "}
              Laboratory
            </Button>
            <Button
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Menu"
              disabled
            >
              <EllipsisIcon size={16} aria-hidden="true" />
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="default" className="uppercase shadow-none">
                <Syringe className="h-4 w-4" /> Collect & Receive
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-sm uppercase">
                  {" "}
                  Collection and Receive Specimen Confirmation{" "}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  This action cannot be undone. This will mark specimen as
                  collected and received
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <div className="px-0">
                <ul className="list-inside list-disc">
                  {selected?.map((item: IRequestItems, index: number) => (
                    <li key={index}>
                      <span className="text-primary font-semibold uppercase">
                        {" "}
                        {item.specimen}{" "}
                      </span>{" "}
                      for {item.parameterName}
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">
                    <XCircle className="h-4 w-4" /> Dismiss
                  </Button>
                </DialogClose>
                <Button>
                  <CheckCircle2 className="h-4 w-4" /> Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DataTable
          data={specimen_list}
          columns={RequestItemColumn}
          searchField={"sample_name"}
          fieldName={"Sample Name"}
          filterProperties={filterProps}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default CollectSpecimen;
