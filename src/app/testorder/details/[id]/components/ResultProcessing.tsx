"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  AlertTriangle,
  Archive,
  ArchiveX,
  CheckCircle2,
  Clock,
  Dock,
  Edit,
  Edit2,
  FileOutput,
  History,
  ListPlus,
  Microscope,
  MoreVertical,
  NotebookPen,
  PauseCircle,
  PenLine,
  RotateCcw,
  Search,
  Sheet,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { patient_data as patient } from "@/data";
import { cn, shortDateFormatter } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useMemo, useState } from "react";
import PostLabResult from "@/app/testorder/details/[id]/components/PostLabResult";
import { IObservationResult, IRequestItems } from "@/amaryllis-types";
import { atom, useAtom } from "jotai";
import Decorator from "@/components/Decorator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Content } from "@tiptap/react";
import ConfirmAuthorization from "@/app/testorder/details/[id]/components/ConfirmAuthorization";
import { useFetchParameterProfileMutation } from "@/hooks/config";
import { useGetUser, useToken } from "@/hooks/use-token";
import ActionButton from "@/components/ui/action-button";
// import { formatPostedDate } from '@/utils/formatPostedDate';
// import {
//   getLabResultRowColor,
//   getLabResultStatus,
// } from '@/utils/formatResultIndicator';
import EditResultSheet from "@/app/testorder/details/[id]/components/EditResultSheet";
import { useRouter } from "next/navigation";
import ReportDisplay from "@/app/testorder/details/[id]/components/ReportDisplay";

