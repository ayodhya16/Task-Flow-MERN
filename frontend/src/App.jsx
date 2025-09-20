import React from 'react';
import Navbar from './components/Navbar'; 

const App = () => {
  return (
    <>
    <Navbar />
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
    </>
  );
};

export default App;