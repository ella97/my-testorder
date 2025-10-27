// import {
//   AlertTriangle,
//   CheckCircle2,
//   CheckIcon,
//   ShieldAlertIcon,
//   SquareDotIcon,
//   Syringe,
//   XCircle,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import BarcodeSheet from "@/app/testorder/details/[id]/BarcodeSheet";
// import { cn, shortDateFormatter } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
// import { RequestItemColumn } from "@/app/testorder/details/[id]/RequestItemColumn";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import Decorator from "@/components/Decorator";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { SpecimenRejectionSchema } from "@/app/schemas";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Textarea } from "@/components/ui/textarea";
// import ActionButton from "@/components/ui/action-button";
// import { CaretSortIcon } from "@radix-ui/react-icons";
// import { IRequestItems, RejectionCriteriaProps } from "@/amaryllis-types";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   useReceiveSpecimenMutation,
//   useRejectSpecimenMutation,
// } from "@/hooks/laboratory";
// import { useGetUser, useToken } from "@/hooks/use-token";
// import { useQueryClient } from "@tanstack/react-query";
// import { specimen_list } from "@/data";
// const filterProps: any = [
//   {
//     id: 1,
//     column_name: "status",
//     title: "Status",
//     options: [
//       {
//         value: "Pending",
//         label: "Pending",
//         icon: AlertTriangle,
//       },
//       {
//         value: "Collected",
//         label: "Collected",
//         icon: SquareDotIcon,
//       },
//       {
//         value: "Received",
//         label: "Received",
//         icon: ShieldAlertIcon,
//       },
//       {
//         value: "Rejected",
//         label: "Rejected",
//         icon: ShieldAlertIcon,
//       },
//     ],
//   },
// ];

// const ReceiveSpecimen = ({}) => {
//   const [selected, setSelected] = useState<any>([]);
//   // const [openBarcode, setOpenBarcode] = useState(false);
//   // const [openSpecimenSheet, setOpenSpecimenSheet] = useState(false);
//   // const queryClient = useQueryClient();

//   const user = useGetUser();
//   const token = useToken();

//   const SpecimenRejectionForm = useForm<
//     z.infer<typeof SpecimenRejectionSchema>
//   >({
//     resolver: zodResolver(SpecimenRejectionSchema),
//     defaultValues: {},
//   });

//   // const {
//   //   mutate: receiveRequest,
//   //   isPending: receivePending,
//   //   isSuccess: receiveSuccess,
//   //   isError: receiveError,
//   // } = useReceiveSpecimenMutation();

//   // const {
//   //   mutate: rejectionRequest,
//   //   isPending: rejectionPending,
//   //   isSuccess: rejectionSuccess,
//   //   isError: rejectionError,
//   // } = useRejectSpecimenMutation();

//   // useEffect(() => {
//   //   if (rejectionSuccess || receiveSuccess) {
//   //     queryClient.invalidateQueries().then((val) => {});
//   //   }
//   // }, [queryClient, receiveSuccess, rejectionSuccess]);

//   const onSubmit = (values: z.infer<typeof SpecimenRejectionSchema>) => {
//     const reason = values.find(
//       (item: RejectionCriteriaProps) =>
//         item.criteriaName === values.rejectReason
//     );
//     console.log(JSON.stringify(selected));

//     // const payload: any = {
//     //   token: token,
//     //   labRequestItemId: selected[0].labRequestItemsId,
//     //   criteriaId: reason?.criteriaId,
//     //   rejectedById: user?.systemUserId,
//     //   rejectReason: values.remarks,
//     //   collectionLogId: selected[0].collectionLogId,
//     // };
//     // console.log("Rejection values", JSON.stringify(payload));
//     // //SpecimenRejectionForm.reset({});
//     // rejectionRequest(payload);
//   };

//   const processReception = () => {
//     const items = selected.map((item: any) => ({
//       labRequestItemId: item?.labRequestItemsId,
//       labRequestId: item?.labRequestId,
//       collectionLogId: item?.collectionLogId,
//       receivedById: user?.systemUserId,
//     }));
//     const payload: any = {
//       token: token,
//       requestItems: items,
//     };

//     console.log("Receive values", JSON.stringify(payload));
//     receiveRequest(payload);
//   };

