import React, {useEffect, useState} from 'react';
import {useParams, useRouteMatch} from 'react-router';
import {Link} from 'react-router-dom';
import {apiCall} from '../../services/api';

function Question() {
  const [question, setQuestion] = useState([]);
  const {questionId} = useParams();
  const {path, url} = useRouteMatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall('get', `/api/evaluation/questions/${questionId}`);
      setQuestion(data);
    };
    fetchData();
  }, [questionId]);
  return (
    <div>
      <div className='d-flex flex-column'>
        <div className='card'>
          <div className='card-body '>
            <div className='d-flex align-items-center justify-content-start flex-wrap'>
              <p className='card-title me-3 my-auto text-primary fw-bold '>
                {/* {thread.user.name} */}
              </p>
              {/* <small className='text-muted mt-n1  fst-light'>
              Asked :{' '}
              {moment().diff(moment(thread.createdAt), 'hours') < 24 ? (
                <Moment fromNow>{thread.createdAt}</Moment>
              ) : (
                <Moment format='DD MMM YYYY hh:mm:A'>{thread.createdAt}</Moment>
              )}
            </small> */}
            </div>
            <h5 className='card-title fw-bold mt-1 fs-5'>{question.title}</h5>
            {/* <h5 className="card-title">Special title treatment</h5> */}
            <p className='card-text mt-0'>{question.body}</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            <div className='d-flex '>
              {/* {thread.tags.map((tag) => {
                return (
                  <Link to={`/forum/questions/tagged/${tag.title}`}>
                    <span className='badge bg-secondary me-2'>{tag.title}</span>
                  </Link>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
