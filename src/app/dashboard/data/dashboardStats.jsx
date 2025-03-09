import { Wallet, Users, ShoppingCart, Activity } from "lucide-react";

export const dashboardStats = [
  {
    title: "Admin MotherWallet",
    value: "₱45,231.89",
    change: "+20.1% from last month",
    icon: <Wallet className="h-5 w-5 text-muted-foreground" />,
    changeColor: "text-muted-foreground",
  },
  {
    title: "Members",
    value: "+2350",
    change: "50 Inactive Accounts",
    icon: <Users className="h-5 w-5 text-muted-foreground" />,
    changeColor: "text-red-700",
  },
  {
    title: "Merchants",
    value: "+12,234",
    change: "+19% from last month",
    icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" />,
    changeColor: "text-muted-foreground",
  },
  {
    title: "Community",
    value: "+573",
    change: "+201 since last hour",
    icon: <Activity className="h-5 w-5 text-muted-foreground" />,
    changeColor: "text-muted-foreground",
  },
];
