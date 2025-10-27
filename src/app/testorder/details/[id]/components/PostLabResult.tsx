import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertTriangle,
  Calculator,
  Check,
  CheckCircle2,
  ListPlus,
  Microscope,
  NotebookPen,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useMemo, useState } from "react";
import { Content } from "@tiptap/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ResultFormSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionButton from "@/components/ui/action-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Equipment,
  IAnalyzerResults,
  IObservationResult,
  IParameterGroup,
  IParameterList,
  IParameterProfile,
  IUserList,
} from "@/amaryllis-types";
import { Input } from "@/components/ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUpload from "@/components/ui/image-upload";
import { useFetchEquipmentQuery } from "@/hooks/equipment";
import { useGetUser, useToken } from "@/hooks/use-token";
import { SearchableField } from "@/components/SearchableField";
import { useFetchLabUsersQuery } from "@/hooks/laboratory";
import {
  useFetchAnalyzerResultQuery,
  usePostResultsMutation,
} from "@/hooks/results";
// import StatusHandler from '@/components/StatusHandler';
// import { getLabResultRowColor } from '@/utils/formatResultIndicator';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AddParameterSheet from "@/app/testorder/details/[id]/components/AddParameterSheet";

import { RichTextEditor } from "@/components/blocks/rich-text-editor";

