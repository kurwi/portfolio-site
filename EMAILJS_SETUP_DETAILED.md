# EmailJS Setup - Step by Step

You're in the right place! Follow these exact steps:

## Step 1: Get Your Public Key (API Keys)

1. Click on **Account** in the left menu
2. Go to **API Keys** tab
3. You should see your **Public Key** (starts with something like `xxxxxxxxxxxxxxx`)
4. **Copy this key** - you'll need it later

## Step 2: Add Email Service (Gmail)

You're already seeing the "Email Services" section. Here's how to add Gmail:

1. In the **Email Services** section, click the **+ button** (or "Press to add your first service")
2. Choose **Gmail** from the list of providers
3. Click **Connect with Gmail**
4. Sign in with: **wojciechstaniszewski80@gmail.com**
5. Allow EmailJS to access your Gmail
6. You'll see a confirmation - click **Create Service**

Now you should see:
- Service Name: **Gmail** (or similar)
- **Service ID** (looks like `service_abc123def456`) - **COPY THIS**

## Step 3: Create Email Template

1. Click **Email Templates** in the left menu
2. Click **Create New Template** button
3. Fill in:
   - **Template Name**: `contact_form`
   - **Service**: Select the Gmail service you just created

4. In the template editor, set up the email structure:

**Subject:**
```
New Message from {{from_name}}
```

**Email Body:**
```
Hello,

You have received a new message from your portfolio website.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

5. Click **Save** button at the bottom
6. You should see the **Template ID** (looks like `template_xyz789abc`) - **COPY THIS**

## Step 4: Update Your Code

Now go to: `app/components/ContactSection.tsx`

Find these lines (around line 14-15):
```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

Replace with:
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // e.g., 'abc123xyz789...'
```

Then find this section (around line 22-24):
```javascript
const response = await emailjs.send(
  'YOUR_SERVICE_ID_HERE',
  'YOUR_TEMPLATE_ID_HERE',
```

Replace with:
```javascript
const response = await emailjs.send(
  'service_xxxxx', // Your Gmail Service ID
  'template_xxxxx', // Your contact_form Template ID
```

## Step 5: Test It!

1. Save the file
2. Go to http://localhost:3000
3. Scroll to **"Let's Work Together"** section
4. Fill out the form:
   - Name: Your test name
   - Email: test@example.com
   - Message: Test message
5. Click **Send Message**
6. Check your Gmail inbox for the message!

## Where to Find Your IDs:

### Public Key:
- Menu: **Account** → **API Keys**
- It's shown right there

### Service ID:
- Menu: **Email Services**
- Should show "Gmail" service
- The ID is displayed there (or hover over it)

### Template ID:
- Menu: **Email Templates**
- Click on **contact_form** template
- ID is shown at the top/side

## Common Issues:

**Q: Where do I find my Public Key?**
A: Go to **Account** → **API Keys** tab

**Q: Service not showing?**
A: Make sure Gmail was connected successfully and service was created

**Q: Template not sending?**
A: Verify the Service ID and Template ID are correct in the code

**Q: Still not working?**
A: Check browser console (F12) for error messages

---

**Once configured, you should receive emails in: wojciechstaniszewski80@gmail.com**
