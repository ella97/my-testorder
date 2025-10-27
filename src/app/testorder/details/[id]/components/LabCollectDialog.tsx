import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogHeader,
//   AlertDialogAction,
// } from '@/components/ui/alert-dialog';
import { CheckCircle2, XCircle } from "lucide-react";
// import Decorator from '@/components/Decorator';
import { IRequestItems } from "@/amaryllis-types";
// import { useGetUser, useToken } from '@/hooks/use-token';
// import ActionButton from '@/components/ui/action-button';
// import { useCollectSpecimenMutation } from '@/hooks/laboratory';
// import { useEffect } from 'react';
// import { useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";

const LabCollectDialog = ({
  open,
  setOpen,
  options,
  area,
}: {
  open: any;
  setOpen: any;
  options: IRequestItems[];
  area: string;
}) => {
  //   const token = useToken();
  //   const user = useGetUser();
  //   const queryClient = useQueryClient();

  //   const {
  //     mutate: submitCollection,
  //     isPending,
  //     isSuccess,
  //     isError,
  //   } = useCollectSpecimenMutation();

  //   useEffect(() => {
  //     if (isSuccess) {
  //       queryClient.invalidateQueries().then((val) => {
  //         setOpen(false);
  //       });
  //     }
  //   }, [isSuccess, queryClient, setOpen]);

  //   const processLabCollection = () => {
  //     const modified = options?.map((item: IRequestItems) => ({
  //       labRequestItemId: item?.labRequestItemsId,
  //       labRequestId: item?.labRequestId,
  //       collectionArea: area,
  //       collectedById: user?.systemUserId,
  //     }));
  //     const payload: any = {
  //       token: token,
  //       labRequestItems: modified,
  //     };

  //     submitCollection(payload);
  //   };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{area} Specimen Collection Confirmation</DialogTitle>
          <DialogDescription className="text-base">
            {" "}
            This action cannot be undone. This will mark specimen
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <ul className="list-inside list-disc">
            {options?.map((item: IRequestItems, index: number) => (
              <li key={index}>
                <span className="text-primary"> {item.specimen} </span> for{" "}
                {item.parameterName}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {" "}
            <XCircle className="h-4 w-4" /> Dismiss
          </Button>
          <Button variant="outline">
            {" "}
            <CheckCircle2 className="h-4 w-4" /> Submit
          </Button>
          {/* <ActionButton
            isPending={isPending}
            onClick={() => processLabCollection()}
          >
            <CheckCircle2 className='h-4 w-4' />
            Submit
          </ActionButton> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LabCollectDialog;
