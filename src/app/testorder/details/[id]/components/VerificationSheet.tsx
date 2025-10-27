'use client';
import React, { useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Decorator from '@/components/Decorator';
import {
  useCaptureFinger,
  useKeyInfo,
  useMFS100Info,
} from '@/hooks/fingerprint';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { VerificationSchema } from '@/app/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  AtSignIcon,
  CheckCircle2,
  CheckIcon,
  ChevronDown,
  Divide,
  Fingerprint,
  Hash,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, convertBitmapBase64ToPng } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { fingers } from '@/data';
import { CaptureResponse, TFinger, TFingerSelections } from '@/amaryllis-types';
import { Label } from '@/components/ui/label';
import ActionButton from '@/components/ui/action-button';
import Image from 'next/image';
import { useCaptureRequestMutation } from '@/hooks/laboratory';

export default function VerificationSheet({
  open,
  onOpen,
  labRequestId,
}: {
  open: any;
  onOpen: any;
  labRequestId: string;
}) {
  const [openFinger, setOpenFinger] = React.useState(false);
  const [pngSrc, setPngSrc] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const {
    isLoading,
    isSuccess: infoSuccess,
    isError: infoError,
    data: infoData,
  } = useMFS100Info();

  const {
    mutate: scan,
    isPending,
    isSuccess,
    isError,
    data: scanData,
  } = useCaptureFinger();
  const VerifyForm = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      cardNumber: '',
      approvalNumber: '',
      fingerIndex: 'L5',
    },
  });

  const {
    mutate: submitReq,
    isPending: submitPending,
    isSuccess: submitSuccess,
    isError: submitError,
    data: submitData,
  } = useCaptureRequestMutation();

  const onSubmit = (values: z.infer<typeof VerificationSchema>) => {
    console.log('Submitting', values);
    const payload: any = {
      labRequestId: labRequestId,
      fingerCode: 'L5',
      bitmapData: 'data:image/bmp;base64,' + fingerprint?.BitmapData,
      quality: fingerprint?.Quality,
    };

    submitReq(payload);
  };

  const scanRequest = () => {
    const payload = {
      quality: 60,
      timeout: 10,
    };

    scan(payload);
  };
  const fingerprint: CaptureResponse | undefined = scanData?.data;
  const base64String = 'data:image/bmp;base64,' + fingerprint?.BitmapData;

  useEffect(() => {
    if (isSuccess) {
      async function convertImage() {
        try {
          const pngData = await convertBitmapBase64ToPng(base64String);
          setPngSrc(pngData);
          setError(null);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Failed to convert image'
          );
          setPngSrc('');
        } finally {
        }
      }

      if (base64String) {
        convertImage();
      }
    }
  }, [base64String, isSuccess]);

  useEffect(() => {
    if (submitSuccess) {
      onOpen(false);
    }
  }, [onOpen, submitSuccess]);

  return (
    <Sheet open={open} onOpenChange={onOpen}>
      <SheetContent className='flex min-w-[30vw] flex-col p-0'>
        <SheetHeader className='px-5 pt-10'>
          <SheetTitle className='font-semibold uppercase'>
            NHIF Verification
          </SheetTitle>
          <SheetDescription>
            Verify NHIF Patients for Service Approval
          </SheetDescription>
          <div className=''>
            <Decorator />
          </div>
        </SheetHeader>

        <Form {...VerifyForm}>
          {/* The form itself needs to be flex column with flex-1 to expand */}
          <form
            onSubmit={VerifyForm.handleSubmit(onSubmit)}
            className='flex flex-1 flex-col'
          >
            {/* This div should be flex-1 and scrollable */}
            <div className='flex-1 overflow-y-auto p-6 pt-0'>
              <p className='text-muted-foreground text-xs uppercase'>
                ID: {labRequestId}
              </p>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <FormField
                    control={VerifyForm.control}
                    name='cardNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm uppercase'>
                          Card Number
                        </FormLabel>
                        <div className='not-first:*:mt-2'>
                          <div className='relative'>
                            <Input
                              className='peer ps-9'
                              placeholder='Enter Patient Card Number'
                              type='text'
                              autoComplete='off'
                              {...field}
                            />
                            <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
                              <Hash size={16} aria-hidden='true' />
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-1'>
                  <FormField
                    control={VerifyForm.control}
                    name='approvalNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm uppercase'>
                          Approval Number
                        </FormLabel>
                        <div className='not-first:*:mt-2'>
                          <div className='relative'>
                            <Input
                              className='peer ps-9'
                              placeholder='Enter Approval Number'
                              type='text'
                              autoComplete='off'
                              {...field}
                            />
                            <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
                              <Hash size={16} aria-hidden='true' />
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-1'>
                  <FormField
                    control={VerifyForm.control}
                    name='fingerIndex'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm uppercase'>
                          Finger Index
                        </FormLabel>
                        <div className='not-first:*:mt-2'>
                          <Popover
                            open={openFinger}
                            onOpenChange={setOpenFinger}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant='outline'
                                role='combobox'
                                aria-expanded={open}
                                className='border-input bg-background hover:bg-background w-full justify-between px-3 font-normal outline-hidden outline-offset-0 focus-visible:outline-[3px]'
                              >
                                <span
                                  className={cn(
                                    'truncate',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    <span className='flex min-w-0 items-center gap-2'>
                                      <span className='text-sm leading-none'>
                                        {
                                          fingers
                                            .map((finger: { selections: any[]; }) =>
                                              finger.selections.find(
                                                (item) =>
                                                  item.code === field.value
                                              )
                                            )
                                            .filter(Boolean)[0]?.code
                                        }
                                      </span>
                                      <span className='truncate'>
                                        {field.value}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className='text-muted-foreground'>
                                      Select Scan Finger
                                    </span>
                                  )}
                                </span>
                                <ChevronDown
                                  size={16}
                                  className='text-muted-foreground/80 shrink-0'
                                  aria-hidden='true'
                                />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0'
                              align='start'
                            >
                              <Command>
                                <CommandInput placeholder='Search Finger ...' />
                                <CommandList>
                                  <CommandEmpty>
                                    No Finger Index found.
                                  </CommandEmpty>

                                  {fingers.map(
                                    (item: TFinger, index: number) => {
                                      return (
                                        <React.Fragment key={index}>
                                          <CommandGroup heading={item.label}>
                                            {item.selections.map(
                                              (
                                                finger: TFingerSelections,
                                                index: number
                                              ) => {
                                                return (
                                                  <CommandItem
                                                    key={finger.code}
                                                    value={finger.code}
                                                    onSelect={() => {
                                                      VerifyForm.setValue(
                                                        'fingerIndex',
                                                        finger.code
                                                      );
                                                      setOpenFinger(false);
                                                    }}
                                                  >
                                                    {finger.code}-
                                                    {finger.finger}
                                                    {field.value ===
                                                      finger.code && (
                                                      <CheckIcon
                                                        size={16}
                                                        className='ml-auto'
                                                      />
                                                    )}
                                                  </CommandItem>
                                                );
                                              }
                                            )}
                                          </CommandGroup>
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='bg-input col-span-1 h-[200px] rounded-md'>
                  {isSuccess ? (
                    <Image
                      src={pngSrc}
                      alt='Converted bitmap image'
                      width={500}
                      height={300}
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <div className='flex h-[100px] w-[200px] items-center justify-center'>
                      <Image
                        src={'scan.gif'}
                        alt='scan'
                        className='h-full w-full object-cover'
                      />
                    </div>
                  )}
                </div>
                <div className='col-span-1 flex flex-col items-start justify-start gap-y-2'>
                  <ActionButton
                    type='button'
                    variant='outline'
                    isPending={isPending}
                    className='w-full uppercase shadow-none'
                    onClick={() => scanRequest()}
                  >
                    <Fingerprint size={16} />
                    Scan Finger
                  </ActionButton>
                  <h2 className='text-muted-foreground text-sm uppercase'>
                    Fingerprint Details
                  </h2>
                  {isSuccess ? (
                    <div className='flex w-full flex-col'>
                      <dl className='divide-input w-full divide-y'>
                        <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-muted-foreground text-sm/6 font-medium'>
                            Height
                          </dt>
                          <dd className='text-medeor mt-1 text-sm/6 sm:col-span-2 sm:mt-0'>
                            {fingerprint?.InHeight}
                          </dd>
                        </div>
                        <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-muted-foreground text-sm/6 font-medium'>
                            Width
                          </dt>
                          <dd className='text-medeor mt-1 text-sm/6 sm:col-span-2 sm:mt-0'>
                            {fingerprint?.InWidth}
                          </dd>
                        </div>
                        <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-muted-foreground text-sm/6 font-medium'>
                            Quality
                          </dt>
                          <dd className='text-medeor mt-1 text-sm/6 sm:col-span-2 sm:mt-0'>
                            {fingerprint?.Quality}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ) : (
                    <div>
                      <p className='text-muted-foreground text-sm font-medium'>
                        No Finger Data
                      </p>
                    </div>
                  )}
                </div>
                {/* Removed the fixed buttons that were here */}
              </div>
            </div>

            {/* Fixed footer */}
            <div className='bg-background sticky bottom-0 mt-auto border-t p-4'>
              <SheetFooter className='flex flex-row justify-end gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  className='uppercase'
                  onClick={() => onOpen(false)}
                >
                  <XCircle size={16} className='' />
                  Dismiss
                </Button>
                <ActionButton
                  type='submit'
                  variant='default'
                  isPending={submitPending}
                  className='uppercase'
                >
                  <CheckCircle2 size={16} className='' />
                  Request Verification
                </ActionButton>
              </SheetFooter>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}