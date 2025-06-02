import React, { useEffect, useRef } from "react";
import "./App.css";
import EmailEditor from "react-email-editor";
import { unlayerSampleJSON } from "./unlayerSampleJSON";
import { sendEmail } from './api';
import { useState } from 'react';

const emailJSON = unlayerSampleJSON;

const App = () => {
  const emailEditorRef = useRef({ editor: {} });

  const onLoad = () => {
    console.log("ref: ", emailEditorRef.current);
    emailEditorRef.current.editor.loadDesign(emailJSON);

    // This autosaves design after every change
  };


 const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(email);
  })

  const handleSendEmail = async (e) => {
    e.preventDefault();
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const html = data.html;
      console.log(email)
      console.log(html)
  
    await sendEmail(email, html)
    })
 
    
  }

  return (
    <div>
    <EmailEditor
      ref={emailEditorRef}
      onLoad={onLoad}
      style={{ width: '1000px', height: '600px' }}
    />
    <form onSubmit={handleSendEmail}  style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>
      <label htmlFor="">Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} style={{ width: '15rem', height: '2rem' }}/>

      <button style={{ backgroundColor: '#0079D6', color: 'white' }} type="submit">Send</button>
    </form>
   
    </div>

  );
};

export default App;