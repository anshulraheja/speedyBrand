import React from 'react';
import './Topic.css';

const Topic = (props) => {
  const {
    filteredTopics,
    tagColors,
    handleTopicDelete,
    handleTopicClick,
  } = props;
  return (
    <div className="content">
      {filteredTopics.map((topic) => (
        <div key={topic._id} className="topic">
          <h3 className="topic-title">{topic.title}</h3>
          <div className="topic-tags">
            {topic.keywords.map((keyword) => (
              <div
                key={keyword}
                className="tag"
                style={{
                  borderColor: tagColors[keyword],
                  backgroundColor: `${tagColors[keyword]}1A`,
                  color: tagColors[keyword],
                }}
              >
                {keyword}
              </div>
            ))}
          </div>
          <div className="topic-buttons">
            <button
              className="delete-button"
              onClick={() => handleTopicDelete(topic._id)}
            >
              Delete
            </button>
            <button
              className="write-button"
              onClick={() => handleTopicClick(topic)}
            >
              Write
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Topic;
