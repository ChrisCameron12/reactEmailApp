import React, { useEffect, useRef } from "react";
import "./App.css";
import EmailEditor from "react-email-editor"; //import the plugin
import { unlayerSampleJSON } from "./unlayerSampleJSON"; //json schema for the editor content
import { sendEmail } from './api'; //import sendgrid api
import { useState } from 'react';

const emailJSON = unlayerSampleJSON;

const App = () => {
  const emailEditorRef = useRef({ editor: {} });

  const onLoad = () => {
    console.log("ref: ", emailEditorRef.current);
    emailEditorRef.current.editor.loadDesign(emailJSON);

  };


 const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(email);
  })

  //grab the html from the editor parse it to sendEmail
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
      <h1>Email Editor</h1>
      <p>Use the editor to design an email! Then use the input below to send to the desired email address (note ask Chris for api key?)</p>
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