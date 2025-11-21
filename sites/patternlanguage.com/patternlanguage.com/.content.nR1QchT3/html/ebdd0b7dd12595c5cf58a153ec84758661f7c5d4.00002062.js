//////////////////////////////////////////////////////////////////////
//  slideshow3-25.js - adds function openPopupB
//      fixes parameter order and automatically chooses window name
//      Adds a new parameter that can be set in the summary file
//            windowPerMovie
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

///////////////////////////////////////////////////////////////////////
// openPopup
///////////////////////////////////////////////////////////////////////
// This replaces newWindow, with parameters to set the location, width and height
//  of the popup window
///////////////////////////////////////////////////////////////////////
function openPopupB(file,width,height,left,top) {
       var windowName;
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
       windowName = windowName + "Popup";
       msgWindow=open(file,windowName,'resizable=yes,scrollbars=0,width='+width+',height='+height+',left='+left+',top='+top+',border=2');
       onfocus=bringBackPopup;
              if (msgWindow.opener == null) msgWindow.opener = self;
              msgWindow.focus();
                     }

function openPopup(file,windowName,left,top,width,height) {
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
//  showStepDescriptionCaptions can be set true to display the step
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
    var stepNumber = 1;
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
// To change the time per slide, find the call to the rotate function
//  in the movie file, and add a parameter giving the desired number
//    of milliseconds per slide
///////////////////////////////////////////////////////////////////////
function rotate(timePerSlide) {
	if (!timePerSlide)
		timePerSlide=2000;
	showCaption('');
	if (document.images) {
		thisAd++;
		if (thisAd >= imgCt) {
			highlightStep(0);
			setTimeout("self.close()", 2000)
		}
		else  {
		    highlightStep(imageStep[thisAd]);
		    // showCaption(imageCaption[thisAd]);  // this is for something Randy wanted
		    caption = '';
		    if (showSetupCaptions)
		    	caption = imageCaption[thisAd];
		    if (caption != '')
		        caption += '<br>';
		    if (showStepDescriptionCaptions)
		        caption += opener.stepDescription[imageStep[thisAd]];
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

function highlightStep(snum)
  { var newStep = 'step' + snum;
    if (highlightedStep == newStep)
        return;
    if (highlightedStep)
      { if (document.all)
         { var hs = opener.document.all[highlightedStep];
	   if (hs.length)
	     { for (var i = 0; i < hs.length; i++)
	          hs[i].className='unhighlighted';
             }
	   else
	       hs.className = 'unhighlighted';
	 }
            // opener.document.all[highlightedStep].className = 'unhighlighted';
	else if (document.layers)
	  { var sfx = 1;
	    while (opener.document['highlayer' + highlightedStep + ":" + sfx])
	      { var lay = opener.document['highlayer' + highlightedStep + ":" + sfx];
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
         { var hs = opener.document.all[highlightedStep];
	   // alert("" + hs.length + hs.className + hs.properties);
	   if (hs.length)
	     { for (var i = 0; i < hs.length; i++)
	          hs[i].className='highlighted';
             }
	   else
	       hs.className = 'highlighted';
	   // opener.document.all[highlightedStep].className = 'highlighted';
	 }
	else if (document.layers)
	  { // var hsl = opener.document['highlayer' + highlightedStep];
	    // alert("hsl " + snum + hsl);
	    // alert("hsl " + typeof hsl + ":" +  hsl.length + ":" +  hsl.document);
	    var sfx = 1;
	    while (opener.document['highlayer' + highlightedStep + ":" + sfx])
	      { var lay = opener.document['highlayer' + highlightedStep + ":" + sfx];
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
