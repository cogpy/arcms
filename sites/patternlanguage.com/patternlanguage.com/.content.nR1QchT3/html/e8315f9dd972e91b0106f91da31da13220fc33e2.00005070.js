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
