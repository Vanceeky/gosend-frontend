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
  StoreIcon,
  Users2,
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
        title: "Dashboard",
        url: "/member",
        icon: LayoutDashboard,
      },
      {
        title: "Transactions",
        url: "/member/transactions",
        icon: ReceiptTextIcon,
      },
      {
        title: "Profile",
        url: "/member/profile",
        icon: UserRoundPenIcon,
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
        url: "/dashboard/members",
        icon: Users,
        items: [
          {
            title: "Activated Members",
            url: "/dashboard/activated-members",
          },
          {
            title: "Inactive Accounts",
            url: "/dashboard/inactive-accounts",
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
        icon: ReceiptTextIcon,
      },
      {
        title: "Community",
        url: "/investor/community",
        icon: UserRoundPenIcon,
      },
      {
        title: "Rewards",
        url: "/investor/rewards",
        icon: UserRoundPenIcon,
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
        icon: LayoutDashboard,
      },
      {
        title: "MotherWallet",
        url: "/dashboard/motherwallet",
        icon: Wallet,
      },
      {
        title: "Members",
        url: "/dashboard/members",
        icon: Users,
        isActive: true,
        items: [
          {
            
            title: "Activated Members",
            url: "/dashboard/activated-members",
          },
          {
            title: "Inactive Accounts",
            url: "/dashboard/inactive-accounts",
          },
        ],
      },
      {
        title: "Merchants",
        url: "/dashboard/merchants",
        icon: StoreIcon,
      },
      {
        title: "Community",
        url: "/dashboard/community",
        icon: Users2,
      },
      {
        title: "Travel",
        url: "#",
        icon: Map,
      },

    ],
    navSecondary: [
      {
        title: "MotherWallet",
        url: "/dashboard/motherwallet",
        icon: Wallet,
      },
    ],
    projects: [
      
    ],
  },
};

export function AppSidebar({ ...props }) {
  
  const userRole = localStorage.getItem("user_role") || "MEMBER";
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
        <NavUser user={{ name: "Ivan Sari Sari Store", email: "9456656707", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
