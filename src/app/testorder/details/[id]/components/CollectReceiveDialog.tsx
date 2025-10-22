import { IRequestItems } from "@/amaryllis-types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const CollectReceiveDialog = ({
  open,
  setOpen,
  options,
}: {
  open: any;
  setOpen: any;
  options: IRequestItems[];
}) => {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            Collection and Receive Specimen Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This action cannot be undone. This will mark specimen{" "}
            <div className="flex flex-col">
              <ul className="lisprocessLabCollectiont-inside list-disc">
                {options?.map((item: IRequestItems, index: number) => (
                  <li key={index}>
                    <span className="text-primary"> {item.specimen} </span> for{" "}
                    {item.parameterName}
                  </li>
                ))}
              </ul>
            </div>
            as collected and received
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
  );
};

export default CollectReceiveDialog;
