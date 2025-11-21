    // version: 2002-3-26 7pm

	// Declare global variables
	var layer = new String();
	var style = new String();
	var hidden = new String();
	var visible = new String();
	var openbrace = new String();
	var closebrace = new String();
	var visibleMenus = new Array();


// To make work for netscape
//    Once I observed a problem in netscape with immediately executed assignments
//      and statements not being executed when a page occurs in a popup window
//      and the page is visited again by reinvoking the link to that page in the main window
//      while it is still loaded
//  ????????????? haven't been able to reproduce this problem today
//    If problem is real, might have to
//    move all global variable assignments and initialization into a function
//    that is called - when??? (in main page right after universal.js is included??
//    or have test in every function here to make sure ok????)
//
//    The showCaption function needs work for netscape
//    When replacing applets with slideshows, the slide size will only be set correctly
//      in netscape if it was set in the invoking file before drawapplet is called
//      (perhaps we could fix this by using document.write to recreate the contents of the
//       slideshow layer if need be...)

// Set the layer and style variables.
checkBrowser();

//****************************************************************
// checkBrowser
//
// used to set global variables for specific browser 
// (in)compatability
//
// PARAMETERS: None
//
// RETURNS: Nothing
//****************************************************************
	// Set the layer and style variables.
	function checkBrowser() {
		if (document.layers) { // NS 4
			layer = ".layers";
			style = "";
			hidden = "hide";
			visible = "show";
			openbrace = "['";
			closebrace = "']";
		}
		else if (document.all) { // MSIE
			layer = ".all";
			style = ".style";
			hidden = "hidden";
			visible = "visible";
			openbrace = "['";
			closebrace = "']";
		}
		else { // Gecko (NS 6, Mozilla)
			layer = ".getElementById";
			style = ".style";
			hidden = "hidden";
			visible = "visible";
			openbrace = "('";
			closebrace = "')";
		}
	}

//****************************************************************
// splashScreen
//
// used to display a splash pic for a certain amount of time 
// (3 secs) then replace with content
//
// Parameters:
// pictureId - div id (name) of splash pic
// contenId - div id (name) of content
//****************************************************************
function splashScreen(pictureId, contentId) {
   togglePic(pictureId);
   setTimeout("togglePic('"+pictureId+"')", 3000);
	setTimeout("changeState('"+contentId+"', 'visible')", 3200);
}


//****************************************************************
//changetoVisible
//****************************************************************

    function changeToVisible(layerRef)
      { doChangeVisibility(layerRef,'visible',false);
      }

    function persistentChangeToVisible(layerRef)
      { doChangeVisibility(layerRef,'visible',true);
      }

    function changeVisibleToHiddenUnlessPersistent()
      { doChangeVisibility(null,'hidden',false);
      }

    var changeVisibilityActiveElt = null;
    var changeVisibilityPersistent = false;

    function doChangeVisibility(layerRef,visibility, persistent)
      { 
	var elt =eval("document" + layer + "['" + layerRef + "']");
	// alert(" ddd document" + layer + "['" + layerRef + "']");
	// alert('dcv ' + layerRef + visibility + persistent + elt);
	if (elt == changeVisibilityActiveElt && visibility == 'visible' && !persistent)
	    return; // don't change persistence in this case
        if (changeVisibilityActiveElt && (elt && elt != changeVisibilityActiveElt || !changeVisibilityPersistent))
	  { if (style)
	        changeVisibilityActiveElt.style.visibility = 'hidden';
	    else
	        changeVisibilityActiveElt.visibility = 'hidden';
	    changeVisibilityActiveElt = null;
	  }
	if (!elt)
	  return;
	if (visibility == 'visible')
	  { changeVisibilityActiveElt = elt;
	    if (style)
	        changeVisibilityActiveElt.style.visibility = 'visible';
	    else
	        changeVisibilityActiveElt.visibility = 'visible';
	    changeVisibilityPersistent = persistent;
	  }
      }

function goToInFrame(frameUrl,contentUrl)
  { // SetCookie('content',makeAbsolute(contentUrl),null,'/');
    location.href=frameUrl + "?" + makeAbsolute(contentUrl);
  }

function writeContentFrame()
  { var contentUrl = location.search.substring(1);
    document.write("<frame src='"+contentUrl+"'>");
    // alert("<frame src='"+contentUrl+"'>");
  }

function contentFrame(destWindow) { 
	var contentUrl = location.search.substring(1) + location.hash;
	destWindow.location = contentUrl;
}

function makeAbsolute(url)
  {
   if (url.indexOf('/') != 0 && url.indexOf('file:') != 0 && url.indexOf('http:') != 0 && url.indexOf('https:') != 0)
     { var loc = location.pathname;
       var ix = loc.lastIndexOf('/');
       var ix2 = loc.lastIndexOf('\\');
       if (ix2 > ix)
           ix = ix2;
       var prefix = loc.substring(0,ix);
       if (prefix.indexOf('/')==0)
	   prefix = prefix.substring(1);
       url = '/' + prefix + '/' + url;
     }
    return url;
  }

//****************************************************************
//functions from windowplacingtable
//****************************************************************
 
///ONLY TOGGLE PICTURES///
//****************************************************************
// togglePic
//
// toggle a picture on or off (very close in functionality and 
// implementation to changeState)
//
// PARAMETERS: picture_id - div id of picture
//
// RETURNS: Nothing
//****************************************************************

	function togglePic(picture_id){
		
		var thisPicture;

		if (!eval("document" + layer + openbrace + picture_id + closebrace))
			return;

		thisPicture = eval("document" + layer + openbrace + 
								 picture_id + closebrace + style);

		if ( thisPicture.visibility == visible) {
			// it was ON, now turn it OFF
			thisPicture.visibility = hidden;
		} else {		
			// it was OFF, now turn it ON
			thisPicture.visibility = visible;
		}
	}

function valueWindow(file,window) {
      msgWindow=open(file,window,'resizable=no,scrollbars=1,width=500,height=400,left=185,top=85,border=2');

              if (msgWindow.opener == null) msgWindow.opener = self;

              msgWindow.focus();


//clearID=msgWindow.setTimeout("self.close()",5000)//

                     }
                      
    var visibleMenus = new Array();

    function hideVisibleMenus()
      { for (var i = 0; i < visibleMenus.length; i++)
          changeState(visibleMenus[i],'hidden');
        visibleMenus.length = 0;
      }

   // Take the state passed in, and change it.
	function changeState(layerRef, state) {
		if (!eval("document" + layer + openbrace + layerRef + closebrace))
			return;

		if (state == 'visible') {
			hideVisibleMenus();
			visibleMenus[visibleMenus.length] = layerRef;
			state = visible;
		}
		else
			state = hidden;

		eval("document" + layer + openbrace + layerRef + closebrace + style +
		     ".visibility = '" + state + "'");
	}

// the following can be used to change the color (or other style attributes)
//  of an element upon mousing over it.  The change will remain until
// this function is called again when something else is moused over.
// Invoke it as follows: onmouseover = "changeClass(this,'mouseOverClassName')"
    

var changeClassSavedElt = null;
var changeClassSavedClassName = '';
function changeClass(elt, className){
      if (changeClassSavedElt){
		      changeClassSavedElt.className = changeClassSavedClassName;
	      }
      changeClassSavedElt = elt;
      changeClassSavedClassName = elt.className;
      elt.className = className;
    }



// functions from silverpages/cookiefcns.js
//  (This file also included other cookie functions that have been included
//   in universal.js from slideshow8-23.js - see below)
	function setSitemapPref(choice)
	  { SetCookie("SitemapPreference",choice,30*24*60,"/");
	    	  }

	function setIndexPref(choice)
	  { SetCookie("IndexPreference",choice,30*24*60,"/");
	    	  }

// The following portion was copied into this file from slideshow8-23.js
// That file included the following cookie functions that also appear
//  in other files
	function getCookieOrDefault(name,defaultValue)
	  { var val = GetCookie(name);
	    if (val != null)
	       return val;
	    else
		return defaultValue;
	  }

        function GetCookie (name)
        {
                var arg = name + "=";
                var alen = arg.length;
                var clen = document.cookie.length;
                if( (document.cookie == null) || (document.cookie.length == null))
                {
                        return null;
                }
                var i = 0;
                while (i < clen)
                {
                        var j = i + alen;
                        if (document.cookie.substring(i, j) == arg)
                                return getCookieVal (j);
                        i = document.cookie.indexOf(" ", i) + 1;
                        if (i == 0) break; 
                }
                return null;
        }
		
        function SetCookie (name,value,minutesTilExpires,path,domain,secure)
          {
             var today = new Date();
             var expires = new Date();
             expires.setTime (today.getTime()
	               + (minutesTilExpires * 60 * 1000));
	     // The following is intended to normalize the representation
	     //  of the default path for better behavior
	     //  (I believe that the problem was caused by inconsistent
	     //   inclusion of the final '/' in a path among different
	     //   ways of setting cookies; unfortunately, I didn't record
	     //   a good description of the problem at the time that I
	     //   added this solution)
	     //  Older versions of SetCookie do not include this code
	     if (!path)
	       { path = location.pathname;
	         path = path.substring(0,path.lastIndexOf('/')+1);
		 // alert("setting cookie path to [" + path + "]");
	       }
             document.cookie = name + "=" + escape (value) +
                ((expires) ? "; expires=" + expires.toGMTString() : "") +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                ((secure) ? "; secure" : "");
          }

        function getCookieVal (offset)
        {
                var endstr = document.cookie.indexOf (";", offset);
                if (endstr == -1)
                        endstr = document.cookie.length;
                return unescape(document.cookie.substring(offset, endstr));
        }

		function GetCookieX(name)
		// changes null to empty string
		// used to delete cookie after getting
		  { var c = GetCookie(name);
		    // SetCookie(name,"",0);
			 if (c == null)
				return "";
			 else
		      return c;
		  }


