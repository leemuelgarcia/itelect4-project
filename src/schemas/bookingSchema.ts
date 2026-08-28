import { z } from "zod";

export const bookingSchema = z.object({
  sessionId: z
    .string()
    .min(1, "Choose a tutoring session.")
    .refine(
      (value) => {
        const id = Number(value);
        return Number.isInteger(id) && id > 0;
      },
      "Choose a valid tutoring session."
    ),

  learningGoal: z
    .string()
    .min(10, "Learning goal must be at least 10 characters.")
    .max(200, "Learning goal must not exceed 200 characters."),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;