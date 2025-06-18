import { Resend } from 'resend';

// Set your Resend API key here or use an environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    product_type,
    hat_type,
    hat_color,
    band_color,
    product_color,
    order_description,
    phone_number,
    email,
    file_url,
    created_at
  } = req.body;

  try {
    const result = await resend.emails.send({
      from: 'Texas Hill Country Plumbing <no-reply@texashillcountryplumbing.com>', // Updated sender email
      to: 'admin@texashillcountryplumbing.com', // <-- Change this to your email
      subject: 'New Contact Request Received',
      html: `
        <h2>New Contact Request</h2>
        <p><b>Date:</b> ${created_at || new Date().toLocaleString()}</p>
        <p><b>Product Type:</b> ${product_type}</p>
        ${hat_type ? `<p><b>Hat Type:</b> ${hat_type}</p>` : ''}
        ${hat_color ? `<p><b>Hat Color:</b> ${hat_color}</p>` : ''}
        ${band_color ? `<p><b>Band Color:</b> ${band_color}</p>` : ''}
        ${product_color ? `<p><b>Product Color:</b> ${product_color}</p>` : ''}
        <p><b>Description:</b> ${order_description}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone_number}</p>
        ${file_url ? `<p><b>File:</b> <a href="${file_url}">View File</a></p>` : ''}
      `
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 