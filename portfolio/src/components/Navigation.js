// Navigation bar
import "./Navigation.css";
import React, {useState, useEffect} from "react";



function NavigationButton() {
    return (
        <button class = "px-4 py-1 text-sm text-slate-900 font-semibold rounded-full border border-slate-200 hover:text-white hover:bg-slate-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
            button
        </button>
    )
}
function Navigation() {
    return (
        <div class="flex flex-row p-2">
            <NavigationButton/>
            <NavigationButton/>
            <NavigationButton/>
        </div>
    )
}

export default Navigation;