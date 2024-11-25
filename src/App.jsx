import { useEffect, useState } from 'react';
import Feedback from './components/Feedback/Feedback';
import Options from './components/Options/Options';
import Notification from './components/Notification/Notification';
import Description from './components/Description/Description';

function App() {
  const [counterFeedbacks, setCounterFeedbacks] = useState(() => {
    const savedFeedback = window.localStorage.getItem('feedback');
    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  const updateFeedback = feedbackType => {
    setCounterFeedbacks(prev => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const reset = () => {
    setCounterFeedbacks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [positive, setPositive] = useState(0);


  useEffect(() => {
    setTotalFeedback(
      counterFeedbacks.good + counterFeedbacks.neutral + counterFeedbacks.bad
    );
    setPositive(
      Math.round(
        ((counterFeedbacks.good + counterFeedbacks.neutral) / totalFeedback) *
          100
      )
    );
    window.localStorage.setItem('feedback', JSON.stringify(counterFeedbacks));
  }, [counterFeedbacks, totalFeedback, positive]);

  return (
    <>
      <Description />
      <Options
        reset={reset}
        totalFeedback={totalFeedback}
        updateFeedback={updateFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedbackData={counterFeedbacks}
          totalFeedback={totalFeedback}
          positive={positive}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