//////////////////////////////
// hard-wired element names:
// adBanner loadingmsg  (caption??)
// highlayer... step...  (generated here)
// drawApplet (in jpeg and other stuff and slideshowAfter... and fixAppletSize)
//   drawApplet is a generated name, but the name generated is changed
//   in the html file occasionally (to handle multiple applets on a page)
//  draw instr
//  appletdiv slideshowatapplet (generated here)
//  helpbox

// The case of multiple applets on a page needs a lot of work
//  if replacing applets with slideshows or images is to work
//////////////////////////////////////////////////////////////////////
//  slideshow8-22.js
//    changed instructions to note existence of replayWhenLoaded
//  slideshow8-22.js
//    so far, only minor change to comments from 7-30
//  slideshow7-30.js
//    Added code to scroll the step list during the slideshow - not currently being used
//    It now first looks for the step list (to be highlighted) in another frame in the same window
//      whose name is stepListFrame (if there is such a frame, it assumes the step list is there)
//      In that case, if the frame stepListFrame sets a variable showFrameDefault to a url,
//       then when the slideshow is done, the slideshow frame will go to that url
//       (provided that callWhenSlideshowDone is not set - callWhenSlideshowDone preempts if set)
//    If the variable pauseAfterChange is set to true, the slide will not be changed at the same
//      time that the caption changes - it will wait until the next time interval has ended.
//    There is a new function startRotate that attempts to avoid starting a slideshow while another
//      one is in progress, for use if one wants to have a button to start slideshows (not currently used)
//  slideshow3-31.js
//    changed to start with no highlighting instead of with step 1
//      in the case where  no step number is initially given in setupSlides
//    added openPopupC, which passes its final argument directly to the window opener
//      function (it first prepends some parameters that it sets for all windows
//      namely resizable (it also has border=2, left over from an earlier window
//      opening functions, but I don't see the border feature listed in my documentation,
//      so setting it might not do anything.
//      Typically, this final argument will be of the form
//       "width=500,height=300,left=100,top=50"
//      One can also add scrollbars, eg, with
//       "width=500,height=300,left=100,top=50,scrollbars"
//      Added a way to move the summary window when the popup is opened
//         To use this call setDesiredLocation(left,top) in the head of the summary file
//         The window will not actually be moved until a popup is first opened
//         with openPopup, openPopupB, or openPopupC
// drawfunctions3-31.js
//    added code to show captions from the gdraw file (when they don't look like step numbers)
//       by calling showCaptions from the slideshow file
//    blankTime feature disabled because of awkward interactions (don't think it's wanted)
//       Set the parameter showCaptionCaptions = true to enable this
//        
//  slideshow3-30.js
//      added code to handle case where the summary window does not directly
//        open the popup window, but instead there is an intermediate popup window
//  slideshow3-27.js
//      added instructions
//      added parameters to control speed of slideshow, and delay until window closes
//         timePerSlide, timeAfterLastSlide
//         (see step (4) below for setting these parameters)
//      changed highlightStep to deal with case where highlighting was not set up
//         in the summary file, or the slideshow or movie window was not opened as a popup
//  drawfunctions3-27.js
//      [blankTime has been disabled in 3-31]
//      added parameter blankTime to control amount of time highlighting is off
//         between steps (defaults to 0 if parameter is omitted)
//         I recommend not setting this parameter, letting it default to 0
//  slideshow3-25.js - adds function openPopupB
//      fixes parameter order and automatically chooses window name
//      Adds a new parameter that can be set in the summary file
//            windowPerMovie
//////////////////////////////////////////////////////////////////////////
/*  INSTRUCTIONS AND TEMPLATES
  For slideshows and movies, for the summary file, follow steps (1),(2),(3),(9).
  For slideshows, for the slideshow file, follow steps (1),(4),(8),(10)
  For movies, for the movie file, follow steps (5),(6),(7),(8)
============================================================================
(1) For summary and slideshow files, put in head of file you are working on:
-----------------------------------------------------------------
  <SCRIPT language="javascript" src="../nickb/slideshow3-27.js"></SCRIPT>
  <SCRIPT language="javascript">
      script statements that go in head
  </SCRIPT>

============================================================================
(2) To open a window for a slideshow or movie when a link is clicked on:
-------------------------------------------------------------------
    in head of summary file, in script section:
        windowPerMovie=true;  // or false, as desired
	setDesiredLocation(left,top); // use this if want to move summary window when popup is opened
    in body of summary file, where you want the link to appear:
        <a href="javascript:openPopupC('movie.htm','width=500,height=300,left=100,top=50')">text</a>
    or
        <a href="javascript:openPopupC('movie.htm','width=500,height=300,left=100,top=50,scrollbars')">text</a>
    if you want scrollbars on the window

============================================================================
(3) To set up a summary file for highlighting of steps:
---------------------------------------------------
    in head of summary file:
        <STYLE>
        .unhighlighted {background-color:#cc0066; color:#e3e5ee; font-weight:normal}
        .highlighted {background-color:red; color:yellow; font-weight:bold}
	</STYLE>
    in body of summary file, various possibilities, for each step:
    (the formatting outside of the script is up to you - these are just examples)
	in table, step numbers in separate column, not highlighted:
            <tr><td>7.</td><td><script>stepa(7,'Step description')</script></td></tr>
	in table, step numbers highlighted, not in separate column:
            <tr><td><script>stepa(7,'7.  Step description')</script></td></tr>
	in table, step numbers highlighted in separate column:
            <tr><td><script>stepa(7,'7.')</script></td><td><script>stepa(7,'Step description')</script></td></tr>
	or in <UL> list:
            <LI><script>stepa(6,'6: Front door and entrance path')</script>
    Check the step descriptions to be sure that any apostrophes inside of
    single quotes are escaped with a backslash (that is, preceded by a backslash,
    as in 'this is John\'s book')
============================================================================
(4) To set up a slideshow file for highlighting of steps
    (also use this if no highlighting is wanted):
--------------------------------------------------------
    in head of slideshow file, in script section, for example:
         setupSlides(1,"pa1.jpg",2,"pa2.jpg","pa3.jpg",3,"pa4.jpg",5,"pa5.jpg");
	 // if highlighting is not desired, the step numbers can be omitted
	 timePerSlide = 2000;
	 timeAfterLastSlide = 2000;
	    // after last slide put up, waits timePerSlide+timeAfterLastSlide, then closes
	    // window
    in body tag of slideshow file, add onload (A MOVIE FILE IS DIFFERENT HERE):
         <BODY .....   onload="rotate()" ... >
    
============================================================================
(5) To set up a movie file to play movies using gdraw, without highlighting:
-----------------------------------------------------------------------
    in head of movie file:
        <SCRIPT language="javascript" src="../nickb/slideshow3-27.js"></SCRIPT>
        <SCRIPT language="JavaScript" src ="../nickb/drawfunctions3-27.js"> </SCRIPT>
	<SCRIPT>
	//////// PARAMETERS TO SET /////////////
	inputFileName = "northgate.gdraw";
	replayDelay = 5;  // increasing this number slows the replay
	showImageAfterReplayDone("",2000,5000); // file name of photo, wait before photo, how long to show photo
	// To get self-closing of window without a final image, put an empty file name,
	//    in the parameters to showImageAfterReplayDone as in the above example
	SetDrawingSize(452,302);
	supplyCaptions = false;    // CHANGE TO true for highlighting, but only
			           // if body tag contains onload=updateCaption()
				   //  (see below)
	showCaptionCaptions = false;  // change to true if there are captions in the gdraw file
	                              // that you want to display below the movie
				      //  You also need a place to put them
				      //  If there's a loadingmsg (see (8)) that will suffice
	replayWhenLoaded = true;  // set to true to get replay to start automatically
	                          // if it's false, then call requestReplay() to start the replay
	////////////////////////////////////////

	forReplay = true;
	resizeIfNecessary = false;   // this feature is not being maintained actively
				     // so it's probably best to leave this false
	</SCRIPT>

    in body of movie file, where the applet should appear:
        <SCRIPT>
        drawapplet();
        </SCRIPT>

============================================================================
(6) To add highlighting to a movie file (using gdraw):
------------------------------------------------------
    Change the supplyCaptions parameter in the head of the movie file:
	supplyCaptions = true;
    in body tag of movie file, add onload (A SLIDESHOW FILE IS DIFFERENT HERE):
         <BODY .....   onload="updateCaption()" ... >
	 // if supplyCaptions is true, updateCaption is needed in order for the movie to play

============================================================================
(7) Changes to the .gdraw file for highlighting:
------------------------------------------------------
    add lines of the form
       Step 1
       Step 3
    Steps can be in any order and repeated or omitted.
    (Currently, a line in the gdraw file
          Step 4
       is equivalent to a line
          Caption Step 4
       Captions will now be ignored as long as they don't start with the string 'Step'
          (in any combination of upper or lower case))

============================================================================
(8) To set up a slideshow or movie file to show a loading message:
--------------------------------------------------------------
    in body of movie file, where you want the message:
       <div id="loadingmsg" style="color:white; position:relative; visibility:visible" align=center>
       <ilayer id="loadingmsglayer" visibility="show">
       A slideshow is loading.
       </ilayer> 
       </div>  
============================================================================
(9) Change to summary file when changing slideshow file to show loading message:
-------------------------------------------------------------------------------
    in call to openPopupB, make sure window is big enough for loading message to be seen.

============================================================================
(10) To preload slides for slideshows - recommend doing in both summary and slideshow file:
----------------------------------------------------------------------------------------
    in summary file:
        (preloading in summary file doesn't use this js file; see what Randy has done)
    in movie file, at end of body:
       <script>
       preloadImages();
       </script>

==============================================================================
END OF INSTRUCTIONS AND TEMPLATES

==============================================================================
NOTE ABOUT HANDLING OF CAPTIONS
By captions here we mean changing messages that are displayed in some
location, with one message replacing the next in that location.
In the case of the gdraw movies, these are not available ahead of time,
so we cannot hard-code them into the html.  Thus, even for Netscape,
we must be able generate them on the fly.  (In Netscape 4x, this can be
done by writing into a layer.)

It is often convenient to display captions in the same place as a loading message.
Thus the handling of the loading message has become part of the handling of
the captions.  It is assumed that the loading message will appear when the page
loads, without any script intervention.  The script only needs to turn off the message.

In older code, there is only a single caption/loadingmsg area, normally a div with
id 'loadingmsg', though there is also provision for recognizing an id whose name
is specified by the global variable captionAreaName, by default with the value 'caption'.
If there is such a div, this is used.  Otherwise a div with id loadingmsg is looked for.
In the older code, if any captions are displayed they come from the gdraw file (for movies)
or from the parameters of setupSlides (for slideshows).
The displaying of these captions is enabled for slideshows by setting
showSetupCaptions true.

The function rotate (for slideshows)
starts by displaying an empty caption.  This turns off the loadingmsg at
the start of the slideshow, and turns off any final caption at the end of the slideshow.

There is another possible source of captions, namely the step descriptions specified as
parameters to stepa (or to stepb).

Newer code deals with captions in a more flexible manner.
(Currently only implemented for slideshows.)
The loadingmsg will be automatically turned off when a slideshow starts if it appears
in a div with id 'loadingmsg'.  Otherwise, the name of the div must be specified by
calling setLoadingMessageDiv(divname).

To display the captions specified as parameters to setupSlides, call
setSetupCaptionDiv(divname), specifying the name of the div in which they are to be displayed.
It is best to create this div (and all caption and loading message divs)
with the function writeMessageDiv, which can be adjusted
to write appropriate HTML for whatever browsers are being supported.

To display captions specified as parameters to stepa or stepb,
call setStepCaptionDiv(divname,i) where the optional parameter i is 1 or 2 to specify
which parameter of stepb to display.

More than one type of caption can be displayed by calling more than one of
  setSetupCaptionDiv(divname)
  setStepCaptionDiv(divname,1)
  setStepCaptionDiv(divname,2)
specifying different div names.

When it comes time to display captions, if any of the above set... functions has been
called then the specified captions are displayed.  Otherwise, the older algorithm is
used.  If any of the set... functions has been called and showSetupCaptions is also true
(this should be avoided) then it does both.

If any of the set.. functions have been called (including the setLoadingMessageDiv function), then
when rotate is called it empties the captions in any divs
specified by the above calls (including the loading message).
If none of the above calls have been made, it follows the old behavior.
If any of the above calls have been made and showSetupCaptions is also true
(this should be avoided - it's too messy to mix the old and the new styles)
then it does both.


*/
//////////////////////////////////////////////////////////////////////////
var windowPerMovie = true;
    //////////////////////////////////////////////////////////////////////////
    // windowPerMovie  only has an effect if there is more than one
    //        slideshow/movie invoked from a summary file.  If it is true, different
    //        movies will use separate window names.  If false, they will share the same
    //        name.  I believe this will only make a difference if the user
    //        starts a movie while a window for a different one (from the same
    //        summary) is still open.  If windowPerMovie is false, in that case
    //        the same window will be used, with whatever size it already has.
    //        If windowPerMovie is true, a new window will be opened.
    //////////////////////////////////////////////////////////////////////

