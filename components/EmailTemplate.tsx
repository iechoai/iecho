import * as React from "react";

interface EmailTemplateProps {
  firstName?: string;
}

const styles = `
  :root {
    color-scheme: dark;
  }

  body {
    margin: 0;
    background: #0f1115;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #e2e8f0;
  }

  table {
    border-collapse: separate;
  }

  .wrapper {
    width: 100%;
    padding: 48px 0;
    text-align: center;
  }

  .card {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    background: #121722;
    border-radius: 18px;
    border: 1px solid rgba(182, 255, 61, 0.18);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
    overflow: hidden;
  }

  .section {
    padding: 48px 48px 24px;
    text-align: left;
  }

  .eyebrow {
    margin: 0 0 12px;
    color: #b6ff3d;
    font-size: 14px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .title {
    margin: 0 0 16px;
    font-size: 30px;
    line-height: 1.2;
    color: #f8fafc;
  }

  .copy {
    margin: 0;
    font-size: 16px;
    line-height: 1.6;
    color: #cbd5f5;
  }

  .cta-row {
    padding: 0 48px 40px;
    text-align: center;
  }

  .cta-link {
    display: inline-block;
    padding: 14px 28px;
    background: #b6ff3d;
    border-radius: 999px;
    color: #101828;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
  }

  .signoff {
    padding: 0 48px 48px;
    font-size: 13px;
    line-height: 1.5;
    color: #94a3b8;
    text-align: left;
  }

  .signoff p {
    margin: 0;
  }

  .signoff p + p {
    margin-top: 16px;
  }

  .signature {
    color: #b6ff3d;
  }

  .footer {
    margin: 24px 0 0;
    font-size: 12px;
    color: #64748b;
  }
`;

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  const greetingName = firstName?.trim() || "there";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Welcome to Iecho</title>
        <style>{styles}</style>
      </head>
      <body>
        <div className="wrapper">
          <table role="presentation" cellPadding={0} cellSpacing={0} className="card">
            <tbody>
              <tr>
                <td className="section">
                  <p className="eyebrow">Welcome to Iecho</p>
                  <h1 className="title">Hi {greetingName}, we are glad you are here!</h1>
                  <p className="copy">
                    You now have access to a curated hub of AI tools, workflows, and resources
                    designed to help you study smarter and build faster. Save your favourites,
                    track updates, and discover new ideas every week.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="cta-row">
                  <a className="cta-link" href="https://iecho.app/tools">
                    Explore the library
                  </a>
                </td>
              </tr>
              <tr>
                <td className="signoff">
                  <p>
                    Need help getting started? Reply to this email and the Iecho team will point you to
                    the right playbooks.
                  </p>
                  <p>
                    Stay curious,
                    <br />
                    <span className="signature">The Iecho Crew</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="footer">
            You are receiving this email because you joined Iecho. If this was not you, you can safely
            ignore it.
          </p>
        </div>
      </body>
    </html>
  );
}