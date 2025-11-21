// ******************************************************** -->
// The mechanism for setting a cookie from a java           -->
// applet that is used below is based on code by            -->
// Carl T. Dreher, Focus Research Corp.                     -->
// Date: 11-04-97                                           -->
// Copyright 1997, Focus Research                           -->
//   published in Web Techniques, February 1998             -->
//                                                          -->
// ******************************************************** -->

// document.write("<p>Orig Retrieved filename:"+GetCookie("InputFileName")+"XX</p>");
// SetCookie("InputFileName","tcook",60);

var params = "";

var drawingWidth = 760;
var drawingHeight = 300;
var appletName = "drawApplet";
var inputFile = "";

var sequenceStepTitle = "";
var sequenceStepNumber = 0;
var cookieMinutesTilExpires = 90;
var appletMinusDrawingWidth = 5;
var appletMinusDrawingHeight = 45;
var initialImage = "";

var replayDelay = 5;
var doIncrementalOutput = "true";
var useMemoryCache = "false";
var debug = getCookieOrDefault("DebugSetting",0);

var resizeIfNecessary = false;

var captionArea='';

var appletWidth;
var appletHeight;
var cabFile;
var jarFile;
var parameterFile;
var autoReplay;
var suppressDrawingUntilReplay;
var supplyCaptions;
var stepNumberCaptions;
var storeDrawingAtServer;
var adjustToBounds;
var maskToBounds;
var updateURL;
var nextURL;
var saveOnUnload;

// The following function initializes global variables appropriately
//  according to whether for replay or for drawing

