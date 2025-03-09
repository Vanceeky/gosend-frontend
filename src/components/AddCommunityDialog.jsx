import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Import Sonner toast

export default function AddCommunityDialog({ onCommunityAdded }) {
  const [communityName, setCommunityName] = useState("");
  const [leaderNumber, setLeaderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle Form Submission
  const handleCreateCommunity = async () => {
    if (!communityName || !leaderNumber) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http://${API_BASE_URL}:8000/v1/community`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          community_name: communityName,
          leader_mobile_number: leaderNumber,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        toast.success("Community created successfully!");

        // Notify parent component to refresh data
        if (onCommunityAdded) {
          onCommunityAdded();
        }

        // Reset form & close dialog
        setCommunityName("");
        setLeaderNumber("");
        setIsOpen(false);
      } else {
        toast.error(result.message || "Failed to create community.");
      }
    } catch (error) {
      console.error("Error creating community:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Community</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Community</DialogTitle>
          <Separator />
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="community-name">Community Name</Label>
            <Input
              type="text"
              id="community-name"
              placeholder="Best Community"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="leader-number">Leader Mobile Number</Label>
            <Input
              type="text"
              id="leader-number"
              placeholder="9456656707"
              value={leaderNumber}
              onChange={(e) => setLeaderNumber(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateCommunity} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
