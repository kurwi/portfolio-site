# EmailJS Setup Guide

Your contact form is now configured to send real emails! Follow these steps:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

## Step 2: Get Your Public Key
1. Log in to EmailJS dashboard
2. Go to **Account > API Keys**
3. Copy your **Public Key**

## Step 3: Add Gmail Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail**
4. Connect your Gmail account (use: wojciechstaniszewski80@gmail.com)
5. Name it: `gmail_service`
6. Click **Create Service**
7. Copy the **Service ID** (should look like `service_xxxxx`)

## Step 4: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Name it: `contact_form`
4. Use this template content:

```
From: {{from_name}} <{{from_email}}>
To: {{to_email}}
Subject: New Portfolio Contact Message

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

5. Copy the **Template ID** (should look like `template_xxxxx`)

## Step 5: Update Your Code
Open `app/components/ContactSection.tsx` and replace:

```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```
with:
```javascript
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY');
```

And replace:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID_HERE',
  'YOUR_TEMPLATE_ID_HERE',
```
with:
```javascript
await emailjs.send(
  'service_xxxxx', // Your actual Service ID
  'template_xxxxx', // Your actual Template ID
```

## Step 6: Test It!
1. Go to http://localhost:3000
2. Scroll to "Let's Work Together" section
3. Fill out the form and click "Send Message"
4. Check your email - you should receive the message!

## Notes:
- The free plan allows 200 emails/month
- No backend server needed - emails send directly from the browser
- Your Public Key is safe to expose (it's public)
- The Service ID and Template ID are also public
- Sensitive info (credentials) is handled by EmailJS securely
