"use client";

import { submitMeetWithLocation, submitMeetWithVenue } from "@/actions/meet";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { meetSchema } from "@/lib/validation/zod-meet";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityType } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

type Props = {
  userId: string;
  venueId?: string;
  venueName?: string;
  location?: number[];
  address?: string;
  activityTypes: ActivityType[];
};

// Defining a schema for Meetsession Creation

export default function MeetForm({
  userId,
  venueId,
  venueName,
  location,
  address,
  activityTypes,
}: Props) {
  // Calender Popover open
  const [isOpen, setIsOpen] = useState(false);

  // Setting up React Hook Form with Zod resolver for validation
  const form = useForm<z.infer<typeof meetSchema>>({
    resolver: zodResolver(meetSchema),
    defaultValues: {
      duration: 0.5,
      public: false,
      // competetive: false,
      recurring: false,
      date: new Date(),
      time: "12:00",
      description: "",
      equipment: "",
    },
  });

  // Custom hook to subscribe to field change and isolate re-rendering at the component level.
  const duration = useWatch({
    control: form.control,
    name: "duration",
    defaultValue: 0.5,
  });

  const level = useWatch({
    control: form.control,
    name: "mode",
    defaultValue: "casual",
  });

  const privacy = useWatch({
    control: form.control,
    name: "public",
    defaultValue: false,
  });

  const date = useWatch({
    control: form.control,
    name: "date",
  });
  const time = useWatch({
    control: form.control,
    name: "time",
  });

  let activityType = useWatch({
    control: form.control,
    name: "activityType",
  });

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (values: z.infer<typeof meetSchema>) => {
    console.log("submitting");
    console.log(values);
    let meet;
    if (location) {
      meet = await submitMeetWithLocation(values, userId, location, address);
    } else if (venueId) {
      meet = await submitMeetWithVenue(values, userId, venueId);
    }
  };

  // guest number from 1-15
  const groupSizes = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="p-6 h-screen flex flex-col">
      <h2 className="text-xl font-bold pb-3 text-center">Create a Session</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between items-center"
        >
          <div className="grid grid-cols-4 gap-x-4 gap-y-8  items-center">
            <div className="col-span-4 text-center">
              {venueId ? (
                <span className="pb-6"> @ {venueName}</span>
              ) : address ? (
                <div>
                  <ul className="text-center">
                    {address.split(",").map((item, idx) => (
                      <li key={idx}>
                        <span className="pb-6">
                          {item}
                          <br />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <span>Special Location</span>
              )}
            </div>
            {/* Activity Type */}
            {
              <FormField
                control={form.control}
                name="activityType"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Activity Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {activityTypes.map((activity) => (
                            <SelectItem key={activity.id} value={activity.name}>
                              {activity.name}
                            </SelectItem>
                          ))}

                          <SelectSeparator />

                          <Link
                            href="/activity-type"
                            className="text-blue-600 underline text-sm pt-5 pl-3"
                          >
                            Create a new Activity
                          </Link>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            }
            {/* Level */}
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="softie">Softie</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="competitive">Competitive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date and Time */}
            <div className="flex gap-4 col-span-4">
              {/* Date */}
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? (
                        `${format(date, "PPP")}`
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
                    selected={date}
                    onSelect={(selectedDate) => {
                      form.setValue("date", selectedDate ?? new Date());
                    }}
                    onDayClick={() => setIsOpen(false)}
                    fromYear={new Date().getFullYear()}
                    toYear={new Date().getFullYear() + 1}
                    disabled={(date) =>
                      Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                      Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 365
                    }
                  />
                </PopoverContent>
              </Popover>
              {/* Time */}
              <Select
                defaultValue={time!}
                onValueChange={(e) => {
                  form.setValue("time", e);
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
                      const minute = ((i % 2) * 30).toString().padStart(2, "0");
                      return (
                        <SelectItem key={i} value={`${hour}:${minute}`}>
                          {hour}:{minute}
                        </SelectItem>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            {/* Duration */}
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <>
                    <p className="font-bold mb-2">
                      Duration: {field.value} hours
                    </p>
                    <FormItem>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          onValueChange={(values) => {
                            field.onChange(values[0]);
                          }}
                          min={0.5}
                          max={3}
                          step={0.5}
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
            </div>
            {/* Participants */}
            <FormField
              control={form.control}
              name="groupSize"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder={"select group size"} />
                    </SelectTrigger>
                    <SelectContent>
                      {groupSizes.map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* Privacy */}
            <FormField
              control={form.control}
              name="public"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "transition",
                          !privacy
                            ? "text-black font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        Private
                      </span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-yellow-400"
                      />
                      <span
                        className={cn(
                          "transition",
                          privacy === true
                            ? "text-black font-medium"
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
            {/* Tags */}
            {/* <TagInput
                suggestions={tagSuggestions}
                value={value}
                setValue={setValue}
              /> */}
            {/* Competitive */}
            {/* took out competetive because we have mode */}
            {/* <FormField
                control={form.control}
                name="competitive"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-4">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span
                          className={cn(
                            field.value === true
                              ? "text-black font-bold"
                              : "text-muted-foreground"
                          )}
                        >
                          Competitive
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            {/* Recurring */}
            <FormField
              control={form.control}
              name="recurring"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormControl>
                    <div className="flex gap-4">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span
                        className={cn(
                          field.value === true
                            ? "text-black font-bold"
                            : "text-muted-foreground"
                        )}
                      >
                        Recurring
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Equipment */}
            <FormField
              control={form.control}
              name="equipment"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Equipment</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What equipment is needed?"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add more Details"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-2/3">
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
