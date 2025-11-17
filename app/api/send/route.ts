import * as React from "react";

import { EmailTemplate } from "../../../components/EmailTemplate";
import { resendClient, logResendError } from "../../../lib/resend";

export async function POST(request: Request) {
    const body = await request.json();
    const firstName = typeof body?.firstName === "string" ? body.firstName : undefined;
    const email = typeof body?.email === "string" ? body.email : undefined;

    if (!email) {
        return Response.json({ error: "Missing recipient email" }, { status: 400 });
    }

    try {
        const { data, error } = await resendClient.emails.send({
            from: "iecho <no-reply@iecho.app>",
            to: email,
            subject: "Welcome to Iecho!",
            // The route is .ts so we create the JSX element manually rather than relying on <EmailTemplate /> syntax.
            react: React.createElement(EmailTemplate, { firstName }),
        });

        if (error) {
            logResendError(error, "welcome-email");
            return Response.json({ error: "Failed to send email" }, { status: 500 });
        }

        return Response.json({ data }, { status: 200 });
    } catch (error) {
        logResendError(error, "welcome-email");
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}
