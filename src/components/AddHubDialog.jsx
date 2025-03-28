import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationForm_2 from "./LocationForm_2";
import { toast } from "sonner";

export default function AddDialogHub({ onHubCreated }) {
  const [hubName, setHubName] = useState("");
  const [hubUser, setHubUser] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to control dialog open/close

  const handleCreateHub = async () => {
    if (!hubName || !hubUser || !selectedRegion || !selectedProvince || !selectedCity) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
    const hubData = {
      hub_name: hubName,
      hub_user: hubUser,
      region: selectedRegion?.name || "",
      province: selectedProvince?.name || "",
      municipality_city: selectedCity?.name || "",
      barangay: selectedBarangay || null, // Barangay is optional
    };

    try {
      const response = await fetch(`http://${API_BASE_URL}/v1/hub/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to create hub");

      toast.success("Hub successfully created!"); // Show success message

      if (onHubCreated) onHubCreated(); // Refresh hub list
      setIsOpen(false); // Close dialog on success
      resetForm(); // Clear form inputs
    } catch (err) {
      console.error("Error creating hub:", err);
      toast.error(err.message || "Failed to create hub. Please try again.");
      toast.error(err.message || "Failed to create hub.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setHubName("");
    setHubUser("");
    setSelectedRegion(null);
    setSelectedProvince(null);
    setSelectedCity(null);
    setSelectedBarangay("");
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Add new Hub
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Hub</DialogTitle>
          <DialogDescription>Please enter the required details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="hub-name">Hub Name</Label>
            <Input
              type="text"
              id="hub-name"
              placeholder="Hublot"
              value={hubName}
              onChange={(e) => setHubName(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="hub-user">Hub Manager</Label>
            <Input
              type="text"
              id="hub-user"
              placeholder="9456656707"
              value={hubUser}
              onChange={(e) => setHubUser(e.target.value)}
            />
          </div>

          <LocationForm_2
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedBarangay={selectedBarangay}
            setSelectedBarangay={setSelectedBarangay}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <DialogFooter>
          <Button onClick={handleCreateHub} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
