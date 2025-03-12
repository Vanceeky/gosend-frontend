import * as React from "react"
import {
  Command,
  LifeBuoy,
  Map,
  Send,
  LayoutDashboard,
  Users,
  Wallet,
  StoreIcon,
  Users2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from '@/assets/gosend_logo.png';

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
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

  ],

  navSecondary: [
    {
      title: "Dashboard",
      url: "/merchant",
      icon: LifeBuoy,
    },
    {
      title: "Transactions",
      url: "/merchant/transactions",
      icon: Send,
    },
    {
      title: "Rewards",
      url: "/merchant/rewards",
      icon: Send,
    },
    {
      title: "Profile",
      url: "/merchant/manage-profile",
      icon: Send,
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "MotherWallet",
      url: "/dashboard/motherwallet",
      icon: Wallet,
    },
    {
      name: "Merchants",
      url: "/dashboard/merchants",
      icon: StoreIcon,
    },
    {
      name: "Community",
      url: "/dashboard/community",
      icon: Users2,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}



export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar variant="inset" {...props}>
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

        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
