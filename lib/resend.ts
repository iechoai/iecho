import { Resend } from "resend";
import { env } from "~/env";

export const resendClient = new Resend(env.RESEND_API_KEY);

export const logResendError = (error: unknown, context: string) => {
  // Centralized logging to make operational alerts easier to trace.
  console.error(`[resend] ${context} failed`, error);
};
