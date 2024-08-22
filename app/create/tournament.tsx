"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// const FormSchema = z.object({
//   datetime: z.date({
//     required_error: "Date & time is required!.",
//   }),
// });

const FormSchema = z.object({
  activityType: z.enum(["pingpong", "basketball"]),
  location: z.string().min(1, "Location is required"),
  mode: z.enum(["softie", "casual", "competetive"]),
  tournamentType: z.enum(["single", "round"]),
  privacy: z.boolean(),
  datetime: z.date(),
  duration: z.number(),
  participants: z.number(),
  competetive: z.boolean(),
  recurring: z.boolean(),
  equipment: z.string().optional(),
  description: z.string().optional(),
});

type ActivityType = "pingpong" | "basketball";
type TournamentType = "single" | "round";
type Mode = "softie" | "casual" | "competetive";

export default function Tournament() {
  const [duration, setDuration] = useState<number>(0.5);
  const handleDurationChange = (durationType: number) => {
    setDuration(durationType);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("12:00");
  const [date, setDate] = useState<Date | null>(null);
  const [privacy, setPrivacy] = React.useState<boolean>(false);

  const [activity, setActivity] = React.useState<ActivityType>();
  const handleActivityChange = (activityType: ActivityType) => {
    setActivity(activityType);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(`Meeting at: ${format(data.datetime, "PPP, p")}`);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-xl font-bold">Create</h2>
              {/* Activity Type */}
              <FormField
                control={form.control}
                name="activityType"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Select
                        value={activity}
                        onValueChange={handleActivityChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Activity Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pingpong">Ping Pong</SelectItem>
                          <SelectItem value="basketball">Basketball</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <span>Clara Zetkin Park</span>
              {/* <Input placeholder="shadcn" {...field} /> */}
              {/* date and time */}
              <div className="flex ">
                {/* date */}
                <FormField
                  control={form.control}
                  name="datetime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                `${format(field.value, "PPP")}, ${time}`
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={date || field.value}
                            onSelect={(selectedDate) => {
                              const [hours, minutes] = time?.split(":")!;
                              selectedDate?.setHours(
                                parseInt(hours),
                                parseInt(minutes)
                              );
                              setDate(selectedDate!);
                              field.onChange(selectedDate);
                            }}
                            onDayClick={() => setIsOpen(false)}
                            fromYear={2020}
                            toYear={new Date().getFullYear()}
                            disabled={(date) =>
                              Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                              Number(date) >
                                Date.now() + 1000 * 60 * 60 * 24 * 30
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Set your date and time.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* time */}
                <FormField
                  control={form.control}
                  name="datetime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Select
                          defaultValue={time!}
                          onValueChange={(e) => {
                            setTime(e);
                            if (date) {
                              const [hours, minutes] = e.split(":");
                              const newDate = new Date(date.getTime());
                              newDate.setHours(
                                parseInt(hours),
                                parseInt(minutes)
                              );
                              setDate(newDate);
                              field.onChange(newDate);
                            }
                          }}
                        >
                          <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <ScrollArea className="h-[15rem]">
                              {Array.from({ length: 48 }).map((_, i) => {
                                const hour = Math.floor(i / 2)
                                  .toString()
                                  .padStart(2, "0");
                                const minute = ((i % 2) * 30)
                                  .toString()
                                  .padStart(2, "0");
                                return (
                                  <SelectItem
                                    key={i}
                                    value={`${hour}:${minute}`}
                                  >
                                    {hour}:{minute}
                                  </SelectItem>
                                );
                              })}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* to do: display duration */}
              <span>Duration: {duration}</span>
              <Slider
                defaultValue={[duration]}
                min={0.5}
                max={3}
                step={0.5}
                className="w-full"
              />
              {/* privacy */}
              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-6">
                        <span
                          className={cn(
                            !privacy
                              ? "text-black font-bold"
                              : "text-muted-foreground"
                          )}
                        >
                          Private
                        </span>
                        <Switch onCheckedChange={setPrivacy} />
                        <span
                          className={cn(
                            privacy
                              ? "text-black font-bold"
                              : "text-muted-foreground"
                          )}
                        >
                          Public
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Participants */}
              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Participants" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Competetive */}
              <FormField
                control={form.control}
                name="competetive"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-4">
                        <Switch />
                        <span>Competetive</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Recurring */}
              <FormField
                control={form.control}
                name="recurring"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-4">
                        <Switch />
                        <span>Recurring</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Level ????? */}
              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Wich equipment is needed?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add more Details" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
}
