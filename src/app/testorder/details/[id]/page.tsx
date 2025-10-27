"use client";
import React, { use, useState } from "react";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlarmSmoke,
  AlertCircle,
  NotebookText,
  PillBottle,
  Syringe,
} from "lucide-react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CollectSpecimen from "@/app/testorder/details/[id]/components/CollectSpecimen";
import VerificationSheet from "@/app/testorder/details/[id]/components/VerificationSheet";
import ReceiveSpecimen from "@/app/testorder/details/[id]/components/ReceiveSpecimen";

const orderOptions = [
  {
    id: 3,
    name: "Collection",
    label: "collection",
    icon: Syringe,
    disabled: false,
    badge: `3`,
  },
  {
    id: 1,
    name: "Receive",
    label: "receive",
    icon: PillBottle,
    disabled: false,
    badge: `3`,
  },
  {
    id: 2,
    name: "Processing",
    label: "processing",
    icon: AlarmSmoke,
    disabled: false,
    badge: `3`,
  },
  {
    id: 4,
    name: "Reports",
    label: "reports",
    icon: NotebookText,
    disabled: true,
    badge: `3`,
  },
];
const TestOrderDetails = () => {
  const [openVerify, setOpenVerify] = React.useState(false);
  return (
    <Layout>
      {/* <VerificationSheet
        open={openVerify}
        onOpen={setOpenVerify}
        labRequestId={'09'}
      /> */}
      {/* <StatusHandler
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      > */}
      <div className="bg-background mt-2 flex flex-col px-4 py-2 sm:px-4 lg:px-6">
        <div className="flex flex-row items-start justify-start">
          <div className="">
            <Avatar className="h-[80px] w-[80px] rounded-md">
              {/* <AvatarImage
                  src='/userAvatar.avif'
                  alt={requestData?.patientName ?? ''}
                /> */}
              <AvatarFallback>Name</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row items-end justify-between pl-2">
              <div className="flex flex-col items-start justify-start">
                <div className="flex items-start justify-start space-x-2">
                  <h1 className="text-2xl font-semibold">Noella</h1>
                </div>
                <span className="text-muted-foreground text-sm font-medium uppercase">
                  Female· 27 YRS ·{" "}
                </span>
                <span className="text-muted-foreground text-sm font-medium uppercase">
                  008, Kibaha, Pangani
                  {/*{requestData?.district ?? ''}, {requestData?.region ?? ''}*/}
                </span>
                <div className="text-green-400 mt-1 flex flex-row items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-green-400 space-x-2 text-base font-medium uppercase">
                    New
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 grow">
          <Tabs defaultValue={"collection"}>
            <TabsList className="before:bg-border relative mb-0 flex h-auto justify-start gap-1 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
              {orderOptions.map((item: any, index: number) => {
                return (
                  <TabsTrigger
                    value={item.label}
                    key={index}
                    disabled={item.disabled}
                    className="border-border bg-muted cursor-pointer overflow-hidden rounded-b-none border-x border-t px-3 py-2 font-semibold uppercase data-[state=active]:z-10 data-[state=active]:shadow-none"
                  >
                    <item.icon
                      className="-ms-0.5 me-1.5"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {item.name}
                    <Badge
                      className="bg-primary/10 text-primary ms-1 px-1"
                      variant="secondary"
                    >
                      {item.badge}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value={"collection"}>
              <CollectSpecimen />
            </TabsContent>
            <TabsContent value={"receive"}>
              <ReceiveSpecimen />
            </TabsContent>
            {/* <TabsContent value={'processing'}>
                <ResultProcessing requestData={requestData} />
              </TabsContent> */}
          </Tabs>
        </div>
      </div>
      {/* </StatusHandler> */}
    </Layout>
  );
};

export default TestOrderDetails;
