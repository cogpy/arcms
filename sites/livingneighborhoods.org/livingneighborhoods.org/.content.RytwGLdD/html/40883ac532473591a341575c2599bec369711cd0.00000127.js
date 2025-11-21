var currentMode = 0;
var modeCount = 0;
function toNextMode(choiceContainer)
  { currentMode++;
    // if (currentMode % 4 == 3)
        // alert('tcur ' + currentMode);
    displayCurrentMode(choiceContainer);
  }
function displayCurrentMode(choiceContainer)
  { var cont = document.all[choiceContainer];
    // var e = cont.firstChild;
    // var celts = cont.childNodes;
    var celts = cont.children;
    // var activeix = -1;
    // var nextix = -1;
    // var firstix = -1;
    if (modeCount <= 0)
      { for (var i = 0; i < celts.length; i++)
	  { // if (celts[i].nodeType != cont.ELEMENT_NODE)
	      // continue;
	    var elt = celts[i];
	    // alert('try ' + elt + elt.className);
	    if (elt.className == 'inactiveModeDescription' || elt.className == 'activeModeDescription')
	      { modeCount++;
	      }
	  }
      }
    var nextMode = currentMode % modeCount;
    var j = 0;
    for (var i = 0; i < celts.length; i++)
      { // if (celts[i].nodeType != cont.ELEMENT_NODE)
          // continue;
        var elt = celts[i];
	// alert('try ' + elt + elt.className);
	if (elt.className == 'inactiveModeDescription' || elt.className == 'activeModeDescription')
	  { 
	    if (j == nextMode)
	       nextix = i;
	    j++;
	  }
        if (elt.className == 'activeModeDescription')
	  { elt.className = 'inactiveModeDescription';
	  }
      }
    if (nextix < 0)
      { nextix = firstix;
      }
    /*
    if (activeix >= 0 && nextix >= 0)
      { celts[activeix].className = 'inactiveModeDescription';
      }
      */
    if (nextix >= 0)
      { celts[nextix].className = 'activeModeDescription';
      }
  }

function lndMouseOverButton(elt,state)
  { if (state)
      { elt.className = 'buttonHover';
      }
    else
      { elt.className = 'button';
      }
    
  }

function lndButtonDepressed(elt,state)
  { if (state)
      { elt.className = 'buttonDown';
      }
    else
      { elt.className = 'buttonHover';
      }
    
  }

var moving = false;

function lndMoveButton(elt,what)
  { var c = '';
    if (what == 'over')
     { if (!moving)
         c = 'buttonHover';
     }
    else if (what == 'out')
     { if (!moving)
         c = 'button';
     }
    else if (what == 'down')
     { if (!moving)
         c = 'buttonDown';
     }
    else if (what == 'up')
     { if (!moving)
         c = 'buttonHover';
     }
    else if (what == 'click')
     { moving = !moving;
       lndraw_applet.setMovingDrawingXX(moving);
       if (moving)
        { c = 'buttonDown';
	}
       else
        { c = 'buttonHover';
	}
     }
   if (c)
     elt.className = c;
  }


var erasing = false;
function lndEraseButton(elt,what)
  { var c = '';
    if (what == 'over')
     { if (!erasing)
         c = 'buttonHover';
     }
    else if (what == 'out')
     { if (!erasing)
         c = 'button';
     }
    else if (what == 'down')
     { if (!erasing)
         c = 'buttonDown';
     }
    else if (what == 'up')
     { if (!erasing)
         c = 'buttonHover';
     }
    else if (what == 'click')
     { erasing = !erasing;
       lndraw_applet.setEraserXX(erasing);
       if (erasing)
        { c = 'buttonDown';
	}
       else
        { c = 'buttonHover';
	}
     }
   if (c)
     elt.className = c;
  }

// var activityButtons = new Object();
var activeActivityButton = null;

