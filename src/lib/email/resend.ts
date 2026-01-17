import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailOptions) {
  const client = getResendClient();
  
  if (!client) {
    console.log("Resend API key not configured, skipping email");
    return { success: false, error: "API key not configured" };
  }

  // IMPORTANT:
  // Resend requires a verified sender domain unless you use their default sender.
  // Set RESEND_FROM in env once your domain is verified (e.g. "NomadPoint <noreply@yourdomain.com>").
  // Until then, default to "onboarding@resend.dev" to avoid "invalid_from_address" errors.
  const from =
    process.env.RESEND_FROM ||
    process.env.EMAIL_FROM ||
    "NomadPoint <onboarding@resend.dev>";

  try {
    const { data, error } = await client.emails.send({
      from,
      to: [to],
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""),
      replyTo: replyTo ? [replyTo] : undefined,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome to NomadPoint! 🌍",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
            .content { background: #f9fafb; border-radius: 12px; padding: 30px; margin: 20px 0; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 12px; padding: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🌍 NomadPoint</div>
            </div>
            <div class="content">
              <h1 style="color: #111827; margin-top: 0;">Welcome, ${name}! 👋</h1>
              <p>Thanks for joining NomadPoint! We're excited to help you discover your next remote work destination.</p>
              <p>Here's what you can do:</p>
              <ul>
                <li>🏙️ <strong>Explore Cities</strong> - Compare 100+ destinations worldwide</li>
                <li>❤️ <strong>Save Favorites</strong> - Build your wishlist</li>
                <li>✈️ <strong>Plan Trips</strong> - Create multi-city itineraries</li>
                <li>📋 <strong>Track Progress</strong> - Use checklists for visa & packing</li>
              </ul>
              <p style="margin-top: 30px;">
                <a href="https://nomadpoint.com/dashboard" class="button">Go to Dashboard</a>
              </p>
            </div>
            <div class="footer">
              <p>You're receiving this because you signed up for NomadPoint.</p>
              <p>© ${new Date().getFullYear()} NomadPoint. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  tripReminder: (tripName: string, daysUntil: number, cityName: string) => ({
    subject: `🗓️ ${daysUntil} days until your ${tripName} trip!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
            .content { background: #f9fafb; border-radius: 12px; padding: 30px; margin: 20px 0; }
            .countdown { font-size: 48px; font-weight: bold; color: #2563eb; text-align: center; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 12px; padding: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🌍 NomadPoint</div>
            </div>
            <div class="content">
              <div class="countdown">${daysUntil}</div>
              <p style="text-align: center; color: #6b7280; margin-top: 0;">days until your trip to <strong>${cityName}</strong></p>
              <h2 style="color: #111827; margin-top: 30px;">Trip: ${tripName}</h2>
              <p>Don't forget to:</p>
              <ul>
                <li>✅ Complete your visa checklist</li>
                <li>🧳 Pack your bags (check the packing list!)</li>
                <li>🏨 Confirm your accommodation</li>
                <li>✈️ Have your flight details ready</li>
              </ul>
              <p style="margin-top: 30px; text-align: center;">
                <a href="https://nomadpoint.com/trips" class="button">View Trip Details</a>
              </p>
            </div>
            <div class="footer">
              <p>Have a great trip! 🎉</p>
              <p>© ${new Date().getFullYear()} NomadPoint. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  weeklyDigest: (userName: string, stats: { favorites: number; trips: number }) => ({
    subject: "📊 Your Weekly NomadPoint Digest",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
            .content { background: #f9fafb; border-radius: 12px; padding: 30px; margin: 20px 0; }
            .stats { display: flex; justify-content: space-around; text-align: center; margin: 20px 0; }
            .stat { padding: 20px; background: white; border-radius: 8px; min-width: 100px; }
            .stat-number { font-size: 36px; font-weight: bold; color: #2563eb; }
            .stat-label { color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 12px; padding: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🌍 NomadPoint</div>
            </div>
            <div class="content">
              <h1 style="color: #111827; margin-top: 0;">Hey ${userName}! 👋</h1>
              <p>Here's your weekly NomadPoint summary:</p>
              
              <div class="stats">
                <div class="stat">
                  <div class="stat-number">${stats.favorites}</div>
                  <div class="stat-label">Favorites</div>
                </div>
                <div class="stat">
                  <div class="stat-number">${stats.trips}</div>
                  <div class="stat-label">Trips</div>
                </div>
              </div>
              
              <p>Keep exploring and planning your next adventure!</p>
              <p style="margin-top: 30px; text-align: center;">
                <a href="https://nomadpoint.com" class="button">Explore New Cities</a>
              </p>
            </div>
            <div class="footer">
              <p>You're receiving this weekly digest from NomadPoint.</p>
              <p><a href="https://nomadpoint.com/profile">Manage email preferences</a></p>
              <p>© ${new Date().getFullYear()} NomadPoint. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};

