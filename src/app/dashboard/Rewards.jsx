import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedReward, setSelectedReward] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch("http://localhost:8000/v1/reward/");
        if (!response.ok) {
          throw new Error("Failed to fetch rewards");
        }
        const data = await response.json();
        setRewards(data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchRewards();
  }, []);

  const filteredRewards = rewards.filter((reward) =>
    reward.reference_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-6 space-y-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Rewards</h2>

      {/* Search Input */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search reference ID..."
          className="w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto h-[60vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Receiver</TableHead>
              <TableHead>Reward Source Type</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRewards.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell>{reward.receiver?.full_name || "N/A"}</TableCell>
                <TableCell>{reward.reward_source_type || "N/A"}</TableCell>
                <TableCell>{reward.reward_points}</TableCell>
                <TableCell>{reward.title}</TableCell>
                <TableCell>{new Date(reward.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedReward(reward);
                          setIsDialogOpen(true);
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Reward Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Reward Details</DialogTitle>
          <DialogDescription>Detailed information about this reward.</DialogDescription>
          <div className="space-y-2">
            {selectedReward && (
              <>
                <p><strong>Reference ID:</strong> {selectedReward.reference_id}</p>
                <p><strong>Reward From:</strong> {selectedReward.reward_from?.full_name || "N/A"}</p>
                <p><strong>Receiver:</strong> {selectedReward.receiver?.full_name || "N/A"}</p>
                <p><strong>Reward Source Type:</strong> {selectedReward.reward_source_type || "N/A"}</p>
                <p><strong>Points:</strong> {selectedReward.reward_points}</p>
                <p><strong>Title:</strong> {selectedReward.title}</p>
                <p><strong>Description:</strong> {selectedReward.description || "No description available."}</p>
                <p><strong>Status:</strong> {selectedReward.status}</p>
                <p><strong>Date:</strong> {new Date(selectedReward.created_at).toLocaleDateString()}</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
