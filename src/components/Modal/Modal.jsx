import React from 'react';
import './Modal.css';
const Modal = (props) => {
  const { setNewTopic, handleTopicSave, closeModal, newTopic } =
    props;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Topic</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTopic?.title}
            onChange={(e) =>
              setNewTopic({ ...newTopic, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="keywords">Keywords:</label>
          <input
            type="text"
            id="keywords"
            value={newTopic?.keywords}
            onChange={(e) =>
              setNewTopic({
                ...newTopic,
                keywords: e.target.value,
              })
            }
          />
        </div>
        <div className="button-container">
          <button className="add-button" onClick={handleTopicSave}>
            Add
          </button>
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
