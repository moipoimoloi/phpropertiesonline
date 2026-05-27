import { z } from "zod";
import { properties } from "@/data/properties";

const interests = [properties[0].name, ...properties.slice(1).map((p) => p.name), "Other / not sure yet"] as [
  string,
  ...string[]
];

// Custom messages so end-users never see Zod's default "String must contain at most 80 character(s)" copy.
const TOO_LONG = "That value looks too long. Please shorten it.";

export const inquirySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80, TOO_LONG),
  lastName: z.string().trim().min(1, "Last name is required").max(80, TOO_LONG),
  email: z.string().trim().email("Please enter a valid email address.").max(200, TOO_LONG),
  mobile: z.string().trim().min(7, "Please enter a valid mobile number.").max(40, TOO_LONG),
  interest: z.enum(interests, { errorMap: () => ({ message: "Please pick one of the listed properties." }) }),
  message: z
    .string()
    .trim()
    .min(1, "Please tell us a bit about what you're looking for.")
    .max(2000, "Your message is a bit long. Please trim it before sending."),
  // honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal(""))
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const interestOptions = interests;
