<!-- PatternL: Free -->
var welcomeWindow;
// function close_soon()
  // { setTimeout("welcomeWindow.close()",1500);
  // }
function prepareWelcomeBack(fname)
  { fnameForWelcomeBack = fname;
  }
function showWelcomeBack(fname)
  {
    if (checkWelcomedCookie())
        return;
    setWelcomedCookie();
    if (fname == ' ...')
      { showInvitation();
        return;
      }
    var wwname = "welcomewindow" + (new Date()).getTime();
    welcomeWindow=window.open("",wwname,"width=250,height=80,left=250,top=100");
    var d = welcomeWindow.document;
    d.writeln('<HTML><HEAD> <TITLE></TITLE>');
    d.writeln('<style>');
    d.writeln('h4 {	FONT-WEIGHT: normal; FONT-SIZE: 15px; FONT-FAMILY: "Times Roman";  }');
    d.writeln('h5 {font-size: 12px; font-family: "Arial"; font-weight: normal}');
    d.writeln('</style>');
    d.writeln('</HEAD>');
    d.writeln('<BODY BGCOLOR=00ccff TEXT=ffff00 LINK="#0000FF" VLINK="#800080" onload="setTimeout(\'self.close()\',1500)">');
    d.writeln('<div align=center><h4>Welcome back');
    d.writeln(fname);
    d.writeln('</div></BODY></HTML>');
    d.close();
    welcomeWindow.focus();
  }
function showInvitation()
  { welcomeWindow=window.open("/invitationtojoin.htm","invitationwindow","width=500,height=500,left=100,top=50");
    welcomeWindow.focus();
  }

function setWelcomedCookie ()
  {
     name = 'welcomed';
     value = 'true';
     path = '/';
     document.cookie = name + "=" + escape (value) +
	((path) ? "; path=" + path : "");
  }

function checkWelcomedCookie ()
{
        name = 'welcomed';
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	if( (document.cookie == null) || (document.cookie.length == null))
	{
		return false;
	}
	var i = 0;
	while (i < clen)
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return true;
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
	}
	return false;
}
	
