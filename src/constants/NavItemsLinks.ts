// import from "lucide-react"
import {
  AudioWaveform,
  ContactIcon,
  Home,
  HomeIcon,
  LayoutDashboard,
  LogInIcon,
  LucideAlignHorizontalDistributeStart,
  LucideIcon,
  LucideLayoutDashboard,
  PersonStanding,
  PlusCircle,
  User,
  Users,
} from "lucide-react";
export interface INavItemsLinks {
  name: string;
  link: string;
  icon: LucideIcon;
}
interface filterLinks extends Omit<INavItemsLinks, "icon"> {
  filterType: string;
}
export const NavItemsLinks: INavItemsLinks[] = [
  {
    name: "Home",
    link: "/home",
    icon: HomeIcon,
  },
  {
    name: "Services",
    link: "/#services",
    icon: LogInIcon,
  },
  {
    name: "DashBoard",
    link: "/",
    icon: LucideLayoutDashboard,
  },
  {
    name: "Contact Us",
    link: "/home/contact-us",
    icon: ContactIcon,
  },
  {
    name: "About Us",
    link: "/home/about-us",
    icon:LucideAlignHorizontalDistributeStart,
  },
];
export const DashboardNavLinks: (typeof NavItemsLinks)[number][] = [
  {
    name: "DashBoard",
    link: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    link: "users",
    icon: Users,
  },
  {
    name: "tasks",
    link: "logistics",
    icon: AudioWaveform,
  },
  {
    name: "new task",
    link: "upload",
    icon: PlusCircle,
  },
  {
    name: "messages",
    link: "newlogistic",
    icon: PlusCircle,
  },
];
