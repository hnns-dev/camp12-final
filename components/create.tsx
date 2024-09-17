"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { TagInput } from "./tagInput";
import { Tag } from "@prisma/client";
import { updateTags } from "@/actions/settings";

type Props = {
  suggestions: Tag[];
};

export default function Create({ suggestions }: Props) {
  const [date, setDate] = useState<Date>();
  const [value, setValue] = useState<string[]>([]);

  // calls the uodate tags function from settings and adds new tags to it if they dont exist
  const handleCreate = async () => {
    try {
      await updateTags({ names: value });
      console.log("Tags updated successfully");
    } catch (error) {
      console.error("Failed to update tags:", error);
    }
  };

  return (
    <div className="h-screen w-screen py-8 px-8 flex flex-col gap-6 items-center">
      <div className="flex gap-4 items-center">
        <h2 className="text-xl font-bold pb-3">Create a Session</h2>
      </div>
      <Input placeholder="Erich Zeigner Allee" />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <span className="font-bold text-lg">Duration: 2h</span>
      <Slider defaultValue={[0]} max={3} step={0.5} className="w-full" />
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="public" className="w-1/2">
            Public
          </TabsTrigger>
          <TabsTrigger value="privat" className="w-1/2">
            Private
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Input placeholder="Participants:" />
      <TagInput suggestions={suggestions} value={value} setValue={setValue} />
      <div className="flex flex-col w-full gap-2 grow">
        <span className="">Description:</span>
        <Textarea placeholder="Add some Details" className="grow" />
      </div>
      <Button className="w-full mt-auto" onClick={handleCreate}>
        Create
      </Button>
    </div>
  );
}
