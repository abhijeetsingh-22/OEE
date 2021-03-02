import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {apiCall} from '../services/api';

function TagList() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function load() {
      var tags = await apiCall('get', '/api/forum/tags');
      setTags(tags);
      console.log();
    }
    load();
  }, []);
  var tagView = tags.map((tag) => {
    return (
      <div className=' col-md-3'>
        <div className='border p-2'>
          <Link to={`/forum/questions/tagged/${tag.title}`}>
            <span className='badge bg-info text-dark mb-3'>{tag.title}</span>
          </Link>
          <div>
            {tag.questionCount} {tag.questionCount > 1 ? 'questions' : 'question'}
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className='mt-3'>
      <div className='row'>
        <h2>Tags</h2>
        <p className='col-md-7'>
          A tag is a keyword or label that categorizes your question with other, similar
          questions. Using the right tags makes it easier for others to find and answer
          your question.
        </p>
      </div>
      <div className='row g-2'>{tagView}</div>;
    </div>
  );
}

export default TagList;
