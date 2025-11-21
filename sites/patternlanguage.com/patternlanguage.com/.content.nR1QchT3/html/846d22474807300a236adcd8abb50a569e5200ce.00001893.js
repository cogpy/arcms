        <!-- Hide script from old browsers
// var event = window.event; // for IE

function aTagHrefViaAgreement(loc)
  { document.write("<a href='javascript:;' onClick='viaAgreement(" + '"' + loc + '"' + ",event);return false;'>");
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


function viaAgreement(loc)
  { var agreementkey=GetCookieX("AgreementKey");
    // alert(agreementkey);
    var keymatchre = /^(\d+)v(-?)(\d+)/;
    var keymatch = keymatchre.exec(agreementkey);
    var curtime= (new Date()).getTime()/1000;
    var keytime = 0;
    if (keymatch != null)
      { if (keymatch[2] == "-")
           sign=-1;
        else
	    sign=1;
        keytime= parseInt(keymatch[1])+sign*parseInt(keymatch[3]);
	// alert(keymatch[1] + " " + keymatch[2] + keymatch[3] + " " + keytime + " " + curtime);
      }
    if (keytime > curtime)
        location.href=loc;
    else
      { // var x = evnt.screenX;
	// var y = evnt.screenY;
	var prefix = "";
	if (loc.charAt(0) != "/" )
	   { prefix = location.pathname;
	     var i = prefix.lastIndexOf("/");
	     prefix = prefix.substring(0,i+1);
	   }
	agreeWindow("/cgi-bin/testagreement.cgi" + prefix + loc,"agreement");
     }
  }

// function viaAgreement(a,b,c)
  // { document.write(a+b+c);
  // }


        // End hiding script from old browsers -->


