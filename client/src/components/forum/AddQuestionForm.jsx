import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {WithContext as ReactTags} from 'react-tag-input';
import {apiCall} from '../../services/api';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
// const removeTagButton = (props) => {
//   return (
//     <button
//       {...props}
//       type='button'
//       class='btn-close btn-small'
//       aria-label='Close'
//     ></button>
//   );
// };
function AddQuestionForm() {
  const history = useHistory();
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    apiCall('get', '/api/forum/tags').then((res) => {
      setSuggestions(res);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall('post', '/api/forum/threads', {body, title, tags}).then((res) =>
      history.push('/forum')
    );
  };
  console.log(suggestions);

  const handleDelete = (i) => {
    setTags((tags) => {
      return [...tags.filter((tag, index) => index !== i)];
    });
  };

  const handleAddition = (tag) => {
    console.log(tag);
    if (tags.length < 5)
      setTags((tags) => {
        return [...tags, tag];
      });
    // this.setState((state) => ({tags: [...state.tags, tag]}));
  };

  const handleFilterSuggestions = (text) => {
    if (tags.length < 5)
      return suggestions.filter((d) =>
        d.title.toLowerCase().includes(text.toLowerCase())
      );
    else return [];
  };
  console.log('tags ', tags);
  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      {/* <div className=''> */}
      <h3 className='text-center mb-3  '>Ask a public question</h3>
      <div className='mb-3 col-12 col-md-10 col-lg-8'>
        <label htmlFor='question-title' className='form-label'>
          Title
        </label>
        <input
          type='email'
          className='form-control'
          id='question-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className='col-12 col-md-10 col-lg-8 mb-3'>
        <label htmlFor='question-title' className='form-label mb-0'>
          Tags
        </label>
        <div className='form-text mt-0 mb-2'>
          Add up to 5 tags to describe what your question is about
        </div>
        <ReactTags
          inputFieldPosition='bottom'
          autofocus={false}
          classNames={'form-control'}
          tags={tags}
          labelField='title'
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          delimiters={delimiters}
          handleFilterSuggestions={handleFilterSuggestions}
          maxLength={30}
          autocomplete={true}
          // removeComponent={removeTagButton}
          allowDragDrop={false}
        />
      </div>

      <div className='mb-3 col-12 col-md-10 col-lg-8'>
        <label htmlFor='question-body' className='form-label'>
          Body
        </label>
        <textarea
          className='form-control'
          id='question-body'
          name='body'
          rows='10'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        className='btn btn-primary align-self-center col-2 mb-3'
        type='submit'
        onClick={handleSubmit}
      >
        Submit
      </button>
      {/* </div> */}
    </div>
  );
}

export default AddQuestionForm;
