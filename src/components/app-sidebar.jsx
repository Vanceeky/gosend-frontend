import * as React from "react";
import {
  Command,
  LifeBuoy,
  Map,
  Send,
  LayoutDashboard,
  ReceiptTextIcon,
  UserRoundPenIcon,
  Users,
  Wallet,
  Wrench,
  Home,
  User,
  Gauge,
  CreditCard,
  UsersRound,
  Store,
  Building,
  PlaneIcon,
  Coins,
  BadgeCheck,
  Globe,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from '@/assets/gosend_logo.png';

const menuConfig = {
  MEMBER: {
    navMain: [
      {
        title: "Home",
        url: "/member",
        icon: Home,
      },

    ],
    navSecondary: [],
    projects: [],
  },
  MERCHANT: {
    navMain: [
      {
        title: "Home",
        url: "/merchant",
        icon: LayoutDashboard,
      },
      {
        title: "Transactions",
        url: "/merchant/transactions",
        icon: Wallet,
      },
      {
        title: "Rewards",
        url: "/merchant/rewards",
        icon: Send,
      },
    ],
    navSecondary: [],
    projects: [],
  },
  LEADER: {
    navMain: [
      {
        title: "Members",
        url: "/community/members",
        icon: Users,
        isActive: true,
        items: [
          {
            title: "Activated Members",
            url: "/community/activated-members",
          },
          {
            title: "Inactive Accounts",
            url: "/community/inactive-accounts",
          },
        ],
      },
    ],
    navSecondary: [],
    projects: [],
  },
  INVESTOR: {
    navMain: [
      {
        title: "Home",
        url: "/investor",
        icon: LayoutDashboard,
      },
      {
        title: "Members",
        url: "/investor/members",
        icon: UsersRound,
        isActive: true,
        items: [
          {
            
            title: "Activated Members",
            url: "/investor/activated-members",
          },
          {
            title: "Inactive Accounts",
            url: "/investor/inactive-accounts",
          },
        ],
      },
      {
        title: "Merchants",
        url: "/investor/merchants",
        icon: Store,
      },
      {
        title: "Community",
        url: "/investor/community",
        icon: Globe,
      },
      {
        title: "Rewards",
        url: "/investor/rewards",
        icon: Wallet,
      },
    ],
    navSecondary: [],
    projects: [],
  },
  ADMIN: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Gauge, // Better icon for an overview/dashboard
      },
      {
        title: "Mother Wallet",
        url: "/dashboard/motherwallet",
        icon: CreditCard, // Represents financial transactions more clearly
      },
      {
        title: "User Management", // More descriptive than "Platform"
        url: "/dashboard/members",
        icon: UsersRound, // Better for user-related management
        isActive: true,
        items: [
          {
            title: "Members",
            url: "/dashboard/members",
            icon: <User/>, // Individual user icon
          },
          {
            title: "Merchants",
            url: "/dashboard/merchants",
            icon: Store, // Represents businesses more accurately
          },
          {
            title: "Community",
            url: "/dashboard/community",
            icon: Users, // Represents groups of people
          },
          {
            title: "Hub",
            url: "/dashboard/hub",
            icon: Building, // Represents an organization or hub
          },
        ],
      },
      {
        title: "Activation History",
        url: "/dashboard/activation-history",
        icon: BadgeCheck
      },
      {
        title: "Rewards",
        url: "/dashboard/rewards",
        icon: Coins
      }
    ],
  
    navSecondary: [
      {
        title: "Accounts",
        url: "/dashboard/accounts",
        icon: Wrench,
      },
    ],
    projects: [
      
    ],
  },
  CUSTOMER_SUPPORT: {
    navMain: [
      {
        title: "Home",
        url: "/customer-support",
        icon: LayoutDashboard,
      },
      {
        title: "Members",
        url: "/customer-support/members",
        icon: ReceiptTextIcon,
        isActive: true,
        items: [
          {
            
            title: "Activated Members",
            url: "/customer-support/activated-members",
          },
          {
            title: "Inactive Accounts",
            url: "/customer-support/inactive-accounts",
          },
        ],
      },
      {
        title: "Merchants",
        url: "/customer-support/merchants",
        icon: UserRoundPenIcon,
      },
      {
        title: "Community",
        url: "/customer-support/community",
        icon: UserRoundPenIcon,
      },
      {
        title: "Rewards",
        url: "/customer-support/rewards",
        icon: UserRoundPenIcon,
      },
    ],
    navSecondary: [],
    projects: [],
  },


};

export function AppSidebar({ ...props }) {
  
  const userRole = localStorage.getItem("account_type") || "MEMBER";
  const menuData = menuConfig[userRole] || menuConfig.MEMBER;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Command className="size-4" />
                  <img src={logo} alt="Logo" className="h-full w-full object-contain" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">GoSend+</span>
                  <span className="truncate text-xs">NetsuiLabs</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuData.navMain} />
        <NavSecondary items={menuData.navSecondary} className="mt-auto" />
        <NavProjects projects={menuData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "GoSend", email: "9456656707"}} />
      </SidebarFooter>
    </Sidebar>
  );
}
