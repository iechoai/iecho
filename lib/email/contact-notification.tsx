import * as React from "react";

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
  submittedAtIso: string;
}

const styles = `
  :root {
    color-scheme: dark;
  }

  body {
    margin: 0;
    background: #0b0e12;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #e2e8f0;
  }

  table {
    border-collapse: separate;
  }

  .wrapper {
    width: 100%;
    padding: 40px 0;
    text-align: center;
  }

  .card {
    margin: 0 auto;
    width: 100%;
    max-width: 620px;
    background: #151a24;
    border-radius: 16px;
    border: 1px solid rgba(182, 255, 61, 0.25);
    box-shadow: 0 24px 80px rgba(3, 7, 18, 0.55);
    overflow: hidden;
  }

  .intro {
    padding: 36px 42px 20px;
    text-align: left;
  }

  .eyebrow {
    margin: 0 0 10px;
    color: #b6ff3d;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  .title {
    margin: 0 0 18px;
    font-size: 28px;
    line-height: 1.25;
    color: #f8fafc;
  }

  .intro-copy {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: #cbd5f5;
  }

  .details {
    padding: 0 42px 32px;
  }

  .details-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  .details-cell {
    padding: 18px 20px;
    text-align: left;
    background: transparent;
  }

  .details-cell--highlight {
    background: rgba(148, 163, 184, 0.08);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  }

  .details-cell--footer {
    border-top: 1px solid rgba(148, 163, 184, 0.25);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding-bottom: 22px;
  }

  .details-label {
    display: block;
    font-weight: 600;
    color: #f1f5f9;
    font-size: 14px;
  }

  .details-value {
    margin: 8px 0 0;
    color: #cbd5f5;
    font-size: 14px;
    line-height: 1.6;
  }

  .mail-link {
    color: #b6ff3d;
    text-decoration: none;
  }

  .message-body {
    margin: 10px 0 0;
    color: #e2e8f0;
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-line;
  }

  .footer-note {
    margin: 20px 0 0;
    font-size: 12px;
    color: #64748b;
  }
`;

export function ContactNotificationEmail({
  name,
  email,
  message,
  submittedAtIso,
}: ContactNotificationEmailProps) {
  const displayName = name.trim() || "Someone";
  const submittedDate = new Date(submittedAtIso);
  // Convert to a human friendly timestamp while tolerating invalid input from legacy records.
  const submittedDisplay = Number.isNaN(submittedDate.getTime())
    ? submittedAtIso
    : submittedDate.toUTCString();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>New contact request</title>
        <style>{styles}</style>
      </head>
      <body>
        <div className="wrapper">
          <table role="presentation" cellPadding={0} cellSpacing={0} className="card">
            <tbody>
              <tr>
                <td className="intro">
                  <p className="eyebrow">New contact request</p>
                  <h1 className="title">{displayName} just reached out via Iecho</h1>
                  <p className="intro-copy">
                    Take a moment to review their note and follow up directly from your inbox.
                    Replying to this email will CC the sender automatically.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="details">
                  <table role="presentation" cellPadding={0} cellSpacing={0} className="details-table">
                    <tbody>
                      <tr>
                        <td className="details-cell details-cell--highlight">
                          <span className="details-label">Sender</span>
                          <p className="details-value">
                            {displayName}
                            <br />
                            <a className="mail-link" href={`mailto:${email}`}>
                              {email}
                            </a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="details-cell">
                          <span className="details-label">Submitted</span>
                          <p className="details-value">{submittedDisplay}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="details-cell details-cell--footer">
                          <span className="details-label">Message</span>
                          <p className="message-body">{message}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="footer-note">
            You received this email because contact notifications are enabled in Iecho.
          </p>
        </div>
      </body>
    </html>
  );
}
