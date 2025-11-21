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


// parameters
var cookieMinutesTilExpires = 90;
var drawingWidth = 760;
// var drawingWidth = 600;
// var drawingHeight = 300;
var drawingHeight = 300;
var appletMinusDrawingWidth = 5;
// var appletMinusDrawingHeight = 60;
var appletMinusDrawingHeight = 85;
var bottomPanelHeight = 92;
// var backgroundHue = 0.6;
// var backgroundSaturation = 0.15;
// var backgroundHue = 0.6;
var backgroundR = 255;
var backgroundG = 255;
var backgroundB = 255;
var topBottomR = 88;
var topBottomG = 145;
var topBottomB = 250;
var initialImage = "";
var replayDelay = 5;
var storeDrawingAtServer = "true";
var doIncrementalOutput = "true";
var useMemoryCache = "true";
var debug = getCookieOrDefault("DebugSetting",0);
// var updateURL = "http://161.58.221.38/cgi-bin/update-drawing.cgi";
var updateURL = "/cgi-bin/update-drawing.cgi";
var nextURL = "finaljpeg.htm";
var saveOnUnload = "true";
var replayOnly = "false";

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
	  {  if (document.drawApplet != null)
	      {  document.drawApplet.requestJpegUpload();
	      }
	     top.location=url;
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

	function RequestJpeg()
	  {  if (document.drawApplet != null)
	      {  document.drawApplet.requestJpegUpload();
	      }
	  }

	function SetFileNameOLD()
	  { 	if (document.drawApplet != null)
		    SetCookie("InputFileName",document.drawApplet.getOutputFilename(),cookieMinutesTilExpires);
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

	// function deleteHttpColon(value)
	  // { if (value.substring(0,7) == "http://")
	      // return "http//" + value.substring(7);
	    // else
	      // return value;
	  // }
// 
	// function replaceHttpColon(value)
	  // { if (value.substring(0,6) == "http//")
	      // return "http://" + value.substring(6);
	    // else
	      // return value;
	  // }

        function SetCookie (name,value,minutesTilExpires,path,domain,secure)
          {
             var today = new Date();
             var expires = new Date();
             expires.setTime (today.getTime()
	               + (minutesTilExpires * 60 * 1000));
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
