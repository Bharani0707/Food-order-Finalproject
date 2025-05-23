import React, { useEffect, useState } from 'react';
import './Fakesms.css';

const FakeSMS = ({ name, orderId }) => {
  const [visible, setVisible] = useState(true);
  const shortOrderId = orderId ? orderId.substring(0, 10).toUpperCase() : 'ORD12345';

  useEffect(() => {
    const audio = new Audio('/Sounds/notify.wav');
    audio.play().catch(e => console.error('Audio error:', e));

    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fake-sms-popup">
      <p>Hi <strong>{name}</strong>,</p>
      <p>Your food order <strong>#{shortOrderId}</strong> has been placed successfully!</p>
      <p>We’re preparing your delicious meal and it will be delivered shortly.</p>
      <br />
      <p>
        <strong>
          <span style={{fontSize: '1.1em', marginRight: '6px', color:"blue"}}></span>
          Status: Food Processing!
        </strong>
      </p>
    </div>
  );
};

export default FakeSMS;