var msgWindow;
var moveWindow = false;
var showFrameDefault = '';
if (top.frames.stepListFrame)
  { showFrameDefault = top.frames.stepListFrame.showFrameDefault;
  }

function setDesiredLocation(left,top)
  { moveWindow = true;
    desiredLeft = left;
    desiredTop = top;
  }

function maybeMoveWindow()
  { if (moveWindow)
     { moveTo(desiredLeft,desiredTop);
       moveWindow = false;
     }
  }

///////////////////////////////////////////////////////////////////////
// openPopup
///////////////////////////////////////////////////////////////////////
// This replaces newWindow, with parameters to set the location, width and height
//  of the popup window
///////////////////////////////////////////////////////////////////////
function openPopupC(file,windowFeatures) {
       maybeMoveWindow();
       var windowName;
       var windowNameArg='';
       // allow a 2nd argument that is a window name
       //  that is openPopupC(file,windowName,windowFeatures)
       if (arguments.length == 3)
          { windowNameArg = arguments[1];
	    windowFeatures = arguments[2];
	  }
       if (windowPerMovie)
           windowName = file;
       else
           windowName = location.pathname;
       var ix = windowName.lastIndexOf('/');
       var ix2 = windowName.lastIndexOf('\\');
       if (ix2 > ix)
           ix = ix2;
       if (ix >=0)
           windowName = windowName.substring(ix+1);
       ix = windowName.indexOf('.');
       if (ix > 0)
           windowName = windowName.substring(0,ix);
       windowName = windowName.replace(/\W/g,'_');
       windowName = windowName + "Popup";
       if (windowNameArg != '' && windowNameArg != 'window2')
           windowName = windowNameArg;
       if (windowFeatures)
           windowFeatures = "," + windowFeatures;
       else
           windowFeatures = '';
       msgWindow=open(file,windowName,'resizable,border=2' + windowFeatures);
       onfocus=bringBackPopup;
              if (msgWindow.opener == null) msgWindow.opener = self;
              msgWindow.focus();
                     }

function openPopupB(file,width,height,left,top) {
       maybeMoveWindow();
       var windowName;
       var windowNameArg='';
       // handle old arguments, that included a window name:
       if ((typeof width) != "number" && arguments.length == 6)
          { windowNameArg = arguments[1];
	    width = arguments[2];
	    height = arguments[3];
	    left = arguments[4];
	    top = arguments[5];
	  }
       if (windowPerMovie)
           windowName = file;
       else
           windowName = location.pathname;
       var ix = windowName.lastIndexOf('/');
       var ix2 = windowName.lastIndexOf('\\');
       if (ix2 > ix)
           ix = ix2;
       if (ix >=0)
           windowName = windowName.substring(ix+1);
       ix = windowName.indexOf('.');
       if (ix > 0)
           windowName = windowName.substring(0,ix);
       windowName = windowName.replace(/\W/g,'_');
       windowName = windowName + "Popup";
       if (windowNameArg != '' && windowNameArg != 'window2')
           windowName = windowNameArg;
       msgWindow=open(file,windowName,'resizable=yes,scrollbars=0,width='+width+',height='+height+',left='+left+',top='+top+',border=2');
       onfocus=bringBackPopup;
              if (msgWindow.opener == null) msgWindow.opener = self;
              msgWindow.focus();
                     }

function openPopup(file,windowName,left,top,width,height) {
       maybeMoveWindow();
       msgWindow=open(file,windowName,'resizable=yes,scrollbars=0,width='+width+',height='+height+',left='+left+',top='+top+',border=2');
       onfocus=bringBackPopup;
              if (msgWindow.opener == null) msgWindow.opener = self;
              msgWindow.focus();
                     }

function bringBackPopup()
  { setTimeout("if (!msgWindow.closed) msgWindow.focus()",500);
  }

///////////////////////////////////////////////////////////////////////
// Create and Show a Slideshow
///////////////////////////////////////////////////////////////////////

var adImages = new Array();
var preloadedImages = new Array();
var imageStep = new Array();
var imageCaption = new Array();
var imgCt;

///////////////////////////////////////////////////////////////////////
//  The following parameters can be set in the movie file,
//   after this file has been loaded.
//  showSetupCaptions must be set true to show captions that are specified
//    as parameters to setupSlides (for example, Randy's cycle captions)
//  (currently disabled) showStepDescriptionCaptions can be set true to display the step
//    descriptions below the slide
//  show StepTitleCaptions can be set true to display short titles
//     below the slide, if they are available
///////////////////////////////////////////////////////////////////////
var showSetupCaptions = false;
var showStepDescriptionCaptions = false;
var showStepTitleCaptions = false;
// var highlightColor = '66FFFF';
// var highlightBackground = 'cc0066';
// var highlightWeight = 'normal';

///////////////////////////////////////////////////////////////////////
// setupSlides
///////////////////////////////////////////////////////////////////////
// Call this function in the movie file
// Give it a list of parameters
//   for example setupSlides(1,'slide1.jpg','slide2,jpg',2,'slide3.jpg')
//  would create a slide show with 3 images, the first two associated with step 1 and the third with step 2
//  You can also give it caption parameters
//   for example setupSlides('caption:First cycle',1,'slide1.jpg','slide2,jpg',2,'slide3.jpg',
//                           'caption:Second cycle',1,'slide4.jpg','slide5,jpg',2,'slide6.jpg')
//  would use the caption 'First cycle' for the first 3 slides and 'Second cycle' for the remaining slides
//   (The caption feature was intended for the pedestrial sequence)
///////////////////////////////////////////////////////////////////////
function setupSlides() 
  { imgCt = 0;
    var currentCaption = '';
    var stepNumber = 0;
    for (var i = 0; i < arguments.length; i++)
      { var a = arguments[i];
	if ((typeof a) == "number")
	    stepNumber = a;
	else if (a.toLowerCase().indexOf('caption:')==0)  // this is for something Randy wanted
	  { currentCaption = a.substring(8);
	  }
	else
	  { adImages[imgCt] = a;
	    imageStep[imgCt] = stepNumber;
	    imageCaption[imgCt] = currentCaption;  // this is for something Randy wanted
	    imgCt++;
	  }
      }
    // thisAd = -1
    thisAd = 0
    onunload = highlightStep;
  }

function preloadImages()
  { var i;
    for (i = 0; i < imgCt; i++)
      { preloadedImages[i] = new Image();
	preloadedImages[i].src = adImages[i];
      }
  }

