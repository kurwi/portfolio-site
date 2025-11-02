# Fix for Gmail Authentication Error

The Gmail API authentication error can be fixed by using EmailJS's Email Service instead of direct Gmail API.

## Quick Fix - Use EmailJS SMTP Service

### Step 1: Add SMTP Service in EmailJS

1. Go to **Email Services** in EmailJS dashboard
2. Click **+ Add New Service**
3. Choose **SMTP** (not Gmail)
4. Fill in:
   - **Service Name**: `smtp_service`
   - **SMTP Host**: `smtp.gmail.com`
   - **SMTP Port**: `465` (select SSL)
   - **SMTP Username**: `wojciechstaniszewski80@gmail.com`
   - **SMTP Password**: Generate an **App Password** (see below)

### Step 2: Generate Gmail App Password

Since you have 2FA enabled:

1. Go to **Google Account**: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Find **App passwords** (scroll down)
4. Select:
   - App: **Mail**
   - Device: **Windows Computer**
5. Click **Generate**
6. Copy the **16-character password** that appears
7. Paste it into EmailJS SMTP Password field

### Step 3: Test Connection

- In EmailJS, click **Test Connection**
- Should say "Success"
- Click **Create Service**
- Copy the **Service ID** (e.g., `service_xxxxx`)

### Step 4: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Set:
   - **Template Name**: `contact_form`
   - **Service**: Select your SMTP service

4. Template content:
   - **To Email**: `wojciechstaniszewski80@gmail.com`
   - **Subject**: `New Portfolio Message from {{from_name}}`
   - **HTML Body**:
   ```html
   <p>Hello,</p>
   <p>You have received a new message from your portfolio:</p>
   <p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   <hr>
   <p><em>This email was sent from your portfolio contact form.</em></p>
   ```

5. Click **Save**
6. Copy the **Template ID**

### Step 5: Update Your Code

In `app/components/ContactSection.tsx`, update with your IDs:

```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // From Account > API Keys

const response = await emailjs.send(
  'service_xxxxx', // Your SMTP Service ID
  'template_xxxxx', // Your contact_form Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  }
);
```

### Step 6: Test Again

Go to your website and try submitting the form. You should now receive emails in your Gmail inbox!

---

## Alternative: Use Formspree (Even Easier)

If SMTP doesn't work, use Formspree:

1. Go to https://formspree.io/
2. Sign up
3. Create form for `wojciechstaniszewski80@gmail.com`
4. Get the form ID
5. No code changes needed - just point form to Formspree endpoint

Let me know if you need help with either approach!
