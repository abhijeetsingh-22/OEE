import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {apiCall} from '../services/api';
import Moment from 'react-moment';
import moment from 'moment';

const Thread = () => {
  const {threadId} = useParams();
  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState({});
  const [posts, setPosts] = useState([]);
  const [answer, setAnswer] = useState('');
  useEffect(async () => {
    setLoading(true);
    (async function load() {
      const thread = await apiCall('get', `/api/forum/threads/${threadId}`);
      console.log(thread);
      setThread(thread);
      const res = await apiCall('get', `/api/forum/threads/${threadId}/posts`);
      console.log(res);
      setPosts(res);
      setLoading(false);
    })();
  }, []);
  const handleAddAnswer = (e) => {
    console.log(answer);
    apiCall('post', '/api/forum/posts', {
      body: answer,
      thread: thread._id,
    })
      .then((res) => {
        setPosts((posts) => [...posts, res]);
        setAnswer('');
      })
      .catch((err) => console.log('error occured ', err));
  };

  return loading ? (
    <div className='d-flex align-items-center flex-row'>
      <div class='spinner-border text-primary mx-auto' role='status'>
        <span class='visually-hidden'>Loading...</span>
      </div>
    </div>
  ) : (
    <div className='d-flex flex-column'>
      <div class='card'>
        <div class='card-body '>
          <div className='d-flex align-items-center justify-content-start flex-wrap'>
            <p class='card-title me-3 my-auto text-primary fw-bold '>
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
          </div>
          <h5 className='card-title fw-bold mt-1 fs-5'>{thread.title}</h5>
          {/* <h5 class="card-title">Special title treatment</h5> */}
          <p class='card-text mt-0'>{thread.body}</p>
          {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
      <div className='card'>
        <div className='card-body fw-bold py-3 bg-light'>
          {posts.length} {posts.length > 1 ? 'Answers' : 'Answer'}
        </div>
      </div>
      {posts.map((post) => {
        return (
          <div class='card' key={post._id}>
            <div class='card-body '>
              <div className='d-flex align-items-center justify-content-start flex-wrap'>
                <p class='card-title me-3 my-auto fw-bold text-primary'>
                  {post.user.name}
                </p>
                {thread.user._id == post.user._id ? (
                  <span className='badge bg-primary'>Author</span>
                ) : null}
              </div>
              <small className='text-muted mt-n1'>
                {moment().diff(moment(post.createdAt), 'hours') < 24 ? (
                  <Moment fromNow>{post.createdAt}</Moment>
                ) : (
                  <Moment format='DD MMM YY hh:mm:A'>{post.createdAt}</Moment>
                )}
              </small>
              {/* <h5 class="card-title">Special title treatment</h5> */}
              <p class='card-text mt-3'>{post.body}</p>
              {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        );
      })}
      <div className='card'>
        <div className='card-body fw-bold py-3'>
          Your Answer
          <form class='my-3 d-flex flex-column'>
            {/* <label for='exampleFormControlTextarea1' class='form-label'>
              Example textarea
            </label> */}
            <textarea
              class='form-control'
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
