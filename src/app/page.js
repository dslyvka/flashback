"use client"

import Image from "next/image";
import styles from "./page.module.css";

// import { useState } from 'react';

// const decodeBase64 = (encoded) => {
//   try {
//     const decodedUrl = atob(encoded);
//     const emailMatch = decodedUrl.match(/[^\/]+@[^\/]+/);
//     return emailMatch ? emailMatch[0] : "Email not found";
//   } catch (error) {
//     return "Invalid Base64 string";
//   }
// };

// export default function Home() {
//   const [encodedUrl, setEncodedUrl] = useState('');
//   const [decodedEmail, setDecodedEmail] = useState('');

//   const handleDecode = () => {
//     const base64Pattern = /origurl=([^&]*)/;
//     const match = encodedUrl.match(base64Pattern);
//     if (match) {
//       const base64Str = decodeURIComponent(match[1]);
//       const decoded = decodeBase64(base64Str);
//       setDecodedEmail(decoded);
//     } else {
//       setDecodedEmail("No Base64 string found in URL");
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Email Decoder</h1>
//       <input 
//         type="text" 
//         value={encodedUrl} 
//         onChange={(e) => setEncodedUrl(e.target.value)} 
//         placeholder="Paste encoded URL here" 
//         style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} 
//       />
//       <button onClick={handleDecode} style={{ padding: '0.5rem 1rem' }}>Decode Email</button>
//       {decodedEmail && (
//         <div style={{ marginTop: '1rem' }}>
//           <strong>Decoded Email:</strong> <span>{decodedEmail}</span>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from 'react';

const decodeBase64 = (encoded) => {
  try {
    const decodedUrl = atob(encoded);
    const emailMatch = decodedUrl.match(/[^\/]+@[^\/]+/);
    return emailMatch ? emailMatch[0] : null;
  } catch (error) {
    return null;
  }
};

export default function Home() {
  const [encodedUrl, setEncodedUrl] = useState('');
  const [emails, setEmails] = useState([]);

  const handleDecode = async () => {
    fetch(encodedUrl, { redirect: 'follow' })
  .then(response => console.log(response.url)); // выводит конечный URL после всех редиректов

    const base64Pattern = /origurl=([^&]*)/;
    const match = encodedUrl.match(base64Pattern);
    if (match) {
      const base64Str = decodeURIComponent(match[1]);
      const decoded = decodeBase64(base64Str);
      if (decoded) {
        setEmails([...emails, decoded]);
      } else {
        alert("Invalid Base64 string or email not found");
      }
    } else {
      alert("No Base64 string found in URL");
    }
  };

  const copyToClipboard = () => {
    const emailText = emails.join('\n');
    navigator.clipboard.writeText(emailText)
      .then(() => alert('Emails copied to clipboard!'))
      .catch(() => alert('Failed to copy emails.'));
  };

  

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Email Decoder</h1>
      <input 
        type="text" 
        value={encodedUrl} 
        onChange={(e) => setEncodedUrl(e.target.value)} 
        placeholder="Paste encoded URL here" 
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} 
      />
      <button onClick={handleDecode} style={{ padding: '0.5rem 1rem' }}>Decode Email</button>
      <button onClick={copyToClipboard} style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>Copy All Emails</button>
      <ol style={{ marginTop: '1rem' }}>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ol>
    </div>
  );
}


