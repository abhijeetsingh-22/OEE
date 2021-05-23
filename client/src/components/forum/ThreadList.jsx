import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {apiCall} from '../../services/api';
import {capitalize} from '../../utils';

const ThreadList = () => {
  const {tag} = useParams();
  const {categoryId} = useParams();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);
  //   var response = {};
  useEffect(() => {
    console.log('tag is ', tag);
    setLoading(true);
    if (!tag)
      apiCall('get', `/api/forum/threads/`).then((res) => {
        setResponse(res);
        setLoading(false);
      });
    else
      apiCall('get', `/api/forum/threads/tagged/${tag}`).then((res) => {
        console.log(res);
        setResponse(res.questions);
        setLoading(false);
      });
  }, [tag]);
  return (
    <div>
      <div className='d-flex j'>
        {!!tag ? <h2>Questions tagged [{tag}]</h2> : <h2>All Questions</h2>}
        <Link to='/forum/ask' className=' btn btn-primary align-self-center ms-auto'>
          ASK A QUESTION
        </Link>
      </div>
      {loading ? (
        <div className='d-flex align-items-center flex-row'>
          <div class='spinner-border text-primary mx-auto' role='status'>
            <span class='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        response.map((thread) => {
          return (
            <div className='card'>
              {/* <img src="..." className="card-img-top" alt="..."> */}
              <div className='card-body'>
                <Link
                  to={`/forum/threads/${thread._id}`}
                  className='text-decoration-none'
                >
                  <h5 className='card-title mb-0'>{thread.title}</h5>
                </Link>
                <div className='text-muted mb-2'>By {capitalize(thread.user.name)}</div>
                <p className='card-text'>{thread.body.substring(0, 100)}...</p>
                <div className='d-flex '>
                  {thread.tags.map((tag) => {
                    return (
                      <Link to={`/forum/questions/tagged/${tag.title}`}>
                        <span className='badge bg-secondary me-2'>{tag.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
export default ThreadList;
