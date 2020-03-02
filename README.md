# React-progress-hook

## Usage...

```javascript
import React, { useEffect } from "react";

import { useFakeLoaderState } from "React-progress-hook";

const App = () => {
  const { displayPercentage, isLoading, onProgress } = useFakeLoaderState({
    expectedStepTime: 2000,
    digits: 0
  });

  const onClick = async e => {
    onProgress({ total: 4, done: 0 });
    for (let i = 1; i <= 4; i++) {
      await timeoutAsync(2000);
      onProgress({ total: 4, done: i });
    }
  };

  function timeoutAsync(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div>
      {!isLoading && <button onClick={onClick}>load</button>}
      {isLoading && <h1>{displayPercentage}%</h1>}
    </div>
  );
};
export default App;
```

## License

MIT © [ThomWoltman](https://github.com/ThomWoltman)
