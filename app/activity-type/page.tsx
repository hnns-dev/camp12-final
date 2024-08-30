"use client";

import { useForm } from "react-hook-form";
import { NextPage } from "next";

interface FormValues {
  activityType: string;
  description: string;
}

const CreateActivityTypePage: NextPage = () => {
  // Initialize the form methods from react-hook-form
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      activityType: "",
      description: "type your message here",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Selected Activity Type:", data.activityType);
  };

  // Watch the activity type field for updates
  const selectedActivityType = watch("activityType");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {/* Centered Headline */}
      <h1 className="text-2xl font-bold mb-6">Create Activity</h1>

      {/* Dropdown Menu */}
      <select
        {...register("activityType")}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Select Activity Type</option>
        <option value="PingPong">Ping Pong</option>
        <option value="Soccer">Soccer</option>
        <option value="Basketball">Basketball</option>
      </select>

      {/* Venue Text Field */}
      <input
        type="text"
        value="Erich-Zeigner-Allee"
        readOnly
        className="mb-4 p-2 border border-gray-300 rounded text-center"
      />

      {/* Description Header */}
      <h2 className="text-lg font-semibold mb-2">Description</h2>

      {/* Description Text Input Field */}
      <textarea
        {...register("description")}
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
