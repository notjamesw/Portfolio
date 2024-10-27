import "./Projects.css";
import React, {useRef} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function Project(props) {
    const name = props.name;
    const imgURL = props.imgURL;
    const award = props.award;
    const description = props.description;
    const link = props.link;
    return(
        <div class = "rounded-lg shadow-lg border-slate-200 bg-slate-100 border-8 mb-12 lg:pb-0">
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
                  imgURL = "/images/ChromeExtension2048.png"
                  link = "https://github.com/notjamesw/2048ChromeExtension"
                  description = {ChromeExtension2048Desc}/>}
    ]

    const swiperRef = useRef(null);

    return(
        <div id = "Projects" class = "container mx-auto mb-10">
            <h2 class = "pl-0 pt-8 m-6 text-4xl font-medium text-slate-100">
                {titleText}
            </h2>
            <div class = "container mx:auto flex justify-end mb-4 pr-14">
              <button
                onClick={(e) => {
                  swiperRef.current.swiper.slidePrev();
                  e.target.blur();
                }}
                className = "pb-1 h-12 w-12 mx-4 bg-slate-200 font-bold text-3xl text-slate-800 font-semibold rounded-full hover:text-white hover:bg-slate-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-2">
                  &lt;
              </button>
              <button
                onClick={(e) => {
                  swiperRef.current.swiper.slideNext();
                  e.target.blur();
                }}
                className = "pb-1 h-12 w-12 bg-slate-200 text-3xl font-bold text-slate-800 font-semibold rounded-full hover:text-white hover:bg-slate-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-2">
                  &gt;
              </button>
            </div>
            <div className="w-screen max-w-6xl mx-auto p-4">
              <Swiper
                ref={swiperRef}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                >
                {projectsList.map((project, index, slidesPerView) => (
                  <SwiperSlide key={index} className="container flex justify-center">
                    <div class = "flex flex-col justify-center items-center">
                      {project.component}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
        </div>
    )
}

export default Projects;