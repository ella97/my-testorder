"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LabRequestItem } from "@/amaryllis-types";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import ActionButton from "@/components/ui/action-button";
import { useToken } from "@/hooks/use-token";
import { useRecollectSpecimenMutation } from "@/hooks/laboratory";
import { useQueryClient } from "@tanstack/react-query";

const RecollectDialog = ({
  open,
  onOpen,
  request,
}: {
  open: any;
  onOpen: any;
  request: LabRequestItem;
}) => {
  // const token = useToken();
  // const queryClient = useQueryClient();

  // const {
  //   mutate: submitRequest,
  //   isPending,
  //   isSuccess,
  //   isError,
  //   data,
  // } = useRecollectSpecimenMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     queryClient.invalidateQueries().then((res) => onOpen(false));
  //   }
  // }, [isSuccess, onOpen, queryClient]);

  // const processRecollection = () => {
  //   const payload: any = {
  //     //   token: token,
  //     labRequestId: request.labRequestId,
  //     labRequestItemId: request.labRequestItemsId,
  //   };

  //   submitRequest(payload);
  // };
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recollect Specimen Confirmation</DialogTitle>
          <DialogDescription className="text-sm">
            {" "}
            This action cannot be undone. This will recollect the rejected
            specimen
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="border-primary/80 bg-primary/20 text-primary my-2 flex flex-col rounded-md border p-2 text-sm">
            {/* specimen {request.specimen} / Testing {request.parameterName} */}
            Specimen / Testing
          </div>
          <DialogFooter className="mt-10">
            <Button variant="outline" onClick={() => onOpen(false)}>
              {" "}
              <XCircle className="h-4 w-4" /> Dismiss
            </Button>
            <Button
            >
              <CheckCircle2 className="h-4 w-4" />
              Submit Recollection
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecollectDialog;
