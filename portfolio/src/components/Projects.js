import "./Projects.css";
import React, {useState, useEffect} from "react";

function Projects() {
    const titleText = "Check out some fo the cool things I've done";
    return(
        <div class = "container mx-auto">
            <h2 class = "text-4xl text-white">{titleText}</h2>
        </div>
    )
}

export default Projects;