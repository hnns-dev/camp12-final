"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Updated schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  caption: z.string().max(100, {
    message: "Caption is too long, bro!",
  }),
  seriousCompetitor: z.boolean().default(false),
  playerLevel: z.string().nonempty("Player level is required"),
});

export function ProfileForm() {
  // Updated form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      caption: "",
      seriousCompetitor: false,
      playerLevel: "",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-2 m-3 rounded-sm"
      >
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className="rounded-md border border-gray-300 p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Caption Field */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tell us about yourself"
                  className="rounded-lg border border-gray-300 p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seriousCompetitor"
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                <Switch
                  {...field}
                  onCheckedChange={(checked) => {
                    field.onChange(checked); // Update form state
                  }}
                />
                I am a serious competitor!
              </FormDescription>
            </FormItem>
          )}
        />

        {/* DropdownMenu Field */}
        <FormField
          control={form.control}
          name="playerLevel"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your player level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="club">Club Level</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
