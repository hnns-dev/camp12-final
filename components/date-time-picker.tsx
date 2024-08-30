"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format, startOfMinute } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const FormSchema = z.object({
  datetime: z.date({
    required_error: "Date & time is required.",
  }),
});

interface DateTimePickerProps {
  onDateTimeChange: (date: Date) => void;
  defaultValue?: Date;
}

export function DateTimePicker({
  onDateTimeChange,
  defaultValue,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentDateTime = startOfMinute(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultValue || currentDateTime
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datetime: selectedDate,
    },
  });

  useEffect(() => {
    onDateTimeChange(selectedDate);
  }, []);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      setSelectedDate(newDate);
      form.setValue("datetime", newDate);
      onDateTimeChange(newDate);
    }
  };

  const handleTimeChange = (time: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours), parseInt(minutes));
    setSelectedDate(newDate);
    form.setValue("datetime", newDate);
    onDateTimeChange(newDate);
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="datetime"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    aria-label="Pick a date and time"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP p")
                    ) : (
                      <span>Pick a date and time</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="flex flex-col sm:flex-row">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={handleDateChange}
                    initialFocus
                    className="w-full sm:w-auto"
                  />
                  <div className="p-3 border-t sm:border-t-0 sm:border-l border-border">
                    <Select
                      onValueChange={handleTimeChange}
                      defaultValue={format(selectedDate, "HH:mm")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-60 sm:h-80">
                          {Array.from({ length: 48 }).map((_, i) => {
                            const hour = Math.floor(i / 2)
                              .toString()
                              .padStart(2, "0");
                            const minute = i % 2 === 0 ? "00" : "30";
                            const time = `${hour}:${minute}`;
                            return (
                              <SelectItem key={i} value={time}>
                                {time}
                              </SelectItem>
                            );
                          })}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}

export default DateTimePicker;
