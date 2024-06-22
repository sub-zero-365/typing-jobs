import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import {
    Await,
    Link,
    defer,
    useAsyncValue,
    useLoaderData,
    useRouteLoaderData,
} from 'react-router-dom';
import { IUserState } from '../../actions/userSlice.js';
import DisplayUserInformationCard from '../../components/DisplayUserInformationCard.js';
import { Scrollable } from '../../components/Scrollable.js';
import Stats from '../../components/Stats.js';
import Table, { columns, payments } from '../../components/Table.js';
import CustomSelect from '../../components/dropdowns/CustomSelect.js';
import { Button } from '../../components/ui/button.js';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from '../../components/ui/drawer';
import { Separator } from '../../components/ui/separator.js';
import wait from '../../constants/wait';
import customFetch from '../../utils/customFetch.js';
import { defaultStats, iStat, user } from '../../utils/types.js';
import { Car, PersonStanding, Settings, User } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../../components/ui/sheet';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../components/ui/breadcrumb';
import { cn } from '../../lib/utils.js';
import { DatePickerWithRange } from '../../components/DatePicker/CustomDatePicker.js';
// import { data } from '@/components/charts/react-chartjs-2';
import ChartsOptions, { FilterButtonPosition } from '@/components/charts/chartOptions.js';
import Heading from '../../components/Heading.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.js';

const singleUserQuery = (userId) => ({
    queryKey: [`singleUser`, userId],
    queryFn: async () => {
        const { data } = await customFetch.get<{ user: user }>(`/users/${userId}`);
        return data.user;
    },
});

const singleUserLogisticsQuery = (id) => ({
    queryKey: ['singleuserdetails', id],
    queryFn: async () => {
        const { data } = await customFetch.get('/pdfdocument/stats', {
            params: { userId: id },
        });
        return data;
    },
    keepPreviousData: true,
});

const statsQuery = (id) => ({
    queryKey: ['single-stats', id],
    queryFn: async () => {
        const { data } = await customFetch.get<{
            defaultStats: iStat[],
        }>('/pdfdocument/stats', {
            params: { userId: id },
        });
        return data;
    },
});

export const loader = (queryClient) => async ({ params }) => {
    const id = params.userId as number;
    const user = await queryClient.ensureQueryData(singleUserQuery(id)) as user;
    await queryClient.ensureQueryData(statsQuery(id));

    return defer({
        user,
        id,
        userDetails: queryClient.ensureQueryData(singleUserLogisticsQuery(id)),
    });
};

type iType = Partial<Exclude<IUserState["user"], null>>;



