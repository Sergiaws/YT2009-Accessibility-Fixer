// ==UserScript==
// @name         Yt2009 Accessibility Fixer
// @version      0.1.0
// @description  This script improves accessibility on the YouTube 2009 frontend (yt2009.giabs.ovh)
// @author       Sergiaws
// @match        *://yt2009.giabs.ovh/*
// @grant        none

// ==/UserScript==

(function() {
    // Your code here
    //for using inside the webpage instead of using this as a userscript, remove this if/else and use window.onload instead
    if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive"){
        start();
    }else{
        document.addEventListener("DOMContentLoaded", start, false);
    }
    function start() {
        // Get all divs with the class 'video-long-title'
        var divs = document.getElementsByClassName('video-long-title');

        // Iterate over each div
        for (var i = 0; i < divs.length; i++) {
            var currentDiv = divs[i];

            // Find the first anchor (link) element within the div
            var anchor = findFirstAnchor(currentDiv);

            // Check if an anchor element was found
            if (anchor) {
                // Get the text content of the anchor
                var anchorText = getAnchorText(anchor);

                // Create a new span element with role 'heading' of level 2 (h2)
                var spanHeading = createHeadingSpan();

                // Set the text content of the new span
                setSpanText(spanHeading, anchorText);

                // Clear the text content of the anchor
                clearAnchorText(anchor);

                // Append the new span inside the anchor
                appendSpanToAnchor(anchor, spanHeading);
            }
        }

        // Set controls attribute for the first video element
        var videos = document.getElementsByTagName('video');
        if (videos.length > 0) {
            videos[0].setAttribute('controls', 'controls');
        }
    }

    // Function to find the first anchor within an element
    function findFirstAnchor(element) {
        var childNodes = element.childNodes;
        for (var j = 0; j < childNodes.length; j++) {
            var childNode = childNodes[j];
            if (childNode.tagName && childNode.tagName.toLowerCase() === 'a') {
                return childNode;
            }
        }
        return null;
    }

    // Function to get the text content of an anchor
    function getAnchorText(anchor) {
        return anchor.textContent || anchor.innerText;
    }

    // Function to create a new span element with role 'heading' of level 2
    function createHeadingSpan() {
        var span = document.createElement('span');
        span.setAttribute('role', 'heading');
        span.setAttribute('aria-level', '2');
        return span;
    }

    // Function to set the text content of a span
    function setSpanText(span, text) {
        span.textContent = text;
    }

    // Function to clear the text content of an anchor
    function clearAnchorText(anchor) {
        anchor.textContent = '';
    }

    // Function to append a span inside an anchor
    function appendSpanToAnchor(anchor, span) {
        anchor.appendChild(span);
    }
})();