///////////////////////////////////////////////////////////////////////
// rotate
///////////////////////////////////////////////////////////////////////
var callWhenSlideshowDone = null;
var timePerSlide = 2000;
var timeAfterLastSlide = 2000;
var slideshowGoing = false;
function startRotate()
  {
	if (slideshowGoing)
		return;
	thisAd=0;
	slideshowGoing = true;
	rotate();
  }

var pauseAfterChange = false;

var manualMode = false;
function manualToSlide(slidenum) {
	// alert('man ' + slidenum);
	manualMode = true;
	manualSlide = slidenum;
	thisAd = manualSlide;
	rotate(true);
	// toSlide(slidenum);
}

function manualOut(slidenum) {
	if (manualSlide == slidenum) {
		manualMode = false;
		// setTimeout("rotate()",2000);
	}
}

function rotate(rotateOnlyOnce) {
	if (!newStyleCaptions || showSetupCaptions)
	    showCaption('');
	if (newStyleCaptions)
	    emptyAllCaptions();
	if (document.images) {
		// thisAd++;
		if (thisAd >= imgCt) {
			slideshowGoing=false;
			highlightStep(0);
			if (callWhenSlideshowDone)
			   callWhenSlideshowDone();
			   // this case foolishly does not include the timeAfterLastSlide timeout
			   //  to get that timeout, use the function setDelayedCallWhenSlideshowDone
			else if (opener)
			   setTimeout("self.close()", timeAfterLastSlide);
			else if (summary.showFrameDefault)
			   setTimeout("location.replace(summary.showFrameDefault)", timeAfterLastSlide);
		}
		else  {
		    if (document.adBanner)
		      { if (!highlightStep(imageStep[thisAd]) || !pauseAfterChange)
			  { // showCaption(imageCaption[thisAd]);  // this is for something Randy wanted
			    // fixed bug 2-18: caption should be local var
			   if (!newStyleCaptions || showSetupCaptions)
			     { var caption = '';
				if (showSetupCaptions)
				    caption = imageCaption[thisAd];
				if (caption != '')
				    caption += '<br>';
				// if (showStepDescriptionCaptions)
				    // caption += opener.stepDescription[imageStep[thisAd]];
				showCaption(caption);
			      }
			    if (newStyleCaptions)
			      { if (setupCaptionDiv)
			            showMessageInDiv(imageCaption[thisAd],setupCaptionDiv);
				for (var i = 1; i <= 2; i++)
				  { if (stepCaptionDiv.length > i && stepCaptionDiv[i])
				       { showMessageInDiv(getStepDescription(i,imageStep[thisAd]),stepCaptionDiv[i]);
				       }
				  }
			      }

			    document.adBanner.src=adImages[thisAd];
			    highlightSlideMarker(thisAd);
			    if (!manualMode)
			        thisAd++;
			  }
		      }
	            // else if (document.all.adBanner)
		        // document.all.adBanner.src=adImages[thisAd];
		    if (!rotateOnlyOnce)
		        // setTimeout("rotate("+timePerSlide+")", timePerSlide);
		        setTimeout("rotate()", timePerSlide);
		}
	}
}

var highlightedStep = null;
var highlightedStepNumber = 0;

// var oldColor = 'white';
// var oldBackground = '#CC0066';
// var oldWeight = 'normal';
// var oldClass;

function writeMessageDiv(id,width,height,attributeString,initialMessage)
  { document.writeln("<div id='"+id+"' style='position:absolute;width="+width+";height="+height+";' "+attributeString
  	+ ">" + initialMessage + "</div>");
	// later fix for Netscape
  }

function showCaption(caption)
  { // alert('show caption ' + caption);
    if (document.all)
      { if (document.all[captionAreaName])
            document.all[captionAreaName].innerHTML = caption;
        // if (document.all.caption)
            // document.all.caption.innerHTML = caption;
        else if (document.all.loadingmsg)
            document.all.loadingmsg.innerHTML = caption;
      }
    else if (document.layer)
      { // add check for caption layer...
        var captionArea = document.loadingmsglayer; // may need a layer inside an ilayer
        captionArea.document.write(caption);
        captionArea.document.close();
	// alert('netssss' + caption);
      }
  }

var loadingMessageDiv = 'loadingmsg';
var newStyleCaptions = false;
function setLoadingMessageDiv(divname)
  { loadingMessageDiv = divname;
    newStyleCaptions = true;
  }

var setupCaptionDiv = '';
function setSetupCaptionDiv(divname)
  { setupCaptionDiv = divname;
    newStyleCaptions = true;
  }

var stepCaptionDiv = new Array();
stepCaptionDiv[1] = '';
stepCaptionDiv[2] = '';
function setStepCaptionDiv(divname,i)
  { if (!i)
       i = 1;
    stepCaptionDiv[i] = divname;
    newStyleCaptions = true;
  }

function showMessageInDiv(msg,id)
  { // for IE
    if (document.all && document.all[id])
        document.all[id].innerHTML = msg;
    // add code for other browsers...
  }

function emptyMessageDiv(id)
  { showMessageInDiv('',id);
  }

function emptyAllCaptions()
  { emptyMessageDiv(loadingMessageDiv);
    emptyMessageDiv(setupCaptionDiv);
    if (stepCaptionDiv.length > 1)
        emptyMessageDiv(stepCaptionDiv[1]);
    if (stepCaptionDiv.length > 2)
        emptyMessageDiv(stepCaptionDiv[2]);
  }

var highlightedSlideMarker = null;
var highlightedSlideMarkerElt = null;
var showSlideMarkers = false;

function highlightSlideMarker(slide)
  { if (!showSlideMarkers)
        return false;
    var newSlideMarker = 'slidemarker' + slide;
    if (highlightedSlideMarker == newSlideMarker)
        return false;
    if (highlightedSlideMarkerElt)
        highlightedSlideMarkerElt.className = 'unhighlightedSlideMarker';
    var trial = self;
    if (top.frames.stepListFrame)
      { summary = top.frames.stepListFrame;
        // scrollSteps = true;
      }
    while (!summary && trial && trial.document)
      { if ((document.all && trial.document.all[newSlideMarker])
	    || (document.layers && trial.document[newSlideMarker]))
	  { summary = trial;
	  }
	else
	    trial = trial.opener;
      }
    // alert("highlightmarker:"+slide + summary);
    if (!summary)
        return false;
    // alert("highlight found summary");
    /*
    if (highlightedSlideMarker)
      { if (document.all)
         { var hs = summary.document.all[highlightedSlideMarker];
	   if (hs)
	       hs.className = 'unhighlightedSlideMarker';
	 }
            // summary.document.all[highlightedStep].className = 'unhighlighted';
	else if (document.layers)
	  {  // add code for Netscape....
	  }
        highlightedSlideMarker = null;
        highlightedSlideMarkerElt = null;
      }
    */
    highlightedSlideMarkerElt = null;
    highlightedSlideMarker = newSlideMarker;
    if (document.all)
      { highlightedSlideMarkerElt = summary.document.all[highlightedSlideMarker];
        //  alert('mmmm ' + highlightedSlideMarkerElt);
        if (highlightedSlideMarkerElt)
	   { highlightedSlideMarkerElt.className = 'highlightedSlideMarker';
	     // highlightedSlideMarkerElt.style.color = '#ff0000';
	     // alert('hhh ' + highlightedSlideMarkerElt.id);
	   } 
	 else
	   { highlightedSlideMarker = null;
	   }
      }
    else if (document.layers)
      {  // add code for Netscape....
      }
  }

var summary;
var scrollShowAbove = 1;
var scrollSteps = false;

// returns true if highlights a new step
function highlightStep(snum)
  { 
    var newStep = 'step' + snum;
    if (highlightedStep == newStep)
        return false;
    var trial = self;
    if (top.frames.stepListFrame)
      { summary = top.frames.stepListFrame;
        // scrollSteps = true;
      }
    while (!summary && trial && trial.document)
      { if ((document.all && trial.document.all[newStep])
	    || (document.layers && trial.document['highlayer' + newStep + ':1']))
	  { summary = trial;
	  }
	else
	    trial = trial.opener;
      }
    // alert("highlight:"+snum);
    if (!summary)
        return false;
    // alert("highlight found summary");
    if (highlightedStep)
      { if (document.all)
         { var hs = summary.document.all[highlightedStep];
	   if (hs && hs.length)
	     { for (var i = 0; i < hs.length; i++)
	          hs[i].className='unhighlighted';
             }
	   else if (hs)
	       hs.className = 'unhighlighted';
	 }
            // summary.document.all[highlightedStep].className = 'unhighlighted';
	else if (document.layers)
	  { var sfx = 1;
	    while (summary.document['highlayer' + highlightedStep + ":" + sfx])
	      { var lay = summary.document['highlayer' + highlightedStep + ":" + sfx];
	        var unlay = lay.document.unhighlayer;
		if (lay)
		  { lay.visibility = 'hidden';
		  }
		if (unlay)
		  { unlay.visibility = 'visible';
		  }
		sfx++;
              }
	  }
        highlightedStep = null;
      }
    highlightedStepNumber = snum;
    if (snum)
      { highlightedStep = newStep;
        if (scrollSteps)
	  { var scrollTo = summary.stepIx[newStep]-scrollShowAbove;
	    // alert(newStep + ","+summary.stepIx[newStep] + "," +scrollTo);
	    if (scrollTo >= 0)
	      { scrollTarget = "a"+summary.stepIDs[scrollTo];
	      }
	    else
	      { scrollTarget = "steps";
	      }
	    // alert(scrollTarget);
	    summary.location.hash=scrollTarget;
	  }
	if (document.all)
         { var hs = summary.document.all[highlightedStep];
	   // alert("" + hs.length + hs.className + hs.properties);
	   if (hs && hs.length)
	     { for (var i = 0; i < hs.length; i++)
	          hs[i].className='highlighted';
             }
	   else if (hs)
	       hs.className = 'highlighted';
	   // summary.document.all[highlightedStep].className = 'highlighted';
	 }
	else if (document.layers)
	  { // var hsl = summary.document['highlayer' + highlightedStep];
	    // alert("hsl " + snum + hsl);
	    // alert("hsl " + typeof hsl + ":" +  hsl.length + ":" +  hsl.document);
	    var sfx = 1;
	    while (summary.document['highlayer' + highlightedStep + ":" + sfx])
	      { var lay = summary.document['highlayer' + highlightedStep + ":" + sfx];
	        var unlay = lay.document.unhighlayer;
		if (unlay)
		  { unlay.visibility = 'hidden';
		  }
		if (lay)
		  { lay.visibility = 'visible';
		  }
		sfx++;
              }
	  }
        return true;
      }
    return false;
  }

