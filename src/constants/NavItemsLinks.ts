// import from "lucide-react"
import {
  AudioWaveform,
  LayoutDashboard,
  LogInIcon,
  LucideIcon,
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
    icon: LogInIcon,
  },
  {
    name: "Services",
    link: "/#services",
    icon: LogInIcon,
  },
  {
    name: "Products",
    link: "/#products",
    icon: LogInIcon,
  },
  {
    name: "DashBoard",
    link: "/",
    icon: LogInIcon,
  },
  {
    name: "About Us",
    link: "/home/about-us",
    icon: LogInIcon,
  },
  {
    name: "Contact Us",
    link: "/home/contact-us",
    icon: LogInIcon,
  },
  {
    name: "About Us",
    link: "/home/about-us",
    icon: LogInIcon,
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
    link: "newlogistic",
    icon: PlusCircle,
  },
  {
    name: "messages",
    link: "newlogistic",
    icon: PlusCircle,
  },
];
