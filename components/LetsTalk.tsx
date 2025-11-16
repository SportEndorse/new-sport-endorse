"use client"
import { useState } from 'react';
import "../styles/letsTalk.css";

export default function LetsTalk() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'Telephone',
    clientType: '',
    message: ''
  });

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Pleasein all required fields.');
      return;
    }

    // Create email body
    const emailBody = `Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Preferred Contact Method: ${formData.contactMethod}
    Client Type: ${formData.clientType || 'Not specified'}

    Message:
    ${formData.message}`;

    // Create mailto link
    const subject = 'Lets Talk!';
    const mailtoLink = `mailto:hello@sportendorse.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="lets-talk-container">
      <div className="lets-talk-form-wrapper">
        <div className="lets-talk-columns">
          {/* Left Column */}
          <div className="lets-talk-left-column">
            <div className="lets-talk-header">
              <h1 className="lets-talk-title">Lets Talk!</h1>
              <p className="lets-talk-subtitle">If you have any questions, or want to talk about your next big project, we&apos;d love to help you out!</p>
            </div>

            <div className="lets-talk-form-group">
              <label className="lets-talk-label">Name<span className="lets-talk-required">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Input your full name here" required className="lets-talk-input" />
            </div>

            <div className="lets-talk-form-group">
              <label className="lets-talk-label">E-mail<span className="lets-talk-required">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" required className="lets-talk-input" />
            </div>
            
            <div className="lets-talk-form-group">
              <label className="lets-talk-label">Phone Number<span className="lets-talk-required">*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+55 (555) 555 55 55" required className="lets-talk-input" />
            </div>
          </div>

          {/* Right Column */}
          <div className="lets-talk-right-column">
            <div className="lets-talk-form-group-small">
              <label className="lets-talk-label">How would you like to be contacted?</label>
              <div className="lets-talk-radio-group">
                {['Telephone', 'Online Meeting', 'E-mail'].map((method) => (
                  <div key={method} className="lets-talk-radio-option">
                    <input type="radio" id={`contact-${method.toLowerCase().replace(' ', '-')}`} name="contactMethod" value={method} checked={formData.contactMethod === method} onChange={handleInputChange} className="lets-talk-radio" />
                    <label htmlFor={`contact-${method.toLowerCase().replace(' ', '-')}`} className="lets-talk-radio-label">{method}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="lets-talk-form-group-small">
              <label className="lets-talk-label">Type of client</label>
              <div className="lets-talk-radio-group">
                {['Talent', 'Brand'].map((type) => (
                  <div key={type} className="lets-talk-radio-option">
                    <input type="radio" id={`client-${type.toLowerCase()}`} name="clientType" value={type} checked={formData.clientType === type} onChange={handleInputChange} className="lets-talk-radio" />
                    <label htmlFor={`client-${type.toLowerCase()}`} className="lets-talk-radio-label">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="lets-talk-form-group-minimal">
              <label className="lets-talk-label">Message</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Write your message in here" className="lets-talk-textarea" />
            </div>

            <button type="submit" onClick={handleSubmit} className="lets-talk-button">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}