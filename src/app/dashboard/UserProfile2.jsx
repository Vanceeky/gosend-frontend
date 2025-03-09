import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheckIcon, ShieldMinusIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function UserProfile() {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-full flex gap-4">
        {/* User Info & Tabs Card (8/12) */}
        <Card className="w-8/12 flex flex-col">
          <Tabs defaultValue="transactions" className="w-full flex-1 flex flex-col">
          <CardHeader className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full">
            {/* Left Section (5/12 on medium+ screens) */}
            <div className="flex items-center gap-4 col-span-12 md:col-span-5">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/profile.jpg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-1">
                  John Doe
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ShieldCheckIcon className="text-green-500 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>Member is activated</TooltipContent>
                  </Tooltip>
                </h2>
                <p className="text-sm text-gray-500">User ID: 123456</p>
              </div>
            </div>

            {/* Right Section (7/12 on medium+ screens) */}
            <div className="col-span-12 md:col-span-7 flex justify-end">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
                <TabsTrigger value="transactions">Cash in / Cash Out</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="rewards">Rewards </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>



            {/* Content Section (Scrollable) */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>View all your transactions here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Transactions content goes here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="purchases">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchases</CardTitle>
                    <CardDescription>View your purchase history.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Purchases content goes here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards">
                <Card>
                  <CardHeader>
                    <CardTitle>Rewards History</CardTitle>
                    <CardDescription>Check your earned rewards.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Rewards history content goes here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

            </CardContent>
          </Tabs>
        </Card>

        {/* Referred Users Card (4/12) */}
        <Card className="w-4/12 flex flex-col">
          <CardHeader>
            <CardTitle>Referred Users</CardTitle>
            <CardDescription>List of users you have referred.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Referred users content goes here...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