//   return (
//     <>
//       <div className="mb-2 grid grow grid-cols-1 gap-x-3 sm:grid-cols-8">
//         <div className="border-input/50 bg-card col-span-2 h-[calc(100vh-26vh)] space-y-2 rounded-md border p-5 py-3">
//           <div className="flex flex-row items-center justify-between">
//             <span className="text-muted-foreground">Request Date</span>
//             <span className="font-medium uppercase">
//               2025-10-10
//               {/* {shortDateFormatter(requestData?.requestDate ?? new Date()) ?? ''} */}
//             </span>
//           </div>
//           <Separator className="bg-input/40" />
//           <div className="flex flex-row items-center justify-between">
//             <span className="text-muted-foreground">Location</span>
//             <section className="flex flex-col items-end justify-end font-medium uppercase">
//               {/* <p> {requestData?.location ?? ''} </p> */}
//               <p> Location </p>
//             </section>
//           </div>
//           <Separator className="bg-input/40" />
//           <div className="flex flex-row items-center justify-between">
//             <span className="text-muted-foreground">Priority</span>
//             <span className="flex flex-row items-center font-medium uppercase">
//               <AlertTriangle className="mr-2 h-4 w-4" />
//               {/* {requestData?.priority ?? ''} */}
//               Urgency
//             </span>
//           </div>
//           <Separator className="bg-input/40" />
//           <div className="flex flex-row items-center justify-between">
//             <div className="flex flex-col items-start">
//               <p className="text-muted-foreground text-sm">Order Number</p>
//               <span className="font-medium">
//                 {/* {' '}
//                 {requestData?.requestNumber ?? ''}{' '} */}
//                 00811
//               </span>
//             </div>
//             <div className="flex flex-col items-end">
//               <p className="text-muted-foreground text-sm">Status</p>
//               <span className="font-medium"> Pending </span>
//               {/* <span className='font-medium'> {requestData?.status ?? ''} </span> */}
//             </div>
//           </div>
//           <Separator className="bg-input/40" />
//           <div className="flex flex-row items-center justify-between">
//             <div className="flex flex-col items-start">
//               <p className="text-muted-foreground text-sm">Requested By</p>
//               <span className="font-medium">
//                 {/* {' '}
//                 {requestData?.requestedBy ?? ''}{' '} */}
//                 John Doe
//               </span>
//             </div>
//             <div className="flex flex-col items-end">
//               <p className="text-muted-foreground text-sm">Total Tests</p>
//               <span className="font-medium">
//                 {/* {' '}
//                 {requestData?.completedTests ?? 0}
//                 {' / '}
//                 {requestData?.totalTests ?? 0} Test(s){' '} */}
//                 2/4
//               </span>
//             </div>
//           </div>
//           <Separator className="bg-input/40" />
//           <div>
//             <p>Request Notes</p>
//             <span className="text-muted-foreground text-sm">
//               {/* {requestData?.requestNotes ?? ''}
//                */}
//               Notes
//             </span>
//           </div>
//           <div>
//             <p>Attachments</p>
//             <span className="text-muted-foreground text-sm">
//               No attachments
//             </span>
//           </div>
//         </div>
//         <div className="col-span-6 flex flex-col">
//           <div className="flex flex-row justify-end space-x-2">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button
//                   size="sm"
//                   variant="default"
//                   disabled={selected.length === 0}
//                   className="bg-red-500 uppercase shadow-none hover:bg-red-500/70"
//                 >
//                   <XCircle className="mr-1 h-4 w-4" />
//                   Reject
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle className="uppercase">
//                     Reject Specimen
//                   </DialogTitle>
//                   <DialogDescription>
//                     This action is cannot be undone. You are rejecting specimen
//                   </DialogDescription>
//                 </DialogHeader>
//                 <Decorator />
//                 <div>
//                   {/* <Form {...SpecimenRejectionForm}>
//                     <form
//                       onSubmit={SpecimenRejectionForm.handleSubmit(onSubmit)}
//                       className="space-y-3"
//                     >
//                       <FormField
//                         control={SpecimenRejectionForm.control}
//                         name={"rejectReason"}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-muted-foreground text-sm uppercase">
//                               Rejection Reason
//                             </FormLabel> */}
//                   {/* <Popover>
//                               <PopoverTrigger asChild>
//                                 <FormControl>
//                                   <Button
//                                     variant="outline"
//                                     role="combobox"
//                                     disabled={
//                                       SpecimenRejectionForm.getValues(
//                                         "rejectReason"
//                                       ) === null
//                                     }
//                                     className={cn(
//                                       "w-full justify-between",
//                                       !field.value && "text-muted-foreground"
//                                     )}
//                                   >
//                                     {field.value
//                                       ? rejection.find(
//                                           (item: RejectionCriteriaProps) =>
//                                             item?.criteriaName === field.value
//                                         )?.criteriaName
//                                       : "Select Rejection Reason"}
//                                     <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                   </Button>
//                                 </FormControl>
//                               </PopoverTrigger>
//                               <PopoverContent
//                                 className="mx-auto w-[400px] p-0"
//                                 align="start"
//                               >
//                                 <Command>
//                                   <CommandInput
//                                     placeholder="Search Rejection Reasons..."
//                                     className="h-9"
//                                   />
//                                   <CommandEmpty>No Reason Found.</CommandEmpty>
//                                   <CommandGroup>
//                                     <CommandList>
//                                       {rejection.map(
//                                         (
//                                           item: RejectionCriteriaProps,
//                                           index: number
//                                         ) => (
//                                           <CommandItem
//                                             key={index}
//                                             value={item?.criteriaName}
//                                             onSelect={() => {
//                                               SpecimenRejectionForm.setValue(
//                                                 "rejectReason",
//                                                 item?.criteriaName
//                                               );
//                                             }}
//                                           >
//                                             {item?.criteriaName}
//                                             <CheckIcon
//                                               className={cn(
//                                                 "ml-auto h-4 w-4",
//                                                 item?.criteriaName ===
//                                                   field.value
//                                                   ? "opacity-100"
//                                                   : "opacity-0"
//                                               )}
//                                             />
//                                           </CommandItem>
//                                         )
//                                       )}
//                                     </CommandList>
//                                   </CommandGroup>
//                                 </Command>
//                               </PopoverContent>
//                             </Popover> */}
//                   {/* </FormItem>
//                         )}
//                       /> */}
//                   {/* <FormField
//                         control={SpecimenRejectionForm.control}
//                         name={"remarks"}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-muted-foreground uppercase">
//                               Comments{" "}
//                             </FormLabel>
//                             <FormControl>
//                               <Textarea
//                                 className="h-[100px] resize-none"
//                                 placeholder={"Enter rejection remarks"}
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormDescription>
//                               Emphasize on why specimen is being rejected
//                             </FormDescription>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       /> */}
//                   <DialogFooter>
//                     <DialogClose className="shadow-none">
//                       <Button type="button" variant="secondary">
//                         <XCircle className="h-4 w-4" />
//                         Dismiss
//                       </Button>
//                     </DialogClose>
//                     {/* <ActionButton
//                           className="shadow-none"
//                           variant="default"
//                           type="submit"
//                           isPending={rejectionPending}
//                         >
//                           <CheckCircle2 className="h-4 w-4" />
//                           Submit Rejection
//                         </ActionButton> */}
//                   </DialogFooter>
//                   {/* </form> */}
//                   {/* </Form> */}
//                 </div>
//               </DialogContent>
//             </Dialog>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button
//                   size="sm"
//                   disabled={selected.length === 0}
//                   className="uppercase shadow-none"
//                 >
//                   <Syringe className="h-4 w-4" />
//                   Receive
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>
//                     {" "}
//                     Receive Specimen Confirmation
//                   </AlertDialogTitle>
//                   <AlertDialogDescription className="text-base">
//                     This action cannot be undone. This will mark specimen{" "}
//                     <div className="flex flex-col">
//                       <ul className="list-inside list-disc">
//                         {selected?.map((item: IRequestItems, index: number) => (
//                           <li key={index}>
//                             <span className="text-primary">
//                               {" "}
//                               {item.specimen}{" "}
//                             </span>{" "}
//                             for {item.parameterName}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     as received
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>

