'use client';
import React, { useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Decorator from '@/components/Decorator';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {  Printer, XCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function ReportDisplay({
  open,
  onOpen,
  report,
}: {
  open: any;
  onOpen: any;
  report: any;
}) {
  const componentRef = useRef(null);

  const ReportPreview = () => {
    return (
      <div ref={componentRef} className='bg-card flex flex-col rounded-md p-2'>
        {/*  Header */}
        <div>
          <div className='border-grid flex flex-col items-center justify-between border-b pb-4 md:flex-row'>
            <div className='flex items-center'>
              <div className='bg-primary mr-3 rounded-full p-2'>
                <div className='text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-10 w-10'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className='text-xl font-bold'>
                  <span className='text-muted-foreground'>AMARYLLIS</span>{' '}
                  <span className='text-primary'>LABORATORY</span>
                </h1>
                <div className='flex items-center text-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='text-primary mr-1 h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                  <span className='font-medium'>
                    Accurate | Caring | Instant
                  </span>
                </div>
                <span className='text-sm'>
                  Phone Number | <span>email@email.com</span>
                </span>
                <p className='mt-1 text-xs'>Address</p>
              </div>
            </div>
          </div>
        </div>
        {/*  Patient and Collection */}
        <div>
          <div className='mb-6 flex flex-col justify-between gap-2 md:flex-row md:gap-0'>
            <div className='p-4'>
              <h2 className='text-lg font-bold'>Patient Name</h2>
              <p>Age : 21 Years</p>
              <p>Sex : Male</p>
              <p>PID : 555</p>
            </div>
            <div className='flex items-center justify-center border p-4'>
              <div className='flex h-24 w-24 items-center justify-center'>
                QR
              </div>
            </div>
            <div className='border p-4'>
              <h3 className='font-medium'>Sample Collected At:</h3>
              <p>Address,</p>
              <p>Address</p>
              <p className='mt-2'>Ref. By: Dr. Doctors Name</p>
            </div>
            <div className='border p-4'>
              <div className='flex h-24 flex-col justify-between'>
                <p>Registered on: 02:31 PM 02 Dec, 2X</p>
                <p>Collected on: 03:11 PM 02 Dec, 2X</p>
                <p>Reported on: 04:35 PM 02 Dec, 2X</p>
              </div>
            </div>
          </div>
        </div>
        {/*  Results and specimen used */}
        <div></div>
        {/* Comments and Details of Technicians */}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpen}>
      <SheetContent className='flex min-w-[70vh] flex-col p-0'>
        <SheetHeader className='px-5 pt-10'>
          <SheetTitle className='font-semibold uppercase'>
            Print Lab Result Report
          </SheetTitle>
          <SheetDescription>Print Lab Result Report</SheetDescription>
        </SheetHeader>

        <div className='px-5'>
          <Decorator />
        </div>

        <div className='flex flex-1 flex-col'>
          <ScrollArea className='h-[55dvh] w-full'>
            <div className='flex-1 overflow-y-auto p-6 pt-0'>
              <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs'>
                <div className='space-y-0.5'>
                  <Label htmlFor='print-all' className='text-base capitalize'>
                    Print all results reports
                  </Label>
                  <p className='text-sm'>
                    Check to allow printing of all respective authorized report
                    results
                  </p>
                </div>
                <div>
                  <Switch id='print-all' />
                </div>
              </div>
              <div className='my-5'>
                <ReportPreview />
              </div>
            </div>
          </ScrollArea>
          <div className='bg-background sticky bottom-0 mt-auto border-t p-4'>
            <SheetFooter className='flex justify-end gap-2'>
              <Button
                variant='outline'
                className='uppercase shadow-none'
                onClick={() => onOpen(false)}
              >
                <XCircle className='h-4 w-4' />
                Dismiss
              </Button>
              <Button className='uppercase shadow-none' variant='default'>
                <Printer className='h-4 w-4' />
                Print Report
              </Button>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}