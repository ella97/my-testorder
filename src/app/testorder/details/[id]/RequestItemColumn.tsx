import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowUpDown,
  Barcode,
  CheckCheck,
  CheckCircle2,
  CircleDot,
  CirclePause,
  Copy,
  CornerUpRight,
  MoreHorizontal,
  Printer,
  RotateCcw,
  ScanBarcode,
  Syringe,
  TestTube,
  TestTube2,
  XCircle,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// import BarcodeSheet from '@/app/testorder/details/[id]/BarcodeSheet';
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
// import CollectionLog from '@/app/testorder/details/[id]/components/CollectionLog';
// import RecollectDialog from '@/app/testorder/details/[id]/components/RecollectDialog';

const statuses: any = [
  {
    id: 1,
    title: "Pending",
    value: "Pending",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    id: 1,
    title: "Collected",
    value: "Collected",
    icon: CheckCheck,
    color: "text-green-600",
  },
  {
    id: 1,
    title: "Received",
    value: "Received",
    icon: CirclePause,
    color: "text-medeor",
  },
  {
    id: 1,
    title: "Rejected",
    value: "Rejected",
    icon: XCircle,
    color: "text-red-600",
  },
];

export const RequestItemColumn = [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sample_number",
    header: "Accession Number",
    cell: ({ row }: any) => {
      const number = row.original?.sample_number;
      return (
        <div>
          <p className="font-medium text-sky-600"> {number}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "test_name",
    header: "Specimen",
    cell: ({ row }: any) => {
      const test_name = row.original?.test_name;
      //   const color = row.original?.sample_color;

      return (
        <div className="flex flex-row items-center space-x-1">
          {/* <div
            className="mr-2 h-4 w-4 rounded-full"
            style={{ backgroundColor: color }}
          /> */}
          <p className={"font-semibold uppercase text-red-400"}>{test_name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "datetime",
    header: "Collected Date",
    cell: ({ row }: any) => {
      const datetime = row.original?.datetime;
      if (datetime) {
        return (
          <div>
            <p className="font-medium uppercase">{datetime}</p>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.original?.status;
      const _status = statuses.find((s) => s.value === status);
      if (_status) {
        return (
          <div
            className={cn(
              _status.color,
              "flex flex-row items-center space-x-2 font-medium uppercase"
            )}
          >
            <_status.icon className={"h-4 w-4"} />
            <p>{_status?.title}</p>
          </div>
        );
      } else {
        return (
          <div>
            <p className="flex flex-row items-center space-x-2 font-medium uppercase">
              <CircleDot className="h-4 w-4" />
              <p> {status} </p>
            </p>
          </div>
        );
      }
    },
    filterFn: (
      row: { getValue: (arg0: any) => any },
      id: any,
      value: string | any[]
    ) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "collected_by",
    header: "Results",
    cell: ({ row }: any) => {
      const authorized = row.original?.collected_by;
      const recolleted = row.original?.isRecollected;
      return (
        <div className="flex flex-row items-center space-x-2">
          <div className="border-input bg-card data-[state=open]:bg-muted flex h-8 w-8 rounded-md border p-0">
            <p className="flex w-full flex-row items-center justify-center space-x-2 font-medium uppercase">
              {recolleted ? (
                <CheckCircle2 className="text-muted-foreground h-4 w-4 text-center" />
              ) : (
                <XCircle className="text-muted-foreground h-4 w-4 text-center" />
              )}
            </p>
          </div>
          <div className="border-input bg-card data-[state=open]:bg-muted flex h-8 w-8 rounded-md border p-0">
            <p className="flex w-full flex-row items-center justify-center space-x-2 font-medium uppercase">
              {authorized ? (
                <CheckCheck className=" h-4 w-4 text-center" />
              ) : (
                <XIcon className="h-4 w-4 text-center" />
              )}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }: any) {
      const request = row.original;
      const router = useRouter();
      return (
        <>
          <div className="flex flex-row items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size={"icon"}
                    className={"h-8 w-8 p-0"}
                  >
                    <ScanBarcode className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Print Label</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {request.status === "Pending" ? (
              <Button
                variant={"outline"}
                size={"icon"}
                className="h-8 w-8 p-0"
                disabled
              >
                <Syringe className={"h-4 w-4 text-blue-500"} />
              </Button>
            ) : (
              <Button
                variant="outline"
                size={"icon"}
                className={"h-8 w-8 p-0"}
                disabled
              >
                <TestTube2 className={"h-4 w-4 text-indigo-500"} />
              </Button>
            )}
            {request.status === "Collected" ? (
              <Button
                variant="outline"
                size={"icon"}
                className="h-8 w-8 p-0"
                disabled
              >
                <XCircle className={"h-4 w-4 text-orange-500"} />
              </Button>
            ) : (
              <Button
                variant="outline"
                size={"icon"}
                className={"h-8 w-8 p-0"}
                disabled
              >
                <CheckCheck className={"h-4 w-4 text-indigo-500"} />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`font-sans`}>
                <DropdownMenuLabel className="text-xs uppercase">
                  Item Actions
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Request
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  disabled={request?.status !== "Pending"}
                >
                  <ArrowLeftRight className="mr-2 h-4 w-4" /> Change Specimen{" "}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Printer className="mr-2 h-4 w-4" />
                  Collection Log{" "}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  disabled={request?.isRecollected === true}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Recollect Specimen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];
