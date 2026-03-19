# FlowDesk — Troubleshooting Guide

## Login & Authentication Issues

**I can't log in — it says "Invalid credentials"**
- Double-check your email address for typos
- Passwords are case-sensitive — ensure Caps Lock is off
- Try resetting your password via the "Forgot Password" link on the login page
- If you signed up using Google or GitHub OAuth, use those buttons to log in instead of email/password

**I'm not receiving the password reset email**
- Check your spam/junk folder
- Make sure you're checking the correct email inbox
- The reset email can take up to 5 minutes to arrive
- If still not received, contact support@flowdesk.io

**My account is locked**
After 5 consecutive failed login attempts, your account is temporarily locked for 15 minutes as a security measure. Wait 15 minutes and try again. If the issue persists, contact support@flowdesk.io.

**I get a "Session expired" message frequently**
This happens when you're logged in on multiple devices or browsers. Go to Settings → Security → Active Sessions and revoke unused sessions. You can also enable "Remember me for 30 days" on the login page.

---

## Project & Task Issues

**I can't create a new project**
- Free plan users are limited to 10 active projects. Archive or delete an existing project to create a new one, or upgrade to Pro for unlimited projects.
- Check that you have Admin or Owner role — Members can create projects but only if the workspace Admin has enabled this permission under Settings → Permissions.

**Tasks are not saving**
- Check your internet connection — FlowDesk requires an active connection to save tasks
- Try refreshing the page (your unsaved changes may be lost)
- Clear your browser cache and cookies, then try again
- If the issue persists, try a different browser or incognito mode

**I accidentally deleted a task**
Deleted tasks are moved to the **Trash**. Go to the left sidebar → Trash. Tasks remain in Trash for 30 days before permanent deletion. Click "Restore" to recover the task.

**I can't assign a task to a team member**
- The team member must have accepted their workspace invitation
- Pending invites cannot be assigned tasks
- Go to Settings → Team to check their invitation status

**My Gantt chart is not showing**
Gantt/Timeline view is only available on the Pro and Enterprise plans. Upgrade your plan to access this feature.

---

## Notification Issues

**I'm not receiving email notifications**
- Go to Settings → Notifications and verify email notifications are enabled
- Check your spam folder and add noreply@flowdesk.io to your safe senders list
- Verify your email address is correct under Settings → Profile

**I'm receiving too many notifications**
Go to Settings → Notifications and customize which events trigger notifications. You can mute notifications for specific projects by right-clicking the project in the sidebar and selecting "Mute Notifications".

**Slack notifications are not working**
- Go to Settings → Integrations → Slack and check if the integration status shows "Connected"
- If disconnected, re-authenticate by clicking "Reconnect"
- Ensure the FlowDesk Slack app has permission to post in the selected channels
- Check that the Slack channel still exists and hasn't been archived

---

## Performance Issues

**FlowDesk is loading slowly**
- Check your internet connection speed
- Clear your browser cache: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
- Disable browser extensions one by one to identify any conflicts
- Try a different browser (Chrome and Firefox are officially supported)
- If your workspace has 1000+ tasks in a single project, consider archiving older completed tasks

**The mobile app is crashing**
- Ensure you're running the latest version of the FlowDesk app (check App Store / Google Play)
- Force-close the app and reopen it
- If crashing persists, uninstall and reinstall the app
- Your data is stored in the cloud and will not be lost by reinstalling

---

## Billing Issues

**My payment failed**
- Ensure your card details are up to date under Settings → Billing → Payment Method
- Check with your bank — some banks block recurring SaaS charges by default
- Try a different card or payment method
- Contact support@flowdesk.io if the issue persists and we'll manually process your payment

**I was charged incorrectly**
Contact support@flowdesk.io within 7 days of the charge with your invoice number. We'll investigate and issue a correction or refund within 3-5 business days.

**How do I cancel my subscription?**
Go to Settings → Billing → Subscription → Cancel Plan. Your Pro features remain active until the end of your current billing period. After that, your workspace automatically moves to the Free plan. Your data is never deleted upon cancellation.

---

## Still Need Help?

If your issue is not listed here:
- **Email:** support@flowdesk.io (Pro: 24hr response, Free: 48-72hr response)
- **Live chat:** Available in-app on Pro and Enterprise plans
- **Community forum:** community.flowdesk.io
- **Status page:** status.flowdesk.io (check for ongoing outages)
