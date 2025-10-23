import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PrinterCheck, XCircle } from "lucide-react";
import Decorator from "@/components/Decorator";
import { ICollectionLog, IRequestItems } from "@/amaryllis-types";
import { shortDateFormatter } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const CollectionLog = ({
  open,
  setOpen,
  options,
}: {
  open: any;
  setOpen: any;
  options: ICollectionLog[];
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="min-w-[35vw]">
        <SheetHeader>
          <SheetTitle> Specimen Collection Log </SheetTitle>
          <SheetDescription>
            Collection Activity for specimen from request, collection,
            reception, receive or rejection
          </SheetDescription>
        </SheetHeader>
        <Decorator />
        <div className="my-5">
          <div className="flex flex-row items-center justify-end space-x-2">
            <Button variant="outline">
              <PrinterCheck className="h-4 w-4" /> Print Collection Log
            </Button>
          </div>
          <div className="relative mt-2 h-fit rounded-md bg-card p-3">
            <ul role="list" className="space-y-6">
              <li className="relative flex gap-x-4">
                <div
                  className={
                    "absolute -bottom-6 left-0 top-0 flex w-6 justify-center"
                  }
                >
                  <div className="w-px bg-input" />
                </div>
                <>
                  <div className="relative flex size-6 flex-none items-center justify-center">
                    <CheckCircle2 className="size-6 fill-primary" />
                    <div className="size-1.5 rounded-full bg-input ring-1 ring-card" />
                    {/* {log?.collectionLogId !== null ? (
                      <CheckCircle2 className="size-6 fill-primary" />
                    ) : (
                      <div className="size-1.5 rounded-full bg-input ring-1 ring-card" />
                    )} */}
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="flex flex-row items-end justify-between">
                      <h1 className="py-0.5 text-sm/5 uppercase">
                        REF number
                        {/* REF #{log?.referenceNumber} */}
                      </h1>
                      <p className="flex-none py-0.5 text-xs/5 uppercase text-muted-foreground">
                        2025-01-01
                        {/* {shortDateFormatter(log?.collectedDate)} */}
                      </p>
                    </div>
                    <div className="text-sm/5 text-muted-foreground">
                      <p>Remarks</p>
                      {/* <p>{log?.remarks}</p> */}
                      <Separator className="my-2" />
                      <p className="">
                        Specimen collebcted by Noella at Laboratory
                        {/* Specimen {options?.specimen} collected by{" "}
                        {log?.collectedBy} at {log?.collectionArea} */}
                      </p>
                    </div>
                  </div>
                </>
              </li>
              {/* {log?.receptionLog !== null ? (
                  <li className='relative flex gap-x-4'>
                    <div
                      className={
                        'absolute -bottom-6 left-0 top-0 flex w-6 justify-center'
                      }
                    >
                      <div className='w-px bg-input' />
                    </div>
                    <>
                      <div className='relative flex size-6 flex-none items-center justify-center'>
                        <div className='size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300' />
                      </div>
                      <p className='flex-auto py-0.5 text-xs/5 text-gray-500'>
                        activity
                      </p>
                      <p className='flex-none py-0.5 text-xs/5 text-gray-500'>
                        more
                      </p>
                    </>
                  </li>
                ) : (
                  <div />
                )} */}
              <li className="relative flex gap-x-4">
                <div
                  className={
                    "absolute -bottom-6 left-0 top-0 flex w-6 justify-center"
                  }
                >
                  <div className="w-px bg-input" />
                </div>
                <>
                  <div className="relative flex size-6 flex-none items-center justify-center">
                    <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                  </div>
                  <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
                    activity
                  </p>
                  <p className="flex-none py-0.5 text-xs/5 text-gray-500">
                    more
                  </p>
                </>
              </li>
              {/* {log?.rejectionLog !== null ? (
                <li className="relative flex gap-x-4">
                  <div
                    className={
                      "absolute -bottom-6 left-0 top-0 flex w-6 justify-center"
                    }
                  >
                    <div className="w-px bg-input" />
                  </div>
                  <>
                    <div className="relative flex size-6 flex-none items-center justify-center">
                      <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                    </div>
                    <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
                      activity
                    </p>
                    <p className="flex-none py-0.5 text-xs/5 text-gray-500">
                      more
                    </p>
                  </>
                </li>
              ) : (
                <div />
              )} */}
              <li className="relative flex gap-x-4">
                <div
                  className={
                    "absolute -bottom-6 left-0 top-0 flex w-6 justify-center"
                  }
                >
                  <div className="w-px bg-input" />
                </div>
                <>
                  <div className="relative flex size-6 flex-none items-center justify-center">
                    <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                  </div>
                  <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
                    activity
                  </p>
                  <p className="flex-none py-0.5 text-xs/5 text-gray-500">
                    more
                  </p>
                </>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CollectionLog;
