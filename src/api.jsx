import axios from 'axios';

//post email object with the email to address, subject and html from the editor
export const sendEmail = async (email, html) => {
  try {
    const response = await axios.post('/api/email', {
      toEmail: `${email}`,
      subject: 'Hello from Chris email app',
      htmlContent: `${html}`,
    });
    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
  }
};