var stepDescriptionMap = new Object();
var stepDescriptions = new Array();
stepDescriptions[1] = new Object();  // Set up to store the two descriptions supplied for each step to stepb
stepDescriptions[2] = new Object();
var stepIDs = new Array();
var stepIx = new Object();

function getStepDescription(i,step)
  { var d = stepDescriptions[i][step];
    if (d)
        return d;
    else
        return '';
  }

function stepb(stepLabel,description1,description2)
  { stepab('b',stepLabel,description1,description2);
  }


function stepa(stepLabel,description)
  { stepab('a',stepLabel,description);
  }

var stepabDescriptionToShowInline = 1;

// which should be 1 or 2
function setStepDescriptionToShowInline(which)
  { stepabDescriptionToShowInline = which;
  }

function setSlideMarker(markerHTML)
  { slideMarker = markerHTML;
  }

// var stepabMouseoverFunction = 
// function setStepMouseoverFunctions(over,out)
  // { stepabMouseoverFunction = over;
    // stepabMouseoutFunction = out;
  // }

var slideMarker ='&gt;';
var enableManualSlideshowViaStepb = false;
var enableMovieControlViaStepb = false;
function stepab(version,stepLabel,description1,description2)
  {  
	var description = description1;
	if (version == 'b')
	  { if (stepabDescriptionToShowInline == 2)
	      description = description2;
	  }
        stepLabel = "" + stepLabel;
	if (stepLabel.toLowerCase().indexOf('step') == 0)
	    stepLabel = stepLabel.substring(4);
	stepDescriptionMap[stepLabel] = description1;
	if (version == 'b')
	   { stepDescriptions[1][stepLabel] = description1;
	     stepDescriptions[2][stepLabel] = description2;
	   }
	stepID = "step"+stepLabel;
	stepIx[stepID] = stepIDs.length;
	// alert(stepID+":"+stepIx[stepID]);
	stepIDs[stepIDs.length] = stepID;
	var imagesForThisStep = 0;
	var controlString = '';
	var firstImage = -1;
	var slidemarkerSuffix = '';
	if (enableManualSlideshowViaStepb)
	  { 
	    showSlideMarkers = true;
	    for (var i = 0; i < imgCt; i++)
	      { if (imageStep[i] == stepLabel)
	          { controlString = " onMouseOver='manualToSlide(" + i + ")' onMouseOut='manualOut("+i+")' ";
		    firstImage = i;
		    slidemarkerSuffix = i;
		    break;
		  }
	      }
	  }
	if (enableMovieControlViaStepb)
	  { 
	    // showSlideMarkers = true;
	    controlString = " onMouseOver='requestMovieStep(\"" + stepLabel + "\")'";
	    slidemarkerSuffix = stepLabel;
	    // alert('cs ' + controlString);
	    // onMouseOut='manualOut("+i+")' ";
	  }
	document.write("<a name='a"+stepID+"' " + controlString + " >");
	if (enableManualSlideshowViaStepb && slidemarkerSuffix)
	    document.write("<span id='slidemarker"+slidemarkerLabel
	                          + "' class='unhighlightedSlideMarker'>"+slideMarker+"&nbsp;</span>");
         // document.write("<A onMouseOver='manualToSlide(" + i + ")' onMouseOut='manualOut("+i+")'>");
        if (document.all)
	  { // document.write("<span id='step" + stepLabel + "'>" + description + "</span>");
	    document.write("<span id='" + stepID + "'>" + description + "</span>");
	    var sss = document.all["step" + stepLabel];
	    // alert ("stepa " + sss.length + sss.className);
	    if (sss.length)  // multiple calls to stepa with same label leads to this case
	      { sss[sss.length-1].className = 'unhighlighted';
	      }
	    else
	        sss.className='unhighlighted';
	    // alert ("stepa " + sss.length + sss.className);
	  }
	else if (document.layers)
	  { var sfx = 1;
	    // if there are multiple calls with the same step label,
	    //  we need to generate a unique id for the layer - we add a suffix
	    while (document["highlayerstep"+stepLabel+ ":" + sfx])
	        sfx++;
	    stepLabel = stepLabel + ":" + sfx;
	    document.write("<ilayer id='highlayerstep"+stepLabel+"' visibility='hidden'>"
		   // + "<layer id='unhighlayerstep"+stepLabel+"' visibility='visible'>"
		   + "<layer id='unhighlayer' visibility='visible'>"
		   + "<span class='unhighlighted'>"
		   + description
		   + "</span></layer>"
		   + "<span class='highlighted'>"
		   + description 
		   + "</span></ilayer>");
	  }
      document.write("</a>");
      if (enableManualSlideshowViaStepb && firstImage >= 0)
	{ var prevImg = adImages[firstImage];
	  for (var i = 0; i < imgCt; i++)
	    { if (i != firstImage && imageStep[i] == stepLabel && adImages[i] != prevImg)
		{ controlString = " onMouseOver='manualToSlide(" + i + ")' onMouseOut='manualOut("+i+")' ";
		  document.write("<br><a name='a"+stepID+"' " + controlString + " >");
		  if (enableManualSlideshowViaStepb)
		      document.write("<span id='slidemarker"+i
	                          + "' class='unhighlightedSlideMarker'>"+slideMarker+"&nbsp;</span>");
		  if (i == imgCt-1)
		      document.write("final view");
		  else
		      // document.write("_____________");
		      document.write(".&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.");
		      // document.write(".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.");
		  document.write("</a>");
		  prevImg = adImages[i];
		}
	    }
	}
  }

function requestMovieStep(step)
  { 
    // alert('requesting ' + step);
    if (document.drawApplet)
      document.drawApplet.requestReplayStep(step);
  }

function writeVerticalSlideshowStrip(stripWidth,stripHeight,src1,src2)
  { var prevImg = null;
    var prevImageStep = null;
    var prevImageCaption = null;
    var indivHeight = stripHeight/imgCt;
    var src = new Array();
    src[0] = src1;
    src[1] = src2;
    j = 0;
    for (var i = 0; i < imgCt; i++)
      { if (adImages[i] != prevImg || imageStep[i] != prevImageStep || imageCaption[i] != prevImageCaption)
	  { controlString = " onMouseOver='manualToSlide(" + i + ")' onMouseOut='manualOut("+i+")' ";
	    document.write("<br><a name='a"+stepID+"' " + controlString + " >");
	    document.write("<img width="+stripWidth+" height="+indivHeight+" src='"+src[j%2]+"'>");
	    j++;
	    document.write("</a>");
	    prevImg = adImages[i];
	    prevImageStep = imageStep[i];
	    prevImageCaption = imageCaption[i];
	  }
      }
  }

var stepList;
var stepTitle = new Array();
var stepDescription = new Array();

///////////////////////////////////////////////////////////////////////
// listStepsVersionC
///////////////////////////////////////////////////////////////////////
//  Call this from the summary file.
//  for example listSteps('<LI> TEXT',
//                        'Gate Position',
//                        'Gateway Opening',
//                        'Mass And Height')
//  would set up three steps.  These will be listed the place where it is called.
//  The first parameter specifies a template that will be used for each step.
//  To work correctly, it must include a style parameter.
//  The next parameter gives the value of the style property for highlighted steps.
//  The description of each step (obtained from the remaining parameters)
//    will be substituted for the word TEXT
//    The background and foreground colors should be specified as part of the style paramete
//    so that the highlighting routine can figure out what to change them back to
//    when a step no longer needs to be highlighted.
///////////////////////////////////////////////////////////////////////
function listStepsVersionC(template,style)
  { var ix1 = template.indexOf('>');
    var ix2 = template.indexOf('TEXT');
    if (ix1 < 0)
      { alert("Template of listSteps does not include an HTML tag ");
      }
    if (ix2 < 0)
      { alert("Template of listSteps does not contain the word TEXT");
      }
    if (ix1 < 0 ||  ix2 < 0)
        return;
    if (ix1 >= ix2)
      { alert("The word TEXT must appear in the template after the first HTML tag");
        return;
      }
    var t1 = template.substring(0,ix1);
    var t2 = template.substring(ix1,ix2);
    var t3 = template.substring(ix2+4);
    highlightStyle = style;
    for (var i = 1; i < arguments.length; i++)
      { stepDescription[i] = arguments[i];
        if (document.all)
	  { document.write(t1 + " id='step" + i + "' " + t2 + stepDescription[i] + t3);
	    document.all["step" + i].className='unhighlighted';
	  }
	else if (document.layers)
	  {
	    // document.write("<span style='position:relative'>");
	    document.write(t1 + " id='step" + i + "' class='unhighlighted' " + t2
		   + "<ilayer id='highlayerstep"+i+"' visibility='hidden'>"
		   + "<layer id='unhighlayerstep"+i+"' visibility='visible'>"
		   + "<span class='unhighlighted'>"
	           + stepDescription[i]
		   + "</span></layer>"
		   + "<span class='highlighted'>"
	           + stepDescription[i]
		   + "</span></ilayer>"
		   // + "<span class='highlighted' style='position:relative'>"
	           // + stepDescription[i]
		   // + "</span>"
		   + t3);
	    // document.write("<span style='position:absolute; left:0; top:0'>");
	    // document.write(t1 + " id='highlightedStep" + i + "'  class='highlighted'" + t2
		   // + "<span class='highlighted'>"
	           // + stepDescription[i]
		   // + "</span>"
	           // + t3);
	    // document.write("</span></span>");
	  }
      }
  }

