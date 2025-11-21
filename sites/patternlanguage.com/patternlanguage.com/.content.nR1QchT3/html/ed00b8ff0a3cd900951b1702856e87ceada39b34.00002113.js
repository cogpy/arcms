var sampleonlyDir = 'sequenceSample';
// parent.frames.topframe.setWindowHome();

function makeSampleOnly(url)
  {
   if (url.indexOf('/') != 0)
     { var loc = location.pathname;
       var ix = loc.lastIndexOf('/');
       var ix2 = loc.lastIndexOf('\\');
       if (ix2 > ix)
           ix = ix2;
       var prefix = loc.substring(0,ix);
       if (prefix.indexOf('/')==0)
	   prefix = prefix.substring(1);
       // url = '/' + sampleonlyDir + '/' + prefix + '/' + url;
       url = '/' + prefix + '/' + url;
     }
    if (location.protocol=='http:' || location.protocol=='https:')
           url = '/'+sampleonlyDir + url;
    return url;
  }

function setSampleOnly()
  { 
    if (location.protocol!='http:' && location.protocol!='https:')
       return;
    // alert('set sample only');
    var ll = document.links;
    for (var i = 0; i < ll.length; i++)
      { var lnk = ll[i];
        var url = lnk.href;
	if (url.indexOf('javascript') >= 0)
	    continue;
	var ix = url.indexOf('com/');
	if (ix < 0)
	  { ix = url.indexOf('pl.ikaria/');
	    if (ix >= 0)
	        ix = ix + 6;
	  }
	if (ix >= 0)
	  { url = url.substring(0,ix+4) + sampleonlyDir + '/' + url.substring(ix+4);
	    lnk.href = url;
	    // alert(url);
	  }
      }
  }
function openSampleWindow(frame_url,main_url,window_name,window_params)
  { main_url =  makeSampleOnly(main_url);
    SetCookie('sampleurl',main_url,10,'/');
    // alert(GetCookie('sampleurl'));
    var win =  window.open(frame_url,window_name,window_params);
    win.focus();
  }
