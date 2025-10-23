import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import Decorator from "@/components/Decorator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, ChevronsUpDown, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { useFetchParameterConfigQuery } from '@/hooks/config';
// import { useToken } from '@/hooks/use-token';
import { IParameterConfig } from "@/amaryllis-types";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddParameterSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

const AddParameterSheet = ({
  open,
  setOpen,
  newParameter,
}: {
  open: any;
  setOpen: any;
  newParameter: any;
}) => {
  //   const token = useToken();

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

  const AddParameterForm = useForm<z.infer<typeof AddParameterSchema>>({
    resolver: zodResolver(AddParameterSchema),
    defaultValues: {
      abnormalFlag: "N",
    },
  });

  const onSubmit = (values: z.infer<typeof AddParameterSchema>) => {
    // const parameter = configList.find(
    //   (item) => item.inParameterName === values.parameter
    // );
    // const payload = {
    //   testName: parameter?.displayName,
    //   testResult: values.resultValue,
    //   unit: parameter?.unit,
    //   referenceRange: `${parameter?.normalLow ?? ''} - ${parameter?.normalHigh ?? ''}`,
    //   abnormalFlag: values.abnormalFlag,
    //   validation: false,
    //   isOriginal: false,
    // };
    // newParameter(payload);
    // AddParameterForm.reset({
    //   parameter: '',
    //   resultValue: '',
    //   abnormalFlag: 'N',
    // });
    // setOpen(false);
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent className="min-w-[20vw]">
        <SheetHeader>
          <SheetTitle className="uppercase">Add Parameter to Result</SheetTitle>
          <SheetDescription>
            Enter details below to add parameter to result
          </SheetDescription>
        </SheetHeader>
        <Decorator />

        <div className="mt-5">
          <Form {...AddParameterForm}>
            <form onSubmit={AddParameterForm.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={AddParameterForm.control}
                  name="parameter"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Parameter Name</FormLabel>
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
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Parameter List..." />
                            <CommandList>
                              <CommandEmpty>No parameter found.</CommandEmpty>
                              <CommandGroup>
                                {/* {configList.map((item, index: number) => (
                                    <CommandItem
                                      value={item.inParameterName}
                                      key={index}
                                      onSelect={() => {
                                        AddParameterForm.setValue(
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
              <div className="mt-3 flex flex-row items-center justify-end space-x-3">
                <div className="w-full space-y-2">
                  <FormField
                    control={AddParameterForm.control}
                    name={`resultValue`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase text-muted-foreground">
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
                    control={AddParameterForm.control}
                    name={`abnormalFlag`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase text-muted-foreground">
                          Abnormal Flag
                        </FormLabel>
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
              <div className="mt-10 flex w-full flex-row items-center justify-end space-x-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  <XCircle />
                  Dismiss
                </Button>
                <Button variant="default" className="" type="submit">
                  <CheckCircle2 className="h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default AddParameterSheet;