//                 <AlertDialogFooter>
//                   <AlertDialogCancel>
//                     {" "}
//                     <XCircle className="h-4 w-4" /> Dismiss
//                   </AlertDialogCancel>
//                   {/* <ActionButton
//                     isPending={receivePending}
//                     onClick={() => processReception()}
//                   >
//                     <CheckCircle2 className="h-4 w-4" />
//                     Submit
//                   </ActionButton> */}
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//           <DataTable
//             data={specimen_list}
//             columns={RequestItemColumn}
//             searchField={"sample_name"}
//             fieldName={"Sample Name"}
//             filterProperties={filterProps}
//             setSelected={setSelected}
//           />

//           {/* <DataTable
//             data={requestData?.labRequestItems ?? []}
//             columns={RequestItemColumn}
//             searchField={'parameterName'}
//             fieldName={'Parameter Name'}
//             setSelected={setSelected}
//             filterProperties={filterProps}
//             showDate={false}
//           /> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReceiveSpecimen;

"use client";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
const ReceiveSpecimen = ({}) => {
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
          {/* <div className="inline-flex -space-x-px rounded-md rtl:space-x-reverse">
            <Button
              size="sm"
              variant="default"
              disabled={selected.length === 0}
              className="bg-red-500 uppercase shadow-none hover:bg-red-500/70"
            >
              <XCircle className="mr-1 h-4 w-4" />
              Reject
            </Button>
          </div> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="default"
                className="bg-red-500 uppercase shadow-none hover:bg-red-500/70"
              >
                <Syringe className="h-4 w-4" /> Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-sm uppercase">
                  {" "}
                  Reject Specimen{" "}
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
                  <CheckCircle2 className="h-4 w-4" /> Submit Rejection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" className="uppercase bg-green-600 shadow-none">
                <Syringe className="h-4 w-4" />
                Receive
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {" "}
                  Receive Specimen Confirmation
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  This action cannot be undone. This will mark specimen{" "}
                  <div className="flex flex-col">
                    <ul className="list-inside list-disc">
                      {selected?.map((item: IRequestItems, index: number) => (
                        <li key={index}>
                          <span className="text-primary">
                            {" "}
                            {item.specimen}{" "}
                          </span>{" "}
                          for {item.parameterName}
                        </li>
                      ))}
                    </ul>
                  </div>
                  as received
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  {" "}
                  <XCircle className="h-4 w-4" /> Dismiss
                </AlertDialogCancel>
                <Button>
                  <CheckCircle2 className="h-4 w-4" />
                  Submit
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

export default ReceiveSpecimen;
