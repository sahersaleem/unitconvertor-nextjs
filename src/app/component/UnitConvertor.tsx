"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};



const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};


// function to convert unit
function UnitConvertor() {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>();
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
  };

  const handleInputUnitChange = (value: string) => {
    setInputUnit(value);
  };

  const handleOutputUnitChange = (value: string) => {
    setOutputUnit(value);
  };
  const calculateUnit = () => {


    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;

      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }
        if (unitCategory) {
          const baseValue =
            inputValue * conversionRates[unitCategory][inputUnit];
          const result = baseValue / conversionRates[unitCategory][outputUnit];
          setConvertedValue(result);
          console.log(convertedValue)
        } else {
          setConvertedValue(null);
          alert("Incompatible unit type selected");
        }
      }

      
    
    else{
      alert("Please fill all field")
    }
  };

  return (
    <div className="w-[500px] h-[auto] bg-white p-10 rounded-md flex gap-y-8 flex-col">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold">Unit Convertor</h1>
        <p className="text-lg text-center text-wrap">Convert values between different units</p>
      </div>
      <div className="flex gap-6">
        <Select onValueChange={handleInputUnitChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select unit" className="text-black" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(unitTypes).map(([category, units]) => (
              <SelectGroup key={category}>
                <SelectLabel>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectLabel>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleOutputUnitChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(unitTypes).map(([category, units]) => (
              <SelectGroup key={category}>
                <SelectLabel>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectLabel>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Input
        type="string"
          placeholder="Enter number"
          value={inputValue || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button type="button" onClick={calculateUnit} className="text-center w-full">
          Calculate Unit
        </Button>
      </div>
      <div>
      <div className="text-black text-center text-4xl">
        {convertedValue!==null?convertedValue:"0"}
      </div>
      <div className="text-black text-center text-4xl">{outputUnit ? outputUnit : "Unit"}</div>
      </div>
    </div>
  );
}
export default UnitConvertor;
