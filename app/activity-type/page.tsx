"use client";

import { useForm } from "react-hook-form";
import { NextPage } from "next";

interface FormValues {
  activityType: string;
  description: string;
  requiredNumberOfParticipants: number;
}

const CreateActivityTypePage: NextPage = () => {
  // Initialize the form methods from react-hook-form
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      activityType: "",
      description: "type your message here",
      requiredNumberOfParticipants: 1,
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/new-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create activity");
      }

      const result = await response.json();
      console.log("Activity created successfully:", result);
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  // Watch the activity type field for updates
  const selectedActivityType = watch("activityType");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {/* Centered Headline */}
      <h1 className="text-2xl font-bold mb-6">Create Activity</h1>

      {/* New Activity Type Input Field */}
      <input
        type="text"
        placeholder="Enter new activity type"
        {...register("activityType", { required: true })}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      {/* Venue Text Field */}
      <input
        type="text"
        value="Erich-Zeigner-Allee"
        readOnly
        className="mb-4 p-2 border border-gray-300 rounded text-center"
      />

      {/* Required Number of Participants */}
      <label className="text-lg font-semibold mb-2">
        Required Number of Participants
      </label>
      <input
        type="number"
        min={1}
        {...register("requiredNumberOfParticipants", {
          required: true,
          valueAsNumber: true, // Ensure the input is treated as a number
        })}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      {/* Description Header */}
      <h2 className="text-lg font-semibold mb-2">Description</h2>

      {/* Description Text Input Field */}
      <textarea
        {...register("description", { required: true })}
        className="mb-6 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-black text-white p-2 rounded"
      >
        Create
      </button>
    </div>
  );
};

export default CreateActivityTypePage;
