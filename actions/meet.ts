"use server";
// Import necessary dependencies
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isFuture, isToday, format } from "date-fns";
import { meetSchema } from "@/lib/validation/zod-meet";
import { z } from "zod";

// Helper function to check if a given time is in the future
function isTimeInFuture(time: string) {
  // Convert time string to a number (e.g., "14:30" becomes 1430)
  const meetTimeNumber = parseInt(time.replace(":", ""));
  // Get current time as a number in "hhmm" format
  const timeNowNumber = parseInt(format(new Date(), "hhmm"));
  // Compare meet time with current time
  return meetTimeNumber > timeNowNumber;
}

// get creatorId from params

// Main function to delete a meet
export async function deleteMeet(meetId: string, userId: string) {
  try {
    // Fetch the meet from the database using its ID
    const meet = await prisma.meet.findUnique({
      where: { id: meetId },
    });

    // If the meet doesn't exist, return an error message
    if (!meet) {
      return { success: false, message: "Meeting not found" };
    }

    // Check if the user trying to delete is the creator of the meet
    if (meet.creatorId !== userId) {
      return {
        success: false,
        message: "User is not the creator of this meeting",
      };
    }

    // Check if the meet date is in the future
    if (!isFuture(meet.date)) {
      return { success: false, message: "Cannot delete past or ongoing meets" };
    }

    // If the meet is today, check if the time is in the future
    if (isToday(meet.date) && !isTimeInFuture(meet.time)) {
      return { success: false, message: "Cannot delete past or ongoing meets" };
    }

    // If all checks pass, delete the meet from the database
    await prisma.meet.delete({
      where: { id: meetId },
    });

    // Revalidate the path to update the UI
    revalidatePath("/meets");

    // Return success message
    return { success: true, message: "Meet deleted successfully" };
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error deleting meet:", error);
    // Return a generic error message to the user
    return {
      success: false,
      message: "An error occurred while deleting the meet",
    };
  }
}

export async function updateMeet(
  meetId: string,
  values: z.infer<typeof meetSchema>
) {
  await prisma.meet.update({
    where: {
      id: meetId,
    },
    data: {
      date: values.date,
      time: values.time,
      duration: values.duration,
      isPublic: values.public,
      guests: values.guests,
      notes: values.description,
    },
  });
}

export const createMeet = async (
  values: z.infer<typeof meetSchema>,
  creatorId: string
) => {
  await prisma.meet.create({
    data: {
      date: values.date,
      time: values.time,
      duration: values.duration,
      isPublic: values.public,
      isRecurring: values.recurring,
      creator: {
        connect: {
          id: creatorId,
        },
      },
      venue: {
        connect: {
          id: venueId,
        },
      },
      address: values.venueId,
      activityType: {
        connect: {
          name: activityTypeName,
        },
      },
      guests: values.guests,
      notes: values.description,
      equipment: values.equipment || undefined,
    },
  });
};
