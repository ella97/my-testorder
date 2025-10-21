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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Copy,
  CornerUpRight,
  Printer,
  ArrowUpDown,
  AlertTriangle,
  CheckCheck,
  CirclePause,
  ShieldAlertIcon,
  AlertCircle,
  CircleSlash,
  CircleDot,
  Fingerprint,
  SquareArrowUpRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
const priorities: any = [
  {
    id: 1,
    title: "Emergency",
    value: "Emergency",
    icon: ShieldAlertIcon,
    color: "text-red-600",
  },
  {
    id: 2,
    title: "Urgent",
    value: "Urgent",
    icon: AlertCircle,
    color: "text-orange-600",
  },
  {
    id: 3,
    title: "Routine",
    value: "Routine",
    icon: CircleSlash,
    color: "text-teal-600",
  },
];
const statuses: any = [
  {
    id: 1,
    title: "New",
    value: "New",
    icon: ArrowUpDown,
    color: "text-indigo-600",
  },
  {
    id: 2,
    title: "Pending",
    value: "Pending",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    id: 3,
    title: "Complete",
    value: "Complete",
    icon: CheckCheck,
    color: "text-green-600",
  },
  {
    id: 4,
    title: "Incomplete",
    value: "Incomplete",
    icon: CirclePause,
    color: "text-slate-600",
  },
];
export const TestRequestColumns = [
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
    accessorKey: "date",
    header: "Date Time",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }: any) => {
      const priority = row.original?.priority;
      const _priority = priorities.find((p: any) => p.value === priority);
      return (
        <div
          className={cn(
            _priority.color,
            "flex flex-row items-center space-x-2 font-medium uppercase"
          )}
        >
          <_priority.icon className={"h-4 w-4"} />
          <p>{_priority?.title}</p>
        </div>
      );
    },
    filterFn: (
      row: { getValue: (arg0: any) => any },
      id: any,
      value: string | any[]
    ) => {
      return value.includes(row.getValue(id));
    },
  },
  //   {
  //     accessorKey: "request_no",
  //     header: "Request No",
  //   },
  //   {
  //     accessorKey: "accession_no",
  //     header: "Accession No",
  //   },
  {
    accessorKey: "patient_id",
    header: "Number",
    cell: ({ row }: any) => {
      const patientNumber = row.original?.patient_id; //• {gender} / {calculateAge(age)} YRS

      return (
        <span className="font-medium text-[#a98467]"># {patientNumber}</span>
      );
    },
  },
  {
    accessorKey: "patient_name",
    header: "Patient Name",
    cell: ({ row }: any) => {
      const patient_name = row.original?.patient_name; //• {gender} / {calculateAge(age)} YRS

      return (
        <div className="flex flex-col space-y-2">
          <span className="text-primary font-semibold capitalize">
            {patient_name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "age_gender",
    header: "Age / Gender",
  },
  {
    accessorKey: "insurance",
    header: "Insurance",
    cell: ({ row }: any) => {
      const insurance = row.original?.insurance;
      return (
        <div>
          <span className={"text-sm uppercase"}>{insurance}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_tests",
    header: "Complete / Total",
    cell: ({ row }: any) => {
      const total_tests = row.original?.total_tests;
      const completed = row.original?.completed;
      return (
        <span className="font-medium uppercase">
          {completed} / {total_tests} Tests
        </span>
      );
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
    accessorKey: "status",
    header: "status",
    cell: ({ row }: any) => {
      const status = row.original?.status;
      const _status = statuses.find((s: any) => s.value === status);
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
              <CircleDot className={"h-4 w-4"} />
              <span> {status} </span>
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
    accessorKey: "requested_by",
    header: "Clinician",
    cell: ({ row }: any) => {
      const requestedBy = row.original?.requested_by;
      return (
        <div>
          <p className="font-medium capitalize">{requestedBy}</p>
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
          <div className="flex flex-row space-x-2">
            <Button
              variant="outline"
              className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
            >
              <Fingerprint className="text-muted-foreground h-4 w-4" />
              <span className="sr-only">Open</span>
            </Button>
            <div className="data-[state=open]:bg-muted flex h-8 w-8 p-0" />
            <Button
              variant="outline"
              className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
              onClick={() =>
                    router.push(`/testorder/details/${request.request_no}`)
                  }
            >
              <SquareArrowUpRight className="text-green-400 h-4 w-4" />
              <span className="sr-only">Open</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`font-sans`}>
                <DropdownMenuLabel className="uppercase text-sm">
                   Request Actions
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    navigator.clipboard.writeText(request.request_no)
                  }
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Request
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Request{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];
