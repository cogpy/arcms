    // version: 2002-04-25 8pm

	// Declare global variables
	var layer = new String();
	var style = new String();
	var hidden = new String();
	var visible = new String();
	var openbrace = new String();
	var closebrace = new String();
	var visibleLayers = new Array();
	var popupWindow = null;

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
function checkBrowser() {
	// Set the layer and style variables.
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
// PARAMETERS:
//   pictureId - div id (name) of splash pic
//   contenId - div id (name) of content
//
// RETURNS: Nothing
//****************************************************************
function splashScreen(pictureId, contentId) {
   togglePic(pictureId);
   setTimeout("togglePic('"+pictureId+"')", 3000);
	setTimeout("changeState('"+contentId+"', 'visible')", 3200);
}


//****************************************************************
// splashPic
//
// used to display (or hide) a splash pic
//
// PARAMETERS:
//   showDiv - div id (name) to show
//   hideDiv - div id (name) to hide
//
// RETURNS: Nothing
//****************************************************************
function splashPic(showDiv, hideDiv) {
	if (!eval("self.picture.document" + layer + openbrace + showDiv + closebrace))
		return;

	self.picture.changeState(showDiv, "visible", true);
	self.picture.changeState(hideDiv, "hidden");
}


//****************************************************************
// selectUserPhoto
//
// change userPhoto to the users selected photo, and create
// cookie to track selection (in table pages)
//
// PARAMETERS: None
//
// RETURNS: Nothing
//****************************************************************
function selectUserPhoto() {
	var imagePath = "file://"+self.document.photoform.photopath.value;
	self.document.userphoto.src = imagePath;
	changeState("photoselect", "hidden");
	SetCookie("UserPhoto",imagePath,30*24*60,"/");
}


//****************************************************************
// retrieveUserPhoto
//
// retrieve users photo for inclusion in table pages
//
// PARAMETERS: None
//
// RETURNS: Nothing
//****************************************************************
function retrieveUserPhoto() {
	var imagePath = GetCookie("UserPhoto");
	if (imagePath)
		self.document.userphoto.src = imagePath;
}


//****************************************************************
// clickWindow
//
// open a new popup window
//
// PARAMETERS:
//   file - location of document to open in window
//   window - name of window to open
//
// RETURNS: Nothing
//****************************************************************
function clickWindow(file,window) {
	msgWindow=open(file,window,'resizable=yes,scrollbars=1,width=350,height=350, left=260,top=50,border=2');

	if (msgWindow.opener == null) { msgWindow.opener = self; }

	msgWindow.focus();
}
//****************************************************************
function clickLargeWindow(file,window) {
	msgWindow=open(file,window,'resizable=yes,scrollbars=1,width=500,height=420, left=240,top=90,border=2');

	if (msgWindow.opener == null) { msgWindow.opener = self; }

	msgWindow.focus();
}

//****************************************************************
// showPopup
//
// open a new popup window, or bring to front if window already
// exists
//
// PARAMETERS:
//   windowName - name of window to open/focus
//   url - location of document to open in window
//   resizable - boolean determining if window is resizable
//   width - width of window
//   height - height of window
//
// RETURNS: Nothing
//****************************************************************
function showPopup(windowName, url, resizable, width, height) {
	var resizable;
	var left = window.screenX + (window.outerWidth / 2) - (width / 2);
	var top = window.screenY + (window.outerHeight / 2) - (height / 2);
	var position = "top=" + top + ",left=" + left;
	var options;

	if (resizable == true)
		resizable = "yes";
	else 
		resizable = "no";

	if (popupWindow == null || popupWindow.closed) {
		options = "resizable=" + resizable + ",scrollbars=1,width=" + width + 
					 ",height=" + height + "," + position + ",border=2";
		popupWindow = open(url,windowName,options);
	}

	popupWindow.focus();
}


//****************************************************************
// contribute
//
// opens a popup window for uploading user content
//
// PARAMETERS:
//   sequence - name of sequence to which user is contributing
//   type - type of contribution (good, bad, personal, idea)
//
// RETURNS: Nothing
//****************************************************************
function contribute(sequence, type) {
	url = "/cgi-bin/patternl/contribute.py?action=contribute&sequence=" + 
			sequence + "&type=" + type;
	showPopup('Upload', url, true, 420, 120);
}


//****************************************************************
// viewContributions
//
// opens a popup window for viewing users contributions
//
// PARAMETERS:
//   sequence - name of sequence to which user is contributing
//   type - type of contribution (good, bad, personal, idea)
//
// RETURNS: Nothing
//****************************************************************
function viewContributions(sequence, type) {
	url = "/cgi-bin/patternl/contribute.py?action=view&sequence=" + 
			sequence + "&type=" + type;
	showPopup('Contributions', url, true, 640, 480);
}


//****************************************************************
//changetoVisible
//****************************************************************
function changeToVisible(layerRef) { 
	doChangeVisibility(layerRef,'visible',false);
}

function persistentChangeToVisible(layerRef) {
	doChangeVisibility(layerRef,'visible',true);
}

function changeVisibleToHiddenUnlessPersistent() { 
	doChangeVisibility(null,'hidden',false);
}

var changeVisibilityActiveElt = null;
var changeVisibilityPersistent = false;

function doChangeVisibility(layerRef,visibility, persistent) { 
	var elt = layerRef ? eval("document" + layer + openbrace + layerRef + closebrace) : null;
	// alert(" ddd document" + layer + "['" + layerRef + "']");
	// alert('dcv ' + layerRef + visibility + persistent + elt);

	if (elt && layerRef == changeVisibilityActiveElt && 
		 visibility == 'visible' && !persistent)
		return; // don't change persistence in this case

	if (changeVisibilityActiveElt && 
		 (elt && layerRef != changeVisibilityActiveElt || 
		  !changeVisibilityPersistent)) { 
		eval("document" + layer + openbrace + changeVisibilityActiveElt +
			  closebrace + style + ".visibility = '" + hidden + "'");

	 	changeVisibilityActiveElt = null;
	}

	if (!elt)
		return;
	if (visibility == 'visible') { 
		changeVisibilityActiveElt = layerRef;

		eval("document" + layer + openbrace + layerRef + 
			  closebrace + style + ".visibility = '" + visible + "'")

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
	destWindow.location.replace(contentUrl);
}

function loadPatternIntoFrame(destWindow,bulletUrl,bulletWindow) { 
	var pattern = location.hash.substring(1);
	// var patUrl = 'apl' + pattern + '/apl' + pattern + '.htm';
	var patUrl = pattern + '/' + pattern + '.htm';
	destWindow.location.replace(patUrl);
	// bulletWindow.location.hash = '#' + pattern;
	// alert('load ' + pattern);
	// bulletWindow.location.hash = pattern;
	bulletWindow.location.replace(bulletUrl+'#'+pattern);
}

function goToPatternInFrame(frameUrl,contentUrl,pattern)
  { goToInFrame(frameUrl,contentUrl + '#apl' + pattern);
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
// PARAMETERS: 
//   picture_id - div id of picture
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
                      
	function hideVisibleMenus() { hideVisibleLayers(); }

	function hideVisibleLayers() { 
		for (var i = 0; i < visibleLayers.length; i++)
			changeState(visibleLayers[i],'hidden');
		visibleLayers.length = 0;
	}

   // Take the state passed in, and change it.
	function changeState(layerRef, state, lockVisibility) {
		//alert(document.layers[0].name);
		// alert("document" + layer + openbrace + layerRef + closebrace);
		if (!eval("document" + layer + openbrace + layerRef + closebrace))
			return;

		if (state == 'visible') {
			hideVisibleLayers();
			if (!lockVisibility) {
				visibleLayers[visibleLayers.length] = layerRef;
			}
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
var imageCaptionManual = new Array();
var imageCaptionAuto= new Array();
var imageOperation = new Array();
var operationTile = new Object();
var imgCt = 0;

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
var writeSlideDivs = false;
var slideImageAttributeString='';
var visibleSlideDiv = '';
var movieStepRangeStart = 999999;
var movieStepRangeEnd = 999999;
var setupIsCalledFromSlideDiv = false;
var setupVersion = '';
var captionDiv = '';

function initializeSlideshowAndMovie(version)
  {
    drawAppletFolder='..';
    // drawAppletFolder='.';
    replayCab = "/gdrawreplay.cab";
    // jarFile = "/gdrawreplay.jar";
    jarFile = "/universal/gdrawreplay.jar";
    replayControl = 'timed';
    writeSlideDivs = true;
    // captionDiv = captionDivName;
    captionDiv = 'captionitselfdiv';
    forReplay = true;
    if (version < 2)
        setCallOnDocumentLoad(updateCaption);
    setCallOnDocumentLoad(scrollScrollDivToTop);
    setCallAtDocumentEnd(preloadImages);
    newStyleCaptions = true;
    // showSetupCaptions = true; no - this would be for old style captions
    // slideshowAfterAppletAlign = 'center'; (note that one smallhouse movie uses left alignment???)
    // timeAfterLastSlide = 0; this should no longer be needed
    // if (captionDiv)
    setLoadingMessageDiv(captionDiv);
    // only set below when turn on captions.....
    // setSetupCaptionDiv(captionDiv);
    // setStepCaptionDiv(captionDiv,2);
    // for now, turn on all captions
    showCaptionsFromSetup(true);
    showCaptionsFromGdrawFile(true);
    showCaptionsFromSteps(true);  // The captions from the steps are specified in the final parameter of movie_step or slide_step
				  // (They are not taken from the step title parameter.)
  }

// var showGdrawFileCaptions = true;  // default true should preserve behaviour of older versions
// var showStepbCaptions = true;  // default true should preserve behaviour of older versions

function showCaptionsFromSetup(truefalse)
  { // showSetupCaptions = truefalse;
    if (truefalse)
        setSetupCaptionDiv(captionDiv);
    else
        setSetupCaptionDiv('');

  }
function showCaptionsFromGdrawFile(truefalse)
  { // showGdrawFileCaptions = truefalse;
    //.........showCaptionCaptions = truefalse;
    if (truefalse)
        setGdrawCaptionDiv(captionDiv);
    else
        setGdrawCaptionDiv('');

  }
function showCaptionsFromSteps(truefalse)
  { // showStepbCaptions = truefalse;
    if (truefalse)
        setStepCaptionDiv(captionDiv,2);
    else
        setStepCaptionDiv('',2);
  }

function setTimePerSlide(time)  // time in milliseconds
  { timePerSlide = time;
  }
 
var pauseBetweenMovieAndSlide = 0;

function setPauseWhenSwitchFromMoiveToSlide(time)  // time in milliseconds
  { pauseBetweenMovieAndSlide = time;
  }
 

function putShowHere()
  { writeTheSlideDivs();
  }

var captionWhenLoaded = '';
var putCaptionUsed = false;
function putCaptionHere(initCaption,captionAfterDocumentLoaded)
  { putCaptionsHere(initCaption,captionAfterDocumentLoaded);
  }
function putCaptionsHere(initCaption,captionAfterDocumentLoaded)
  { document.writeln("<div id='" + captionDiv + "'>" + initCaption + "</div>");
    // document.writeln("<div id='" + captionDiv + "' style='background-color:#ff00ff'>" + initCaption + "</div>");
    if (!captionAfterDocumentLoaded)
        captionAfterDocumentLoaded = '';
    captionWhenLoaded = captionAfterDocumentLoaded;
    putCaptionUsed = true;
    setCallOnDocumentLoad(changeToDocumentLoadedCaption);
  }

function doChangeToDocumentLoadedCaption()
  { if (loadingMsgMightBeThere)
        showMessageInDiv(captionWhenLoaded,captionDiv);
  }
function changeToDocumentLoadedCaption()
  { setTimeout('doChangeToDocumentLoadedCaption()',2000);
  }

var noCaptionsDuringAutoplay = false;
function hideCaptionsDuringAutoPlay(truefalse)
  { hideCaptionsDuringAutoplay(truefalse);
  }
function hideCaptionsDuringAutoplay(truefalse)
  { noCaptionsDuringAutoplay = truefalse;
  }

function setupSlides() { 
	setupVersion = 'setupSlides';
	doSetupShow(arguments);
}

function setupShow() { 
	setupVersion = 'setupShow';
	doSetupShow(arguments);
}

var movieImageIndex = -1;

function setMovieFile(filename)
  { inputFileName = filename;
  }

// var lastStep = 0;
var stepVersion = '';
var current_step_label = '';
var last_caption_manual = '';
var last_caption_auto = '';

function setup_operation_step()
  { do_setup_step('operation',arguments)
  }
function setup_control_strip_step()
  { do_setup_step('cs',arguments)
  }
function setup_step()
  { do_setup_step('',arguments)
  }
function do_setup_step(kind,args)
  {
    setupVersion = 'setupShow';  // will this suffice?
    stepVersion = 'setup_step';
    var step_content = null;
    var step_title = '';
    var caption_manual = '';
    var caption_auto = '';
    var caption_manual_present = false;
    var caption_auto_present = false;
    var movieWanted = false;
    var operation = '';
    var tile = '';
    for (var i = 0; i < args.length; i++)
      { var a = args[i];
	// alert('setup arg ' + i + ' ' + a);
	if (a.toLowerCase().indexOf('movie:')==0 ||  a.toLowerCase().indexOf('image:')==0)
	  {
		if (step_content)
		  { throw new Error('Error: Two specifications for same step: [' + step_content + '] and [' + a + ']');
		  }
		else
		  { step_content = a;
		  }
		// adImages[imgCt] = a;
		// imageStep[imgCt] = stepNumber;
		// lastStep++;
		// imageStep[imgCt] = lastStep
		// imgCt++;
	  }
	// else if (/^caption\S*:/i.test(a))
	else if (a.toLowerCase().indexOf('operation:')==0)
	  { operation = a.substring(10);
	  }
	else if (a.toLowerCase().indexOf('tile:')==0)
	  { tile = a.substring(5);
	  }
	else if (a.toLowerCase().indexOf('caption:')==0)
	  {
		caption_manual += a.substring(8);
		caption_auto += a.substring(8);
		caption_auto_present = true;
		caption_manual_present = true;
	  }
	else if (a.toLowerCase().indexOf('caption-manual:')==0 || a.toLowerCase().indexOf('caption_manual:')==0)
	  {
		caption_manual += a.substring(15);
	         // alert('man caption ' + caption_manual);
		caption_manual_present = true;
	  }
	else if (a.toLowerCase().indexOf('caption-auto:')==0 || a.toLowerCase().indexOf('caption_auto:')==0)
	  {
		caption_auto += a.substring(13);
		caption_auto_present = true;
	  }
	else
	  { step_title += a;
	  }
			  
      }
    if (caption_manual_present && caption_manual == '')
	caption_manual = ' ';  // make any explicitly specified caption non-empty
    if (caption_auto_present && caption_auto == '')
	caption_auto = ' ';  // make any explicitly specified caption non-empty
    if  (!step_content && kind != 'operation')
      { throw new Error('Error: No specification of what is to be done for setup_step ' + args[0]);
      }
    if (operation)
        operation_label = 'operation_' + operation;
    else
        operation_label = '';
       
    if (kind != 'operation')
      { adImages[imgCt] = step_content;
	if (step_title)
	  { current_step_label = imgCt;
	  }
	else // continuation of prev step - keep captions if no new ones given
	  { if (!caption_manual_present)
	      { caption_manual = last_caption_manual;
		// alert('cm ' + caption_manual);
	      }
	    if (!caption_auto_present)
	      { caption_auto = last_caption_auto;
	      }
	  }
	imageCaptionAuto[imgCt] = caption_auto;  
	imageCaptionManual[imgCt] = caption_manual;  
	// alert('man caption ' + caption_manual);
	imageStep[imgCt] = current_step_label;
	imageOperation[imgCt] = operation_label;
      }
    // alert('label [' + step_label + '] [' + step_title + ']');
    if (kind == '')
      { if (a.toLowerCase().indexOf('movie:')==0)
	  { movie_step(current_step_label,step_title,'',imgCt)
	  }
	else
	  { slide_step(current_step_label,step_title,'',imgCt)
	  }
      }
    else if (kind == 'operation')
      { // operation(current_step_label,step_title,'',imgCt)
	// alert('ooooo ' + operation_label);
	operation_step(operation_label,step_title,'','')
	// alert('xxxooooo ' + operation_label);
	operationTile[operation_label] = tile;
      }
    else if (kind == 'cs' && controlStripVersion > 1)
      { writeControlStripTile(imgCt,controlStripTileWidth,controlStripTileHeight);
        // document.write('hi there');
      }
         
   

    last_caption_manual = caption_manual;
    // alert('lcm ' + last_caption_manual);
    last_caption_auto = caption_auto;
    if (kind != 'operation')
        imgCt++;
  }

function doSetupShow(args) { 
	// for use with writeSlideDivs = true
	var visibility = 'visible';  
	// var inMovieRange = false;

	var currentCaption = '';
	var stepNumber = 0;

	imgCt = 0;
	for (var i = 0; i < args.length; i++) { 
		var a = args[i];
		if ((typeof a) == "number")
			stepNumber = a;
		else if (a.toLowerCase().indexOf('restart:')==0) {
			adImages[imgCt] = a;
			// imageStep[imgCt] = stepNumber;
			imageStep[imgCt] = -1;
			imgCt++;
		}
		else if (a.toLowerCase().indexOf('movie:')==0) {
			adImages[imgCt] = a;
			// imageStep[imgCt] = stepNumber;
			imageStep[imgCt] = -1;
			movieImageIndex = imgCt;
			// movieStepRangeStart = stepNumber;
			// inMovieRange = true;
			inputFileName = a.substring(6);
			imgCt++;
		}
		else if (a.toLowerCase().indexOf('caption:')==0) {
			// this is for something Randy wanted
			currentCaption = a.substring(8);
			if (currentCaption == '')
			    currentCaption = ' ';  // make any explicitly specified caption non-empty
		}
		else { 
			adImages[imgCt] = a;
			imageStep[imgCt] = stepNumber;
			// if (inMovieRange) {
				// movieStepRangeEnd = stepNumber;
				// inMovieRange = false;
			// }
			  

			// this is for something Randy wanted
			imageCaption[imgCt] = currentCaption;  

			// if (setupIsCalledFromSlideDiv && writeSlideDivs)
			if (setupVersion == 'setupSlides'  && writeSlideDivs) { 
				document.write("<div id='divforslide"+imgCt+"' style='position:absolute;left:0;top:0;visibility:"+visibility+"'>");
				visibility = 'hidden';  // all but first hidden
				document.write("<img src='"+a+"' "+slideImageAttributeString+">");
				document.writeln("</div>");
			}

			imgCt++;
		}
		imageCaption[imgCt] = currentCaption;  // set a caption for after the end
	}

	thisAd = 0;
	onunload = highlightStep;
}

function restartButtonHTML(label,width,height)
  {
	return ' <TABLE width=' + width + ' align=center bgcolor=eeeeee cellspacing=3 border=1>\n' +
		'   <tr>\n' +
		'     <td align=center height=' + height + '>\n' +
		'       <TABLE bgcolor="#00ffff" cellSpacing=0 cellPadding=0 width="400" align=center border=2>\n' +
		'         <TR>\n' +
		'           <TD align=middle bgColor=eeeeee height=30>' +
		'             <span class=h3class>\n' +
		'               <a href="javascript:startRotate()">' +
		'        	 <font color=#000000>' +     label     + '</font>' +
		'               </A>' +
		'             </span>' +
		'           </TD>\n' +
		'         </TR>\n' +
		'       </TABLE>\n' +
		'     </td>\n' +
		'   </tr>\n' +
		' </TABLE>';
  }

function writeTheSlideDivs()
  { var i;
    var a;
    var movieDivWritten = false;
    // alert('write slide divs ' + imgCt);
    var visibility = 'inherit';  
    var slidediv = '';
    // if (!setupIsCalledFromSlideDiv && writeSlideDivs)
    if (setupVersion == 'setupShow'  && writeSlideDivs)
      { // document.writeln("<div style='position:relative;left:0;top:0:visibility:inherit;background-color:#ff00ff'>");
        // document.write("<div style='position:relative' align='left'>");
        document.writeln("<div style='position:relative;left:0;top:0:visibility:inherit' align='left'>");
        // document.writeln("<div style='position:relative;left:0;top:0:visibility:inherit'>");
        for (i = 0; i < imgCt; i++)
          { a = adImages[i];
	    // alert('writing div for ' + i + ' ' + a);
	    if (a.toLowerCase().indexOf('restart:') ==0)
	      {
		slidediv = 'divforslide' + i;
		document.writeln("<div id='"+slidediv+"' style='position:absolute;left:0;top:0;visibility:"+visibility+"'>");
		document.writeln(restartButtonHTML(a.substring(8),400,400));
		document.writeln("</div>");
	      }
	    else if (a.toLowerCase().indexOf('movie:') == 0 && !movieDivWritten)
	      { 
		// if (visibility == 'inherit' && howToStartShow == 'auto')
		    // startMovieWhenLoaded();  // must be called before drawapplet is called
		// document.write("<div id='divforslide"+i+"' style='position:absolute;left:0;top:0;visibility:"+visibility+"'>");
		//document.write("<div id='divforapplet' style='position:absolute;left:0;top:0;visibility:"+visibility+"'>");
		slidediv = 'divforapplet';
		document.write("<div id='"+slidediv+"' style='position:absolute;left:" + appletXOffset + ";top:" + appletYOffset + ";visibility:"+visibility+"'>");
		// document.write("<div id='divforapplet' style='position:absolute;left:" + appletXOffset + ";top:" + appletYOffset + ";visibility:"+visibility+"'>");
		drawapplet();
		document.writeln("</div>");
		movieDivWritten = true;

	      }
	    else if (a.toLowerCase().indexOf('image:') == 0)
	      {
		image_file = a.substring(6);
		slidediv = 'divforslide' + i;
		document.write("<div id='"+slidediv+"' style='position:absolute;left:" + slideXOffset + ";top:" + slideYOffset + ";visibility:"+visibility+"'>");
		document.write("<img src='"+image_file+"' "+slideImageAttributeString+">");
		document.writeln("</div>");
	      }
	    if (visibility != hidden)
	        visibleSlideDiv = slidediv;
	    visibility = 'hidden';  // all but first hidden
	  }
	document.writeln("</div>");
	// document.writeln("</div>");
      }
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
// var slideshowGoing = false;
var interruptMovie = false;
function startRotate()
  {
	// if (slideshowGoing)
	if (autoplayMode)
		return;
	thisAd=0;
	// slideshowGoing = true;
	autoplayMode = true;
	// alert('start rotate');
        /*
        if (stepVersion == 'setup_step')
	  { if (document.drawApplet)
	     { document.drawApplet.restartActiveReplay();
	       // alert('ask to restart');
             }
	  }
	*/
	interruptMovie = true;
	rotate();
  }

var pauseAfterChange = false;
var manualSlide = -1;

var manualMode = false;  //// what do we want
function manualToSlide(slidenum) {
        // alert('man ' + slidenum + ' ' + autoplayMode);
	if (!autoplayMode)
	  { // alert('man ' + slidenum);
	    manualMode = true;
	    manualSlide = slidenum;
	    thisAd = manualSlide;
	    rotate(true);
	    // toSlide(slidenum);
	  }
}

function manualOut(slidenum) {
	if (manualSlide == slidenum) {
		manualMode = false;
		// setTimeout("rotate()",2000);
	}
}

var moviePlaying = false;
var movieCheckInterval = 500;

function delayedStartRotate()
  { setTimeout('startRotate()',timePerSlide);
  }

var stepPlaying;

var visibleSlideIsForAutoplay = false;

function rotateb(rotateOnlyOnce)
  {
            // alert('rotateb ' + rotateOnlyOnce + moviePlaying);
	    if (!autoplayMode && !rotateOnlyOnce)  // autoplay mode ended - so
						   // do not do anything
                return;
	    if (!rotateOnlyOnce && moviePlaying) {
		    if (interruptMovie) {
		      // go ahead and rotate now
		    }
		    else if (document.drawApplet.getReplayStepReached() != stepPlaying) {
			    // alert('movie done playing');
			    moviePlaying = false;
			    // setTimeout("rotate()", timePerSlide);
			    if (thisAd < imgCt && adImages[thisAd].toLowerCase().indexOf('image:')==0)
			      { setTimeout("rotate()", pauseBetweenMovieAndSlide);
			        return;
			      }
		    }
		    else {
			    setTimeout("rotate()", movieCheckInterval);
			    return;
		    }
		    // alert('movie rotate');
		    // return;
	    }
            interruptMovie = false;

	    var newSlideDiv;

	    // alert('rotateb ' + thisAd);
	    if (thisAd >= imgCt)
	      { autoplayMode = false;
		// slideshowGoing = false;
	        return;
	      }
	    // highlightStep(thisAd,true);
	    if (imageOperation[thisAd])
	        highlightStep(imageOperation[thisAd],true,null);
	    else
	        highlightStep(imageStep[thisAd],true,thisAd);
	    scrollToStep(thisAd);
	    // alert('rotabeb ' + thisAd);
	    if (setupCaptionDiv) {
		    // alert('captionbbb ' + imageCaptionManual[thisAd]);
		    if (autoplayMode)
		        showCaptionInDiv(imageCaptionAuto[thisAd],setupCaptionDiv);
		    else
		        showCaptionInDiv(imageCaptionManual[thisAd],setupCaptionDiv);
		    // alert('showing setup caption ' + imageCaption[thisAd]);
	    }

	    var s = adImages[thisAd];
	    // alert('sss ' + thisAd + ' ' + s);

	    if (s.toLowerCase().indexOf('movie:')==0)
	      { newSlideDiv = "divforapplet";
	        if ((newSlideDiv != visibleSlideDiv) || (visibleSlideIsForAutoplay != autoplayMode))
	          { document.drawApplet.restartActiveReplay();
                    // alert('here');
                  }
	        step = s.substring(6);
		showMovieStep(step);
		moviePlaying = true;
		stepPlaying = step;
	      }
	    else
	      { newSlideDiv = "divforslide"+thisAd;
		moviePlaying = false;
	      }

	    if (newSlideDiv != visibleSlideDiv)
	      { if (visibleSlideDiv)
			changeState(visibleSlideDiv, "hidden");
		visibleSlideDiv = newSlideDiv;
		changeState(visibleSlideDiv, "visible", true);
	      }
	    visibleSlideIsForAutoplay = autoplayMode;

	    highlightSlideMarker(thisAd);
	    
	    if (autoplayMode)
		    thisAd++;
	    if (!rotateOnlyOnce) {
		    // alert('set timeout ' + moviePlaying + ' ' + timePerSlide);
		    if (moviePlaying) 
			    setTimeout("rotateb()", movieCheckInterval);
		    else
			    setTimeout("rotateb()", timePerSlide);
		    // setTimeout("rotate("+timePerSlide+")", timePerSlide);
	    }
  }

function rotate(rotateOnlyOnce) {
        if (stepVersion == 'setup_step')
	  { rotateb(rotateOnlyOnce);
	    return;
	  }
	// alert('rotate ' + thisAd + ' ' +  !rotateOnlyOnce);
	if (!rotateOnlyOnce && moviePlaying) {
		if (document.drawApplet.replayDone()) {
			// alert('movie done playing');
			moviePlaying = false;
			setTimeout("rotate()", timePerSlide);
		}
		else {
			setTimeout("rotate()", movieCheckInterval);
		}
		// alert('movie rotate');
		return;
	}

	if (!newStyleCaptions || showSetupCaptions)
		showCaption('');

	if (newStyleCaptions && setupVersion != 'setupShow')
		emptyAllCaptions();

	if (document.images) {
		//                       //thisAd++//////;
		if (thisAd >= imgCt) {
			if (newStyleCaptions && setupCaptionDiv && thisAd == imgCt) { 
				showCaptionInDiv(imageCaption[thisAd],setupCaptionDiv);
			}
			// slideshowGoing=false;
			highlightStep(0);
			if (callWhenSlideshowDone)
				callWhenSlideshowDone();
				// this case foolishly does not include the timeAfterLastSlide 
				// timeout - to get that timeout, use the function 
				// setDelayedCallWhenSlideshowDone
			else if (opener)
			   setTimeout("self.close()", timeAfterLastSlide);
			else if (summary.showFrameDefault)
			   setTimeout("location.replace(summary.showFrameDefault)", timeAfterLastSlide);
			// alert('show done');
		}
		else  {
			// alert('adim ' + adImages[thisAd]);
			if (newStyleCaptions && setupVersion == 'setupShow')
				emptyAllCaptions();
			if (setupVersion == 'setupShow' || document.adBanner) { 
				if (!highlightStep(imageStep[thisAd]) || !pauseAfterChange) { 
					// this is for something Randy wanted
					// showCaption(imageCaption[thisAd]);  

					// fixed bug 2-18: caption should be local var
					if (!newStyleCaptions || showSetupCaptions) { 
						var caption = '';

						if (showSetupCaptions)
							caption = imageCaption[thisAd];

						if (caption != '')
							caption += '<br>';

						// if (showStepDescriptionCaptions)
						// caption += opener.stepDescription[imageStep[thisAd]];
						showCaption(caption);
					}

					if (newStyleCaptions) { 
						if (setupCaptionDiv) {
							showCaptionInDiv(imageCaption[thisAd],setupCaptionDiv);
							// alert('showing setup caption ' + imageCaption[thisAd]);
						}

						for (var i = 1; i <= 2; i++) { 
							if (stepCaptionDiv.length > i && stepCaptionDiv[i])
								showCaptionInDiv(getStepDescription(i,imageStep[thisAd]),stepCaptionDiv[i]);
						}
					}

					if (writeSlideDivs) { 
						if (visibleSlideDiv)
							changeState(visibleSlideDiv, "hidden");

						if (thisAd == movieImageIndex)
						  { // do not expect to get here under manual control
						    visibleSlideDiv = "divforapplet";
						    startMovie();
						  }
						else
						  { visibleSlideDiv = "divforslide"+thisAd;
						  }
						changeState(visibleSlideDiv, "visible", true);
					}
					else
						document.adBanner.src=adImages[thisAd];

					highlightSlideMarker(thisAd);
					// if (!manualMode)
					if (autoplayMode)
						thisAd++;
				}
			}
			// else if (document.all.adBanner)
				// document.all.adBanner.src=adImages[thisAd];

			if (!rotateOnlyOnce) {
				if (moviePlaying) 
					setTimeout("rotate()", movieCheckInterval);
				else
					setTimeout("rotate()", timePerSlide);
				// setTimeout("rotate("+timePerSlide+")", timePerSlide);
			}
		}
	}
}

var highlightedStep = null;
var highlightedSecondary = null;
var highlightedStepNumber = 0;

// var oldColor = 'white';
// var oldBackground = '#CC0066';
// var oldWeight = 'normal';
// var oldClass;

function writeMessageDiv(id,width,height,attributeString,initialMessage,styleString) { 
	document.writeln("<div id='" + id + "' style='position:absolute;width="
						  + width + ";height=" + height + ";" + styleString 
						  + "' " + attributeString + ">" + initialMessage 
						  + "</div>");
}

function showCaption(caption) { 
// this function is for old style captions
	var captionArea;

	captionArea = eval("document" + layer + openbrace + captionAreaName + closebrace);
	if (!captionArea)
		captionArea = eval("document" + layer + openbrace + "loadingmsg" + closebrace);

	if (captionArea)
		captionArea.innerHTML = caption;
}

var loadingMessageDiv = 'loadingmsg';
var newStyleCaptions = false;
function setLoadingMessageDiv(divname)
  { loadingMessageDiv = divname;
    newStyleCaptions = true;
  }

var setupCaptionDiv = '';
var gdrawCaptionDiv = '';
function setSetupCaptionDiv(divname)
  { setupCaptionDiv = divname;
    newStyleCaptions = true;
  }

function setGdrawCaptionDiv(divname)
  { gdrawCaptionDiv = divname;
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

function showCaptionInDiv(msg,id)
  { 

    if (stepVersion == 'setup_step')
      { showMessageInDiv(msg,id);
      }
    else if (setupVersion == 'setupShow')
      { if (msg && (!autoplayMode || !noCaptionsDuringAutoplay))
	    showMessageInDiv(msg,id);
      }
    else
	showMessageInDiv(msg,id);
	  
  }
function showMessageInDiv(msg,id) { 
	if (id == captionDiv)
	    loadingMsgMightBeThere = false;
	var div = eval("document" + layer + openbrace + id + closebrace);
	if (div) {
		if (msg && msg.toLowerCase().indexOf('restart:')==0) {
			div.innerHTML = '<br>' + restartButtonHTML(msg.substring(8),400,100);
		}
		else {
			div.innerHTML = msg;
		}
	}
}

function emptyMessageDiv(id) { 
	// alert('empty ' + id);
	showMessageInDiv('',id);
}

function emptyAllCaptions()
  { emptyMessageDiv(loadingMessageDiv);
    emptyMessageDiv(setupCaptionDiv);
    emptyMessageDiv(gdrawCaptionDiv);
    if (stepCaptionDiv.length > 1)
        emptyMessageDiv(stepCaptionDiv[1]);
    if (stepCaptionDiv.length > 2)
        emptyMessageDiv(stepCaptionDiv[2]);
  }

var highlightedSlideMarker = null;
var highlightedSlideMarkerElt = null;
var showSlideMarkers = false;

function highlightSlideMarker(slide) { 
	if (!showSlideMarkers)
		return false;

	var newSlideMarker = 'slidemarker' + slide;
	if (highlightedSlideMarker == newSlideMarker)
		return false;

	if (highlightedSlideMarkerElt) {
		highlightedSlideMarkerElt.className = 'unhighlightedSlideMarker';
	}

	var trial = self;
	if (top.frames.stepListFrame)
		summary = top.frames.stepListFrame;

	while (!summary && trial && trial.document) { 
		if (eval("trial.document" + layer + 
					openbrace + newSlideMarker + closebrace))
			summary = trial;
		else
			trial = trial.opener;
	}

	if (!summary)
		return false;

	highlightedSlideMarkerElt = null;
	highlightedSlideMarker = newSlideMarker;

	highlightedSlideMarkerElt = eval("summary.document" + layer + openbrace + 
												highlightedSlideMarker + closebrace);
	if (highlightedSlideMarkerElt) {
		highlightedSlideMarkerElt.className = 'highlightedSlideMarker';
	}
	else
		highlightedSlideMarker = null;
}

var summary;
var scrollShowAbove = 1;
var scrollSteps = false;
var scrollDiv = '';

var stepHighlightCallbacks = new Array();

function addStepHighlightCallback(fcn) { 
	stepHighlightCallbacks[stepHighlightCallbacks.length] = fcn;
}

function callStepHighlightCallbacks(step) { 
	for (var i = 0; i < stepHighlightCallbacks.length; i++) { 
		stepHighlightCallbacks[i](step);
	}
}

function topWRT(elt,container)
  { var r = 0;
    e = elt;
    for (var i = 0; i < 100; i++)
      {
	r += e.offsetTop;
	e = e.offsetParent;
	if (e == container || !e)
	  {  return r;
	  }
      }
    return r;  // should never happen
  }

// returns true if highlights a new step
function highlightStep(snum,even_highlight_zero,imageIx) { 
	//RTD
	// alert('highlighting step ' + snum);


	var newStep = 'step' + snum;
	var newSecondary = '';
	if (imageIx || (imageIx == 0))
	  { newSecondary = 'step' + imageIx;
	    if (newSecondary == newStep)
	        newSecondary = '';
	  }
	if (highlightedStep == newStep && newSecondary == highlightedSecondary)
		return false;

	var trial = self;
	if (top.frames.stepListFrame)
		summary = top.frames.stepListFrame;

	while (!summary && trial && trial.document) { 
		if (eval("trial.document" + layer + openbrace + newStep + closebrace))
			summary = trial;
		else
			trial = trial.opener;
	}

	if (!summary)
		return false;

	if (highlightedStep) { 
		var hs = eval("summary.document" + layer + openbrace + highlightedStep + closebrace)

		if (hs && hs.length) { 
			for (var i = 0; i < hs.length; i++)
				hs[i].className='unhighlighted';
		}
		else if (hs) {
			hs.className = 'unhighlighted';
			par = hs;
			while (par) {
				// alert('par ' + par.tagName + ' ' + par.className);
				if (par.tagName.toLowerCase() == 'li') {
					par.className = par.className.replace(/_highlighted$/,'');
					break;
				}
				par = par.parentElement;
			}
		}

		highlightedStep = null;
	}
	if (highlightedSecondary) {
		var hsec = eval("summary.document" + layer + openbrace + highlightedSecondary + closebrace)
		hsec.className = 'unhighlighted';
	}
	 

	highlightedStepNumber = snum;

	highlightedSecondary = newSecondary;

	if (snum || even_highlight_zero ) { 
		highlightedStep = newStep;
		if (scrollSteps) { 
			var scrollTo = summary.stepIx[newStep]-scrollShowAbove;
			// alert(newStep + ","+summary.stepIx[newStep] + "," +scrollTo);

			if (scrollTo >= 0)
				scrollTarget = "a"+summary.stepIDs[scrollTo];
			else
				scrollTarget = "steps";

			// alert(scrollTarget);
			summary.location.hash=scrollTarget;
		}

		var hs = eval("summary.document" + layer + openbrace + highlightedStep + closebrace)
		var hsec = eval("summary.document" + layer + openbrace + highlightedSecondary + closebrace)
		if (hsec && hsec != hs)
		    { hsec.className = 'semihighlighted';
		      // alert('semihighlighted ' + hsec.id);
		    }

		var hs1 = hs;
		if (hs && hs.length) { 
			hs1 = hs[0];
			for (var i = 0; i < hs.length; i++) {
				hs[i].className='highlighted';
				// alert('hi');
			}
		}
		else if (hs) {
			// alert('hs ' + hs.tagName + ' ' + hs.className + ' ' + hs.id);
			hs.className = 'highlighted';
			// alert('hello');

			// par = hs.parentElement;
			par = hs;
			while (par) {
				// alert('par ' + par.tagName + ' ' + par.className);
				if (par.tagName.toLowerCase() == 'li' && !(/highlighted/.test(par.className))) {
					par.className = par.className + '_highlighted';
					break;
				}
				par = par.parentElement;
			}
			  
		}

		/*
		if (hs1 && scrollDiv && autoplayMode) {
			var sdiv = document.all[scrollDiv];
			if (sdiv) {
				var sheight = sdiv.offsetHeight;
				var spos = topWRT(hs1,sdiv);
				// alert('sdiv ' + sdiv.id + ' spos ' + spos + ' sheight ' + sheight);
				sdiv.scrollTop = spos - sheight/2;
			}

		}
		*/
		callStepHighlightCallbacks(snum);
		return true;
	}

	callStepHighlightCallbacks(snum);
	return false;
}

function scrollToStep(stepIx)
  {
      stepID = 'step'+stepIx;
      // var selt = eval("summary.document" + layer + openbrace + highlightedStep + closebrace)
      var selt = eval("summary.document" + layer + openbrace + stepID + closebrace)
      // alert('scroll ' + stepID + selt);
      if (selt && scrollDiv && autoplayMode)
        { var sdiv = document.all[scrollDiv];
	  if (sdiv)
	    { var sheight = sdiv.offsetHeight;
	      var spos = topWRT(selt,sdiv);
	      // alert('sdiv ' + sdiv.id + ' spos ' + spos + ' sheight ' + sheight);
	      sdiv.scrollTop = spos - sheight/2;
	    }

        }
  }

var stepDescriptionMap = new Object();
var stepDescriptions = new Array();
stepDescriptions[1] = new Object();  // Set up to store the two descriptions supplied for each step to stepb
stepDescriptions[2] = new Object();
var stepID = 'xxxxx';
var stepIDs = new Array();
var stepIx = new Object();

//// CCCC change to return null, and then handle null....
function getStepDescription(i,step)
  { var d = stepDescriptions[i][step];
    if (d)
        return d;
    else
        return '';
  }

// function operation_step(stepLabel,description1,description2,imageIx) { 
	// stepab('b',stepLabel,description1,description2,'operation',imageIx);
// }
function movie_step(stepLabel,description1,description2,imageIx) { 
	stepab('b',stepLabel,description1,description2,'movie',imageIx);
}

function slide_step(stepLabel,description1,description2,imageIx) { 
	stepab('b',stepLabel,description1,description2,'slide',imageIx);
}

function stepb(stepLabel,description1,description2,imageIx) { 
	stepab('b',stepLabel,description1,description2,'',imageIx);
}

function stepa(stepLabel,description)
  { stepab('a',stepLabel,description,'','');
  }

var stepabDescriptionToShowInline = 1;

// which should be 1 or 2
function setStepDescriptionToShowInline(which) { 
	stepabDescriptionToShowInline = which;
}

function setSlideMarker(markerHTML)
  { slideMarker = markerHTML;
    showSlideMarkers = true;
  }

var slideMarker ='&gt;';
var enableManualSlideshowViaStepb = false;
var enableMovieControlViaStepb = false;

var lineOfDots = ".&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.";
var lineOfSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

function operation_step(stepLabel,description,description2,imageIx)
  {
	// alert('os' + stepLabel);
	var stepID = 'step' + stepLabel;
        // alert("<span id='" + stepID + "' class=unhighlighted>" + description + "</span>");
        document.write("<span id='" + stepID + "' class=unhighlighted>" + description + "</span>");
  }

function stepab(version,stepLabel,description1,description2,movie_or_slide,imageIx) {  
	var description = description1;
	if (!imageIx && imageIx != 0)
	  { imageIx = stepLabel;
	  }
	movie_or_slide = movie_or_slide.toLowerCase();
	if (version == 'b') { 
		if (stepabDescriptionToShowInline == 2)
			description = description2;
	}

	stepLabel = "" + stepLabel;

	if (stepLabel.toLowerCase().indexOf('step') == 0)
		stepLabel = stepLabel.substring(4);
	// if (movie_or_slide == 'operation')
	  // { stepLabel = 'operation_' + stepLabel;
	  // }

	stepDescriptionMap[stepLabel] = description1;

	if (version == 'b') { 
		stepDescriptions[1][stepLabel] = description1;
		stepDescriptions[2][stepLabel] = description2;
	}

	if (stepVersion == 'setup_step')
	    stepID = "step"+imageIx;
	else
	    stepID = "step"+stepLabel;
	stepIx[stepID] = stepIDs.length;
	stepIDs[stepIDs.length] = stepID;

	var imagesForThisStep = 0;
	var controlString = '';
	var firstImage = -1;
	var slidemarkerSuffix = '';

	if (movie_or_slide == 'operation') {
		controlString = '';
	}
	else if (stepVersion == 'setup_step') {
	  
		// controlString = " onMouseOver='requestStep(\"" + stepLabel + "\")'";
		// slidemarkerSuffix = stepLabel;
		controlString = " onMouseOver='requestStep(\"" + imageIx + "\")'";
		slidemarkerSuffix = "" + imageIx;
		/*
		for (var i = 0; i < imgCt; i++) { 
			if (imageStep[i] == stepLabel) { 
				controlString = " onMouseOver=\"requestStep(" + i + ");\"";
				firstImage = i;
				slidemarkerSuffix = i;
				break;
			}
		}
		*/
	}
	// no manual control if movie_or_slide == 'both'
	// if (movie_or_slide == 'slide' || (movie_or_slide != 'both' && enableManualSlideshowViaStepb)) { 
	else if (movie_or_slide != 'both' && movie_or_slide != 'movie' && enableManualSlideshowViaStepb) { 
		// showSlideMarkers = true;
		for (var i = 0; i < imgCt; i++) { 
			if (imageStep[i] == stepLabel) { 
				controlString = " onMouseOver=\"manualToSlide(" + i + "); \" onMouseOut=\"manualOut("+i+")\" ";
				firstImage = i;
				slidemarkerSuffix = i;
				break;
			}
		}
	}
	// else if (enableMovieControlViaStepb) 
	// else if (movie_or_slide == 'movie' || (movie_or_slide != 'both' && enableMovieControlViaStepb)) { 
	else if (movie_or_slide != 'both'&& movie_or_slide != 'slide'  && enableMovieControlViaStepb) { 
		// showSlideMarkers = true; //// do we want this here??
		controlString = " onMouseOver='requestMovieStep(\"" + stepLabel + "\")'";
		slidemarkerSuffix = stepLabel;
		// do we need to do anything with the slide markers here?????
	}

	// <span> replaces <a>
	// if (stepVersion=='setup_step' &&  (""+imageIx) != (""+stepLabel))
	    // document.write('<br>');
	document.write("<span" + controlString + ">");

	if (enableManualSlideshowViaStepb && slidemarkerSuffix && (setupVersion != 'setupShow' || showSlideMarkers)) {
		document.write("<span id='slidemarker"
							+ slidemarkerSuffix
	                  + "' class='unhighlightedSlideMarker'>"
							+ slideMarker
							+ "&nbsp;</span>");
	}

	// if (stepVersion=='setup_step' && (imageIx || imageIx == 0) && (""+imageIx) != (""+stepLabel))
	if (stepVersion=='setup_step' &&  (""+imageIx) != (""+stepLabel))
	  { description = lineOfDots;
	  }
	  /*
	  { document.write("<span>");
	    // document.write(".&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.");
	    document.write(lineOfDots);
	    document.write("</span>");
	  }

	else
	*/
        document.write("<span id='" + stepID + "' class=unhighlighted>" + description + "</span>");

	if (document.all) { 
		var sss = document.all["step" + stepLabel];

		// multiple calls to stepa with same label leads to this case
		if (sss.length)
	   	sss[sss.length-1].className = 'unhighlighted';
		else
			sss.className='unhighlighted';
	}

	document.write("</span>");

	if (stepVersion != 'setup_step' && movie_or_slide != 'both' && enableManualSlideshowViaStepb && firstImage >= 0) {
		var prevImg = adImages[firstImage];

		for (var i = 0; i < imgCt; i++) {
			if (i != firstImage && 
				 imageStep[i] == stepLabel && adImages[i] != prevImg) {
				controlString = " onMouseOver=\"manualToSlide(" + i 
									 //+ "); changeState('slidemarker" + i 
									 //+ "', 'visible');\" onMouseOut=\"manualOut(" 
									 + ");\" onMouseOut=\"manualOut(" 
									 + i + ");\"";

				document.write("<br><span" + controlString + " >");

				document.write("<span id='slidemarker" + i
									+ "' class='unhighlightedSlideMarker'>"
									+ slideMarker + "&nbsp;</span>");

/*
				if (i == imgCt-1)
					document.write("final view");
				else
*/
					document.write(".&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.");

				document.write("</span>");
				prevImg = adImages[i];
			}
		}
	}
}

function requestStep(step) { 
  // alert('request step ' + step);
  autoplayMode = false;  // omit this to disable stopping autoplay with mouse
  if (!autoplayMode)
    { thisAd = step;
      rotateb(true);
    }
}

function showMovieStep(step)
  {
	// alert('show movie step ' + step);
	if (document.drawApplet)
	  { document.drawApplet.requestReplayStep(step);
	  }
  }

function requestMovieStep(step) { 
  if (switchShowBackToMouse)
    { autoplayMode = false;
      switchShowBackToMouseControl();
      switchShowBackToMouse = false;
    }
  if (!autoplayMode)
    {
        if (setupVersion == 'setupShow' && visibleSlideDiv  != 'divforapplet')
	  { // make sure movie is visible
	    if (visibleSlideDiv)
		    changeState(visibleSlideDiv, "hidden");

	    visibleSlideDiv = 'divforapplet';
	    changeState(visibleSlideDiv, "visible", true);
	    if (newStyleCaptions) { 
		    if (setupCaptionDiv) {
			    showCaptionInDiv(' ',setupCaptionDiv);  // in case there are no step captions, and no gdraw-file captions
			    					    // blank out any caption that is there
			    // alert('showing setup caption ' + imageCaption[thisAd]);
		    }
	    }
	  }


	changeCaption('step ' + step);
	if (document.drawApplet)
		document.drawApplet.requestReplayStep(step);
   }
}

var wantControlStrip = false;
var controlStripWidth = 0;
var controlStripHeight = 0;
var controlStripTileWidth = 0;
var controlStripTileHeight = 0;
var controlStripImages = [];

function useControlStrip(truefalse)
  { wantControlStrip = truefalse;
  // alert('wcs' + wantControlStrip);
  }

var controlStripVersion = 1;
function setControlStripDimensions(x,y)
  { controlStripWidth = x;
    controlStripHeight = y;
  }

function setControlStripTileSize(x,y)
  { controlStripTileWidth = x;
    controlStripTileHeight = y;
    controlStripVersion = 2;
  }

function setControlStripTile(ix,image_url)
  { controlStripImages[ix] = image_url;
  }

function putControlStripHere()
  { 
    // alert(wantControlStrip+' ' +controlStripWidth + 'cccc' + controlStripHeight);
    if (wantControlStrip && controlStripWidth > 0 && controlStripHeight > 0)
      { 
        writeVerticalSlideshowStripForCyclingB(controlStripWidth,controlStripHeight,controlStripImages);
        // alert('wwwww');
      }
  }

function writeControlStripTile(imgIx,tileWidth,tileHeight) { 

	controlString = " onMouseOver='requestStep(" + imgIx + ")'";
	// document.write("<br>");
	document.write("<a " + controlString + " >");
	operation_src = operationTile[imageOperation[imgIx]];
	// alert("<img width="+tileWidth+" height="+tileHeight+" src='"+operation_src+"'>");
	document.write("<img width="+tileWidth+" height="+tileHeight+" src='"+operation_src+"'>");
	// document.write('tile');
	document.write("</a>");
}

function writeVerticalSlideshowStripForCyclingB(stripWidth,stripHeight) { 
	// var prevImg = null;
	// var prevImageStep = null;
	// var prevImageCaption = null;
	var indivHeight = stripHeight/imgCt;
	// var src = new Array();

	// src[0] = src1;
	// src[1] = src2;
        // j = 0;
	// nsrcs = src.length;
	// prevs = -1;
	cycle = 0;
	// alert('write strip ' + imgCt);
	document.write("<table><tr><td>");

	for (var i = 0; i < imgCt; i++) { 
		// if (adImages[i] != prevImg || imageStep[i] != prevImageStep || 
			 // imageCaption[i] != prevImageCaption) { 
			 // if (i == movieImageIndex)
			controlString = " onMouseOver='requestStep(" + i + ")'";
			/*
			s = imageStep[i];

			if (s < prevs || prevs < 0 || prevs == 0 && s != prevs) { 
				if (prevs >= 0)
					document.write("</td></tr>");
				if (s > 0) { 
					cycle++;
					document.write("<tr><td valign='top'><span style='font-size: 21px;'>Cycle&nbsp;" + cycle + "</span></td><td>");
				}
				else
					document.write("<tr><td valign='top'>&nbsp;</td><td>");
			}
			else
			*/
			document.write("<br>");

			// prevs = s;
			// alert("<a name='a"+stepID+"' " + controlString + " >");
			// document.write("<a name='a"+stepID+"' " + controlString + " >");
			document.write("<a " + controlString + " >");
			// s = j%nsrcs;
			// document.write("<img width="+stripWidth+" height="+indivHeight+" src='"+src[s]+"'>");
			operation_src = operationTile[imageOperation[i]];
			// alert(imageOperation[i]+' src ' + operation_src);
			document.write("<img width="+stripWidth+" height="+indivHeight+" src='"+operation_src+"'>");
			// j++;
			document.write("</a>");
			// prevImg = adImages[i];
			// prevImageStep = imageStep[i];
			// prevImageCaption = imageCaption[i];
		// }
	}

	// if (prevs >= 0)
		// document.write("</td></tr>");
	document.write("</td></tr></table>");
	// document.write("<br>");
}


function writeVerticalSlideshowStripForCycling(stripWidth,stripHeight,src) { 
	var prevImg = null;
	var prevImageStep = null;
	var prevImageCaption = null;
	var indivHeight = stripHeight/imgCt;
	// var src = new Array();

	// src[0] = src1;
	// src[1] = src2;
	j = 0;
	nsrcs = src.length;
	prevs = -1;
	cycle = 0;
	// alert('write strip ' + imgCt);
	document.write("<table>");
	for (var i = 0; i < imgCt; i++) { 
		if (adImages[i] != prevImg || imageStep[i] != prevImageStep || 
			 imageCaption[i] != prevImageCaption) { 
			 // if (i == movieImageIndex)
			controlString = " onMouseOver='manualToSlide(" + i + ")' onMouseOut='manualOut("+i+")' ";
			s = imageStep[i];

			if (s < prevs || prevs < 0 || prevs == 0 && s != prevs) { 
				if (prevs >= 0)
					document.write("</td></tr>");
				if (s > 0) { 
					cycle++;
					document.write("<tr><td valign='top'><span style='font-size: 21px;'>Cycle&nbsp;" + cycle + "</span></td><td>");
				}
				else
					document.write("<tr><td valign='top'>&nbsp;</td><td>");
			}
			else
	      			document.write("<br>");

			prevs = s;
			document.write("<a name='a"+stepID+"' " + controlString + " >");
			// s = j%nsrcs;
			document.write("<img width="+stripWidth+" height="+indivHeight+" src='"+src[s]+"'>");
			j++;
			document.write("</a>");
			prevImg = adImages[i];
			prevImageStep = imageStep[i];
			prevImageCaption = imageCaption[i];
		}
	}

	if (prevs >= 0)
		document.write("</td></tr>");
	document.write("</table>");
	// document.write("<br>");
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
var captionAreaName = "caption";  // this is used for old style captions
// var captionAreaName = "captionArea";
// var captionLayerName = "captionLayer";
// var captionApplet1;
// var captionApplet2;
var showCaptionCaptions = false; // this is used for old style captions
var drawAppletFolder;
if (!drawAppletFolder)
    drawAppletFolder = "../nickb";


var params = "";
var replayCab = "/gdrawreplay.cab";
var drawCab = "/gdrawdraw.cab";
var jarFile = "/gdrawreplay.jar";
var suppressDrawingUntilReplay = "false";
var supplyCaptions = "false";
var replayControl = "playstep";
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
// alert('debug ' + debug);
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

	var appletXOffset = 0;
	var appletYOffset = 0;
	var slideXOffset = 0;
	var slideYOffset = 0;

	function slidePositionAdjustment(x,y)
          { slideXOffset = x;
            slideYOffset = y;
	  }

	function appletPositionAdjustment(x,y)
          { appletXOffset = x;
            appletYOffset = y;
	  }

	function setAppletDrawingSize(width,height)
          { SetDrawingSize(width,height);
	  }
	function SetAppletDrawingSize(width,height)
          { SetDrawingSize(width,height);
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

function updateCaption() { 
// This is repeatedly called with a timeout to drive the updating of captions
// It handles only movie captions, from the applet
	var applet1 = document.applets[captionApplet ? captionApplet : appletName];

	// testing a variable whose value tests true after loading seems
	//  to work to see if applet has loaded
	//   - undefined if not available
	// if (document.drawApplet && document.drawApplet.m_max_canvas_width)

	if (applet1) {  
		if (applet1.replayDone()) { 
			if (setupVersion != 'setupShow')
			    changeCaption("Step 0");
			setTimeout('updateCaption()',500);
		}
		else if (applet1.checkForNewCaption()) { 
			// changeCaption(captionArea,"Step 0"); put this back if want 
			// blankTime > 0 - but then blanks for displaying non step number 
			// captions - we don't know what kind of caption it is here...

			if (loadingMsgMightBeThere) {
					// alert('might be hi');
				loadingMsgMightBeThere = false;
				if (!newStyleCaptions || showCaptionCaptions)
					showCaption('');

				if (newStyleCaptions && !putCaptionUsed)
				   { 	
				        emptyAllCaptions();
				   }
				// alert('might be xxbye');
			}

			// setTimeout('displayCaption()',blankTime);
			displayCaption();
		}
		else
			setTimeout('updateCaption()',50);
	}
	else
		setTimeout('updateCaption()',500);
}

function displayCaption() { 
	// This is for captions from the applet, not slideshow captions
	// This handles changing the step highlighting as well as displaying captions
	var applet1 = document.applets[captionApplet ? captionApplet : appletName];
	var oldHighlightedStepNumber = highlightedStepNumber;

	changeCaption(captionStart + applet1.currentCaption() + captionEnd);
	if (highlightedStepNumber > oldHighlightedStepNumber)
		setTimeout('continueReplay()',pauseAfterNewCaptionTime);
	else
		continueReplay();
}

function continueReplay() {
	document.applets[captionApplet ? captionApplet : appletName].continueReplay();
	setTimeout('updateCaption()',50);
}

// In this version of drawfunctions, changeCaption is being used for 
// highlighting step numbers using highlightStep from slideshow.js

//  This needs to be cleaned up and integrated with other uses of changeCaption
//  To turn off highlighting, set text to "Step 0"
//  Captions that do not start with "Step" (case arbitrary) are ignored

//function changeCaption(captionArea, text)   
function changeCaption(text) {
	var stepNum = '';
	var stepFound = false;

	if ((text.length > 5) && text.substring(0,4).toLowerCase() == 'step') { 
		stepNum = parseInt(text.substring(4));
		stepFound = true;
	}

	if (stepFound && !isNaN(stepNum)) { 
		onunload=highlightStep;
		highlightStep(stepNum);
		highlightSlideMarker(stepNum);
		if (newStyleCaptions) {
			for (var i = 1; i <= 2; i++) { 
				// if (stepCaptionDiv.length > i && stepCaptionDiv[i] && showStepbCaptions)
				if (stepCaptionDiv.length > i && stepCaptionDiv[i])
					showCaptionInDiv(getStepDescription(i,stepNum),stepCaptionDiv[i]);
			}
		}
	}
	else {
		if (gdrawCaptionDiv)
			showCaptionInDiv(text,gdrawCaptionDiv);

		if (showCaptionCaptions)  // this is used for old style captions
			showCaption(text); // showCaption is in the slideshow file
	}
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

var autoplayMode = false;
var switchShowBackToMouse = false;
function switchShowBackToMouseControl()
  { if (document.drawapplet)
         document.drawApplet.setReplayControl('playstep',true);
  }


function switchShowBackToMouseControlWhenMouseDetected()
  { autoplayMode = false;
    switchShowBackToMouse = true;  // don't actually switch until mouse detected
  }

function switchShowBackToMouseControlWhenReplayDone()
  { 
  
   callWhenSlideshowDone = switchShowBackToMouseControlWhenMouseDetected;
   /*
   if (document.drawApplet.replayDone())
     { autoplayMode = false;
       switchShowBackToMouse = true;  // don't actually switch until mouse detected
     }
   else
     { setTimeout('switchShowBackToMouseControlWhenReplayDone()',500);
     }
     */
  }

// function autoPlayMovieThenMouseControl()
function autoplayShowThenMouseControl()
  { autoPlayShowThenMouseControl();
  }
function autoPlayShowThenMouseControl()
 { // start autoplay show
   if (!autoplayMode)
     { // autoplayMode = true;
       emptyAllCaptions();
       switchShowBackToMouse = false;
       if (document.drawApplet && stepVersion != 'setup_step')
	   document.drawApplet.setReplayControl('timed',true);
       // document.drawApplet.requestReplay();
       startRotate();
       if (document.drawApplet && stepVersion != 'setup_step')
           setTimeout('switchShowBackToMouseControlWhenReplayDone()',2000);
     }
 }

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
function drawapplet() {
  setupApplet();
  // alert(appletString(222,333));
  document.write("<div style='position:relative' align='left'>");
  document.write("<div id='appletdiv' style='position:relative'>"
          + appletString(appletWidth,appletHeight) + "</div>");
  document.writeln("<div align='"+slideshowAfterAppletAlign+"' id='slideshowatapplet' style='position:absolute;left:0;top:0;width:100%;visibility:hidden'>");

  var wh='';
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

  if (resizeIfNecessary)
      fixAppletSize();
}


function appletString() {
   return "<applet code='gdraw.class' archive='" + drawAppletFolder+jarFile + "' align='baseline' width=\""
	+appletWidth
	+ "\" height=\""
	+appletHeight
	+ "\" name='" + appletName + "'><param name='CABBASE' value='" + cabFile + "'>"
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
	+ "\"><param name='ReplayControl' value=\""
	+ replayControl
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
	+ "\"><param name='BackgroundR' value=\""
	+ backgroundR
	+ "\"><param name='BackgroundG' value=\""
	+ backgroundG
	+ "\"><param name='BackgroundB' value=\""
	+ backgroundB
	+ "\"><param name='InputFile' value=\""
	+ inputFileName
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

// function slideshowAndMovieParams()
  // { drawAppletFolder='.';
  // }

var allowManualControl = false;

function allowManualControlViaSteplist(truefalse)
  {  if (truefalse)
       { replayWhenLoaded = true;
	 replayControl = 'playstep';
	 allowManualControl = true;
	 enableManualSlideshowViaStepb = true;
	 enableMovieControlViaStepb = true; 
       }
  }
function allowManualControlViaControlStrip(truefalse)
  {  if (truefalse)
       { replayWhenLoaded = true;
	 replayControl = 'playstep';
	 allowManualControl = true;
	 useControlStrip(true);
       }
  }
function startAutoPlayWhenLoaded(truefalse) // alternate capitalization
  { startAutoplayWhenLoaded(truefalse);
  }
function startAutoplayWhenLoaded(truefalse)
  {  if (truefalse)
         setCallOnDocumentLoad(startAutoplay);
  }
function startAutoplay()
  { // alert('start autoplay');
    if (allowManualControl)
     { autoPlayShowThenMouseControl();
     }
    else
      { replayControl = 'timed';
	// autoplayMode = true;
        emptyAllCaptions();
	// setCallOnDocumentLoad(delayedStartRotate);
	startRotate();
      }
  }

function setScrollDiv(divname)
  { scrollDiv = divname;
  }

function scrollScrollDivToTop()
  { if (scrollDiv)
      { var sdiv = document.all[scrollDiv];
        if (sdiv)
	    sdiv.scrollTop = 0;
      }
  }

function setAppletURL()
  { drawAppletFolder='.';
    replayCab = "/gdrawreplay1-3-24.cab";
    jarFile = "/gdrawreplay1-3-26.jar";
  }

function setDelayedCallWhenSlideshowDone(fcn)
  { callWhenSlideshowDone = function () { setTimeout(fcn,timeAfterLastSlide);};
  }

function startMovie()
  { 
   if (newStyleCaptions) { 
	   if (setupCaptionDiv) {
		   showCaptionInDiv(' ',setupCaptionDiv);  // in case there are no step captions, and no gdraw-file captions
							   // blank out any caption that's there
		   // alert('showing setup caption ' + imageCaption[thisAd]);
	   }
    }
    document.drawApplet.requestReplay();
    moviePlaying = true;
    // alert('movie starting to play');
  }

function startMovieWhenLoaded()
  { replayWhenLoaded = true;
    // alert('start movie when loaded');
    moviePlaying = true;
    // alert('movie starting to play');
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

function showWhenReady(name)
  {  setCallOnDocumentLoad( function () { changeState(name,'visible',true) } );
  }
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

/***********************************************************************
 * general purpose functions to hide and show positionable elements
 **********************************************************************/

/***********************************************************************
 * new hide/show functions simply call updated changeState function -
 * old functions commented out below
 *
 * (R. Dugan 06/20/2002)
 **********************************************************************/

function hideElement(eltid) {
	changeState(eltid, 'hidden');
}

function showElement(eltid) {
	changeState(eltid, 'visible', true);
}

/*
// The netscape functionality of the following two functions has not yet been 
// tested (2-23-02) and may not work.
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
*/

//****************************************************************
// fEleven   - randy Oct 2006
//
// opens a window similar appearance to f11 key, loads in calling page
// built for LN.org site
// 
// PARAMETERS:
//   none
//
// RETURNS: Nothing
//****************************************************************
// set how fast to expand horizontally
// lower is slower
var speedX = 1000;

// set how fast to expand vertically
// lower is slower
var speedY = 1000;

// set background color of "Loading..." screen
var bgColor = "#666666";

// set text color of "Loading..." screen
var txtColor = "#FF80000";

// do not edit below this line
// ---------------------------
var wide = window.screen.availWidth;
var high = window.screen.availHeight;
var testwindow = "";
function fEleven() {
if(opener) { alert("This window is already on full screen view");
} 
else
{
var testwindow = window.open("","BoomWindow","location=no,status=no,directories=no,scrollbars=1,toolbar=yes,resizable=yes");
testwindow.document.write('<HTML><BODY BGCOLOR='+bgColor+' SCROLL=NO><FONT FACE=ARIAL COLOR='+txtColor+'>Loading...</FONT></BODY></HTML>');
testwindow.focus();
testwindow.moveTo(0,0);
for (H=1; H<high; H+= speedY) {
testwindow.resizeTo(1,H);
}
for (W=1; W<wide; W+= speedX) {
testwindow.resizeTo(W,H);
}
testwindow.location = self.location;
window.opener='x';
window.close();
}
}


//****************************************************************
// moveParent   - randy Oct 2006
//
// onload, If there is a parent, moves that to childs location
// built for LN.org site
// 
// PARAMETERS:
//   none
//
// RETURNS: Nothing
//****************************************************************

function moveParent() {
var URLOC = self.location;
if(opener && !opener.closed) {
opener.location = URLOC;
testwindow.focus();
}
}

//****************************************************************
// makeSmaller   - randy Oct 2006
//
// to be used on full screen window - reduces to smaller view
// 
// 
// PARAMETERS:
//   none
//
// RETURNS: Nothing
//****************************************************************

function makeSmaller () {
if (opener)  {
self.resizeTo(500,400);
self.moveTo(100,100);
}
}

