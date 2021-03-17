import React, {useEffect} from 'react';
import {Route, Switch, useParams, useRouteMatch} from 'react-router';
import {apiCall} from '../../services/api';
import AddQuestion from './AddQuestion';
import EvaluationsList from './EvaluationsList';
import Question from './Question';
import QuestionList from './QuestionList';

function Evaluation() {
  const {path, url} = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path + '/'} component={EvaluationsList} />
        <Route exact path={`${path}/:evaluationId`} component={QuestionList} />
        <Route
          exact
          path={`${path}/:evaluationId/questions/new`}
          component={AddQuestion}
        />
        <Route
          exact
          path={`${path}/:evaluationId/questions/:questionId`}
          component={Question}
        />
      </Switch>
      {/* <EvaluationsList/> */}
    </div>
  );
}

export default Evaluation;
