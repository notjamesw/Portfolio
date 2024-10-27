import './App.css';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import React, {useState, useEffect, useRef} from "react";


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
        <span class = "text-2xl font-mono text-center">👋 {title}</span>
        <span class ="lg:border-l-2 border-black animate-blink box-shadow-none text-white">&#8203;</span>
      </div>
    </header>
  );
}

function AboutMe() {
  return(
    <div class = "mt-8 mb-8 flex flex-col flex justify-center items-center">
      <h2 class = "text-4xl p-4 font-bold text-slate-800">About Me</h2>
      <div class = "flex flex-col p-2 w-3/4 font-serif">
        <p class = "text-indent-2 text-lg text-slate-800 mb-6">
        Hi! My name is James, and I am currently a 3rd year Computer Science 
        and Statistics student at the University of British Columbia! I love 
        innovation and creativity in the field of technology and seeing all 
        the fascinating ways innovators in this field have been able to apply 
        technology in other industries for the greater good.
        </p>
        <p class = "text-indent-2 text-lg text-slate-800 mb-2">
        I decided to study computer science in university because of my 
        experience as a competitive programmer in highschool. Ever since then, 
        I've competed in programming contests, hackathons, and even game jams. 
        My journey in web development began very recently but I've been able to
        gain a multitude of experiences and knowledge through personal and 
        academic full-stack projects. Most of my prior experiences in software 
        development are on the data structures/algorithm side. 
        I've previously interned at AUAV Technology, a drone startup, 
        as a software engineering intern where I developed 
        Python scripts to facilitate hand-tracking functionalities for drone 
        control programs. These scripts leveraged AI and computer vision 
        techniques by integrating Google’s MediaPipe API with OpenCV, enabling 
        real-time hand gesture recognition and interaction. 
        </p>
      </div>
    </div>
  );
}

function Contact() {
  return(
    <div id = "Contact" class = "m-8 w-3/4 rounded-2xl border-8 border-slate-800 container mx:auto flex flex-col items-center justify-center">
      <h2 class = "p-4 m-2 text-3xl font-bold text-slate-800">Contact Me!</h2>
      <div class = "p-4 flex container mx:auto justify-center items-center mb-4">
        <div class = "m-2 flex flex-row items-center">
          <img src = '/images/phoneIcon.png' alt = "" class = "w-16 h-16"></img>
          <span class = "m-2 text-lg">leranjamesw@gmail.com</span>
        </div>
        <a
          href = "https://github.com/notjamesw" 
          target="_blank"
          rel='noreferrer'
          class = "mx-8">
          <img 
            src = "/images/gitHubLogo.png" alt = ""
            class = "w-16 h-16 rounded-full shadow-lg brightness-150 hover:brightness-0">
          </img>
        </a>
        <a 
          href = "https://www.linkedin.com/in/james-wen-33a7941b7/" 
          target="_blank"
          rel='noreferrer'
          class = "mx-8">
          <img 
            src = "/images/linkedInLogo.png" alt = ""
            class = "w-18 h-16 rounded-md shadow-lg hover:brightness-50">
          </img>
        </a>
      </div>
    </div>
  )
}

function App() {
  const aboutMeDivRef = useRef(null);
  const projectsDivRef = useRef(null);
  const contactDivRef = useRef(null);
  
  const handleScroll = (e, divRef) => {
    if (divRef.current) {
      divRef.current.scrollIntoView({behavior:"smooth"});
    }
    e.target.blur();
  }

  return (
    <div class = "overflow-x-hidden">
      <div class = "h-screen min-w-full container mx-auto flex flex-col justify-center items-center bg-fixed bg-cover bg-[url('/public/images/SF.jpg')]">
        <div class = "container mx-auto fixed justify-end top-2 w-2/3 h-1/8 flex rounded-2xl shadow-xl bg-slate-100 z-10">
          <Navigation 
            onScroll = {handleScroll}
            aboutMeDivRef = {aboutMeDivRef}
            projectsDivRef = {projectsDivRef}
            contactDivRef = {contactDivRef}/>
        </div>
        <div class = "mt-0 container mx-auto shadow-lg w-1/2 h-2/5 flex items-center rounded-lg justify-center bg-slate-100">
          <Introduction/>
        </div>
      </div>
      <div ref = {aboutMeDivRef} class = "p-6 container mx-auto min-w-full bg-slate-100">
        <AboutMe/>
      </div>
      <div ref = {projectsDivRef} class = "p-4 container mx-auto min-w-full bg-blue-950 h-1/2">
        <Projects/>
      </div>
      <div ref = {contactDivRef} class = "p-4 flex container mx-auto min-w-full bg-slate-100 h-1/2 items-center justify-center">
        <Contact/>
      </div>
    </div>
  );
}

export default App;
