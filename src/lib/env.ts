import { z } from "zod";

const envSchema = z.object({
  // Optional in development (the API route degrades gracefully without it);
  // production deploys should set all three.
  RESEND_API_KEY: z.string().min(1).optional(),
  INQUIRY_TO_EMAIL: z.string().email().optional(),
  INQUIRY_FROM_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional()
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

export function env(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    // Don't crash the server — log the offending keys for ops visibility.
    console.error("[env] Invalid environment variables:", parsed.error.flatten().fieldErrors);
    cached = {};
    return cached;
  }
  cached = parsed.data;
  return cached;
}
