import React from 'react';

const Feedback = ({ feedbackData, totalFeedback, positive }) => {
  const { good, neutral, bad } = feedbackData;
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positive}%</p>
    </div>
  );
};

export default Feedback;
