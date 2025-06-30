import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Des compteurs indépendants</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Cliqué {count} fois
    </button>
  );
}
