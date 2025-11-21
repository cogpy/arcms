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
// var captionAreaName = "captionArea";
// var captionLayerName = "captionLayer";
// var captionApplet1;
// var captionApplet2;


var params = "";
// var replayCab = "../nick/gdrawreplay.cab";
var replayCab = "../nick-March21/gdraw.cab";
var drawCab = "../nick-March21/gdrawdraw.cab";
var jarFile = "../nick-March21/gdraw.jar";
var suppressDrawingUntilReplay = "false";
var supplyCaptions = "false";
var stepNumberCaptions = "false";
var autoReplay = "false";
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

	function updateCaption()
	  /*
	  { changeCaption(captionArea,applt);
	  }
	  */
	  { // var applet1 = document.all(captionApplet1);
	    var applet1 = document.applets[appletName];
	    if (applet1)
	    // try
	      {  // changeCaption(captionArea,"checking...");
	        if (applet1.replayDone())
		    { // changeCaption(captionArea,"<div align=center>DONE</div>");
		      changeCaption(captionArea,"");
		      setTimeout('updateCaption()',500);
		    }
	        else if (applet1.checkForNewCaption())
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
	    var applet1 = document.applets[appletName];
	    changeCaption(captionArea,captionStart + applet1.currentCaption() + captionEnd);
	    setTimeout('continueReplay()',1000);
	  }
	function continueReplay()
	  {
	    // document.all(captionApplet1).continueReplay();
	    // document.all(captionApplet2).continueReplay();
	    document.applets[appletName].continueReplay();
	    // document.drawApplet2.continueReplay();
	    setTimeout('updateCaption()',500);
	  }

	function changeCaption(captionArea, text)
	  {   // alert("changeCaption " + text);
	      if ((text.length > 5) && text.substring(0,4).toLowerCase() == 'step')
		{ // alert("xxxxcc");
		  if (document.all)
		    { if (document.all.loadingmsg)
		          document.all.loadingmsg.style.visibility="hidden";
		      else if (document.all.caption)
		          document.all.caption.style.visibility="hidden";
		    }
		  // else if (document.layers)
		    // { alert("ccll" + stepNum);
		      // document.loadingmsglayer.visibility="hide";
		    // }
		  else
		    alert("?????????");
	          stepNum = parseInt(text.substring(4));
		  // alert("cc" + stepNum);
		  onunload=highlightStep;
		  if (isNaN(stepNum))
		      highlightStep(0);
		  else
		      highlightStep(stepNum);
		}
	      else
	        { // alert("ccw " + text.length + text.substring(0,4).toLowerCase());
	          highlightStep(0);
	        }
	    // if (document.all)
	       // captionArea.innerHTML = text;
	    // else if (document.layers)
	      // { // captionArea.document.open();
		// captionArea.document.write(text);
		// captionArea.document.close();
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


function setupApplet()
{
if (forReplay)
  { appletWidth = drawingWidth;
    appletHeight = drawingHeight;
    autoReplay = !resizeIfNecessary;
    suppressDrawingUntilReplay = "true";
    cabFile = replayCab;
    parameterFile = "../nick-March21/replayparams.txt";
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
    cabFile = drawCab;
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
  document.write("<div id='appletdiv'>" + appletString(appletWidth,appletHeight) + "</div>");
// document.write("<div id='appletdiv'><ilayer id='appletILayer'><layer id='appletLayer'>" + +'hiiiii' + appletString(appletWidth,appletHeight) + "</layer></ilayer></div>");
  if (resizeIfNecessary)
      fixAppletSize();
}


function appletString()
{ 
// alert(appletHeight);
// return "<applet style='background-color:green; margin-left:0; padding-left:0; margin-right:0; padding-right:0; margin-top:0; padding-top:0; margin-bottom:0; padding-bottom:0;' code='gdraw.class' archive='" + jarFile + "' align='baseline' width=\""
return "<applet code='gdraw.class' archive='" + jarFile + "' align='baseline' width=\""
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

