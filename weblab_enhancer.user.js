// ==UserScript==
// @name			TI1220 WebLab Enhancer
// @namespace		TI1220 WebLab Enhancer
// @description		Stretch the code form to full screen and use key bindings to complete your assignments within less time
// @version			1.0
// @date			2012-02-23
// @author			Dimitri Slappendel
// @include			http://department.st.ewi.tudelft.nl/weblab/submission/*
// @include			http://department.st.ewi.tudelft.nl/weblab/assignment/*
// ==/UserScript==


// First let's add some custom CSS to stretch the code form

GM_addStyle((<><![CDATA[

ul.nav li a.navigate, a.brand {
    /* Nav links */
    padding:5px !important;
}

a.brand {
    /* WebLab logo */
    padding-left:25px !important;
}

div.container {
    /* A container */
    width:100% !important;
    margin:0 !important;
    padding:0 !important;   
}

body > div.container {
    /* The main container */
    position:absolute;
    top:30px;
    bottom:0;
    left:0;
    right:0;
    overflow:auto;
}

div.span9 {
    /* Progress menu */
    float:right !important;
    padding-right:5px !important;
}

div.page-header {
    /* Page header */
    padding-left:5px !important;
    padding-right:5px !important;
    position:absolute;
    top:25px;
    left:0;
    right:0;
    height:20px;
    border:0 !important;
}

div.row {
    /* Page content */
    padding-left:5px;
}

div.question {
    /* Text */
    position:absolute;
    top:90px;
    width:280px;
    max-height:99999px !important;
    margin:0;
    left:0;
    bottom:0;
}

div.span8 {
    /* Code content */
    width:auto !important;
    position:absolute;
    top:90px;
    left:295px;
    right:7px;
    bottom:0;
}

div.span8 input[type="submit"] {
	/* Buttons */
    position:absolute;
    bottom:150px;
}

input#save {
	/* Save and compile button */
    left:0;
}
div.span8 input[value="Run Your Test"] {
	/* Run your test button */
    left:140px;
}

div.span8 input[value="Run Specification Test"] {
	/* Run specification test button */
    left:250px;
}

div.span8 input[value="Submit"] {
	/* Submit button */
    left:427px;
}

div.span8 input[value="Reset"] {
	/* Reset button */
    right:0;
}

div.span8 p input[type="submit"] {
	/* Multiple choice submitter */
	position:relative;
	bottom:0;
	left:0;
}

div.tabs, div.aceEditor {
    /* Code form */
    position:absolute !important;
    left:0;
    top:0;
    right:0;
    bottom:0px;
    width:100% !important;
    height:auto !important;
}

div.tabs {
    /* Tabs */
    bottom:180px;
    min-height:0 !important;
}

div.compilerOutput {
    /* Compiler output */
    position:absolute;
    left:0;
    right:0;
    bottom:0;
}

div.span9 ul.dropdown-menu {
	/* Right dropdown menu out of screen fix */
	left:-205px;
}

]]></>).toString());


// Then add some key bindings to enhance your experience with WebLab (based on Chrome script of JW from https://github.com/jw-moonshine/weblab-chrome-extension/)

(function ()
{
	//Redirect jQuery
	var unsafe = window;
	try { unsafe = unsafeWindow; }
	catch (e) { }
	var $ = unsafe.$;

	if (! $)
	{
		//alert("WebLab Enhancer couldn't be loaded properly: jQuery is not available.");
		return;
	}

	$(document).keydown(function(e)
	{
		var ctrlKey = e.ctrlKey || e.metaKey; // Control for Win/Linux and Command for Mac
		var altKey = e.altKey;
		var shiftKey = e.shiftKey;
		
		switch(e.keyCode)
		{
			case 82: //R
				if (ctrlKey && shiftKey) //Ctrl+Shift+R: Run specification test
				{
					$("div.span8 input[value='Run Specification Test']").click();
					return false;
				}
				else if (ctrlKey) //Ctrl+R: Run your test
				{
					$("div.span8 input[value='Run Your Test']").click();
					return false;
				}
			case 83: //S
				if (ctrlKey && shiftKey) //Ctrl+Shift+S: Submit
				{
					$("div.span8 input[value='Submit']").click();
					return false;
				}
				else if (ctrlKey) //Ctrl+S: Save and compile
				{
					$("input#save").click();
					return false;
				}
		}		
	});
}) ();