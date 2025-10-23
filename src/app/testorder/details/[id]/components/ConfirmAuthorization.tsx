import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import React, { useState } from "react";
import { RichTextEditor } from "@/components/blocks/rich-text-editor";

const ConfirmAuthorization = ({
  open,
  setOpen,
  resultItem,
}: {
  open: any;
  setOpen: any;
  resultItem: string;
}) => {
  const [desc] = useState<string>("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="uppercase">
            {"Confirm Authorization"} - {resultItem}
          </DialogTitle>
          <DialogDescription>
            By authorizing these results you agree that they are correct and can
            be shared with the Patient.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="bg-card h-fit rounded-md p-2">
            <RichTextEditor
              value={desc}
              placeholder="Enter Result Notes"
              className="h-full"
            />
          </div>
          <div className="mt-5 flex flex-row items-center justify-end space-x-2">
            <Button
              size="default"
              className="z-20 uppercase"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              <XCircle className="h-4 w-4" /> Close
            </Button>
            <Button
              size="default"
              className="z-20 uppercase"
              variant="default"
              onClick={() => setOpen(false)}
            >
              <CheckCircle2 className="h-4 w-4" /> Authorize
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmAuthorization;
