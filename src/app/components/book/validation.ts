import * as Yup from "yup";

export const bookingValidation = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .required("Full name is required"),

  date: Yup.string().required("Appointment date is required"),
});