type Config = {
  selected: IRequestItems["labRequestItemsId"] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

const ResultProcessing = ({}) => {
  const router = useRouter();
  const [openResult, setOpenResult] = React.useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [configList, setConfigList] = useState<any>(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [searchedTest, setSearchedTest] = React.useState("");

  const [selectedResult, setSelectedResult] =
    React.useState<IObservationResult>();
  const [resultItem, setResultItem] = React.useState<string>("");

  // const [test, setTest] = useAtom(configAtom);
  // const token = useToken();
  // const user = useGetUser();

  // const requestItems = useMemo(
  //   () => requestData?.labRequestItems || [],
  //   [requestData]
  // );

  // Filter items based on the search term (case-insensitive)
  // const filteredItems = requestItems.filter(
  //   (item: any) =>
  //     item.parameterName.toLowerCase().includes(searchedTest.toLowerCase()) ??
  //     requestItems
  // );

  // Handler for search input change
  const handleChange = (e: any) => {
    setSearchedTest(e.target.value);
  };

  // Clear search input
  const handleClear = () => {
    setSearchedTest("");
  };

  // const [selectedParam, setSelectedParam] = useState<string>(
  //   requestItems[0].parameterId
  // );

  // const [accessionNumber, setAccessionNumber] = useState<string>(
  //   requestItems[0].accessionNumber
  // );

  // useEffect(() => {
  //   if (requestItems.length > 0) {
  //     setTest({ selected: requestItems[0].labRequestItemsId });
  //   }
  // }, [requestItems, setTest]);

  // const {
  //   mutate: submitConfig,
  //   isPending,
  //   isSuccess,
  //   isError,
  //   data: configData,
  // } = useFetchParameterProfileMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     setConfigList(configData?.data);
  //     setOpenResult(true);
  //   }
  // }, [configData, isSuccess]);

  // const fetchConfig = () => {
  //   const payload: any = {
  //     token: token,
  //     parameterId: selectedParam,
  //   };

  //   submitConfig(payload);
  // };

  // const processEditRequest = (
  //   item: IObservationResult,
  //   requestItemResultId: string
  // ) => {
  //   setSelectedResult(item);
  //   setResultItem(requestItemResultId);
  //   setOpenEdit(true);
  // };

  // const processAuthorization = (requestItemResultId: string) => {
  //   setResultItem(requestItemResultId);
  //   setOpenConfirm(true);
  // };

  const TestList = () => {
    return (
      <ScrollArea className="h-[55dvh]">
        <div className="divide-muted flex flex-col gap-2 divide-y pt-0">
          <button
            className={cn(
              "relative flex cursor-pointer flex-col items-start gap-2 p-2 text-left text-sm",
              "bg-accent border-primary/20 border-y"
            )}
          >
            <div
              className={cn(
                "absolute top-0 bottom-0 left-0 w-1 transition-all duration-300"
              )}
            />
            <div className="flex w-full flex-col">
              <div>
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="text-green-600 text-sm font-medium uppercase">
                    {/* #{item?.accessionNumber} */} 009
                  </div>
                  <div className="bg-orange-500/20 rounded-md p-1">
                    <AlertTriangle className="size-4 text-orange-500" />
                  </div>
                </div>
                <h1 className="text-lg font-semibold text-pretty uppercase">
                  {" "}
                  Parameter Name{" "}
                </h1>
                <Decorator />
              </div>
              <div className="mt-1 text-sm">
                <p className="font-medium uppercase">
                  <span className={"text-sm"}> CODE: 20110 </span>
                  {" · "}
                  <span className="font-normal">Specimen:</span> Whole Blood
                </p>
              </div>
            </div>
          </button>
        </div>
        {/* <p> No test found </p> */}
        {/* {filteredItems.length > 0 ? (
          <div className="divide-muted flex flex-col gap-2 divide-y pt-0">
            {filteredItems?.map((item: IRequestItems, index: number) => {
              const selected = test.selected === item?.labRequestItemsId;
              return (
                <button
                  key={item.labRequestItemsId}
                  className={cn(
                    "relative flex cursor-pointer flex-col items-start gap-2 p-2 text-left text-sm",
                    selected ? "bg-accent border-primary/20 border-y" : ""
                  )}
                  onClick={() => {
                    setAccessionNumber(item?.accessionNumber);
                    setSelectedParam(item?.parameterId);
                    setTest({ ...test, selected: item?.labRequestItemsId });
                  }}
                  disabled={!["Collected", "Received"].includes(item?.status)}
                >
                  <div
                    className={cn(
                      "absolute top-0 bottom-0 left-0 w-1 transition-all duration-300",
                      selected ? "bg-primary" : "bg-transparent"
                    )}
                  />
                  <div className="flex w-full flex-col">
                    <div>
                      <div className="flex w-full flex-row items-center justify-between">
                        <div className="text-primary text-sm font-medium uppercase">
                          {/* #{item?.accessionNumber} */}
        {/* </div>
                        <div
                          className={cn(
                            item.requestResult === null
                              ? "bg-orange-500/20"
                              : "bg-green-700/20",
                            "rounded-md p-1"
                          )}
                        >
                          {item?.requestResult === null ? (
                            <AlertTriangle className="size-4 text-orange-500" />
                          ) : (
                            <CheckCircle2 className="size-4 text-green-700" />
                          )}
                        </div>
                      </div>
                      <h1 className="text-lg font-semibold text-pretty uppercase">
                        {item?.parameterName}
                      </h1>

                      <Decorator />
                    </div>
                    <div className="mt-1 text-sm">
                      <p className="font-medium uppercase">
                        <span className={"text-sm"}>
                          CODE: {item?.parameterIso}
                        </span>
                        {" · "}
                        <span className="font-normal">Specimen:</span>{" "}
                        {item?.specimen}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No test found.</p>
        )} */}
      </ScrollArea>
    );
  };

  const TestDisplay = ({ test }: any) => {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-row items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" disabled={!test}>
                  <Sheet size={16} className="text-muted-foreground" />
                  <span className="sr-only">Excel Download</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Excel Download</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={true}
                  onClick={() => setOpenReport(true)}
                >
                  <FileOutput size={16} className="text-muted-foreground" />
                  <span className="sr-only">PDF Download</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>PDF Download</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" disabled={!test}>
                  <History size={16} className="text-muted-foreground" />
                  <span className="sr-only">Result History</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Result History</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" disabled={!test}>
                  <AlertTriangle size={16} className="text-muted-foreground" />
                  <span className="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>QC Violations</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={!test}>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="uppercase">
                  Results Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>
                    <Microscope className="mr-2 h-4 w-4" />
                    QC Review
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Hold Authorization
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Dock className="mr-2 h-4 w-4" />
                    Request Retest
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {test?.requestResult === null ? (
              <Button variant="default" className="uppercase">
                <ListPlus className="h-4 w-4" />
                Post Result
              </Button>
            ) : (
              <Button disabled variant="default" className="uppercase">
                <ListPlus className="h-4 w-4" />
                Post Result
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex h-full w-full flex-row p-1">
          <div className="border-grid grow overflow-scroll border-r">
            <div className="flex flex-col p-0">
              <div className="flex flex-1 flex-col">
                <div className="flex-1 overflow-y-auto">
                  <h1 className="mx-2 my-1 font-medium uppercase">
                    Showing Results for{" "}
                    <span className="text-medeor font-semibold">
                      {/* {test?.parameterName} */}
                    </span>
                  </h1>
                  <div className="mx-2 my-1 flex flex-row items-center justify-between text-sm">
                    <p>
                      {/* Posted By: {test?.requestResult?.postedBy} from{" "}
                      {test?.requestResult?.equipment} */}
                    </p>
                    <p className="text-muted-foreground">
                      {/* Posted {formatPostedDate(test?.requestResult?.postedDate)} */}
                      2025-10-10
                    </p>
                  </div>
                  <div className="border-grid my-2 border-t" />
                  <ScrollArea className="bg-card mx-2 h-[50dvh] rounded-sm p-2">
                    {test?.requestResult !== null ? (
                      <div className="h-full">
                        <Table className="border-grid rounded-md border">
                          <TableHeader className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                            <TableRow className="bg-muted/50 *:border-border text-sm uppercase hover:bg-transparent [&>:not(:last-child)]:border-r">
                              <TableHead>Parameter</TableHead>
                              <TableHead>Result Value</TableHead>
                              <TableHead>Unit</TableHead>
                              <TableHead className="">REF Ranges</TableHead>
                              <TableHead>Flag</TableHead>
                              <TableHead className="">Modified</TableHead>
                              <TableHead className=""></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* {test?.requestResult?.observationResults.map(
                              (result: IObservationResult, index: number) => {
                                const flag = getLabResultRowColor(
                                  result?.abnormalFlag
                                );
                                return (
                                  <TableRow
                                    key={index}
                                    className={cn(
                                      flag,
                                      '*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'
                                    )}
                                  >
                                    <TableCell className='font-semibold'>
                                      {result?.testName}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                      {result?.testResult}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                      {result?.unit}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                      {result?.referenceRange}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                      {result?.abnormalFlag}
                                    </TableCell>
                                    <TableCell className='text-center text-sm font-semibold uppercase'>
                                      {result?.isModified ? 'Yes' : 'No'}
                                    </TableCell>
                                    <TableCell className='flex items-center justify-center space-x-2'>
                                      <Button
                                        size={'sm'}
                                        variant='outline'
                                        type='button'
                                        disabled
                                      >
                                        <ShieldCheck className='text-muted-foreground h-2 w-2' />
                                      </Button>
                                      <Button
                                        size={'sm'}
                                        variant='outline'
                                        type='button'
                                        disabled={
                                          test?.requestResult?.authorized
                                        }
                                        onClick={() =>
                                          processEditRequest(
                                            result,
                                            test?.requestResult
                                              ?.requestItemResultId
                                          )
                                        }
                                      >
                                        <PenLine className='text-muted-foreground h-2 w-2' />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )} */}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center space-y-3">
                        <AlertCircle className="text-muted-foreground size-6" />
                        <p className="text-muted-foreground text-sm uppercase">
                          Results Pending
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
                <div className="bg-background sticky bottom-0 mt-5 border-t">
                  <div className="mt-2 flex flex-row items-center justify-end space-x-2 px-2">
                    <Button size="sm" variant="outline" className="uppercase">
                      <CheckCircle2 className="h-4 w-4" />
                      Authorize Results
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArea className="h-[65dvh]">
            <div className="w-[20vw] p-2">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center justify-between">
                  <span className="text-muted-foreground">Specimen</span>
                  <span className="text-medeor font-semibold uppercase">
                    {/* {test?.specimen} */}
                  </span>
                </div>
                <Separator className="bg-input/40" />
                <div className="flex flex-row items-center justify-between">
                  <span className="text-muted-foreground">
                    Accession Number
                  </span>
                  <span className="flex flex-row items-center font-medium uppercase">
                    {/* {test?.accessionNumber} */}
                  </span>
                </div>
                <Separator className="bg-input/40" />
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start">
                    <p className="text-muted-foreground text-sm">
                      Authorization
                    </p>
                  </div>
                  <div className="text-muted-foreground flex flex-row items-center font-medium uppercase">
                    {/* {!test?.requestResult?.authorized ? (
                      <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                    ) : (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                    )}
                    <p
                      className={cn(
                        !test?.requestResult?.authorized
                          ? "font-semibold text-red-600"
                          : "text-base font-semibold text-green-600"
                      )}
                    >
                      {!test?.requestResult?.authorized
                        ? "Pending"
                        : "Authorized"}
                    </p> */}
                  </div>
                </div>
                <Separator className="bg-input/40" />
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start">
                    <p className="text-muted-foreground text-sm">Test Name</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-muted-foreground">
                      {/* {test?.parameterName} / {test?.parameterIso} */}
                    </p>
                    <span className="font-medium"></span>
                  </div>
                </div>
                <Separator className="bg-input/40" />
                <div>
                  <p className="uppercase"> Collection Information </p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start">
                    <p className="text-muted-foreground text-sm">
                      Collected By
                    </p>
                    {/* <span className="font-medium">{test?.collectedBy}</span> */}
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-muted-foreground text-sm">
                      Collection Date
                    </p>
                    <span className="font-medium uppercase">
                      {/* {shortDateFormatter(test?.collectedDate!)} */}
                      2025-10-10
                    </span>
                  </div>
                </div>
                <Separator className="bg-input/40" />
                <div className="flex flex-row items-center justify-between">
                  <span className="text-muted-foreground">
                    Collection Status
                  </span>
                  <span className="font-medium uppercase">{test?.status}</span>
                </div>
                <Separator className="bg-input/40" />
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start">
                    <p className="text-muted-foreground text-sm">
                      Collection Area
                    </p>
                    <span className="font-medium">{test?.area}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-muted-foreground text-sm">
                      Room Temperature
                    </p>
                    <span className="font-medium uppercase">
                      {test?.temperature}
                    </span>
                  </div>
                </div>
                <Separator className="bg-input/40" />
                <div>
                  <span className="text-muted-foreground text-sm uppercase">
                    Collection Comments
                  </span>
                  <p className="text-sm font-medium">{test?.comments}</p>
                </div>
                <Separator className="bg-input/40" />
                <div>
                  <div className="text-muted-foreground text-sm uppercase">
                    Result Notes
                  </div>
                  <p className="text-sm font-medium">
                    {test?.requestResult?.resultNotes}
                  </p>
                </div>
                <Separator className="bg-input/40" />
                <div>
                  <span className="text-muted-foreground text-sm uppercase">
                    Authorization Notes
                  </span>
                  <p className="text-sm font-medium">
                    {test?.requestResult?.authorizationNotes}
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <PostLabResult
        open={openResult}
        setOpen={setOpenResult}
        paramList={configList}
        referenceNumber={"009"}
        labRequestItemId={""}
      /> */}
      <ConfirmAuthorization
        open={openConfirm}
        setOpen={setOpenConfirm}
        resultItem={resultItem}
      />
      <EditResultSheet
        open={openEdit}
        setOpen={setOpenEdit}
        result={selectedResult}
        resultItemId={resultItem}
      />
      <ReportDisplay open={openReport} onOpen={setOpenReport} report={"numm"} />
      <div className="border-grid flex w-full flex-row justify-start border-t">
        <div className="border-grid min-h-[calc(100vh-23vh)] w-[25vw] border-x">
          <Tabs defaultValue={"all"}>
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-semibold uppercase">Lab Results</h1>
              {/*<TabsList className='ml-auto'>
                <TabsTrigger value='all' className='text-sm uppercase'>
                  All
                </TabsTrigger>
                <TabsTrigger
                  disabled
                  value='unread'
                  className='text-sm uppercase'
                >
                  Pending
                </TabsTrigger>
              </TabsList>*/}
            </div>
            <Separator />
            <div className="bg-background/95 supports-backdrop-filter:bg-background/60 p-2 backdrop-blur-sm">
              <form>
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-2 size-4" />
                  <Input
                    placeholder="Search Tests..."
                    className="px-8"
                    value={searchedTest}
                    onChange={handleChange}
                  />
                  {searchedTest && (
                    <button
                      onClick={handleClear}
                      className="absolute top-2.5 right-2 cursor-pointer rounded text-sm font-medium text-red-500"
                    >
                      <XCircle className="text-muted-foreground size-4" />
                      <span className="sr-only">Clear</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
            <TabsContent value={"all"} className="m-0">
              <TestList />
            </TabsContent>
          </Tabs>
        </div>

        <div className="full flex h-[calc(100vh-23vh)] w-full grow">
          {/* <TestDisplay
            test={
              requestItems.find(
                (item: IRequestItems) =>
                  item.labRequestItemsId === test.selected
              ) || null
            }
          /> */}
          <TestDisplay />
        </div>
      </div>
    </>
  );
};

export default ResultProcessing;
