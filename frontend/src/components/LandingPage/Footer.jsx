import React from "react";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="contact-form">
      <h2>Tell Us Everything</h2>
      <p>Do you have any questions? Feel free to reach out.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="formEmail">Email</label>
        <input
          type="email"
          id="formEmail"
          className="form-input"
          placeholder="Your email"
          required
        />

        <label htmlFor="formPhone">Phone</label>
        <input
          type="tel"
          id="formPhone"
          className="form-input"
          placeholder="Your phone number"
          required
        />

        <label htmlFor="formMessage">Message</label>
        <textarea
          id="formMessage"
          className="form-textarea"
          rows={3}
          placeholder="Your message"
          required
        ></textarea>

        <button type="submit" className="form-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>Let's Learn Together</h4>
            <ContactForm />
          </div>
          <div className="footer-col">
            <h4>Explore More</h4>
            <ul className="info-list">
              <li>Privacy Policy</li>
              <li>Security Measures</li>
              <li>Software Guidelines</li>
              <li>Help & Support</li>
              <li>Contact Us</li>
            </ul>
            <h4>Address</h4>
            <ul className="info-list">
              <li>Language Learning Game HQ</li>
              <li>123 Polyglot Street</li>
              <li>Lingua Land</li>
            </ul>
            <h4>Our Company</h4>
            <ul className="info-list">
              <li>About Us</li>
              <li>Blog</li>
              <li>Press</li>
              <li>Careers & Culture</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
