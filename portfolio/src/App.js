import './App.css';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import React, {useState, useEffect} from "react";


function Introduction() {
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 60;

  const titleText = "Hi, welcome to my personal website!"

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
    <header class = "flex flex-col items-center space-x-1 text-slate-800">
      <h1 class = "text-5xl p-6 font-bold">James Wen</h1>
      <div class = "flex flex-row">
        <span class = "text-2xl font-mono">👋 {title}</span>
        <span class ="border-l-2 border-black animate-blink box-shadow-none text-white">|</span>
      </div>
    </header>
  );
}

function AboutMe() {
  return(
    <div class = "flex flex-col flex justify-center items-center">
      <h2 class = "text-4xl p-2 font-bold text-slate-800">About Me</h2>
      <div class = "flex flex-col p-2 w-3/4">
        <p class = "text-lg text-slate-800">
        Hi! My name is James, and I am currently a 3rd year Computer Science 
        and Statistics student at the University of British Columbia! I love 
        innovation and creativity in the field of technology and seeing all 
        the fascinating ways innovators in this field have been able to apply 
        technology in other industries for the greater good.
        </p>
      </div>
    </div>
  );
}


function App() {
  return (
    <div class = "overflow-x-hidden">
      <div class="h-screen w-screen container mx-auto flex flex-col justify-center items-center bg-fixed bg-cover bg-[url('/public/SF.jpg')]">
        <div class = "container mx-auto fixed top-2 w-2/3 h-1/8 flex rounded-lg shadow-lg items-center bg-white z-10">
          <Navigation/>
        </div>
        <div class = "mt-0 container mx-auto shadow-lg w-1/2 h-2/5 flex items-center rounded-lg justify-center bg-white">
          <Introduction/>
        </div>
      </div>
      <div class = "p-6 container mx-auto w-screen">
        <AboutMe/>
      </div>
      <div class = "p-6 container mx-auto w-screen bg-blue-950">
        <Projects/>
      </div>
    </div>
  );
}

export default App;
