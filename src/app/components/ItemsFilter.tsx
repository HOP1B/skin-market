"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function ItemsFilter() {
  // Price range state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Exterior condition state
  const [exteriorConditions, setExteriorConditions] = useState({
    factoryNew: false,
    minimalWear: false,
    fieldTested: false,
    wellWorn: false,
    battleScarred: false,
  });

  // Item category state
  const [itemCategories, setItemCategories] = useState({
    knife: false,
    pistol: false,
    rifle: false,
    sniperRifle: false,
    smg: false,
    shotgun: false,
    machineGun: false,
  });

  // Handle price input changes
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
    if (value === "" || isNaN(Number(value))) return;
    setPriceRange([Number(value), priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
    if (value === "" || isNaN(Number(value))) return;
    setPriceRange([priceRange[0], Number(value)]);
  };

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setMinPrice(value[0].toString());
    setMaxPrice(value[1].toString());
  };

  // Handle exterior condition changes
  const handleExteriorChange = (condition: keyof typeof exteriorConditions) => {
    setExteriorConditions({
      ...exteriorConditions,
      [condition]: !exteriorConditions[condition],
    });
  };

  // Handle item category changes
  const handleCategoryChange = (category: keyof typeof itemCategories) => {
    setItemCategories({
      ...itemCategories,
      [category]: !itemCategories[category],
    });
  };

  // Apply filters
  const applyFilters = () => {
    const filters = {
      price: {
        from: Number(minPrice),
        to: Number(maxPrice),
      },
      exterior: Object.entries(exteriorConditions)
        .filter(([checked]) => checked)
        .map(([condition]) => condition),
      itemsCategory: Object.entries(itemCategories)
        .filter(([checked]) => checked)
        .map(([category]) => category),
    };

    console.log("Applied filters:", filters);
    // Here you would typically filter your items based on these criteria
  };

  return (
    <Card className="w-full max-w-[365px] bg-[#2a2c2e] border-[#2a2c2e]">
      <CardHeader>
        <CardTitle className="text-white">Filter Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range Filter */}
        <div className="space-y-4">
          <h3 className="font-medium text-white">Price Range</h3>
          <div className="flex items-center space-x-4">
            <div className="grid gap-1.5 w-full max-w-[120px] text-white">
              <Label htmlFor="min-price">From</Label>
              <Input
                id="min-price"
                type="text"
                value={minPrice}
                onChange={handleMinPriceChange}
                min={0}
              />
            </div>
            <div className="grid gap-1.5 w-full max-w-[120px] text-white">
              <Label htmlFor="max-price">To</Label>
              <Input
                id="max-price"
                type="text"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                min={0}
              />
            </div>
          </div>
          <Slider
            value={[priceRange[0], priceRange[1]]}
            min={0}
            max={10000}
            step={1}
            onValueChange={handleSliderChange}
            className="py-4"
          />
        </div>

        {/* Exterior Condition Filter */}
        <div className="space-y-4 text-white">
          <h3 className="font-medium">Exterior</h3>
          <div className="grid gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="factory-new"
                checked={exteriorConditions.factoryNew}
                onCheckedChange={() => handleExteriorChange("factoryNew")}
              />
              <Label htmlFor="factory-new" className="cursor-pointer">
                Factory New
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="minimal-wear"
                checked={exteriorConditions.minimalWear}
                onCheckedChange={() => handleExteriorChange("minimalWear")}
              />
              <Label htmlFor="minimal-wear" className="cursor-pointer">
                Minimal Wear
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="field-tested"
                checked={exteriorConditions.fieldTested}
                onCheckedChange={() => handleExteriorChange("fieldTested")}
              />
              <Label htmlFor="field-tested" className="cursor-pointer">
                Field Tested
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="well-worn"
                checked={exteriorConditions.wellWorn}
                onCheckedChange={() => handleExteriorChange("wellWorn")}
              />
              <Label htmlFor="well-worn" className="cursor-pointer">
                Well Worn
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="battle-scarred"
                checked={exteriorConditions.battleScarred}
                onCheckedChange={() => handleExteriorChange("battleScarred")}
              />
              <Label htmlFor="battle-scarred" className="cursor-pointer">
                Battle Scarred
              </Label>
            </div>
          </div>
        </div>

        {/* Item Category Filter */}
        <div className="space-y-4 text-white">
          <h3 className="font-medium">Items Category</h3>
          <div className="grid gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="knife"
                checked={itemCategories.knife}
                onCheckedChange={() => handleCategoryChange("knife")}
              />
              <Label htmlFor="knife" className="cursor-pointer">
                Knife
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rifle"
                checked={itemCategories.rifle}
                onCheckedChange={() => handleCategoryChange("rifle")}
              />
              <Label htmlFor="rifle" className="cursor-pointer">
                Rifle
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sniper-rifle"
                checked={itemCategories.sniperRifle}
                onCheckedChange={() => handleCategoryChange("sniperRifle")}
              />
              <Label htmlFor="sniper-rifle" className="cursor-pointer">
                Sniper Rifle
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pistol"
                checked={itemCategories.pistol}
                onCheckedChange={() => handleCategoryChange("pistol")}
              />
              <Label htmlFor="pistol" className="cursor-pointer">
                Pistol
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="smg"
                checked={itemCategories.smg}
                onCheckedChange={() => handleCategoryChange("smg")}
              />
              <Label htmlFor="smg" className="cursor-pointer">
                SMG
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="shotgun"
                checked={itemCategories.shotgun}
                onCheckedChange={() => handleCategoryChange("shotgun")}
              />
              <Label htmlFor="shotgun" className="cursor-pointer">
                Shotgun
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="machine-gun"
                checked={itemCategories.machineGun}
                onCheckedChange={() => handleCategoryChange("machineGun")}
              />
              <Label htmlFor="machine-gun" className="cursor-pointer">
                Machine Gun
              </Label>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#4fd25c]" onClick={applyFilters}>
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
