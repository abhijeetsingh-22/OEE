import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {apiCall} from '../../services/api';
import Moment from 'react-moment';
import moment from 'moment';

const Thread = () => {
  // @ts-ignore
  const {threadId} = useParams();
  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState({});
  const [posts, setPosts] = useState([]);
  const [answer, setAnswer] = useState('');
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const thread = await apiCall('get', `/api/forum/threads/${threadId}`);
      console.log(thread);
      setThread(thread);
      // setPosts(thread.posts);
      const res = await apiCall('get', `/api/forum/threads/${threadId}/posts`);
      console.log(res);
      setPosts(res);
      setLoading(false);
    }
    fetchData();
  }, [threadId]);
  const handleAddAnswer = (e) => {
    e.preventDefault();
    console.log(answer);
    apiCall('post', '/api/forum/posts', {
      body: answer,
      thread: thread._id,
    })
      .then((res) => {
        setAnswer('');
        setPosts((posts) => [...posts, res]);
      })
      .catch((err) => console.log('error occured ', err));
  };

  return loading ? (
    <div className='d-flex align-items-center flex-row'>
      <div className='spinner-border text-primary mx-auto' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  ) : (
    <div className='d-flex flex-column'>
      <div className='card'>
        <div className='card-body '>
          <div className='d-flex align-items-center justify-content-start flex-wrap'>
            <p className='card-title me-3 my-auto text-primary fw-bold '>
              {thread.user.name}
            </p>
            <small className='text-muted mt-n1  fst-light'>
              Asked :{' '}
              {moment().diff(moment(thread.createdAt), 'hours') < 24 ? (
                <Moment fromNow>{thread.createdAt}</Moment>
              ) : (
                <Moment format='DD MMM YYYY hh:mm:A'>{thread.createdAt}</Moment>
              )}
            </small>
            <Link to='/forum/ask' className=' btn btn-primary align-self-center ms-auto'>
              ASK A QUESTION
            </Link>
          </div>
          <h5 className='card-title fw-bold mt-1 fs-5'>{thread.title}</h5>
          {/* <h5 className="card-title">Special title treatment</h5> */}
          <p className='card-text mt-0'>{thread.body}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
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
      <div className='card'>
        <div className='card-body fw-bold py-3 bg-light'>
          {posts.length} {posts.length > 1 ? 'Answers' : 'Answer'}
        </div>
      </div>
      {posts.map((post) => {
        return (
          <div className='card' key={post._id}>
            <div className='card-body '>
              <div className='d-flex align-items-center justify-content-start gx- flex-wrap'>
                <p className='card-title me-3 my-auto fw-bold text-primary'>
                  {post.user.name}
                </p>
                {thread.user._id == post.user._id ? (
                  <span className='badge bg-primary mx-1'>Author</span>
                ) : null}
                {post.user.role == 'staff' ? (
                  <span className='badge bg-success'>Faculty</span>
                ) : null}
              </div>
              <small className='text-muted mt-n1'>
                {moment().diff(moment(post.createdAt), 'hours') < 24 ? (
                  <Moment fromNow>{post.createdAt}</Moment>
                ) : (
                  <Moment format='DD MMM YY hh:mm:A'>{post.createdAt}</Moment>
                )}
              </small>
              {/* <h5 className="card-title">Special title treatment</h5> */}
              <p className='card-text mt-3'>{post.body}</p>
              {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        );
      })}
      <div className='card'>
        <div className='card-body fw-bold py-3'>
          Your Answer
          <form className='my-3 d-flex flex-column'>
            {/* <label for='exampleFormControlTextarea1' className='form-label'>
              Example textarea
            </label> */}
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            ></textarea>
            <button
              type='submit'
              className='btn btn-primary my-3 align-self-stretch'
              onClick={handleAddAnswer}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Thread;
