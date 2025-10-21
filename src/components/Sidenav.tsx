"use client";

import {
  BarChart,
  ClipboardList,
  FlaskConical,
  LogOutIcon,
  Syringe,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { TooltipProvider } from '@radix-ui/react-tooltip';

const menus = [
  // { id: 1, name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', disabled: false },
  { id: 2, name: "Patients", icon: Users, href: "/patient", disabled: false },
  // { id: 3, name: 'Visits', icon: FolderTree, href: '/visits' , disabled: false},
  {
    id: 4,
    name: "Test Orders",
    icon: Syringe,
    href: "/testorder",
    disabled: false,
  },
  {
    id: 5,
    name: "Specimen Management",
    icon: FlaskConical,
    href: "#",
    disabled: false,
  },
  // { id: 6, name: 'Cost Overview', icon: CircleDollarSign, href: '/cost' , disabled: true},
  {
    id: 7,
    name: "Results",
    icon: ClipboardList,
    href: "#",
    disabled: false,
  },
  { id: 8, name: "Reports", icon: BarChart, href: "#", disabled: false },
  // { id: 9, name: 'Configuration', icon: FolderCog, href: '/configuration/users', disabled: false },
];
const Sidenav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const logoutRequest = () => {
    // signOut({ redirect: false }).then(() => {
      router.push("/login");
    // });
  };

  return (
    <div className="w-[50px] min-h-screen bg-card border-r border-input">
      <div className="flex flex-col h-screen space-y-3 items-center">
        {/* <img
          src={'/app_logo.png'}
          className='mt-2 h-[40px] w-[40px]'
          alt={''}
        /> */}
        <div className="grow">
          {menus.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <div key={item.id}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => router.push(item.href)}
                        variant="ghost"
                        size="icon"
                        disabled={item.disabled}
                        className={cn(
                          isActive ? "bg-muted-foreground/10" : "",
                          "flex h-10 w-10 flex-col items-center"
                        )}
                      >
                        <item.icon
                          className={cn(
                            isActive ? "text-primary" : "text-muted-foreground",
                            "h-5 w-5"
                          )}
                        />
                        {/*<span className='text-xs'>{item.name}</span>*/}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{item.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </div>
        <div className="pb-2">
          <Button
            className="shadow-none bg-red-100 hover:bg-red-200"
            variant="secondary"
            size="icon"
            onClick={() => logoutRequest()}
          >
            <LogOutIcon className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
