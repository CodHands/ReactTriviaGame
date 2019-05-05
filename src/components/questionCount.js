import React from 'react';
import PropTypes from 'prop-types';

const QuestionCount = (props) => {
  return (
    <div className="questionCount">
      <h3><span>{props.counter}</span> of <span>{props.total}</span></h3>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;