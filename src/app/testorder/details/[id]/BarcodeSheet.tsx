import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { IRequestItems } from "@/amaryllis-types";
import Decorator from "@/components/Decorator";
import { useReactToPrint } from "react-to-print";
import React, { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Printer, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { calculateAge, shortDateFormatter } from "@/lib/utils";
import Barcode from "react-barcode";

const BarcodeSheet = ({
  open,
  onOpen,
  options,
}: {
  open: any;
  onOpen: any;
  options: IRequestItems;
}) => {
  const componentRef: any = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `@media print {
      @font-face {
        font-family: 'IBM Plex Sans';
        src: url('../styles/fonts/IBMPlexSans-Regular.ttf') format('ttf');
      }
      body, html {
        font-family: 'IBM Plex Sans', monospace;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      .barcode-container {
        width: 1.9in;
        height: 1.1in;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: around;
        align-items: center;
        overflow: hidden;
      }
      .barcode {
        width: 1.9in;
        padding: 0;
      }
      p, div {
        margin: 0;
        padding: 0;
      }
      .subtexts {
        padding-left: 2px;
        padding-right: 2px;
      }
      @page {
        size: 1.9in 1.1in;
        margin: 0;
      }
    }`,
    fonts: [
      {
        family: "IBM Plex Sans",
        source: `url('../styles/fonts/IBMPlexSans-Regular.ttf') format("ttf")`,
      },
    ],
  });

  const processLabel = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  const LabelPreviewMain = () => {
    return (
      <div ref={componentRef} className="barcode container">
        <div className="p-3 font-sans">
          <div className="my-2 w-full">
            <Barcode
              value={options?.accessionNumber}
              format={"CODE128"}
              height={60}
              displayValue={true}
              className={"barcode"}
            />
          </div>
          <div className="flex flex-col justify-between px-1 text-base font-semibold">
            <span>Noella</span>
          </div>
          <div className="flex flex-col justify-start px-1 text-sm">
            <div className="flex flex-row items-center justify-between uppercase">
              <span>Female, 28 YRS</span>
              <span className="uppercase"> WholeBlood</span>
            </div>
          </div>
          <div className="divider-x flex flex-row justify-between space-x-2 px-1 text-sm uppercase">
            <span> ISO </span>
            <span> 2024090999-01D</span>
          </div>
          <span className="px-1 text-sm uppercase">24-Feb-2024, 11:20PM</span>
        </div>
      </div>
    );
  };
  const LabelPreview = () => {
    return (
      <div ref={componentRef} className="barcode-container">
        <div className="w-full">
          <div className="w-full">
            <Barcode
              value={options?.accessionNumber ?? ""}
              ean128={false}
              format={"CODE128"}
              height={60}
              width={1.8}
              margin={5}
              displayValue={false}
              className={"barcode"}
            />
          </div>
          <div
            className="px-1 text-base font-semibold uppercase"
            style={{ fontSize: "0.7rem", margin: "0px" }}
          >
            <span className="subtexts">{options?.patientName}</span>
          </div>
          <div
            className="flex flex-col justify-start px-1 text-sm"
            style={{ fontSize: "0.5rem" }}
          >
            <div
              className="flex flex-row items-center justify-between uppercase"
              style={{ fontSize: "0.4rem" }}
            >
              <span className="subtexts">
                {options?.gender}, {calculateAge(options?.birthDate)} YRS
              </span>
              <span className="subtexts uppercase">
                {options?.specimen} / {options?.accessionNumber}{" "}
              </span>
            </div>
          </div>
          <div
            className="divider-x flex flex-row justify-between space-x-2 text-sm uppercase"
            style={{ fontSize: "0.4rem" }}
          >
            <span className="subtexts"> [{options?.parameterName ?? ""}]</span>
            <span className="px-1 text-sm uppercase">
              {shortDateFormatter(options?.collectedDate)}
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Sheet onOpenChange={onOpen} open={open}>
      <SheetContent className="flex min-w-[48vh] flex-col p-0">
        <SheetHeader className="px-5 pt-10">
          <SheetTitle>Print Specimen Label </SheetTitle>
          <SheetDescription>
            Print Specimen Label for {options?.specimen} to test{" "}
            {options?.parameterName}
          </SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <Decorator />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-6 pt-0">
            <div>
              <p className="text-muted-foreground uppercase">
                Number of Copies
              </p>
              <Input placeholder="Enter Number of Copies" value={"1"} />
            </div>
            <div className="mt-5">
              <p className="text-muted-foreground"> Label Preview </p>
              <div
                className={`mt-2 flex flex-col rounded-md border font-mono text-sm`}
              >
                <div
                  className="h-2 w-full rounded-tl-md rounded-tr-md"
                  style={{
                    backgroundColor: options?.specimenColor ?? "#00000",
                  }}
                />
                <LabelPreviewMain />
              </div>
              <div className="hidden">
                <LabelPreview />
              </div>
            </div>
          </div>
          <div className="bg-background sticky bottom-0 mt-auto border-t p-4">
            <SheetFooter className="flex justify-end gap-2">
              <Button variant="outline" className="uppercase shadow-none">
                <XCircle className="h-4 w-4" /> Dismiss
              </Button>
              <Button variant="default" className="uppercase shadow-none">
                <Printer className="h-4 w-4" /> Print Label
              </Button>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BarcodeSheet;
