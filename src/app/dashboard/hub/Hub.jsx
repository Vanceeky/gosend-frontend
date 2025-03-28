import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import AddHubDialog from "@/components/AddHubDialog";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
const Hub = () => {
  const [data, setData] = useState([]);

  const fetchHubs = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http://${API_BASE_URL}/v1/hub/all`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setData(result || []);
    } catch (error) {
      console.error("Error fetching hubs:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  return (
    <Card className="p-6 space-y-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hubs</h2>

      {/* Search & Add Hub */}
      <div className="flex flex-wrap items-center gap-4">
        <Input placeholder="Search Hub..." className="w-80" />
        <AddHubDialog
          onHubCreated={() => {
            toast.success("Hub successfully created!");
            fetchHubs();
          }}
        />
      </div>

      {/* Table Container */}
      <div className="overflow-auto h-[60vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Reward Points</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Date added</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((hub) => (
                <TableRow key={hub.id} class="cursor-pointer hover:bg-gray-100">
                  
                  <TableCell className="font-semibold uppercase">{hub.hub_name}</TableCell>

                  <TableCell className="capitalize">
                      <Tooltip>
                        <TooltipTrigger>
                          <Link
                          to={`/dashboard/member/${hub.hub_user_id}`}
                          className="hover:underline hover:text-blue-500 capitalize"
                          >
                          {hub.hub_user_name.toLowerCase()}
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Member Profile</p>
                        </TooltipContent>
                      </Tooltip>
                  </TableCell>

                  <TableCell>{hub.reward_points}</TableCell>
                  <TableCell>
                    {`${hub.region}, ${hub.province}, ${hub.municipality_city} ${
                      hub.barangay || ""
                    }`}
                  </TableCell>
                
                  <TableCell>
                    {new Date(hub.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
 
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No hubs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default Hub;
