// Navigation bar
import "./Navigation.css";
import React, {useState, useEffect} from "react";



function NavigationButton(props) {
    const name = props.name;
    const onScroll = props.onScroll;
    const divRef = props.divRef;

    return (
        <div class = "ml-1 mr-1">
            <button 
                onClick={(e)=> onScroll(e, divRef)}
                className = "px-4 py-1 text-medium text-slate-900 font-semibold rounded-full border-2 border-slate-200 hover:text-white hover:bg-slate-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                {name}
            </button>
        </div>
    )
}

function Navigation(props) {
    const onScroll = props.onScroll;
    const aboutMeDivRef = props.aboutMeDivRef;
    const projectsDivRef = props.projectsDivRef;
    const contactDivRef = props.contactDivRef;
    return (
        <div class="flex flex-row p-2 justify-end mr-2">
            <NavigationButton 
                name = "About Me" 
                onScroll = {onScroll}
                divRef = {aboutMeDivRef}/>
            <NavigationButton 
                name = "Projects"
                onScroll = {onScroll}
                divRef = {projectsDivRef}/>
            <NavigationButton 
                name = "Contact"
                onScroll = {onScroll}
                divRef = {contactDivRef}/>
        </div>
    )
}

export default Navigation;