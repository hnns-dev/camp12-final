"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

type SessionType = "tournament" | "meet";
type TournamentType = "single" | "round";
type Mode = "softie" | "casual" | "competetive";

export default function TournamentPage() {
  const [date, setDate] = React.useState<Date>();
  const [session, setSession] = React.useState<SessionType>("meet");
  const [mode, setMode] = React.useState<Mode>();
  const [tournamentType, setTournamentType] = React.useState<TournamentType>();
  const [privacy, setPrivacy] = React.useState<boolean>(false);

  const handleSessionChange = (sessionType: SessionType) => {
    setSession(sessionType);
  };
  const handleModeChange = (mode: Mode) => {
    setMode(mode);
  };
  const handleTournamentChange = (tournamentType: TournamentType) => {
    setTournamentType(tournamentType);
  };

  return (
    <div className="h-screen w-screen py-8 px-8 flex flex-col gap-6 items-center">
      <div className="flex gap-4 items-center">
        <h2 className="text-xl font-bold">Create</h2>
        <Select value={session} onValueChange={handleSessionChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={session} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meet">Meet</SelectItem>
            <SelectItem value="tournament">Tournament</SelectItem>
          </SelectContent>
        </Select>
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

      {session === "meet" ? (
        // Meet-specific content
        <div></div>
      ) : (
        // Tournament-specific content
        <div className="w-full space-y-4">
          <Select value={tournamentType} onValueChange={handleTournamentChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tournament Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Elimination</SelectItem>
              <SelectItem value="round">Straight Round Robin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={mode} onValueChange={handleModeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="softie">Softie</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="competetive">Competetive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <Input placeholder="Participants:" />
      <div className="flex flex-col w-full gap-2 grow">
        <span className="">Description:</span>
        <Textarea placeholder="Add some Details" className="grow" />
      </div>
      <div className="flex items-center gap-6">
        <span
          className={cn(
            !privacy ? "text-black font-bold" : "text-muted-foreground"
          )}
        >
          Private
        </span>
        <Switch onCheckedChange={setPrivacy} />
        <span
          className={cn(
            privacy ? "text-black font-bold" : "text-muted-foreground"
          )}
        >
          Public
        </span>
      </div>
      <Button className="w-full mt-auto">Create</Button>
    </div>
  );
}