var forReplay = false;
function setupApplet()
  { if (forReplay)
      { 
      
	drawingWidth = 700;
	drawingHeight = 300
	appletWidth = 765;
	appletHeight = 385;

	cabFile = "nick/gdraw.cab";
	jarFile = "nick/gdraw.jar";
	// parameterFile = "nick/replayparams.txt";
	parameterFile = "nick/pbparams.txt";

	autoReplay = true;
	// autoReplay = !resizeIfNecessary;
	suppressDrawingUntilReplay = "true";
	supplyCaptions = "false";
	stepNumberCaptions = "false";

	storeDrawingAtServer = "true";
	adjustToBounds = "true";
	maskToBounds = "false";

	updateURL = "";
	nextURL = "";
	saveOnUnload = "false";

	inputFile = GetCookieX('InputFileName');
	replayDelay = GetCookieX('ReplayDelay');
      }
    else 
      { 
	// applet size parameters; set to accomodate buttons
	minAppletWidth = 600;
	// appletMinusDrawingWidth = 0;
	// appletMinusDrawingHeight = 100;

        appletWidth = drawingWidth+appletMinusDrawingWidth;
	appletHeight = drawingHeight+appletMinusDrawingHeight;
	if (appletWidth < minAppletWidth)
	    appletWidth = minAppletWidth;

	cabFile = "nick/gdraw.cab";
	jarFile = "nick/gdraw.jar";
	// parameterFile = "drawparams.txt";
	parameterFile = "nick/drawparams.txt";

	autoReplay = "false";
	suppressDrawingUntilReplay = "false";
	supplyCaptions = "false";
	stepNumberCaptions = "false";

	storeDrawingAtServer = "true";
	adjustToBounds = "false";
	maskToBounds = "true";

	updateURL = "/cgi-bin/update-drawing.cgi";
        nextURL = "finaljpeg.htm";
	saveOnUnload = "true";

	inputFile = GetCookieX('InputFileName');

	// if (location.protocol == "file")
	   // cabFile = signedCab;
	// else
	   // cabFile = unsignedCab;
      }

     params = "OBJECT pen_color_choice; initial_choice '" + getCookieOrDefault('PenColor','Black') + "';"
     + "OBJECT pen_width_choice; initial_choice " + getCookieOrDefault('PenWidth','3') + ";"
     + "OBJECT canvas_holder; width " + appletWidth + ";"
     + "OBJECT canvas_holder; height " + drawingHeight + ";"
     + "OBJECT main_canvas; height " + drawingHeight + "; width " + drawingWidth + ";";
  }
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
		
	function RequestJpegAndGo(url)
	  { RequestJpeg();
	    GoIfJpegUploadSucceeds(url);
	      }

	function GoIfJpegUploadSucceeds(url)
	  {  if (document.drawApplet != null && document.drawApplet.getJpegUploadStatus() == "succeeded")
	        { status = 'Going to: ' + url;
		  top.location=url;
	        }
	     else if (document.drawApplet != null && document.drawApplet.getJpegUploadStatus() == "pending")
	        {    status = 'Uploading drawing - then will automatically go to ' + url;
		      setTimeout('GoIfJpegUploadSucceeds("' + url + '")',250);
		}
	     else
	        { alert("Something went wrong with the uploading of the image file");
		  status = 'Upload failed';
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

	function SetDrawingSize(width,height)
	  { 
            drawingWidth = width;
            drawingHeight = height;
	   }

	function RequestJpeg()
	  {  if (document.drawApplet != null)
	      {  document.drawApplet.requestJpegUpload();
	      }
	  }

	function updateCaption()
	  /*
	  { changeCaption(captionArea,applt);
	  }
	  */
	  { // var applet1 = document.all(captionApplet1);
	    var applet1 = document.drawApplet1;
	    // alert("update caption");
	    if (document.layers)
	      {	captionArea.visibility="show";
	        // alert("layers");
	      }
	    if (applet1 != null)
	    // try
	      {  // changeCaption(captionArea,"checking...");
	        // alert("a1" + applet1);
	        if (applet1.checkForNewCaption())
	        // if (applet1.replayDone())
		    // { changeCaption(captionArea,"<div align=center>DONE</div>");
		      // setTimeout('updateCaption()',500);
		    // }
	        // else if (applet1.checkForNewCaption())
	            { // changeCaption(captionArea,"found new");
		      changeCaption(captionArea,"");
		      setTimeout('displayCaption()',750);
		    }
		else
		    { // changeCaption(captionArea,"notFound");
		      setTimeout('updateCaption()',500);
		    }
	      }
	    else
	    // catch(error)
	      { setTimeout('updateCaption()',500);
	      }
	  }

	function displayCaption()
	  { // var applet1 = document.all(captionApplet1);
	    var applet1 = document.drawApplet1;
	    changeCaption(captionArea,captionStart + applet1.currentCaption() + captionEnd);
	    setTimeout('continueReplay()',1000);
	  }
	function continueReplay()
	  {
	    // document.all(captionApplet1).continueReplay();
	    // document.all(captionApplet2).continueReplay();
	    document.drawApplet1.continueReplay();
	    document.drawApplet2.continueReplay();
	    setTimeout('updateCaption()',500);
	  }

	function changeCaption(captionArea, text)
	  {  if (document.all)
	       captionArea.innerHTML = text;
	    else if (document.layers)
	      { // captionArea.document.open();
		captionArea.document.write(text);
		captionArea.document.close();
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

        function SetCookie (name,value,minutesTilExpires,path,domain,secure)
          {
             var today = new Date();
             var expires = new Date();
             expires.setTime (today.getTime()
	               + (minutesTilExpires * 60 * 1000));
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


function showdraw()
  { document.all.instr.style.visibility='hidden';
    document.all.draw.style.visibility='visible';
  }

function showinstr()
  { document.all.draw.style.visibility='hidden';
    document.all.instr.style.visibility='visible';
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

function showImageAfterReplayDone(url,wait,closewait)
  { var done = false;
    if (document.drawApplet && document.drawApplet.appletStarted)
      { if (document.images && !imageToShowAfterReplay)
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

function replaceAppletWithImage(url,closewait)
  { if (document.all)

       document.all.appletdiv.innerHTML =
          '<img onLoad="setTimeout(\'self.close()\','+closewait+');" src="' + url + '">';
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
	        if (forReplay)
	           autoReplay = "true";
	        // setapplet(appletString(dwidth,dheight));
		if (document.all)
		   document.all.appletdiv.innerHTML = appletString();
		else
	           document.drawApplet.requestReplay();
		   // if couldn't fix size, still start replay

		// not using autoReplay the first time, because might reload
	      }
	     else if (forReplay)
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

function drawapplet()
{ 
  setupApplet();
  // document.write(appletString());
  document.writeln(appletString(appletWidth,appletHeight));
  // document.writeln("<div id='appletdiv'>" + appletString(appletWidth,appletHeight) + "</div>");
  // if (resizeIfNecessary)
      // fixAppletSize();
}


function appletString()
{ 
// alert(appletHeight);
return "<applet code='gdraw.class' archive='"
+ jarFile
+  "' align='baseline' width=\""
+appletWidth
+ "\" height=\""
+appletHeight
+ "\" name='" + appletName + "'><param name='CABBASE' value='" + cabFile + "'>"
// <param name='DrawingWidth' value=\""
// +drawingWidth
// + "\"><param name='DrawingHeight' value=\""
// + drawingHeight
// + "\">
+ "<param name='Params' value=\""
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
+ "\"><param name='InputFile' value=\""
+ inputFile
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

