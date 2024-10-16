import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import './NewPostPage.css'; 

const NewPostPage = () => {
  const [postType, setPostType] = useState('');

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  return (
    <div className="new-post-container">
      <div className="post-header-container">
        <h1 className="post-heading">New Post</h1>

        <div className="post-type-selection">
          <p className="post-type-message">Select Post Type:</p>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" value="question" checked={postType === 'question'} onChange={handlePostTypeChange}/>
              <span className="radio-text">Question</span>
            </label>
            <label className="radio-label">
              <input type="radio" value="article" checked={postType === 'article'} onChange={handlePostTypeChange}/>
              <span className="radio-text">Article</span>
            </label>
          </div>
        </div>
      </div>

      {postType && (
        <div className="post-section">
          <h2>Ask Or Share Anything</h2>
          
          {postType === 'question' ? (
            <QuestionForm />
          ) : (
            <ArticleForm />
          )}
        </div>    
      )}
    </div>
  );
};

export default NewPostPage;
