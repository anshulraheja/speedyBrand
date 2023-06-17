import React from 'react';
import ReactQuill from 'react-quill';
import './Editor.css';

const Editor = (props) => {
  const {
    editorContent,
    handleEditorChange,
    handleGenerateText,
    handleCloseEditor,
    selectedTone,
    handleToneChange,
  } = props;

  return (
    <div className="write-modal">
      <div className="write-modal-content">
        <h2>Write</h2>
        <div className="form-group">
          <label htmlFor="tone">Tone:</label>
          <select
            id="tone"
            className="tone-select"
            value={selectedTone}
            onChange={() => handleToneChange(event.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
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
            className={`${
              selectedTone == ''
                ? 'generate-button disabled'
                : 'generate-button'
            }`}
            onClick={handleGenerateText}
            disabled={selectedTone == '' ? true : false}
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
