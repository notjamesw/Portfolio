import './App.css';
import Navigation from './components/Navigation';
import React, {useState, useEffect} from "react";


function Introduction() {
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 100;

  const titleText = "👋 Hi, welcome to my personal website!"

  useEffect(() => {
    if (index < titleText.length) {
      const timeout = setTimeout(() => {
        setTitle((prev) => prev + titleText.charAt(index));
        setIndex((prev) => prev + 1);
      }, typingSpeed); 

      return () => clearTimeout(timeout);
    }

  }, [index, titleText]);
  return (
    <header class = "flex flex-col items-center space-x-1 font-mono">
      <h1 class = "text-4xl">James Wen</h1>
      <div class = "flex flex-row">
        <span class = "text-xl">{title}</span>
        <span class ="border-l-2 border-black animate-blink box-shadow-none text-white">|</span>
      </div>
    </header>
  );
}


function App() {
  return (
    <div class="h-dvh container mx-auto items-center">
      <div class = "container mx-auto w-2/3 h-1/8 flex rounded-lg shadow-lg">
        <Navigation/>
      </div>
      <div class = "mt-6 container mx-auto shadow-lg w-1/2 h-1/3 flex items-center rounded-lg justify-center">
        <Introduction/>
      </div>
    </div>
  );
}

export default App;
