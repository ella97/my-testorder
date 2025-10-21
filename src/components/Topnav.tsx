'use client';
import {
  Activity,
  ArrowRightLeft,
  BarChart,
  Check,
  ChevronDown,
  Clipboard,
  Globe,
  LayoutDashboard,
  ListPlus,
  LogOut,
  Menu,
  Microscope,
  Moon,
  PackageCheck,
  Receipt,
  Search,
  ServerCog,
  Settings,
  Sun,
  Syringe,
  Truck,
  Tv2,
  UserCog,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { ScrollArea } from '@/components/ui/scroll-area';
import Crumbs from '@/components/Crumbs';

const labMenus = [
  { id: 1, name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 2, name: 'Patient', icon: UserPlus, href: '/patient' },
  { id: 3, name: 'Test Order', icon: Syringe, href: '/testorder' },
  { id: 4, name: 'Test Results', icon: Clipboard, href: '/results' },
  { id: 5, name: 'Lab Reports', icon: BarChart, href: '/reports' },
];

const otherMenus = [
  { id: 1, name: 'Reagent', icon: PackageCheck, href: '/reagent' },
  { id: 2, name: 'Devices', icon: ServerCog, href: '/device' },
  { id: 3, name: 'Quality Control', icon: Microscope, href: '/quality-control' },
];

const miscMenus = [
  { id: 1, name: 'Shipping', icon: Truck, href: '/shipping' },
  { id: 2, name: 'Transfers', icon: ArrowRightLeft, href: '/transfer' },
];

const patients = [
  {id: 1, name: 'Flex Jahen', gender: 'Male', age: '23 Years Old', reference: 'PR403092'},
  {id: 2, name: 'Flexi Jahen', gender: 'Male', age: '23 Years Old', reference: 'PR503092'},
  {id: 3, name: 'Flexian Jahen', gender: 'Male', age: '23 Years Old', reference: 'PR603092'}
]
export const Topnav = ({}) => {
  const router = useRouter();

  // const { data: session }: any = useSession();

  //console.log(`Session Data: ${JSON.stringify(session?.user.details)}`);
  const { setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  // const user_details = session?.user.details;
  // const laboratory = user_details?.laboratory;

  // const logoutRequest = () => {
  //   signOut({ redirect: false }).then(() => {
  //     router.push('/login');
  //   });
  // };
  const qualityCheckRequest = () => {};

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search Patients ... ' />
        <CommandList>
          <CommandEmpty> No results found </CommandEmpty>
          <CommandGroup heading='Recent Searches'>
            <ScrollArea className='h-[300px] flex flex-col'>
              {patients.map((item:any, index: number) => (
                <CommandItem key={index} className='flex flex-row items-start subpixel-antialiased cursor-pointer'>
                  <div className='h-[60px] w-[60px] bg-input/40 rounded-md'/>
                  <div className='flex flex-col ml-2'>
                    <h1 className='text-lg'>{item.name}</h1>
                    <div className='mt-2 flex flex-row'>
                      <span>{item.gender} · {item.age} · {item.reference}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <div
        className='sticky top-0 z-50 max-w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='max-w-full bg-card border-b border-input/70'>
          <div className='relative flex h-14 items-center justify-between px-4 sm:px-4 lg:px-6'>
            <div className='flex items-center justify-start space-x-3'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-secondary-foreground/10'
                  >
                    <Menu className='h-5 w-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='ml-2 w-56'>
                  <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='text-xs font-normal uppercase text-muted-foreground'>
                    Laboratory Menus
                  </DropdownMenuLabel>
                  {labMenus.map((item) => {
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        className='cursor-pointer'
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon className='mr-2 h-4 w-4' />
                        {item.name}
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='text-xs font-normal uppercase text-muted-foreground'>
                    Finance
                  </DropdownMenuLabel>
                  <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/cost')} disabled>
                    <Receipt className='mr-2 h-4 w-4' />
                    <span className=''> Cost Overview </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='text-xs font-normal uppercase text-muted-foreground'>
                    Other
                  </DropdownMenuLabel>
                  {otherMenus.map((item) => {
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        className='cursor-pointer'
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon className='mr-2 h-4 w-4' />
                        {item.name}
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='text-xs font-normal uppercase text-muted-foreground'>
                    Misc
                  </DropdownMenuLabel>
                  {miscMenus.map((item) => {
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        className='cursor-pointer'
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon className='mr-2 h-4 w-4' />
                        {item.name}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant='outline'
                onClick={() => setOpen(true)}
                className='flex w-[300px] justify-start border-secondary-foreground/10 bg-secondary text-muted-foreground'
              >
                <Search className='mr-2 h-6 w-5' />
                Search Patients ...
              </Button>
            </div>
            <div className='flex items-center space-x-3'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-secondary-foreground/10'
                  >
                    <Microscope className='h-5 w-5 text-muted-foreground' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-52'>
                  <DropdownMenuLabel className='text-xs uppercase'>
                    Create Options
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/create')}>
                    <UserPlus className='mr-2 h-4 w-4' />
                    <span> Register Patient </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/createtest')}>
                    <ListPlus className='mr-2 h-4 w-4' />
                    <span> Create Test Order </span>
                  </DropdownMenuItem>
                  <DropdownMenuLabel className='text-xs uppercase'>
                    QC Options
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => qualityCheckRequest()}>
                    <Activity className='mr-2 h-4 w-4' />
                    <span> Latest QC Results </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/qc')}>
                    <Check className='mr-2 h-4 w-4' />
                    <span> QC Reports </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-secondary-foreground/10'
                  >
                    <Globe className='h-5 w-5 text-muted-foreground' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='center'>
                  <DropdownMenuItem>
                    <span className='mr-2 font-semibold text-muted-foreground'>
                      EN
                    </span>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className='mr-2 font-semibold text-muted-foreground '>
                      SW
                    </span>
                    Swahili
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-secondary-foreground/10'
                  >
                    <Sun
                      className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-muted-foreground transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon
                      className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-muted-foreground transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='center'>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className='mr-2 h-4 w-4' /> Light{' '}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className='mr-2 h-4 w-4' />
                    Dark{' '}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Tv2 className='mr-2 h-4 w-4' />
                    System{' '}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-muted-foreground/10'>
                <span className='text-sm text-muted-foreground/70'>
                  Avatar
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='flex space-x-2 p-1'>
                    <div className='flex flex-col items-start justify-start'>
                      <h1 className='text-sm font-medium text-muted-foreground dark:text-secondary-foreground uppercase'>
                        {' '}
                        Nono
                      </h1>
                      <p className='text-xs font-normal uppercase text-muted-foreground/70'>
                        
                      Laboratory
                      </p>
                    </div>
                    <ChevronDown className='h-4 w-4 text-slate-400' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col items-start justify-start'>
                      <h1 className='text-sm font-medium'>
                        Noella
                      </h1>
                      <p className='text-xs font-normal text-slate-400'>
                        Email
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCog className='mr-2 h-4 w-4' />
                    <span> Profile </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='mr-2 h-4 w-4' />
                    <span> Preferences </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className='text-red-600'
                    
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    <span> Sign Out </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <Crumbs/>
    </>


  )
}

export default Topnav