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
    name: "DashBoard",
    link: "/dashboard",
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
];
export const DashboardNavLinks: (typeof NavItemsLinks)[number][] = [
  {
    name: "DashBoard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    link: "users",
    icon: Users,
  },
  {
    name: "logistics",
    link: "logistics",
    icon: AudioWaveform,
  },
  {
    name: "Add logistic",
    link: "newlogistic",
    icon: PlusCircle,
  },
];