function activityButtonMouse(elt,what)
  { var c = '';
    var active = (elt == activeActivityButton);
    if (active)
        return;
    if (what == 'over')
     { // if (!active)
         c = 'buttonHover';
     }
    else if (what == 'out')
     { // if (!active)
         c = 'buttonInactive';
     }
    else if (what == 'down')
     { // if (!active)
         c = 'buttonDown';
     }
    else if (what == 'up')
     { // if (!active)
         c = 'buttonHover';
     }
   if (c)
     elt.className = c;
  }
       /*
       c = 'buttonActive';
       if (b.active)
        { // c = 'buttonDown';
          c = 'buttonActive';
	}
       else
        { c = 'buttonHover';
	}
	*/

var lastActiveNonPan = null;
var lastActiveNonPanWhich;

// function activityButtonClicked(elt,which,suppressRecall)
function activityButtonClicked(elt,which)
  {
       // b.active = !b.active;
       // setInactive(activeB);
       // if (!active)
     if (which == 'pan')
       { if (activeActivityButton == elt)  // already panning - turn off
                                         // if there's a prev available
           //  if (lastActiveNonPan && lastActiveNonPan != elt && !suppressRecall)
           { if (lastActiveNonPan && lastActiveNonPan != elt)
	       { setActiveActivity(lastActiveNonPan,lastActiveNonPanWhich);
	       }
	   }
	 else
	   { setActiveActivity(elt,which);
	   }
       }
     else
       { 
	 lastActiveNonPan = elt;
	 lastActiveNonPanWhich = which;
         setActiveActivity(elt,which);
       }
  }

function setActiveActivity(elt,which)
  {
     if (activeActivityButton)
         activeActivityButton.className = 'buttonInactive';
     activeActivityButton = elt;
     activeActivityButton.className = 'buttonActive';
     lndraw_applet.activityButtonClicked(which);
  }

var visibletab = null;
var visiblediv = null;
function showtab(tabname,divname)
  { if (visibletab)
      { visibletab.style.zIndex = 1;
      }
    if (visiblediv)
      { visibletab.style.zIndex = 1;
        visiblediv.style.display = 'none';
        // changeState(visibledivname,'hidden');
      }
    visibletab = document.all[tabname];
    visibletab.style.zIndex = 3;
    // visibledivname = divname;
    visiblediv = document.all[divname];
    visiblediv.style.display = 'block';
    // changeState(visibledivname,'visible');
      
  }

var visiblestep = null;
// var stepidmap = new Object();
var stepidmap = {step1: 'basemap',
                 step2: 'basemapcorrections',
                 step3: 'diagnosis',
                 step4: 'wholeness',
                 step5: 'maincenter',
                 step6: 'preciousplaces',
                 step7: 'views',
                 step8: 'pathplaces',
                 step9: 'minorcenters'};
function showActiveStep(stepid,stepname)
  { 
    var s = stepidmap[stepid];  // handle old stepid's
    if (s)
        stepid = s;
    document.all.stepname.innerHTML = stepname;
    if (visiblestep)
      { 
	visiblestep.style.visibility = 'hidden';
	// visiblestep.style.display = 'none';
        // changeState(visibledivname,'hidden');
      }
    visiblestep = document.all[stepid];
    // if (stepid == 'step1')
    // alert("step " + stepid + " " + visiblestep);
    if (visiblestep)
	visiblestep.style.visibility = 'visible';
        // visiblestep.style.display = 'block';
    // changeState(visibledivname,'visible');
  }

var debugValue = 9;
var debugChars = '';

function drawingPadLoaded()
  { var lndrawing = GetCookieX('lndrawing');
    if (lndrawing)
      { loadApplet();
        changeState('appletRegion','visible');
        changeState('startinstructions','hidden');
      }
    else
      { changeState('appletRegion','hidden');
        changeState('startinstructions','visible');
	startWizardWhenLoaded();
      }
  }

