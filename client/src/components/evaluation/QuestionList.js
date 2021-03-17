import React, {useEffect, useState} from 'react';
import Moment from 'react-moment';
import {useParams, useRouteMatch} from 'react-router';
import {Link} from 'react-router-dom';
import {apiCall} from '../../services/api';

function QuestionList() {
  const {evaluationId} = useParams();
  const {path, url} = useRouteMatch();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall('get', `/api/evaluation/${evaluationId}`);
      setQuestions(data);
    };
    fetchData();
  }, [evaluationId]);
  const questionView = questions.map((question, idx) => {
    return (
      <div className='card'>
        {/* <img src="..." className="card-img-top" alt="..."> */}
        <div className='card-body'>
          <Link to={`${url}/questions/${question.id}`} className='text-decoration-none'>
            <h5 className='card-title mb-0'>
              {' '}
              Q{idx + 1}. {question.body.substring(0, 100)}
            </h5>
          </Link>
          {/* <div className='text-muted mb-2'>By {capitalize(thread.user.name)}</div> */}
          {/* <p className='card-text'>
            Q{idx + 1}. {question.body.substring(0, 100)}
          </p> */}
          <div className='d-flex '>
            {/* <span className='badge bg-secondary me-2 '>
              Starts :-
              <Moment format='DD MMM YYYY hh:mm:A'>{question.startTime}</Moment>
            </span> */}
            {question.endTime && (
              <span className='badge bg-secondary me-2 '>
                Ends :-
                <Moment format='DD MMM YYYY hh:mm:A'>{question.endTime}</Moment>
              </span>
            )}
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
    );
  });
  return <div>{questionView}</div>;
}

export default QuestionList;
