import "./Projects.css";
import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

function Project(props) {
    const name = props.name;
    const imgURL = props.imgURL;
    const award = props.award;
    const description = props.description;
    const link = props.link;
    return(
        <div class = "rounded-lg border-slate-200 bg-slate-100 border-4 mb-12 lg:pb-0">
            <div class = "border-slate-100 bg-slate-100 flex h-56 w-80 rounded-t-sm justify-center">
                <a
                  href = {link} 
                  target="_blank"
                  rel='noreferrer'>
                  <img src = {imgURL} alt = "" class = "h-full bg-slate-100">
                  </img>
                </a>
            </div>
            <div class = "container mx:auto p-2 h-48 w-80 bg-slate-100 flex-col justify-center">
                <h3 class = "mt-2 mb-2 text-xl font-semibold text-center">
                  {name}
                </h3>
                <p class = "text-md font-semibold text-center">
                  {award}
                </p>
                <p class = "text-md text-center">
                  {description}
                </p>
            </div>
        </div>
    )
}

function Projects() {
    const titleText = "Check out some of the cool things I've done";
    const RacketDesc = "A full-stack web application running a functional interpreter for Racket, a Lisp Dialect";
    const FlappyDesc = "A complete reacreation of the Flappy Bird game and trained an AI agent using a neural evolutionary neural network to play the game";
    const ZenGardenDesc = "Immersive and visually stunning 3D game centered around the Japanese philosophy of Zen, designed to relax and calm users";
    const LOLTMDesc = "Team and player information management tool for a popular multiplayer video game, League of Legends";
    const ChromeExtension2048Desc = "Chrome Extension for recreation of 2048, with data persistence built using the Chrome Storage API";
    const ZenGardenAward = "🏆 #3 overall @ Calgary Youth Hackathon, out of 100+ participants";

    const projectsList = [
      {component: <Project 
                  name = "Racket Web Interpreter"
                  imgURL = "/images/RacketInterpreter.png"
                  link = "https://github.com/notjamesw/Racket-Interpreter-Web-App"
                  description = {RacketDesc}/>},
      {component: <Project 
                  name = "Flappy Bird AI"
                  imgURL = "/images/FlappyBirdAI.png"
                  link = "https://github.com/notjamesw/flappybird"
                  description = {FlappyDesc}/>},
      {component: <Project 
                  name = "Zen Garden Game"
                  imgURL = "/images/JapaneseGardenGame.png"
                  link = "https://github.com/d1story/CYH2021"
                  description = {ZenGardenDesc}
                  award = {ZenGardenAward}/>},
      {component: <Project
                  name = "LOL Teams Managing Tool"
                  imgURL = "/images/LOLTM.png"
                  link = "https://github.com/notjamesw/LOLTeamsManager"
                  description = {LOLTMDesc}/>},
      {component: <Project
                  name = "2048 Chrome Extension"
                  imgURL = "/images/ChromExtension2048.png"
                  link = "https://github.com/notjamesw/2048ChromeExtension"
                  description = {ChromeExtension2048Desc}/>}
    ]
    
    const itemsPerPage = 3;

    const [currIndex, setCurrIndex] = useState(0);

    const handlePrev = () => {
      setCurrIndex((prevIndex) => {
        if (prevIndex === 0) {
          return Math.floor((projectsList.length - 1) / itemsPerPage)
        } else {
          return prevIndex - 1
        }
      })
    }

    const handleNext = () => {
      setCurrIndex((prevIndex) => {
        if (prevIndex === Math.floor((projectsList.length - 1) / itemsPerPage)) {
          return 0
        } else {
          return prevIndex + 1
        }
      })
    }

    return(
        <div id = "Projects" class = "container mx-auto mb-10">
            <h2 class = "pl-0 pt-8 pb-12 m-6 text-4xl font-medium text-slate-100">
                {titleText}
            </h2>
            <div>
              <button
                onClick={handlePrev}
                className = "bg-slate-100 text-medium text-slate-900 font-semibold rounded-full border-2 border-slate-200 hover:text-white hover:bg-slate-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                  &lt;
              </button>
              <button
                onClick={handleNext}
                className = "bg-slate-100 text-medium text-slate-900 font-semibold rounded-full border-2 border-slate-200 hover:text-white hover:bg-slate-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                  &gt;
              </button>
            </div>
            <div class="overflow-hidden">
              <div
                class="flex transition-transform duration-500 lg:gap-20 lg:ml-10"
                style={{ transform: `translateX(-${currIndex}%)` }}>
                {projectsList.map((project, index) => (
                  <div key={index} class="flex">
                    {project.component}
                  </div>
                ))}
              </div>
            </div>
        </div>
    )
}

export default Projects;


/*
<figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure>
*/