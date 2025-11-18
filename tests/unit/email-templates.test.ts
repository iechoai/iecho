import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { EmailTemplate } from "../../components/EmailTemplate";
import { ContactNotificationEmail } from "../../lib/email/contact-notification";

const renderWelcomeEmail = (firstName?: string) =>
  renderToStaticMarkup(createElement(EmailTemplate, { firstName }));

const renderContactEmail = () =>
  renderToStaticMarkup(
    createElement(ContactNotificationEmail, {
      name: "Jordan",
      email: "jordan@example.com",
      message: "Hello team!\nLooking forward to collaborating.",
      submittedAtIso: "2025-01-01T12:34:56.000Z",
    })
  );

describe("email templates", () => {
  it("renders the welcome email with a provided name", () => {
    expect(renderWelcomeEmail("Alex"))
      .toMatchSnapshot();
  });

  it("renders the contact notification email with multi-line message", () => {
    expect(renderContactEmail()).toMatchSnapshot();
  });
});