const PostLabResult = ({
  open,
  setOpen,
  paramList,
  referenceNumber,
  labRequestItemId,
}: {
  open: any;
  setOpen: any;
  paramList: IParameterProfile;
  referenceNumber: string;
  labRequestItemId: string | null;
}) => {
  const queryClient = useQueryClient();

  const [tab, setTab] = useState("template");
  const [notes, setNotes] = useState<Content>("");
  const [selectedEquip, setSelectedEquip] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [openAddParam, setOpenAddParam] = useState<boolean>(false);
  const [addedParamData, setAddedParamData] = useState(null);
  const [modifiedResults, setModifiedResults] = useState<any[]>([]);
  const [desc, setDesc] = useState<string>("");

  const token = useToken();
  const userInfo = useGetUser();
  const payload = {
    token: token,
    laboratoryId: userInfo?.laboratoryId,
    referenceNumber: referenceNumber,
  };
  const {
    isLoading: equipLoading,
    isSuccess: equipSuccess,
    isError: equipError,
    data: equipmentData,
  } = useFetchEquipmentQuery(payload);

  const {
    isLoading: userLoading,
    isError: userError,
    isSuccess: userSuccess,
    data: usersData,
  } = useFetchLabUsersQuery(payload);

  const {
    isLoading: resultLoading,
    isError: resultError,
    isSuccess: resultSuccess,
    data: analyzerResult,
  } = useFetchAnalyzerResultQuery(payload);

  const labUsers: IUserList[] = usersData?.data ?? [];
  const equipment: Equipment[] = equipmentData?.data ?? [];
  const results: IAnalyzerResults = analyzerResult?.data ?? null;

  const modifiedParams = useMemo(() => {
    return paramList?.inParameters.reduce((acc: any, item) => {
      // Find existing group in the accumulator
      let group = acc.find((g: any) => g.group === item.groupName);

      if (!group) {
        //If group does not exist, Create it.
        group = { group: item.groupName, parameters: [] };
        acc.push(group);
      }

      // Add Parameter to the group
      group.parameters.push({
        displayName: item.displayName,
        resultValue: "",
        unit: item.unit,
        resultType: item.resultType,
        normalHigh: item.normalHigh,
        normalLow: item.normalLow,
        separator: item.separation,
        highlight: "N",
      });

      return acc;
    }, []);
  }, [paramList?.inParameters]);

  const initialResults: any[] = useMemo(() => {
    if (!Array.isArray(results?.observationResults)) return [];

    return results?.observationResults?.map(
      (item) => ({
        testName: item.testName,
        testResult: item.testResult,
        unit: item.unit,
        referenceRange: item.referenceRange,
        abnormalFlag: item.abnormalFlag,
        validation: item.validation,
        isOriginal: true,
      }),
      []
    );
  }, [results?.observationResults]);

  useEffect(() => {
    setModifiedResults(initialResults);
  }, [initialResults]);

  const ReportForm = useForm<z.infer<typeof ResultFormSchema>>({
    resolver: zodResolver(ResultFormSchema),
    defaultValues: {
      parametersList: modifiedParams?.map((g: IParameterGroup) => ({
        group: g.group,
        parameters: g.parameters.map((p: IParameterList) => ({
          displayName: p.displayName,
          resultValue: p.resultValue,
          unit: p.unit,
          normalHigh: p.normalHigh ? p.normalHigh.toString() : "",
          normalLow: p.normalLow ? p.normalLow.toString() : "",
          separator: p.separator,
          highlight: p.highlight,
        })),
      })),
    },
  });

  useEffect(() => {
    if (modifiedParams) {
      ReportForm.reset({
        parametersList: modifiedParams.map((g: IParameterGroup) => ({
          group: g.group,
          parameters: g.parameters.map((p: IParameterList) => ({
            displayName: p.displayName,
            resultValue: p.resultValue,
            unit: p.unit ?? "",
            normalHigh: p.normalHigh ? p.normalHigh.toString() : "",
            normalLow: p.normalLow ? p.normalLow.toString() : "",
            separator: p.separator,
            highlight: p.highlight,
          })),
        })),
      });
    }
  }, [ReportForm, ReportForm.reset, modifiedParams]);

  const errors = ReportForm.formState.errors;
  console.log("Errors:", JSON.stringify(errors));

  const handleTabChange = (value: any) => {
    setTab(value);
  };

  const {
    mutate: submitResults,
    isPending: submitPending,
    isSuccess: submitSuccess,
    isError: submitError,
  } = usePostResultsMutation();

  useEffect(() => {
    if (submitSuccess) {
      queryClient.invalidateQueries().then((res) => {
        setNotes("");
        setOpen(false);
      });
    }
  }, [queryClient, setOpen, submitSuccess]);

  const onSubmit = (value: z.infer<typeof ResultFormSchema>) => {
    const paramsList: any[] = value?.parametersList;
    const params = paramsList.flatMap((group) => group.parameters);

    const { equip } = EquipUserValidation(selectedEquip);

    const payload = {
      token: token,
      labRequestItemId: labRequestItemId,
      postedById: userInfo?.systemUserId,
      equipmentId: equip?.equipmentId,
      resultNotes: notes,
      isPostedResult: true,
      results: params,
    };

    console.log("Template Results", JSON.stringify(payload));
    submitResults(payload);
  };

  const handleAddedParams = (data: any) => {
    console.log("Data from child sheet", JSON.stringify(data));
    setModifiedResults((prevResults) => [
      ...prevResults,
      { ...data, isOriginal: false },
    ]);
    setAddedParamData(data);
  };

  const removeAddedParams = (index: any) => {
    setModifiedResults((prevResults) => {
      return prevResults.filter((_, i) => i !== index);
    });
  };

  const submitAnalyzerResults = () => {
    const { equip } = EquipUserValidation(selectedEquip);

    const params: any[] = modifiedResults.map((item: IObservationResult) => ({
      displayName: item?.testName,
      resultValue: item?.testResult,
      unit: item?.unit ?? "",
      normalHigh: SplitRange(item?.referenceRange).right.toString(),
      normalLow: SplitRange(item?.referenceRange).left.toString(),
      highlight: item?.abnormalFlag,
    }));
    const payload: any = {
      token: token,
      labRequestItemId: labRequestItemId,
      postedById: userInfo?.systemUserId,
      equipmentId: equip?.equipmentId,
      resultNotes: notes,
      isPostedResult: true,
      results: params,
    };
    console.log("Analyzer Results:", JSON.stringify(payload));
    submitResults(payload);
  };

  const EquipUserValidation = (selectedEquip: string) => {
    if (selectedEquip === "") {
      toast.error("Select Equipment", {
        description: `Please elect Equipment`,
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
      });
    }
    const equip = equipment?.find(
      (item: Equipment) => item.equipmentName === selectedEquip
    );

    const user = labUsers.find(
      (item: IUserList) => item.userName === selectedUser
    );
    return { equip };
  };

  const SplitRange = (range: string) => {
    if (!range || range === "-" || !range.includes("-")) {
      return { left: "", right: "" };
    }

    const parts = range.split("-").map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { left: parts[0], right: parts[1] };
    }
    return { left: "", right: "" };
  };

  return (
    <React.Fragment>
      <AddParameterSheet
        open={openAddParam}
        setOpen={setOpenAddParam}
        newParameter={handleAddedParams}
      />
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetContent className="min-w-[80vw] p-0">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="p-5">
            <div className="flex flex-row items-end justify-between">
              <div className="flex flex-row items-start justify-start space-x-2">
                <div className="bg-card flex h-[75px] w-[75px] items-center justify-center rounded-md">
                  <Microscope className="text-muted-foreground size-7" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <p className="text-muted-foreground text-xs uppercase">
                    {/* Test Result Report - {referenceNumber} */}
                    Test Result Report - 008
                  </p>
                  <h1 className="text-primary text-xl font-semibold uppercase">
                    {/* {paramList?.parameterIso} / {paramList?.parameterName ?? ''} */}
                    2001 / Paramter
                  </h1>
                  <h1 className="text-muted-foreground mt-2 text-sm font-semibold uppercase">
                    {/* {paramList?.specimen} {' • '}
                    <span className=''>{paramList?.department}</span> */}
                    Specimen *<span> Hemoglobin </span>
                  </h1>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                className="uppercase"
                disabled
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
            </div>
            <Separator className="bg-input/40 my-2" />
            <Form {...ReportForm}>
              <form
                onSubmit={ReportForm.handleSubmit(onSubmit)}
                className="mt-3 grid grid-cols-1 gap-x-3 sm:grid-cols-8"
              >
                <ScrollArea className="border-grid col-span-5 h-[calc(100vh-17vh)] border-r pr-5">
                  <Tabs
                    defaultValue={tab}
                    onValueChange={handleTabChange}
                    className=""
                  >
                    <TabsList>
                      <TabsTrigger
                        value="template"
                        className="font-semibold uppercase"
                      >
                        Template
                      </TabsTrigger>
                      <TabsTrigger
                        value="analyzer"
                        className="font-semibold uppercase"
                      >
                        Analyzer
                      </TabsTrigger>
                      <TabsTrigger
                        value="attachment"
                        className="font-semibold uppercase"
                      >
                        Attachment
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value={"template"}>
                      <div className="border-border bg-background h-full rounded-md border">
                        <Table className="">
                          <TableHeader className="">
                            <TableRow className="bg-muted/50 text-sm uppercase">
                              <TableHead>Parameter</TableHead>
                              <TableHead className="">Result Value</TableHead>
                              <TableHead className="text-center">
                                Reference Range
                              </TableHead>
                              <TableHead className="text-center">
                                Unit
                              </TableHead>
                              <TableHead className="">Flag</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {modifiedParams?.map(
                              (item: IParameterGroup, index: number) => (
                                <React.Fragment key={index}>
                                  <TableRow className="p-2">
                                    <TableHead
                                      colSpan={5}
                                      className="bg-input text-muted-foreground uppercase"
                                    >
                                      {item?.group.toLowerCase() === "none"
                                        ? ""
                                        : item?.group}
                                    </TableHead>
                                  </TableRow>
                                  {item.parameters.map(
                                    (val: IParameterList, i: number) => (
                                      <TableRow key={i}>
                                        <TableCell className="pl-2">
                                          {val.displayName}
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex flex-row items-center space-x-2">
                                            <FormField
                                              control={ReportForm.control}
                                              name={`parametersList.${index}.parameters.${i}.resultValue`}
                                              render={({ field }) => (
                                                <FormItem>
                                                  <Input
                                                    placeholder="Enter Value"
                                                    type={"text"}
                                                    autoComplete="off"
                                                    {...field}
                                                  />
                                                </FormItem>
                                              )}
                                            />
                                            <p className="bg-primary/20 text-primary rounded-md px-1 text-xs font-medium">
                                              M
                                            </p>
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {val.normalLow} {val.separator}{" "}
                                          {val.normalHigh}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {val.unit}
                                        </TableCell>
                                        <TableCell>
                                          <FormField
                                            control={ReportForm.control}
                                            name={`parametersList.${index}.parameters.${i}.highlight`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Flag" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="L">
                                                      L
                                                    </SelectItem>
                                                    <SelectItem value="N">
                                                      N
                                                    </SelectItem>
                                                    <SelectItem value="H">
                                                      H
                                                    </SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </FormItem>
                                            )}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </React.Fragment>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value={"analyzer"}>
                      {/* <StatusHandler
                        isLoading={resultLoading}
                        isSuccess={resultSuccess}
                        isError={resultError}
                      > */}
                      {results !== null ? (
                        <React.Fragment>
                          <ScrollArea className="bg-card mx-2 h-[70vh] rounded-sm p-2 md:h-[70vh]">
                            <div className="border-border bg-background h-full rounded-md border">
                              <Table className="border-input rounded-md border">
                                <TableHeader className="">
                                  <TableRow className="bg-muted *:border-border text-sm uppercase hover:bg-transparent [&>:not(:last-child)]:border-r">
                                    <TableHead>Parameter</TableHead>
                                    <TableHead>Result Value</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead className="">
                                      REF Ranges
                                    </TableHead>
                                    <TableHead>Flag</TableHead>

                                    <TableHead className="">QC</TableHead>
                                    <TableHead className=""></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {/* {modifiedResults?.map(
                                      (
                                        result: IObservationResult,
                                        index: number
                                      ) => {
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
                                              {result?.testName}{' '}
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

                                            <TableCell className='text-muted-foreground text-center'>
                                              <div>
                                                {result?.validation ===
                                                false ? (
                                                  <AlertTriangle className='mx-2 h-4 w-4' />
                                                ) : (
                                                  <Check className='h-4 w-4' />
                                                )}
                                              </div>
                                            </TableCell>
                                            <TableCell className='flex items-center justify-center space-x-2'>
                                              <Button
                                                size={'icon'}
                                                variant='secondary'
                                                type='button'
                                                disabled
                                              >
                                                <ShieldCheck className='text-muted-foreground h-2 w-2' />
                                              </Button>
                                              <Button
                                                size={'icon'}
                                                variant='secondary'
                                                type='button'
                                                disabled={true}
                                              >
                                                <NotebookPen className='text-muted-foreground h-4 w-4' />
                                              </Button>
                                              <Button
                                                size={'icon'}
                                                variant='secondary'
                                                className='bg-red-500/30'
                                                type='button'
                                                // disabled={result?.isOriginal}
                                                onClick={() => {
                                                  removeAddedParams(index);
                                                }}
                                              >
                                                <XCircle className='h-4 w-4 text-red-500' />
                                              </Button>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    )} */}
                                </TableBody>
                              </Table>
                            </div>
                          </ScrollArea>
                          <div className="flex flex-row items-center justify-end space-x-2 p-2">
                            <Button
                              className="uppercase shadow-none"
                              variant="secondary"
                              type="button"
                              onClick={() => setOpenAddParam(true)}
                            >
                              <ListPlus className="h-4 w-4" />
                              Add Parameter
                            </Button>
                          </div>
                        </React.Fragment>
                      ) : (
                        <div className="flex h-fit items-center justify-center">
                          <p className="text-muted-foreground">
                            No Results from analyzer found
                          </p>
                        </div>
                      )}
                      {/* </StatusHandler> */}
                    </TabsContent>
                    <TabsContent value={"attachment"}>
                      <div className={""}>
                        <ImageUpload />
                      </div>
                    </TabsContent>
                  </Tabs>
                </ScrollArea>
                <div className={"col-span-3 flex flex-col"}>
                  <div className="flex flex-1 flex-col">
                    <div className="flex-1 overflow-y-auto px-2 pt-0">
                      <div className="flex flex-row items-center justify-between space-x-2">
                        <p className="text-lg font-semibold uppercase">
                          Result Notes
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          className="uppercase"
                        >
                          <InfoCircledIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <Separator className="bg-input/40 my-2" />
                      <div
                        className={
                          "my-2 flex w-full flex-row items-center justify-between space-x-2"
                        }
                      >
                        <SearchableField
                          data={equipment ?? []}
                          valueField="equipmentName"
                          labelField="equipmentName"
                          placeholder="Select Equipment"
                          searchPlaceholder={"Search Equipment List"}
                          value={selectedEquip}
                          required
                          onChange={setSelectedEquip}
                          className="w-full flex-1"
                        />
                        {/*<Select*/}
                        {/*  value={selectedEquip}*/}
                        {/*  onValueChange={setSelectedEquip}*/}
                        {/*>*/}
                        {/*  <SelectTrigger className='w-full flex-1'>*/}
                        {/*    <SelectValue placeholder='Select Equipment' />*/}
                        {/*  </SelectTrigger>*/}
                        {/*  <SelectContent>*/}
                        {/*    {equipment.map((item, index) => (*/}
                        {/*      <SelectItem key={index} value={item?.equipmentId}>*/}
                        {/*        {item?.equipmentName}*/}
                        {/*      </SelectItem>*/}
                        {/*    ))}*/}
                        {/*  </SelectContent>*/}
                        {/*</Select>*/}
                        {/*<SearchableField*/}
                        {/*  data={labUsers ?? []}*/}
                        {/*  valueField='userName'*/}
                        {/*  labelField='userName'*/}
                        {/*  placeholder='Result Posted By'*/}
                        {/*  searchPlaceholder={'Search User List'}*/}
                        {/*  value={selectedUser}*/}
                        {/*  required*/}
                        {/*  onChange={setSelectedUser}*/}
                        {/*  className='w-fit flex-1'*/}
                        {/*/>*/}
                      </div>
                      <p className="sr-only font-medium uppercase">
                        Result Notes
                      </p>
                      <div className="bg-card h-fit rounded-md p-3">
                        <RichTextEditor
                          value={desc}
                          placeholder="Enter result notes"
                          className="h-full"
                        />
                      </div>
                    </div>
                    <div className="border-grid sticky bottom-0 mt-auto border-t p-4">
                      <div
                        className={
                          "flex flex-row items-center justify-end space-x-2"
                        }
                      >
                        <Button
                          variant="outline"
                          className="z-20 uppercase"
                          type="button"
                          onClick={() => {
                            setNotes("");
                            setOpen(false);
                          }}
                        >
                          <XCircle className="h-4 w-4" /> Dismiss
                        </Button>
                        {tab === "template" ? (
                          <ActionButton
                            variant="default"
                            className="z-20 uppercase"
                            type="submit"
                            isPending={submitPending}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Save & Publish
                          </ActionButton>
                        ) : (
                          <ActionButton
                            isPending={submitPending}
                            variant="default"
                            className="z-20 uppercase"
                            type="submit"
                            onClick={() => submitAnalyzerResults()}
                          >
                            <CheckCircle2 className="h-4 w-4 font-semibold" />
                            Save & Publish
                          </ActionButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </React.Fragment>
  );
};

export default PostLabResult;
