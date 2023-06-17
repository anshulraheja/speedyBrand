import React from 'react';
import ReactQuill from 'react-quill';
import './Editor.css';

const Editor = (props) => {
  const {
    editorContent,
    handleEditorChange,
    handleGenerateText,
    handleCloseEditor,
  } = props;
  return (
    <div className="write-modal">
      <div className="write-modal-content">
        <h2>Write</h2>
        <div className="form-group">
          <label htmlFor="tone">Tone:</label>
          <select id="tone">
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>
        <div className="editor-container">
          <ReactQuill
            value={editorContent}
            onChange={handleEditorChange}
            placeholder="Write something..."
          />
        </div>
        <div className="button-container">
          <button
            className="generate-button"
            onClick={handleGenerateText}
          >
            Generate
          </button>
          <button
            className="cancel-button"
            onClick={handleCloseEditor}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
