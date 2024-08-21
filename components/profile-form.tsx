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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                <Checkbox
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full flex justify-between items-center rounded-md border border-gray-300 bg-white p-2">
                    {field.value || "Player level"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-300">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => field.onChange("Beginner")}>
                    Beginner
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => field.onChange("Intermediate")}
                  >
                    Intermediate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => field.onChange("Advanced")}>
                    Advanced
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => field.onChange("Club Level")}
                  >
                    Club Level
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
