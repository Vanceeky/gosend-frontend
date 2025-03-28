import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheckIcon, ShieldXIcon, MoreVertical, ExternalLink, Wallet, WalletMinimal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExternalLinkIcon, Copy } from "lucide-react"


import MembersTable from "@/app/dashboard/community/MembersTable";

export default function CommunityHome() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("transactions");
  const { community_id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
        const response = await fetch(
          `http://${API_BASE_URL}/v1/community`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch community details");
        }


        const data = await response.json();

        
        
        setCommunity(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [community_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  const handleActivationUpdate = (userId) => {
    console.log("Updating user:", userId); // Debugging
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId
          ? { ...user, is_activated: true }
          : user
      )
    );
  };
  return (
    <div className="flex justify-center h-screen">
      <div className="w-full flex gap-4">
        {/* User Info & Tabs Card (8/12) */}
        <Card className="w-full ">
         
            <CardHeader className="">
              
              <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                  <AvatarFallback>BB</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1 flex-wrap sm:flex-nowrap">

                  <span className="truncate cursor-pointer hover:underline">



                    <Dialog>
                      <DialogTrigger asChild>
                        <span>{community?.community_name}</span>
                      </DialogTrigger>
                      <DialogContent className="w-full mx-auto px-4 sm:px-6 rounded-lg"> {/* Fixed width */}
                        <DialogHeader>
                          <DialogTitle>{community?.community_name}</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <div>
                          <Tabs defaultValue="account">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="account">Account</TabsTrigger>
                              <TabsTrigger value="address">Address</TabsTrigger>
                            </TabsList>

                            {/* Account Tab */}
                            <TabsContent value="account" className="w-full h-[405px] overflow-y-auto"> {/* Fixed height and scrollable */}
                              <Card className="w-full">
                                <CardContent className="space-y-4 w-full">
                                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-3">
                                    {/* Reward Points Card */}
                                    <Card className="p-4">
                                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                                        <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                                        <WalletMinimal className="h-4 w-4 text-muted-foreground" />
                                      </CardHeader>
                                      <CardContent className="p-0">
                                        <div className="text-2xl font-bold">{community?.reward_points}</div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  <Separator />

                                  {/* Read-only User ID with Copy Button */}
                                  <div className="flex flex-col gap-1 mt-3">
                                    <Label htmlFor="user-id" className="text-sm font-medium">
                                      Leader User ID
                                    </Label>
                                    <div className="flex items-center gap-2">
                                      <Input id="user-id" defaultValue={community?.leader.user_id} readOnly className="w-full cursor-pointer" />
                                      <Button type="button" size="sm" className="px-3">
                                        <span className="sr-only">Copy</span>
                                        <Copy className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Mobile Number and Account Type (Side by Side) */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <Label htmlFor="mobile">Mobile Number</Label>
                                      <Input id="mobile" type="text" readOnly defaultValue={community?.leader.mobile_number} className="w-full cursor-pointer" />
                                    </div>
                                    <div className="space-y-1">
                                      <Label htmlFor="account-type">Account Type</Label>
                                      <Input id="account-type" type="text" readOnly defaultValue={community?.leader.account_type} className="w-full cursor-pointer" />
                                    </div>
                                  </div>

                                  <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                      <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                      <span className="bg-background px-2 text-muted-foreground">
                                        Community
                                      </span>
                                    </div>
                                  </div>

                                  {/* Community Name */}
                                  <div className="flex flex-col gap-1 mt-3">
                                    <Label htmlFor="user-id" className="text-sm font-medium">
                                      Community ID
                                    </Label>
                                    <div className="flex items-center gap-2">
                                      <Input id="user-id" defaultValue={community_id} readOnly className="w-full cursor-pointer" />
                                      <Button type="button" size="sm" className="px-3">
                                        <span className="sr-only">View</span>
                                        <Copy className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>

                            {/* Address Tab */}
                            <TabsContent value="address" className="w-full h-[405px] overflow-y-auto"> {/* Fixed height and scrollable */}
                              <Card>
                                <CardContent className="space-y-2">
                                  {/* House Number and Street Name (Side by Side) */}
                                  <div className="grid grid-cols-[4fr_8fr] gap-4 mt-3">
                                    <div className="space-y-1">
                                      <Label htmlFor="house-number">House Number</Label>
                                      <Input
                                        id="house-number"
                                        type="text"
                                        readOnly
                                        defaultValue="1234"
                                        className="w-full cursor-pointer"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label htmlFor="street-name">Street Name</Label>
                                      <Input
                                        id="street-name"
                                        type="text"
                                        readOnly
                                        defaultValue="Main Street"
                                        className="w-full cursor-pointer"
                                      />
                                    </div>
                                  </div>

                                  {/* Barangay */}
                                  <div className="space-y-1">
                                    <Label htmlFor="current">Barangay</Label>
                                    <Input id="current" readOnly type="text" />
                                  </div>

                                  {/* City / Municipality */}
                                  <div className="space-y-1">
                                    <Label htmlFor="new">City / Municipality</Label>
                                    <Input id="new" readOnly type="text" />
                                  </div>

                                  {/* Province */}
                                  <div className="space-y-1">
                                    <Label htmlFor="current">Province</Label>
                                    <Input id="current" readOnly type="text" />
                                  </div>

                                  {/* Region */}
                                  <div className="space-y-1">
                                    <Label htmlFor="new">Region</Label>
                                    <Input id="new" readOnly type="text" />
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </DialogContent>
                    </Dialog>


                  </span>




                      
                  </h2>
                  <TooltipProvider>
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Leader: {community.leader.first_name} {community.leader.middle_name} {community.leader.last_name} {community.leader.suffix_name || ""}
                      </p>
                    </div>
                  </TooltipProvider>

                </div>
     


              {/* Right: Popover (on small screens) & TabsList (on medium+ screens) */}
              <div className="flex items-center">
                {/* Popover button (only visible on small screens) */}
                <div className="block md:hidden">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" sideOffset={10} className="w-48">
                      <div className="flex flex-col space-y-2">
                        <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("transactions")}>
                          Cash in / Cash Out
                        </Button>
                        <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("purchases")}>
                          Purchases
                        </Button>
                        <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("rewards")}>
                          Rewards
                        </Button>
                        <Separator />
                        <Button variant="ghost" className="w-full text-left" onClick={() => setIsSheetOpen(true)}>
                          Referred Users
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>


              </div>
              </div>


              

            </CardHeader>

            <Separator />
            
            <CardContent className="flex-1 overflow-y-auto p-4">

              <MembersTable members={community.members} setData={setData} onActivate={handleActivationUpdate}/>

            </CardContent>
   
        </Card>



      </div>
    </div>
  );
}