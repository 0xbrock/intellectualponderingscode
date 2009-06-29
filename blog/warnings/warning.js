var getScrollXY = function() {
    var w=window, db=document.body, dde=document.documentElement;
    return ( typeof( w.pageYOffset ) == 'number' )          ? [w.pageXOffset, w.pageYOffset] :
            ( db && ( db.scrollLeft || db.scrollTop ) )     ? [db.scrollLeft, db.scrollTop] :
            ( dde && ( dde.scrollLeft || dde.scrollTop ) )  ? [dde.scrollLeft, dde.scrollTop] : [0, 0];
}
ClearCtlBg = function(ctl) {
    ctl.style.background = "#FFF";
    ctl.setAttribute('title', "");
};
Validate = function (ctl, rule, msg, idsuffix) {
    if (rule && msg && (msg.length>0)) {
    var ctlid = ctl.id+idsuffix;
    ctl.style.background = "#FFF url(http://intellectualponderings.googlecode.com/svn/trunk/blog/warnings/invalid_line.gif) repeat-x scroll center bottom";
    cTitle = ctl.getAttribute('title');
    if (cTitle.indexOf(msg) == -1) {
        ctl.setAttribute('title', ((cTitle) ? cTitle + "\r\n[ " : "[ ") + msg);
    }
    var warning = "<p id=\"" + ctlid + "_Warn\" onclick=\"focusSelect('" + ctl.id + "');\">" + msg + "</p>";
    if ($("#WarnMsg").length === 0) {
        $("body").append("<div class=\"popup\" id=\"WarnMsg\"><a class=\"nohref\" style=\"float: right;\" onclick=\"$('#WarnMsg').fadeOut('slow').remove();\">X</a>Warning<div>"+ warning +"</div></div>");
        $("#WarnMsg").show().animate({ top: String(Number(getScrollXY()[1])+3)+"px" }, 750 );//-175
    } else if ($("#"+ctlid+"_Warn").length > 0) {
        $("#"+ctlid+"_Warn").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    } else {
        $("#WarnMsg div").append(warning);
    }
    setTimeout("ClearWarning('"+ctlid+"_Warn')", 15000);
    return true;
    }// Validate - if (rule)
};
focusSelect = function(ctlid, e) {
    ctl = $("#"+ctlid)[0];
    ctl.focus();if (ctl.type=="text"){ctl.select();}
};
ClearWarning = function(id) {
    $("#"+id).remove();
    if ($("#WarnMsg div p").length === 0) {
        $("#WarnMsg").hide("slow").remove();
    }    
};
// Lets add a warning function
var required = function(e) {
    ClearCtlBg(this);
    Validate(this, true, "This file is required.");
    Validate(this, (this.value.length > 3), "This file is required.");
};

// This is used for the example
$(document).ready(function(){
    $(".name").blur(required);
    //$(".someddl").change(ddlvalidator);
});
