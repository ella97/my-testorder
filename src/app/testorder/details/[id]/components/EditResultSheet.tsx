import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import Decorator from "@/components/Decorator";
import { IObservationResult, IParameterConfig } from "@/amaryllis-types";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AddParameterSchema, EditResultParamSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, ChevronsUpDown, XCircle } from "lucide-react";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
// import ActionButton from "@/components/ui/action-button";

const EditResultSheet = ({
  open,
  setOpen,
  result,
  resultItemId,
}: {
  open: any;
  setOpen: any;
  result: IObservationResult | undefined;
  resultItemId: string;
}) => {
  //   const token = useToken();
  //   const queryClient = useQueryClient();

  //   const payload: any = {
  //     token: token,
  //   };

  //   const {
  //     isLoading: configLoading,
  //     isSuccess: configSuccess,
  //     isError: configError,
  //     data: config,
  //   } = useFetchParameterConfigQuery(payload);

  //   const configList: IParameterConfig[] = config?.data ?? [];

  const EditParameterForm = useForm<z.infer<typeof EditResultParamSchema>>({
    resolver: zodResolver(EditResultParamSchema),
    defaultValues: {
      parameter: result?.testName,
      resultValue: result?.testResult,
      abnormalFlag: "N",
    },
  });

  //   const {
  //     mutate: submitPayload,
  //     isPending: modifyPending,
  //     isError: modifyError,
  //     isSuccess: modifySuccess,
  //   } = useModifyItemResultMutation();

  //   useEffect(() => {
  //     if (modifySuccess) {
  //       queryClient.invalidateQueries().then((res) => {
  //         EditParameterForm.reset({
  //           parameter: '',
  //           resultValue: '',
  //           abnormalFlag: 'N',
  //         });
  //         setOpen(false);
  //       });
  //     }
  //   }, [EditParameterForm, modifySuccess, queryClient, setOpen]);

  const onSubmit = (values: z.infer<typeof EditResultParamSchema>) => {
    // const parameter = configList.find(
    //   (item) => item.inParameterName === values.parameter
    // );
    // const payload = {
    //   token: token,
    //   requestItemResultId: resultItemId,
    //   modifiedResult: {
    //     displayName: parameter?.displayName,
    //     resultValue: values.resultValue,
    //     unit: parameter?.unit,
    //     normalHigh: `${parameter?.normalHigh ?? ''}`,
    //     normalLow: `${parameter?.normalLow ?? ''}`,
    //     highlight: values.abnormalFlag,
    //   },
  };

  //     console.log(`SENT PAYLOAD: ${JSON.stringify(payload)}`);
  //     submitPayload(payload);
  //   };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex min-w-[30vw] flex-col p-0">
        <SheetHeader className="px-5 pt-10">
          <SheetTitle className="uppercase">
            Modify <span className="text-primary"> {result?.testName} </span>{" "}
            Result
          </SheetTitle>
          <SheetDescription className="text-sm uppercase">
            Enter details below to modify {result?.testName}
          </SheetDescription>
          <Decorator />
        </SheetHeader>
        {/* <StatusHandler
          isLoading={configLoading}
          isSuccess={configSuccess}
          isError={configError}
        > */}
          <Form {...EditParameterForm}>
            <form
              onSubmit={EditParameterForm.handleSubmit(onSubmit)}
              className="flex flex-1 flex-col"
            >
              <div className="flex-1 overflow-y-auto p-6 pt-0">
                <div className={""}>
                  <div className="mt-3 flex flex-row items-center justify-end space-x-3">
                    <div className="w-full space-y-2">
                      <FormField
                        control={EditParameterForm.control}
                        name={`resultValue`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground text-sm uppercase">
                              Result Value
                            </FormLabel>
                            <Input
                              placeholder="Enter Value"
                              type={"text"}
                              autoComplete="off"
                              {...field}
                            />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full space-y-2">
                      <FormField
                        control={EditParameterForm.control}
                        name={`abnormalFlag`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground text-sm uppercase">
                              Abnormal Flag
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Flag" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="L">L</SelectItem>
                                <SelectItem value="N">N</SelectItem>
                                <SelectItem value="H">H</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <FormField
                      control={EditParameterForm.control}
                      name="parameter"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-muted-foreground text-sm uppercase">
                            Parameter Name
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {/* {field.value
                                    ? configList.find(
                                        (item) =>
                                          item.inParameterName === field.value
                                      )?.inParameterName
                                    : 'Select parameter'} */}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-[200px] p-0"
                              align="start"
                            >
                              <Command>
                                <CommandInput placeholder="Search Parameter List..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No parameter found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {/* {configList.map((item) => (
                                      <CommandItem
                                        value={item.inParameterName}
                                        key={item.inParameterName}
                                        onSelect={() => {
                                          EditParameterForm.setValue(
                                            'parameter',
                                            item.inParameterName
                                          );
                                        }}
                                      >
                                        {item.inParameterName}
                                        <Check
                                          className={cn(
                                            'ml-auto',
                                            item.inParameterName === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))} */}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-background sticky bottom-0 mt-auto border-t p-4">
                <SheetFooter className="flex w-full flex-row items-center justify-end space-x-2">
                  <Button
                    type={"button"}
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    <XCircle />
                    Dismiss
                  </Button>
                  <Button
                    variant="default"
                    className="shadow-none"
                    type="submit"
                  >
                    <CheckCircle2 className="h-4 w-4 " /> Submit Request
                  </Button>
                  {/* <ActionButton
                    isPending={modifyPending}
                    variant='default'
                    className='shadow-none'
                    type='submit'
                  >
                    <CheckCircle2 className='h-4 w-4' />
                    Submit Request
                  </ActionButton> */}
                </SheetFooter>
              </div>
            </form>
          </Form>
        {/* </StatusHandler> */}
      </SheetContent>
    </Sheet>
  );
};

export default EditResultSheet;
