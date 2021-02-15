import React, {useState} from 'react';

function AddQuestionForm() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const handleSubmit = (e) => {
    e.prevntDefault();
  };
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
        />
      </div>
      <div className='mb-3 col-12 col-md-10 col-lg-8'>
        <label htmlFor='question-title' className='form-label'>
          Tags
        </label>
        <input
          type='tags'
          className='form-control'
          id='question-title'
          onKeyPress={(e) => {
            console.log(e.target.value);
            console.log(e.key);
          }}
        />
      </div>
      <div className='mb-3 col-12 col-md-10 col-lg-8'>
        <select className='form-select' aria-label='category'>
          <option selected>Select Category</option>
          <option value='1'>One</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
        </select>
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
