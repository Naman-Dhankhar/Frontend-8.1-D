import React, { useState, useEffect } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import { db, storage } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ArticleForm.css';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [articles, setArticles] = useState([]);

  // Fetch articles from Firestore
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        const articlesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log('Image selected:', e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log('Form submitted with:', { title, abstract, articleText, tags, image });

    try {
      let imageUrl = '';

      // Upload the image if selected
      if (image) {
        console.log('Uploading image...');
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image)
          .then(async () => {
            imageUrl = await getDownloadURL(imageRef);
            console.log('Image uploaded successfully, URL:', imageUrl);
          })
          .catch((uploadError) => {
            console.error('Error uploading image:', uploadError);
            alert('Error uploading image.');
            return; // Exit if image upload fails
          });
      }

      // Save article to Firestore
      console.log('Saving article to Firestore...');
      await addDoc(collection(db, 'articles'), {
        title,
        abstract,
        articleText,
        tags,
        imageUrl: imageUrl || '', // Ensure a valid value is provided
      });

      console.log('Article saved to Firestore.');

      // Clear form fields
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);
      alert('Article posted successfully!');
    } catch (error) {
      console.error('Error posting article:', error.message);  // Log the exact error message
      alert('Error posting article: ' + error.message);        // Show the error to the user
    }
  };

  return (
    <>
      <Form className="article-form" onSubmit={handleSubmit}>
        <Form.Field
          control={Input}
          label="Title"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Field
          control={Input}
          label="Abstract"
          placeholder="Enter a 1-paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
        <Form.Field
          control={TextArea}
          label="Article Text"
          placeholder="Enter your article text"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
        />
        <Form.Field
          control={Input}
          label="Tags"
          placeholder="Please add up to 3 tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Form.Field
          control={Input}
          label="Upload Image"
          type="file"
          onChange={handleImageChange}
        />
        <div className="button-container">
          <Button size="large" className="post-button" type="submit">
            Post
          </Button>
        </div>
      </Form>

      <div className="articles-list">
        <h3>Previously Posted Articles</h3>
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <h4>{article.title}</h4>
            <p>{article.abstract}</p>
            <p><strong>Tags:</strong> {article.tags}</p>
            {article.imageUrl && (
              <img src={article.imageUrl} alt="Article Image" className="article-image" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticleForm;