const SingleUser = () => {
    const { id, userDetails, userStats } = useLoaderData() as any;
    const user = useQuery(singleUserQuery(id)).data as unknown as iType;
    const { defaultStats } = useQuery(statsQuery(id)).data as unknown as { defaultStats: defaultStats };
    const [open, setOpen] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const buttonRef = React.useRef<any>(null);
    const queryRef = React.useRef<any>(null);
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const data = {
        labels: [...Object.keys(defaultStats).map(k => k)],
        datasets: [
            {
                label: 'Creating keys',
                data: Object.values(defaultStats).map(k => k),

            },
        ],
    };
    const isValid = defaultStats["uploaded"] + defaultStats["completed"] + defaultStats["in-progress"]

    const stats = [
        {
            title: 'Total Documents',
            count: isValid || 0,
            icon: User,
            className: 'bg-green-900 shadow-lg shadow-colorPrimary rounded-xl text-white',
        },
        {
            title: 'uploaded',
            count: defaultStats["uploaded"] || 0,
            icon: User,
            className: 'bg-blue-200 shadow-lg shadow-colorPrimary rounded-xl',
        },
        {
            title: 'in-progress',
            count: defaultStats["in-progress"] || 0,
            icon: PersonStanding,
            className: 'bg-orange-200 shadow-lg shadow-colorPrimary rounded-xl',
        },
        {
            title: 'completed',
            count: defaultStats["completed"] || 0,
            icon: Car,
            className: 'bg-green-200 shadow-lg shadow-colorPrimary rounded-xl',
        },
    ];
    const ProfileForm = ({ className }: React.ComponentProps<'form'>) => (
        <form className={cn('grid items-start gap-4', className)}>
            <Tabs defaultValue="query" className="w-full">
                <TabsList className="!w-fit border flex gap-x-4 !mx-auto flex-none">
                    <TabsTrigger value="query" className="data-[state=active]:bg-colorPrimary transition-colors duration-500 data-[state=active]:text-white">
                        User Query
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="data-[state=active]:bg-colorPrimary transition-colors duration-500 data-[state=active]:text-white">
                        6Months Stats
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="query">
                    {/* <DatePickerWithRange  /> */}
                </TabsContent>
                <TabsContent value="stats">
                    <div className="mb-4">
                        <Heading className="text-center font-semibold">USERS STATISTICS</Heading>
                        <ChartsOptions donot_refresh btn_position="top" chartData={data} />
                    </div>
                </TabsContent>
            </Tabs>
        </form>
    );

    return (
        <div>
            <Breadcrumb className="py-5 pl-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/users">Users</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-colorPrimary text-xl lg:text-2xl">
                            Single User Details
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div
                onClick={() => setIsOpen((c) => !c)}
                className="size-10 flex items-center justify-center text-white rounded-sm bg-colorPrimary animate-bounce shadow-md fixed top-1/2 right-[max(calc(calc(100%-min(100%,80rem))/2),1rem)] z-[50]"
            >
                <Settings />
            </div>

            {isDesktop ? (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger className="hidden">Open</SheetTrigger>
                    <SheetContent className="w-full !max-w-lg overflow-y-auto">
                        <SheetHeader>
                            <SheetDescription>
                                <ProfileForm />
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            ) : (
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerTrigger asChild ref={buttonRef} className="hidden">
                        <Button variant="outline">Edit Profile</Button>
                    </DrawerTrigger>
                    <DrawerContent className="f">
                        <ProfileForm className="px-4" />
                        <DrawerFooter className="pt-2">
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild className="hidden">
                    <Button variant="outline">Edit Profile</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DisplayUserInformationCard className="w-full mb-6 block" {...user!} defaultStats={defaultStats} />
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Button
                className="lg:hidden"
                onClick={() => setOpen((c) => !c)}
            >
                View user stats
            </Button>

            <div className="flex flex-row-reverse items-start max-w-[calc(100%-1rem)] lg:gap-x-2 mx-auto mt-2 rounded-xl py-5 border-[1px] border-muted min-h-screen">
                <div className="sticky top-14 flex-none">
                    <DisplayUserInformationCard className="lg:w-[18rem] mb-6 hidden lg:block" {...user!} defaultStats={defaultStats} />
                    <div className='hidden lg:block'>
                        <DatePickerWithRange className='' />
                    </div>
                </div>
                <div className="flex-1 w-[calc(100%-333rem)]">
                    <Scrollable className="max-w-5xl mx-auto sticky top-14 py-2 z-10 bg-white">
                        {Array.from({ length: 4 }, (_, idx) => (
                            <CustomSelect
                                className="w-fit rounded-sm"
                                key={idx}
                                defaultValue="Role"
                                searchKey="role"
                                values={['admin', 'user', 'employee']}
                            />
                        ))}
                    </Scrollable>
                    <DatePickerWithRange  />

                    <div className="mb-4">
                        <Heading className="text-center font-semibold">USERS STATISTICS</Heading>
                        {/* {JSON.stringify(defaultStats)}

                         */}
                        <Stats stats={stats} />

                        {
                            isValid ? <>
                                <ChartsOptions btn_position="bottom" chartData={data} />
                                <FilterButtonPosition />
                            </>
                                : null
                        }

                    </div>

                    {/* <Separator className="my-3" /> */}
                    {/* <Table columns={columns} data={payments} /> */}
                </div>
            </div>
        </div>
    );
};

export default SingleUser;