///////////////////////////////////////////////////////////////////////
// listStepsVersionB
///////////////////////////////////////////////////////////////////////
//  Call this from the summary file.
//  for example listSteps('background-color:#cc0066; color:#ffffff', 'Gate Position', 'Gateway Opening', 'Mass And Height')
//  would set up three steps.  These will be listed and numbered at the place
//   where it is called.
//  The first parameter will be used to set the style attribute of each step.
//    The background and foreground colors should be specified so that
//    the highlighting routine can figure out what to change them back to
//   when a step no longer needs to be highlighted.
///////////////////////////////////////////////////////////////////////
function listStepsVersionB(style)
  { document.write("<OL>");
    for (var i = 1; i < arguments.length; i++)
      { stepDescription[i] = arguments[i];
        document.write("<LI style='"+style+"' id='step" + i + "'>" + stepDescription[i]);
      }
    document.write("</OL>");
  }

function listSteps()
  { document.write("<OL>");
    for (var i = 0; i < arguments.length; i++)
      { stepDescription[i+1] = arguments[i];
        document.write("<LI>" + stepDescription[i+1]);
      }
    document.write("</OL>");
  }
// End of portion copied into this file from slideshow8-23.js
// The following portion was copied into this file from drawfunctions8-23.js
// History:
// drawfunctions8-21.js
// changed way that the folder of the cab and jar files is found
//  The variable drawAppletFolder can now be set to tell what folder to look for these in.
//   It defaults to "../nickb" which is what it used to be hardwired to be
// drawfunctions4-4.js
//  fixed bug in turning off loading message
//    (it's still not turned off until get to the first caption in the gdraw file)
// drawfunctions3-31.js
//    added code to show captions from the gdraw file (when they don't look like step numbers)
//       by calling showCaptions from the slideshow file
//       Set the parameter showCaptionCaptions = true to enable this
//    blankTime feature disabled because of awkward interactions (don't think it's wanted)
// ******************************************************** -->
// The mechanism for setting a cookie from a java           -->
// applet that is used below is based on code by            -->
// Carl T. Dreher, Focus Research Corp.                     -->
// Date: 11-04-97                                           -->
// Copyright 1997, Focus Research                           -->
//   published in Web Techniques, February 1998             --> //                                                          -->
// ******************************************************** -->


// document.write("<p>Orig Retrieved filename:"+GetCookie("InputFileName")+"XX</p>");
// SetCookie("InputFileName","tcook",60);

// parameters to work with
// var appletWidth = 634;
// var appletHeight = 168;

// parameters
var forReplay = false;
var resizeIfNecessary = false;
var captionStart = "";
var captionEnd = "";
var captionAreaName = "caption";
// var captionAreaName = "captionArea";
// var captionLayerName = "captionLayer";
// var captionApplet1;
// var captionApplet2;
var showCaptionCaptions = false;
var drawAppletFolder;
if (!drawAppletFolder)
    drawAppletFolder = "../nickb";


var params = "";
var replayCab = "/gdrawreplay.cab";
var drawCab = "/gdrawdraw.cab";
var jarFile = "/gdrawreplay.jar";
var suppressDrawingUntilReplay = "false";
var supplyCaptions = "false";
var showIncrementalErasures = "true";
var stepNumberCaptions = "false";
var autoReplay = "false";
var replayWhenLoaded = "true";
var maskToBounds = "false";
var adjustToBounds = "false";
var appletName = "drawApplet";
var inputFileName = "";

// var drawingWidth = 760;
var drawingWidth = 100;
var drawingHeight = 200;

var sequenceStepTitle = "";
var sequenceStepNumber = 0;
var cookieMinutesTilExpires = 90;
var minAppletWidth = 600;
var appletMinusDrawingWidth = 0;
var appletMinusDrawingHeight = 100;
// var appletMinusDrawingHeight = 45;
// var appletMinusDrawingWidth = 5;
var appletWidth = drawingWidth+appletMinusDrawingWidth;
var appletHeight = drawingHeight+appletMinusDrawingHeight;

var bottomPanelHeight = 92;
var backgroundR = 255;
var backgroundG = 255;
var backgroundB = 255;
// var topBottomR = 88;
// var topBottomG = 145;
// var topBottomB = 250;
var initialImage = "";
var replayDelay = 5;
var storeDrawingAtServer = "true";
var doIncrementalOutput = "true";
var useMemoryCache = "true";
var debug = getCookieOrDefault("DebugSetting",0);
// var updateURL = "http://161.58.221.38/cgi-bin/update-drawing.cgi";
var updateURL = "/cgi-bin/update-drawing.cgi";
var nextURL = "sendfinaljpeg.htm";
var saveOnUnload = "true";
// var replayOnly = "false";

var captionArea;

	function RequestJpegAndGo(url)
	  { RequestJpeg();
	    GoIfJpegUploadSucceeds(url);
	      }

	function GoIfJpegUploadSucceeds(url)
	  {  if (document.drawApplet != null && document.drawApplet.getJpegUploadStatus() == "succeeded")
	     top.location=url;
	     else if (document.drawApplet != null && document.drawApplet.getJpegUploadStatus() == "pending")
	        {    status = 'Uploading drawing - then will automatically go to ' + url;
		      setTimeout('GoIfJpegUploadSucceeds("' + url + '")',250);
		}
	  }

	function SetImageURLAndGo(url,name,secondImage)
	 {    SetCookie("InputFileName","",cookieMinutesTilExpires);
	      SetCookie("InitialImage",name,cookieMinutesTilExpires);
	      SetCookie("SecondImage",
	         ((secondImage) ? secondImage : ""),
		 cookieMinutesTilExpires);
	      top.location=url;
	 }

	function SetInputAndGo(url,name)
	 {    SetCookie("InputFileName",name,cookieMinutesTilExpires);
	      top.location=url;
	 }

	function SetInputAndDelay(name,delay)
	 {    SetCookie("InputFileName",name,cookieMinutesTilExpires);
	      SetCookie("ReplayDelay",delay,cookieMinutesTilExpires);
	 }

	function SetInputAndDelayAndGo(url,name,delay)
	 {    SetCookie("InputFileName",name,cookieMinutesTilExpires);
	      SetCookie("ReplayDelay",delay,cookieMinutesTilExpires);
	      top.location=url;
	 }

	function FinishAndGo(url)
	  { if (drawingSource == "url")
	       SendBackDrawing();
	    else
	       SetFileName();
	    top.location=url;
	  }

	function SetFileName()
	  {  if (document.drawApplet != null)
	      { 
	        SetCookie("InputFileName",document.drawApplet.finalSendBackDrawing(),cookieMinutesTilExpires);
	        // SetCookie("InputFileName",document.drawApplet.sendBackDrawing(),cookieMinutesTilExpires);
		SetCookie("PenWidth",document.drawApplet.getPenThickness(),cookieMinutesTilExpires);
		SetCookie("PenColor",document.drawApplet.getPenColor(),cookieMinutesTilExpires);
	        SetCookie("JpegURL",document.drawApplet.getJpegURL(),cookieMinutesTilExpires);
	      }
	  }

	var appletSizeSpecified = false;
	function SetAppletSize(width,height)
	  { appletSizeSpecified = true;
	    appletWidth = width;
	    appletHeight = height;
	  }

	function SetDrawingSize(width,height)
	  { 
            drawingWidth = width;
            drawingHeight = height;
	    /*
	    var xix = location.search.indexOf('x');
	    if (xix > 0)
	      {  drawingWidth = location.search.substring(1,xix);
		 drawingHeight = location.search.substring(xix+1,location.search.length);
	      }
	    else
	      { drawingWidth = width;
	        drawingHeight = height;
	      }
	    */
	   }

	function RequestJpeg()
	  {  if (document.drawApplet != null)
	      {  document.drawApplet.requestJpegUpload();
	      }
	  }

	var pauseAfterNewCaptionTime = 0;
	var blankTime = 0;
	var loadingMsgMightBeThere = true;
	var captionApplet = '';  // set this if more than one applet to specify which one supplies
				 // the captions

	function updateCaption()
	  { // var applet1 = document.all(captionApplet1);
	    var applet1 = document.applets[captionApplet ? captionApplet : appletName];
	    // alert(applet1);
	    if (applet1)
	    // try
	      {  // changeCaption(captionArea,"checking...");
	        if (applet1.replayDone())
		    { // changeCaption(captionArea,"<div align=center>DONE</div>");
		      // changeCaption(captionArea,"Step 0");
		      changeCaption("Step 0");
		      setTimeout('updateCaption()',500);
		    }
	        else if (applet1.checkForNewCaption())
	            { // alert("found new");
		      // changeCaption(captionArea,"Step 0"); put this back if want blankTime > 0
		      //  - but then blanks for displaying non step number captions
		      //  - we don't know what kind of caption it is here...
		      if (loadingMsgMightBeThere)
		        { // changeCaption(captionArea,"");
			  loadingMsgMightBeThere = false;
			  if (!newStyleCaptions || showCaptionCaptions)
			      showCaption('');
			  if (newStyleCaptions)
			      emptyAllCaptions();
			}
		      // setTimeout('displayCaption()',blankTime);
		      displayCaption();
		    }
		else
		    { // changeCaption(captionArea,"notFound");
		     // alert("cc waiting");
		      setTimeout('updateCaption()',50);
		    }
	      }
	    else
	    // catch(error)
	      { setTimeout('updateCaption()',500);
	      }
	  }

	function displayCaption()
	  { // var applet1 = document.all(captionApplet1);
	    var applet1 = document.applets[captionApplet ? captionApplet : appletName];
	    // alert('display ' + applet1.currentCaption());
	    // changeCaption(captionArea,captionStart + applet1.currentCaption() + captionEnd);
	    var oldHighlightedStepNumber = highlightedStepNumber;
	    changeCaption(captionStart + applet1.currentCaption() + captionEnd);
	    if (highlightedStepNumber > oldHighlightedStepNumber)
	        setTimeout('continueReplay()',pauseAfterNewCaptionTime);
	    else
	        continueReplay();
	  }
	function continueReplay()
	  {
	    // document.all(captionApplet1).continueReplay();
	    // document.all(captionApplet2).continueReplay();
	    // alert('continuing');
	    document.applets[captionApplet ? captionApplet : appletName].continueReplay();
	    // document.drawApplet2.continueReplay();
	    setTimeout('updateCaption()',50);
	  }

	// In this version of drawfunctions, changeCaption is being used for highlighting
	//  step numbers using highlightStep from slideshow.js
	//  This needs to be cleaned up and integrated with other uses of changeCaption
	//  To turn off highlighting, set text to "Step 0"
	//  Captions that start with "Step" (case arbitrary) are used to get step numbers
	// function changeCaption(captionArea, text)
	function changeCaption(text)
	  {   // alert("changeCaption " + text);
	      var stepNum = '';
	      var stepFound = false;
	      if ((text.length > 5) && text.substring(0,4).toLowerCase() == 'step')
	        { stepNum = parseInt(text.substring(4));
		  stepFound = true;
		}
	      if (stepFound && !isNaN(stepNum))
		{ onunload=highlightStep;
		  highlightStep(stepNum);
		  highlightSlideMarker(stepNum);
		  if (newStyleCaptions)
		    {
		      for (var i = 1; i <= 2; i++)
			{ if (stepCaptionDiv.length > i && stepCaptionDiv[i])
			     { showMessageInDiv(getStepDescription(i,stepNum),stepCaptionDiv[i]);
			     }
			}
		    }
		}
	      else
	        { if (setupCaptionDiv)
		      showMessageInDiv(text,setupCaptionDiv);
		  if (showCaptionCaptions)
		      showCaption(text); // showCaption is in the slideshow file
		}
	      // else
	        // { showCaption(''); // clear loading message
		// }
	 }

	function displayImageUnscaled(url)
	  { if (url != "")
	      document.write("<img src = " + url + ">");
	  }

	function displayImage(width,height,url)
	  { if (url != "")
	      document.write("<img width=" + width + " height=" + height +
	       " src = " + url + ">");
	  }

