//////////////////////////////////////////////////////////////////////
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
//  highlightColor specifies the color to change the text to when a step is highlighted
//  highlightBackground specifies the color to change the background to when a step is highlighted
//  highlightWeight specifies the weight to change the text to when a step is highlighted
//  Set any of these to null to turn off that particular form of highlighting
///////////////////////////////////////////////////////////////////////
var showSetupCaptions = false;
var showStepDescriptionCaptions = false;
var showStepTitleCaptions = false;
var highlightColor = '66FFFF';
//was yellow//
var highlightBackground = 'cc0066';
//was ff0099//
var highlightWeight = 'normal';

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
    thisAd = -1
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
var timePerSlide = 2000;
var timeAfterLastSlide = 2000;
function rotate() {
	showCaption('');
	if (document.images) {
		thisAd++;
		if (thisAd >= imgCt) {
			highlightStep(0);
			setTimeout("self.close()", timeAfterLastSlide)
		}
		else  {
		    highlightStep(imageStep[thisAd]);
		    // showCaption(imageCaption[thisAd]);  // this is for something Randy wanted
		    caption = '';
		    if (showSetupCaptions)
		    	caption = imageCaption[thisAd];
		    if (caption != '')
		        caption += '<br>';
		    // if (showStepDescriptionCaptions)
		        // caption += opener.stepDescription[imageStep[thisAd]];
		    showCaption(caption);
		    document.adBanner.src=adImages[thisAd];
		    setTimeout("rotate("+timePerSlide+")", timePerSlide);
		}
	}
}

var highlightedStep = null;

var oldColor = 'white';
var oldBackground = '#CC0066';
var oldWeight = 'normal';
var oldClass;

function showCaption(caption)
  { if (document.all)
      { if (document.all.caption)
            document.all.caption.innerHTML = caption;
        else if (document.all.loadingmsg)
            document.all.loadingmsg.innerHTML = caption;
      }
  }

var summary;

function highlightStep(snum)
  { var newStep = 'step' + snum;
    if (highlightedStep == newStep)
        return;
    var trial = opener;
    while (!summary && trial && trial.document)
      { if ((document.all && trial.document.all[newStep])
	    || (document.layers && trial.document['highlayer' + newStep + ':1']))
	  { summary = trial;
	  }
	else
	    trial = trial.opener;
      }
    if (!summary)
        return;
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
    if (snum)
      { highlightedStep = newStep;
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
      }
  }

var stepDescriptionMap = new Object();

function stepa(stepLabel,description)
  {     stepLabel = "" + stepLabel;
	if (stepLabel.toLowerCase().indexOf('step') == 0)
	    stepLabel = stepLabel.substring(4);
	stepDescriptionMap[stepLabel] = description;
        if (document.all)
	  { document.write("<span id='step" + stepLabel + "'>" + description + "</span>");
	    var sss = document.all["step" + stepLabel];
	    // alert ("stepa " + sss.length + sss.className);
	    if (sss.length)
	      { sss[sss.length-1].className = 'unhighlighted';
	      }
	    else
	        sss.className='unhighlighted';
	    // alert ("stepa " + sss.length + sss.className);
	  }
	else if (document.layers)
	  { var sfx = 1;
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
