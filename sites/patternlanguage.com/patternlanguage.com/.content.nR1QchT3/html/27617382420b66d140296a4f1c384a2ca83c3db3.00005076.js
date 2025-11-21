function goToInFrame(frameUrl,contentUrl)
  { // SetCookie('content',makeAbsolute(contentUrl),null,'/');
    location.href=frameUrl + "?" + makeAbsolute(contentUrl);
  }

function writeContentFrame()
  { var contentUrl = location.search.substring(1);
    document.write("<frame src='"+contentUrl+"'>");
    alert("<frame src='"+contentUrl+"'>");
  }

function contentFrame()
  { var contentUrl = location.search.substring(1);
    return "<html><head><script>location.replace('"+contentUrl+"')</script></head></html>";
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
