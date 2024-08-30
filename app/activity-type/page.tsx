import { prisma } from "../../lib/db";
import { useForm } from "react-hook-form";
import { NextPage } from "next";

interface FormValues {
  activityType: string;
  description: string;
  requiredNumberOfParticipants: number;
}

const CreateActivityTypePage: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      activityType: "",
      description: "type your message here",
      requiredNumberOfParticipants: 1,
    },
  });

  // Server Action to handle form submission
  const onSubmit = async (data: FormValues) => {
    "use server"; // This directive makes this function a server action

    try {
      const newActivity = await prisma.activityType.create({
        data: {
          name: data.activityType,
          description: data.description,
          requiredNumberOfParticipants: data.requiredNumberOfParticipants,
        },
      });

      console.log("Activity created successfully:", newActivity);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Create Activity</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter new activity type"
          {...register("activityType", { required: true })}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />

        <input
          type="text"
          value="Erich-Zeigner-Allee"
          readOnly
          className="mb-4 p-2 border border-gray-300 rounded text-center w-full"
        />

        <label className="text-lg font-semibold mb-2">
          Required Number of Participants
        </label>
        <input
          type="number"
          min={1}
          {...register("requiredNumberOfParticipants", {
            required: true,
            valueAsNumber: true,
          })}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />

        <h2 className="text-lg font-semibold mb-2">Description</h2>

        <textarea
          {...register("description", { required: true })}
          className="mb-6 p-2 border border-gray-300 rounded w-full"
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateActivityTypePage;
