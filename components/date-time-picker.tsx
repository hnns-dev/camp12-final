"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";

const FormSchema = z.object({
  datetime: z.date({
    required_error: "Date & time is required!.",
  }),
});

interface DateTimePickerProps {
  onDateTimeChange: (date: Date) => void;
}

export function DateTimePicker({ onDateTimeChange }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("05:00");
  const [date, setDate] = useState<Date | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (date) {
      const [hours, minutes] = time.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      onDateTimeChange(newDate);
    }
  }, [date, time, onDateTimeChange]);

  return (
    <Form {...form}>
      <div className="space-y-8">
        <div className="flex w-full gap-4">
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
                        if (selectedDate) {
                          const [hours, minutes] = time.split(":");
                          selectedDate.setHours(
                            parseInt(hours),
                            parseInt(minutes)
                          );
                          setDate(selectedDate);
                          field.onChange(selectedDate);
                          setIsOpen(false);
                        }
                      }}
                      fromYear={2000}
                      toYear={new Date().getFullYear()}
                      disabled={(date) =>
                        date < new Date(Date.now() - 86400000) ||
                        date > new Date(Date.now() + 2592000000)
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <Select
                    defaultValue={time}
                    onValueChange={(e) => {
                      setTime(e);
                      if (date) {
                        const [hours, minutes] = e.split(":");
                        const newDate = new Date(date.getTime());
                        newDate.setHours(parseInt(hours), parseInt(minutes));
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
                        {Array.from({ length: 96 }).map((_, i) => {
                          const hour = Math.floor(i / 4)
                            .toString()
                            .padStart(2, "0");
                          const minute = ((i % 4) * 15)
                            .toString()
                            .padStart(2, "0");
                          return (
                            <SelectItem key={i} value={`${hour}:${minute}`}>
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
      </div>
    </Form>
  );
}
