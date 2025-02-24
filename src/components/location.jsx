"use client";

import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function LocationForm({
  selectedRegion,
  setSelectedRegion,
  selectedProvince,
  setSelectedProvince,
  selectedCity,
  setSelectedCity,
  selectedBarangay,
  setSelectedBarangay,
  street,
  setStreet,
}) {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    fetchData("https://psgc.gitlab.io/api/regions").then(setRegions);
  }, []);

  useEffect(() => {
    if (selectedRegion?.code) {
      fetchData(`https://psgc.gitlab.io/api/provinces?region_code=${selectedRegion.code}`).then(setProvinces);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince?.code) {
      fetchData(`https://psgc.gitlab.io/api/provinces/${selectedProvince.code}/cities-municipalities/`).then(setCities);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity?.code) {
      fetchData(`https://psgc.gitlab.io/api/cities-municipalities/${selectedCity.code}/barangays/`).then(setBarangays);
    }
  }, [selectedCity]);

  const createDropdown = (label, items, selectedItem, setSelectedItem, disabled, dropdownKey) => (
    <div className="mt-4">
      <Label>{label}:</Label>
      <Popover open={openDropdown === dropdownKey} onOpenChange={(isOpen) => setOpenDropdown(isOpen ? dropdownKey : null)}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" disabled={disabled} className="w-full justify-between">
            {selectedItem ? selectedItem.name : `Select ${label.toLowerCase()}...`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.code}
                    value={item.code}
                    onSelect={() => {
                      setSelectedItem(item);
                      setOpenDropdown(null);
                    }}
                  >
                    {item.name}
                    <Check className={cn("ml-auto", selectedItem?.code === item.code ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div>
      {createDropdown("Region", regions, selectedRegion, setSelectedRegion, false, "region")}
      {createDropdown("Province", provinces, selectedProvince, setSelectedProvince, !selectedRegion, "province")}
      {createDropdown("City/Municipality", cities, selectedCity, setSelectedCity, !selectedProvince, "city")}
      {createDropdown("Barangay", barangays, selectedBarangay, setSelectedBarangay, !selectedCity, "barangay")}
      <div className="mt-4">
        <Label htmlFor="streetname">Street Name:</Label>
        <Input id="streetname" type="text" placeholder="123 street" value={street} onChange={(e) => setStreet(e.target.value)} required />
      </div>
    </div>
  );
}
