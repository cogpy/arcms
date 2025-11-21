function agreeWindow(file,window) {
msgWindow=open(file,window,'resizable=yes,scrollbars=1,width=350,height=270,left=300,top=45,screenX=300,screenY=45,border=0');
            if (msgWindow.opener == null) msgWindow.opener = self;
              msgWindow.focus();
                     }

