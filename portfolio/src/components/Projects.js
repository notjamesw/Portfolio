import "./Projects.css";
import React, {useState, useEffect} from "react";

function Project(props) {
    const name = props.name
    const imgURL = props.imgURL
    const description = props.description
    const link = props.link
    return(
        <div class = "rounded-lg border-slate-200 border-4 mb-12 lg:pb-0">
            <div class = "h-56 w-80 bg-white rounded-t-sm">
                Image placeholder
            </div>
            <div class = "p-2 h-40 w-80 bg-white">
                {name}
            </div>
        </div>
    )
}

function Projects() {
    const titleText = "Check out some of the cool things I've done";
    return(
        <div id = "Projects" class = "container mx-auto mb-10">
            <h2 class = "pl-0 pt-8 pb-12 m-6 text-4xl font-medium text-slate-100">
                {titleText}
            </h2>
            <div class = "container mx-auto place-items-center lg:grid lg:grid-cols-3">
                <Project name = "Racket Web Interpreter"/>
                <Project name = "Flappy Bird AI"/>
                <Project name = "Zen Garden Game"/>
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