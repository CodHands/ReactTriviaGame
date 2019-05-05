import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/question';
import QuestionCount from '../components/questionCount';
import AnswerOption from '../components/answerOptions';

const Quiz = (props) => {

    function renderAnswerOptions(key) {
        return (
            <AnswerOption
                key={key}
                answerContent={key}
                answerType={key}
                answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
            />
        );
    }

    return (
        <div className="quiz">
        <QuestionCount
            counter={props.questionId}
            total={props.questionTotal}
        />
        <Question content={props.question} />
        <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        </div>
    );
}

Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;