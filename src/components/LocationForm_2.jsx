"use client";

import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

export default function LocationForm_2({
  selectedRegion,
  setSelectedRegion,
  selectedProvince,
  setSelectedProvince,
  selectedCity,
  setSelectedCity,
}) {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    fetchData("https://psgc.gitlab.io/api/regions").then(setRegions);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      setProvinces([]); // Clear previous provinces
      setSelectedProvince(null); // Reset province when region changes
      setSelectedCity(null); // Reset city as well
      fetchData("https://psgc.gitlab.io/api/provinces").then((allProvinces) => {
        const filteredProvinces = allProvinces.filter(
          (prov) => prov.regionCode === selectedRegion.code
        );
        setProvinces(filteredProvinces);
      });
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      setCities([]); // Clear previous cities
      setSelectedCity(null); // Reset city when province changes
      fetchData(`https://psgc.gitlab.io/api/provinces/${selectedProvince.code}/cities-municipalities/`).then(setCities);
    }
  }, [selectedProvince]);

  const createDropdown = (label, items, selectedItem, setSelectedItem, disabled, dropdownKey) => (
    <div className="">
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
                      setSelectedItem({ code: item.code, name: item.name }); // Ensure correct object format
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
    </div>
  );
}