function startWizardWhenLoaded()
  { if (wizardWindow)
       wizardWindow.wizardStart();
    else
       setTimeout(startWizardWhenLoaded,200);
  }

var wizardWindow = null;
function getWizardWindow()
  { return wizardWindow;
    /*
    var ww = document.all.startinstructions.contentWindow;
    alert('gww ' + document.all.startinstructions.tagName);
    if (!ww)
      { var cd = document.all.startinstructions.contentDocument;
        if (cd)
	    ww = cd.defaultView;
      }
      */
  }

function setWizardWindow(w)
  { wizardWindow = w;
  }

function wizardButtonClicked()
  { var ww = getWizardWindow();
    if (ww)
      { if (ww.getWizardActive())
          { ww.wizardCancel();
	  }
	else
	  { goToWizard();
	  }
      }
  }

function goToWizard()
  { changeState('appletRegion','hidden');
    changeState('startinstructions','visible');
    var ww = getWizardWindow();
    if (ww)
        ww.restartWizard();
  }

function loadDemo()
  {
    changeState('startinstructions','hidden');
    changeState('appletRegion','visible');
    document.all.lndraw_applet.openFile(demoURL,true);
  }

var onAppletLoadFunctions = new Array();
function setCallOnAppletLoad(fcn)
  { onAppletLoadFunctions[onAppletLoadFunctions.length] = fcn;
  }

// var appletLoaded = false;
var appletStarted = false;
var appletInitStarted = false;

// function setAppletLoaded()
function setAppletStarted()
  { appletStarted = true; 
    for (var i = 0; i < onAppletLoadFunctions.length; i++)
      { onAppletLoadFunctions[i]();
      }
  }

function setAppletInitStarted(ableToDoFileOperations)
  { appletInitStarted = true; 
    appletCanDoFileOperations = ableToDoFileOperations;
  }

// function isAppletLoaded()
function isAppletStarted()
  { return appletStarted;
  }

function isAppletInitStarted()
  { return appletInitStarted;
  }

function getAppletCanDoFileOperations()
  { return appletCanDoFileOperations;
  }

// function appletStarted()
  // { setAppletLoaded();
  // }

var appletWidth = 600;
var appletHeight = 600;
var paramFileParam = "";

function putAppletHere(width,height,paramFile)
  { 
    if (width)
        appletWidth = width;
    if (height)
        appletHeight = height;
    if (paramFile)
      paramFileParam = "<param name='ParamFile' value='" + paramFile + "'>";

    document.write("<div id='applet_holder'></div>");
    // document.write(getAppletString());
  }

function getAppletString()
  { return "<applet id='lndraw_applet' code='gdraw.class' archive='gdrawj1nops.jar' width="+appletWidth+" height="+appletHeight+" mayscript>"
	   + "<param name='Debug' value='"+ debugValue +"'>"
	   + "<param name='Debugc' value='" + debugChars + "'>"
	   + paramFileParam
	   + "</applet>";
  }

var loadRequested = false;

function loadApplet()
  { 
    if (!loadRequested)
      { loadRequested = true;
	// alert('ll + loading applet now ' + loadRequested);
	document.all.applet_holder.innerHTML = getAppletString();
      }
  }

var standardCookieDuration = 24*60*10000;

function resetCookies()
  { SetCookie("lndrawing","",standardCookieDuration);
    SetCookie("lndrawingfolder","",standardCookieDuration);
  }

function getLoadRequested()
  { // alert('xll' + loadRequested);
    return loadRequested;
  }

function showOutputFileName(name)
  { // alert("show pen color " + color);
    if (name)
	document.all.projectName.innerHTML = name.replace(/\.lndraw$/,'');
    else
	document.all.projectName.innerHTML = "<span style='color:#ff0000'>NOT SAVED</span>";
  }

function showPenColor(color)
  { // alert("show pen color " + color);
    document.all.penColorSwatch.style.backgroundColor = color;
  }
