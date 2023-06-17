import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './App.css';

// Context to manage data storage
const AppContext = React.createContext();

const categories = ['All', 'Custom', 'ICP', 'Mission', 'Product'];

const initialTopics = [
  {
    _id: '1',
    category: 'Mission',
    keywords: [
      'online presence',
      'small businesses',
      'digital marketing',
      'branding',
    ],
    title:
      'The importance of Establishing a Strong Online Presence for Small Businesses',
  },
  {
    _id: '2',
    category: 'Mission',
    keywords: [
      'fast turnaround',
      'logo design',
      'website design',
      'branding',
    ],
    title:
      'How fast turnaround in logo and website design benefit your business',
  },
  {
    _id: '3',
    category: 'Product',
    keywords: [
      'apple vision pro',
      'artificial intelligence',
      'virtual reality',
      'hardware',
    ],
    title: 'My First Immersion in Apple Vision Pro: Heavy, Man!',
  },
  {
    _id: '4',
    category: 'Product',
    keywords: [
      'product management',
      'data model',
      'system architecture',
      'marketing',
    ],
    title: 'MVPM: Minimum Viable Product Manager',
  },
  {
    _id: '5',
    category: 'Mission',
    keywords: [
      'affordable branding',
      'startups',
      'entrepreneurs',
      'social media management',
    ],
    title:
      'Affordable branding solutions for startups and entrepreneurs.',
  },
  {
    _id: '6',
    category: 'ICP',
    keywords: [
      'startups',
      'entrepreneurs',
      'social media management',
    ],
    title:
      'Expert tips for choosing the right digital marketing agency for your business',
  },
];

const AppProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [topics, setTopics] = useState(initialTopics);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    keywords: '',
  });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [tagColors, setTagColors] = useState({});

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewTopic({ title: '', keywords: '' });
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSelectedTopic(null);
  };

  const handleTopicDelete = (topicId) => {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic._id !== topicId)
    );
  };

  const handleTopicSave = () => {
    const { title, keywords } = newTopic;
    const topic = {
      _id: uuid(),
      category: 'Custom',
      title,
      keywords: keywords.split(',').map((keyword) => keyword.trim()),
    };

    const colors = {};
    topic.keywords.forEach((keyword) => {
      colors[keyword] = generateRandomColor();
    });

    setTopics((prevTopics) => [...prevTopics, topic]);
    setTagColors((prevColors) => ({ ...prevColors, ...colors }));

    closeModal();
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseEditor = () => {
    setSelectedTopic(null);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleGenerateText = () => {
    // Handle text generation based on selected tone
    // For now, let's generate a random lorem ipsum paragraph
    const loremIpsum =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec tristique elit. Etiam condimentum vestibulum iaculis. Sed auctor, lacus id venenatis cursus, metus sem hendrerit nisi, non auctor nulla magna a dui. Praesent nec felis eu sem elementum finibus in a purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam tincidunt libero vel sagittis tincidunt. Cras gravida vestibulum ante, ut lobortis nisi tincidunt nec. Donec at rutrum justo. Nulla a mi ac sem laoreet ullamcorper. Nunc tristique tempus elit, eget posuere urna dignissim sit amet. Morbi lacinia auctor sapien sed tempor. Quisque vel est elit. Nam rhoncus rutrum neque, ac congue lectus pretium id. Donec varius semper metus, vel placerat metus pharetra in. Aliquam feugiat eros ac orci tincidunt, sed sagittis ligula auctor.';

    setEditorContent(loremIpsum);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const colors = {};
    topics.forEach((topic) => {
      topic.keywords.forEach((keyword) => {
        if (!tagColors[keyword]) {
          colors[keyword] = generateRandomColor();
        }
      });
    });

    setTagColors((prevColors) => ({ ...prevColors, ...colors }));
  }, [topics]);

  return (
    <AppContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        topics,
        setTopics,
        isModalOpen,
        openModal,
        closeModal,
        newTopic,
        setNewTopic,
        selectedTopic,
        setSelectedTopic,
        editorContent,
        handleCategoryClick,
        handleTopicDelete,
        handleTopicSave,
        handleTopicClick,
        handleEditorChange,
        handleGenerateText,
        handleCloseEditor,
        tagColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const TabComponent = () => {
  const {
    activeCategory,
    topics,
    isModalOpen,
    openModal,
    closeModal,
    newTopic,
    setNewTopic,
    selectedTopic,
    handleCategoryClick,
    handleTopicDelete,
    handleTopicSave,
    handleTopicClick,
    editorContent,
    handleEditorChange,
    handleGenerateText,
    handleCloseEditor,
    tagColors,
  } = useContext(AppContext);

  const filteredTopics =
    activeCategory === 'All'
      ? topics
      : topics.filter((topic) => topic.category === activeCategory);
  console.log(
    '🚀 ~ file: App.jsx:237 ~ TabComponent ~ filteredTopics:',
    filteredTopics
  );

  return (
    <div className="wrapper">
      <header className="header">
        <h1>Categories</h1>
        <button className="add-topic-button" onClick={openModal}>
          Add Topic
        </button>
      </header>
      <div className="tab-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${
              category === activeCategory ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
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
                    backgroundColor: `${tagColors[keyword]}1A`, // Lighter background color
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Topic</h2>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={newTopic.title}
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
                value={newTopic.keywords}
                onChange={(e) =>
                  setNewTopic({
                    ...newTopic,
                    keywords: e.target.value,
                  })
                }
              />
            </div>
            <div className="button-container">
              <button
                className="add-button"
                onClick={handleTopicSave}
              >
                Add
              </button>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedTopic && (
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
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <TabComponent />
    </AppProvider>
  );
}
