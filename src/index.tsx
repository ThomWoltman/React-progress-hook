import { useState, useEffect } from "react";

interface progress {
  total: number;
  done: number;
}

interface config {
  expectedStepTime?: number;
  digits?: number;
}

const INCREMENT_TIME = 100;
export function useFakeLoaderState({
  expectedStepTime = 2000,
  digits = 0
}: config) {
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const onProgress = ({ total, done }: progress) => {
    setTotal(total);
    setDone(done);
  };

  const isLoading = total !== 0 && done < total;

  const progressPercentage = isLoading ? (done / total) * 100 : 0;
  const stepSize = isLoading ? 100 / total : 0;
  const maxFakeLoading = isLoading
    ? Math.min((done / total) * 100 + stepSize, 99)
    : 0;

  const increment = stepSize / (expectedStepTime / INCREMENT_TIME);

  useEffect(() => {
    const handle = setTimeout(
      () => {
        if (progressPercentage > displayPercentage) {
          const missingPercentage = progressPercentage - displayPercentage;

          const missingSteps = missingPercentage / stepSize;

          const catchupIncrement = Math.max(
            missingPercentage * missingSteps,
            increment
          );

          setDisplayPercentage(
            Math.min(displayPercentage + catchupIncrement, progressPercentage)
          );
        } else if (displayPercentage > maxFakeLoading) {
          setDisplayPercentage(progressPercentage);
        } else if (displayPercentage < maxFakeLoading) {
          setDisplayPercentage(
            Math.min(displayPercentage + increment, maxFakeLoading)
          );
        }
      },
      INCREMENT_TIME
      // Math.random() * 50 + 50
    );

    return () => clearTimeout(handle);
  }, [
    progressPercentage,
    displayPercentage,
    maxFakeLoading,
    increment,
    stepSize
  ]);

  return {
    displayPercentage: displayPercentage.toFixed(digits),
    isLoading,
    onProgress
  };
}
