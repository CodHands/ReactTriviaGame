import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/question';
import QuestionCount from '../components/questionCount';
import AnswerOption from '../components/answerOptions';

const Quiz = (props) => {

    function renderAnswerOptions(key,index) {
        return (
            <AnswerOption
                key={index}
                answerContent={key}
                answerType={key}
                questionId={props.questionId}
                correct_answer={props.correct_answer}
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
    answerOptions: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;