function showdraw()
  { document.all.instr.style.visibility='hidden';
    document.all.draw.style.visibility='visible';
  }

function showinstr()
  { document.all.draw.style.visibility='hidden';
    document.all.instr.style.visibility='visible';
  }

var playbackParameterFile = "stdreplayparams.txt";

function setupApplet()
{
if (forReplay)
  { 
    if (!appletSizeSpecified)
      { appletWidth = drawingWidth;
        appletHeight = drawingHeight;
      }
    autoReplay = replayWhenLoaded && !resizeIfNecessary;
    suppressDrawingUntilReplay = "true";
    cabFile = drawAppletFolder+replayCab;
    // parameterFile = "../nick-march22/stdreplayparams.txt";
    parameterFile = playbackParameterFile;
    //    parameterFile = "stdreplayparams.txt";
    storeDrawingAtServer = "false";
    adjustToBounds = "true";
    maskToBounds = "false";
    // inputFileName = GetCookieX('InputFileName');
    // replayDelay = GetCookieX('ReplayDelay');
  }
else 
  { appletWidth = drawingWidth+appletMinusDrawingWidth;
    appletHeight = drawingHeight+appletMinusDrawingHeight;
    autoReplay = "false";
    suppressDrawingUntilReplay = "false";
    parameterFile = "drawparams.txt";
    cabFile = drawAppletFolder+drawCab;
    storeDrawingAtServer = "false";
    adjustToBounds = "false";
    maskToBounds = "true";
    inputFileName = "";
    if (appletWidth < minAppletWidth)
	appletWidth = minAppletWidth;
    // if (location.protocol == "file")
       // { cabFile = signedCab;
       // }
    // else
       // { cabFile = unsignedCab;
       // }
  }

params = "OBJECT pen_color_choice; initial_choice '" + getCookieOrDefault('PenColor','Black') + "';"
+ "OBJECT pen_width_choice; initial_choice " + getCookieOrDefault('PenWidth','3') + ";"
+ "OBJECT canvas_holder; width " + appletWidth + ";"
+ "OBJECT canvas_holder; height " + drawingHeight + ";"
+ "OBJECT main_canvas; height " + drawingHeight + "; width " + drawingWidth + ";";
}

/*
function setapplet(text)
  {  if (document.all)
       document.all.appletdiv.innerHTML = text;
    // else if (document.layers)
      // { // captionArea.document.open();
	// document.appletILayer.document.appletLayer.document.write(text);
	// document.appletILayer.document.appletLayer.document.close();
      // }
 }
*/

var appletLoaded = false;
var imageToShowAfterReplay = null;
var slideWidth = 400;
var slideHeight = 300;
var slideshowAfterReplayUrl;
var slideshowAfterReplayWait;
var slideshowAfterReplayTimeout;
var slideshowWantedAfterReplay = false;
// should work on the role of these global variables - perhaps eliminate them

function showSlideshowAfterReplayDone(url,wait)
  { var done = false;
    slideshowAfterReplayUrl = url;
    slideshowAfterReplayWait = wait;
    slideshowWantedAfterReplay = true;
    if (document.drawApplet && document.drawApplet.appletStarted)
      { if (document.images && !imageToShowAfterReplay && url)
	  { imageToShowAfterReplay=new Image();
	    imageToShowAfterReplay.src=url;
	  }
	if (document.drawApplet.replayDone())
	    { slideshowAfterReplayTimeout = setTimeout('replaceAppletWithSlideshow("' + url + '")',wait);
	      done = true;
	    }
       }
     if (!done)
       {  setTimeout('showSlideshowAfterReplayDone("' + url + '",' + wait + ')',500);
       }
  }

function showImageAfterReplayDone(url,wait,closewait)
  { var done = false;
    if (document.drawApplet && document.drawApplet.appletStarted)
      { if (document.images && !imageToShowAfterReplay && url)
	  { imageToShowAfterReplay=new Image();
	    imageToShowAfterReplay.src=url;
	  }
	if (document.drawApplet.replayDone())
	    { setTimeout('replaceAppletWithImage("' + url + '",' + closewait + ')',wait);
	      done = true;
	    }
       }
     if (!done)
       {  setTimeout('showImageAfterReplayDone("' + url + '",' + wait + ',' + closewait + ')',500);
       }
  }

var appletdivSavedInnerHTML;
function replaceAppletWithSlideshow(url)
  { 
    if (!document.adBanner)
        return;
    if (document.all)
      { if (slideWidth)
            document.adBanner.width = slideWidth;
        if (slideHeight)
            document.adBanner.height = slideHeight;
	// if (slideshowAfterReplayUrl)
	    // document.adBanner.src=slideshowAfterReplayUrl;
	if (url)
	    document.adBanner.src=url;
	document.all.appletdiv.style.visibility='hidden';
	if (url || imgCt > 0)
	    document.all.slideshowatapplet.style.visibility='inherit';
        rotate();
      }
        
    /*
    var wh='';
    // alert('replace...');
    if (slideWidth)
        wh = 'width ='+slideWidth;
    if (slideHeight)
        wh += ' height ='+slideHeight;
    if (url)
      { if (document.all)
	  { 
	    appletdivSavedInnerHTML = document.all.appletdiv.innerHTML;
	    document.all.appletdiv.innerHTML =
	      '<img name="adBanner" ' + wh + ' src="' + url + '">';
	  }
	 rotate();
	 // would probably be better to use startRotate()
	 //   (smoother restart...)
           // alert("rr"+document.all.adBanner);
      }
    */
  }

function replaceAppletWithImage(url,closewait)
  { if (url)
      { if (document.all)
	   document.all.appletdiv.innerHTML =
	      '<img onLoad="setTimeout(\'self.close()\','+closewait+');" src="' + url + '">';
      }
    else
        setTimeout('self.close()',closewait);
  }

function fixAppletSize()
  { // var ap = document[appletName];
    // if (ap != null && ap.drawingSizeAvailable)
    // if (appletLoaded)
    // testing a variable whose value tests true after loading seems
    //  to work to see if applet has loaded
    //   - undefined if not available
    if (document.drawApplet && document.drawApplet.m_max_canvas_width)
      { // alert("avail = " + document.drawApplet.drawingSizeAvailable());
        if (document.drawApplet.drawingSizeAvailable())
          { // alert("available");
	    var dwidth = document.drawApplet.getDrawingWidth();
	    var dheight = document.drawApplet.getDrawingHeight();
	    if (dwidth != drawingWidth || dheight != drawingHeight)
	      { SetDrawingSize(dwidth,dheight);
	        setupApplet();
	        if (forReplay && replayWhenLoaded)
	           autoReplay = "true";
	        // setapplet(appletString(dwidth,dheight));
		if (document.all)
		   document.all.appletdiv.innerHTML = appletString();
		else
	           document.drawApplet.requestReplay();
		   // if couldn't fix size, still start replay

		// not using autoReplay the first time, because might reload
	      }
	     else if (forReplay && replayWhenLoaded)
	        { document.drawApplet.requestReplay();
		}
	    // setTimeout('document.drawApplet.requestReplay()',1000);
	  }
	else
	  { // alert("not available");
            setTimeout('fixAppletSize()',500);
	  }
      }
    else
        setTimeout('fixAppletSize()',500);
  }

var alreadyRequestingReplay = false;

