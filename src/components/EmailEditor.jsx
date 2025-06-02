import React, { useEffect, useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

const EmailEditor = ({ onLoad, onDesignLoad }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    unlayer.init({
      id: 'editor-container',
      displayMode: 'email',
      features: {
        image: {
          enabled: true
        }
      },
      appearance: {
        theme: 'dark',
        panels: {
          tools: {
            dock: 'right'
          }
        }
      },
      // Load blank design or a preloaded one
      design: {},

      // Called when the editor is ready
      loaded: () => {
        if (onLoad) onLoad();
      }
    });

    // Optionally load a design after init
    if (onDesignLoad) {
      onDesignLoad((design) => {
        unlayer.loadDesign(design);
      });
    }

    return () => {
      // Clean up editor instance
      unlayer.destroy();
    };
  }, []);

  return (
    <div id="editor-container" style={{ height: '700px', width: '100%' }} ref={editorRef}></div>
  );
};

export default EmailEditor;
