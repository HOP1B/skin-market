"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { toast } from "sonner";
import { useSession } from "@clerk/nextjs";

// Define the skin status options
const skinStatusOptions = [
  "FACTORY_NEW",
  "MINIMAL_WEAR",
  "FIELD_TESTED",
  "WELL_WORN",
  "BATTLE_SCARED",
] as const;

// Define the form schema with zod
const formSchema = z.object({
  skinId: z.string({
    required_error: "Please select a skin",
  }),
  price: z.coerce
    .number({
      required_error: "Please enter a price",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be positive"),
  status: z.enum(skinStatusOptions, {
    required_error: "Please select a status",
  }),
});

// Define the type for our form values
type FormValues = z.infer<typeof formSchema>;

// Define the type for our skin data
type Skin = {
  id: string;
  skinname: string;
  item: string;
};

const formatPrice = (price: number | undefined): string => {
  if (price === undefined) return "";

  // Format with commas and up to 2 decimal places
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

export function AddSkinDialog() {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const [skins, setSkins] = useState<Skin[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skinId: "",
      price: undefined,
      status: undefined,
    },
  });

  // Fetch skins from the API
  const fetchSkins = async () => {
    if (skins.length > 0) return;

    setLoading(true);
    try {
      const response = await axios.get("/api/skins");
      if (!response) throw new Error("Failed to fetch skins");

      const data = await response.data;
      setSkins(data);
    } catch (error) {
      console.error("Error fetching skins:", error);
      toast("Error", {
        description: "Failed to load skins. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      await axios.post("/api/skins/listing", {
        ...values,
        userId: session?.user.id,
      });

      toast.success("Success", {
        description: "Skin added successfully",
      });

      // Reset the form and close the dialog
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description: "Failed to add skin. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Skin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Skin</DialogTitle>
          <DialogDescription>
            Enter the details for the new skin you want to add.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="skinId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Skin</FormLabel>
                  <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={() => fetchSkins()}
                        >
                          {field.value
                            ? skins.find((skin) => skin.id === field.value)
                                ?.skinname
                            : "Select skin"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search skins..." />
                        <CommandList>
                          <CommandEmpty>
                            {loading ? "Loading..." : "No skin found."}
                          </CommandEmpty>
                          <CommandGroup>
                            {skins.map((skin) => (
                              <CommandItem
                                key={skin.id}
                                value={skin.skinname}
                                onSelect={() => {
                                  form.setValue("skinId", skin.id);
                                  setOpenCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    skin.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {skin.item} | {skin.skinname}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter price"
                      {...field}
                      value={
                        field.value !== undefined
                          ? formatPrice(field.value)
                          : ""
                      }
                      onChange={(e) => {
                        // Remove all non-digit characters except decimal point
                        const value = e.target.value.replace(/[^\d.]/g, "");

                        // Ensure only one decimal point
                        const parts = value.split(".");
                        const formattedValue =
                          parts.length > 2
                            ? `${parts[0]}.${parts.slice(1).join("")}`
                            : value;

                        // Convert to number for form value (or undefined if empty)
                        const numericValue =
                          formattedValue === ""
                            ? undefined
                            : Number.parseFloat(formattedValue);

                        // Update the form
                        field.onChange(numericValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skinStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Skin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