function requestReplay(applname)
  { if (!applname)
        applname= appletName;
    if (document[applname] && document[applname].appletStarted)
      { document[applname].requestReplay();
        alreadyRequestingReplay = false;
      }
    else if (!alreadyRequestingReplay)
      { alreadyRequestingReplay = true;
        setTimeout('requestReplay('+applname+')',1000);
      }
  }

var movieNumber = 0;

function workOnANewMovie()
  { movieNumber++;
    appletName = 'drawApplet_movie' + movieNumber;
  }

var slideshowAfterAppletAlign = 'left';
function drawapplet()
{ 
  setupApplet();
  // document.write(appletString());
  // document.write("<div id='appletdiv'>" + appletString(appletWidth,appletHeight) + "</div>");
  //
  // document.write("<div style='position:relative;background-color:red;color:black' align='left'>hi there");
  document.write("<div style='position:relative' align='left'>");
  // document.writeln("<div id='slideshowatapplet' style='position:absolute;visibility:hidden'>");
  // var slidealign = 'left';
  // if (slideshowAfterAppletAlign == 'center')
      // slidealign = 'center';
  document.write("<div id='appletdiv' style='position:relative'>"
          + appletString(appletWidth,appletHeight) + "</div>");
  // document.write("<div id='appletdiv' style='position:absolute'>" + appletString(appletWidth,appletHeight) + "</div>");
  document.writeln("<div align='"+slideshowAfterAppletAlign+"' id='slideshowatapplet' style='position:absolute;left:0;top:0;width:100%;visibility:hidden'>");
  // document.writeln("<div align='"+slideshowAfterAppletAlign+"' id='slideshowatapplet' style='position:absolute;left:0;top:0;width:100%;visibility:visible;background-color:green;padding:10'>");
  var wh='';
  // alert('replace...');
  var parms = '';
  if (slideWidth)
      parms += 'width ='+slideWidth;
  if (slideHeight)
      parms += ' height ='+slideHeight;
  if (slideshowAfterReplayUrl)
      parms += ' src="' + slideshowAfterReplayUrl + '"';
  document.writeln('<img name="adBanner" ' + parms+'>');
  document.writeln("</div>");
  document.writeln("</div>");
  //
// document.write("<div id='appletdiv'><ilayer id='appletILayer'><layer id='appletLayer'>" + +'hiiiii' + appletString(appletWidth,appletHeight) + "</layer></ilayer></div>");
  if (resizeIfNecessary)
      fixAppletSize();
}


function appletString()
{ 
// alert(appletHeight);
// return "<applet style='background-color:green; margin-left:0; padding-left:0; margin-right:0; padding-right:0; margin-top:0; padding-top:0; margin-bottom:0; padding-bottom:0;' code='gdraw.class' archive='" + drawAppletFolder+jarFile + "' align='baseline' width=\""
return "<applet code='gdraw.class' archive='" + drawAppletFolder+jarFile + "' align='baseline' width=\""
+appletWidth
+ "\" height=\""
+appletHeight
+ "\" name='" + appletName + "'><param name='CABBASE' value='" + cabFile + "'>"
// <param name='DrawingWidth' value=\""
// +drawingWidth
// + "\"><param name='DrawingHeight' value=\""
// + drawingHeight
// + "\">
+ "<param name='BottomPanelHeight' value=\""
+ bottomPanelHeight
+ "\"><param name='Params' value=\""
+ params
+ "\"><param name='ParamFile' value=\""
+ parameterFile
+ "\"><param name='UpdateURL' value=\""
+ updateURL
+ "\"><param name='NextURL' value=\""
+ nextURL
+ "\"><param name='SaveOnUnload' value=\""
+ saveOnUnload
+ "\"><param name='Debug' value=\""
+ debug
+ "\"><param name='MaskToBounds' value=\""
+ maskToBounds
+ "\"><param name='AdjustToBounds' value=\""
+ adjustToBounds
+ "\"><param name='AutoReplay' value=\""
+ autoReplay
+ "\"><param name='SuppressDrawingUntilReplay' value=\""
+ suppressDrawingUntilReplay
+ "\"><param name='SupplyCaptions' value=\""
+ supplyCaptions
+ "\"><param name='ShowIncrementalErasures' value=\""
+ showIncrementalErasures
+ "\"><param name='UseMemoryCache' value=\""
+ useMemoryCache
+ "\"><param name='DoIncrementalOutput' value=\""
+ doIncrementalOutput
+ "\"><param name='StoreDrawingAtServer' value=\""
+ storeDrawingAtServer
+ "\"><param name='ReplayDelay' value=\""
+ replayDelay
+ "\"><param name='InitialImage' value=\""
+ initialImage
+ "\"><param name='SequenceStepNumber' value=\""
+ sequenceStepNumber
+ "\"><param name='SequenceStepTitle' value=\""
+ sequenceStepTitle
// + "\"><param name='TopBottomR' value=\""
// + topBottomR
// + "\"><param name='TopBottomG' value=\""
// + topBottomG
// + "\"><param name='TopBottomB' value=\""
// + topBottomB
+ "\"><param name='BackgroundR' value=\""
+ backgroundR
+ "\"><param name='BackgroundG' value=\""
+ backgroundG
+ "\"><param name='BackgroundB' value=\""
+ backgroundB
+ "\"><param name='InputFile' value=\""
+ inputFileName
// +GetCookieX('InputFileName')
+ "\"><param name='PenWidth' value=\""
+GetCookieX('PenWidth')
+ "\"><param name='PenColor' value=\""
+GetCookieX('PenColor')
+"\"> Your browser does not support Java, or Java is not enabled. Sorry!</applet>"
}

function setit()
  { // top.location = "help.htm";
   document.helpbox.location = "help.htm";
  //   setTimeout(sett,500);
 }
function gethelp()
  {
   if (document && document.helpbox && document.drawApplet 
        // && document.drawApplet.isThere())
        && document.drawApplet.getBackBuffer() != null)
        // && document.drawApplet.getImageCanvas().somethingToLookAt)
        // && document.drawApplet.getImageCanvas() != null)
        document.helpbox.location= "help.htm";
    // else if (document && document.helpbox)
	// document.helpbox.location = "help.htm";
    else
         setTimeout('gethelp()',10);
         // setTimeout(gethelp,100);
	 // document.helpbox.location = "help.htm";

  }

function sett()
  { document.helpbox.location = "helpwait.htm";
    setTimeout(setit,500);
 }

// End of portion copied into this file from drawfunctions8-23.js

function setAppletURL()
  { drawAppletFolder='.';
    replayCab = "/gdrawreplay1-3-24.cab";
    jarFile = "/gdrawreplay1-3-26.jar";
  }

function setDelayedCallWhenSlideshowDone(fcn)
  { callWhenSlideshowDone = function () { setTimeout(fcn,timeAfterLastSlide);};
  }

function getMovieBackAndRestart()
  { // if (appletdivSavedInnerHTML)
       // { document.all.appletdiv.innerHTML = appletdivSavedInnerHTML ;
       // }
    document.drawApplet.requestReplay();
    // or could call the function requestReplay() in this file,
    //  which does fancier stuff
    document.all.slideshowatapplet.style.visibility='hidden';
    document.all.appletdiv.style.visibility='inherit';
    if (slideshowWantedAfterReplay)
      { if (slideshowAfterReplayTimeout)
           clearTimeout(slideshowAfterReplayTimeout);
	thisAd = 0; // set here since right now the function
	            // that replaces the applet with the slideshow
		    // calls rotate instead of startRotate
        showSlideshowAfterReplayDone(slideshowAfterReplayUrl,slideshowAfterReplayWait)
      }
  }

//////////////////////////////////////////////////////////////////////////////////
// Initializations are done at three times:
//  (1) When this file (or other javascript) is loaded 
//  (2) At the end of the document
//     (Used for preloading images)
//  (3) When the document has been loaded (called from onload in the BODY tag)
//  Both (2) and (3) require something to appear in the document at a location that
//   may not be adjacent to the main part of the code for whatever is being done
//     (in the BODDY tag or at the end of the document)
//    Thus when cutting and pasting, it is easy to miss making the necessary changes
//      for (2) and (3) (to install or remove functions to be called).
//   To deal with this more cleanly, a general purpose function, universalDocumentLoaded,
//     is to be called for the
//    onload event of the BODY tag in every html file that includes universal.js
//   A similar function, universalDocumentEnd, should also be called at the end of every
//   html file that includes universal.js
//   Specific functions to be called by these general functions are installed by
//   calling setCallOnDocumentLoad and setCallAtDocumentEnd.
//   Calls to these installation functions will normally be placed in the chuncks of code
// that are used as cut-and-paste templates, contiguous with other code for whatever
// is being done.
//////////////////////////////////////////////////////////////////////////////////
var onloadFunctions = new Array();
var bodyEndFunctions = new Array();

function setCallOnDocumentLoad(fcn)
  { onloadFunctions[onloadFunctions.length] = fcn;
  }

function setCallAtDocumentEnd(fcn)
  { bodyEndFunctions[bodyEndFunctions.length] = fcn;
  }

function universalDocumentLoaded()
  { for (var i = 0; i < onloadFunctions.length; i++)
      { onloadFunctions[i]();
      }
  }

function universalDocumentEnd()
  { for (var i = 0; i < bodyEndFunctions.length; i++)
      { bodyEndFunctions[i]();
      }
  }

//////////////////////////////////////////////////////////////////////////////////
// general purpose functions to hide and show positionable elements
//////////////////////////////////////////////////////////////////////////////////

// The netscape functionality of the following two functions has not yet been tested
//  (2-23-02) and may not work.
function hideElement(eltid)
  { if (document.all)
      document.all[eltid].style.visibility='hidden';
    else if (document.layers)
      document[eltid].visibility='hidden';
  }

function showElement(eltid)
  { if (document.all)
      document.all[eltid].style.visibility='visible';
    else if (document.layers)
      document[eltid].visibility='visible';
  }
