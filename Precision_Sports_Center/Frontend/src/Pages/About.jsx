//src/pages/About.jsx
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Textarea } from '@/components/ui/textarea';

const About = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // replace with real submit logic later (API call, form handler, etc.)
    alert('Message sent:\n\n' + (message || '[empty]'));
    setMessage('');
  };

  return (
    <>
      <NavBar />
      <main style={{ maxWidth: 900, margin: '32px auto', padding: 20 }}>
        <h1 style={{ marginBottom: 12 }}>About Precision Sports Center</h1>

        <p style={{ lineHeight: 1.6 }}>
          Precision Sports Center offers training, coaching, and facilities designed to help athletes
          of all ages improve performance, prevent injury, and reach their goals. We combine experienced
          coaches, sport-specific programming, and modern equipment in a positive, community-driven environment.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ marginBottom: 8 }}>Contact / Feedback</h2>
          <p style={{ marginBottom: 8 }}>Send us a message and we'll get back to you.</p>

          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your question or feedback..."
            style={{ minHeight: 120, width: '100%' }}
          />

          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={handleSend}>
              Send
            </button>
          </div>
        </section>
      </main>
    </>
  );
};
export default About;
