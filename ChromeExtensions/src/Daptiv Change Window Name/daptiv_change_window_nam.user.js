// ==UserScript==
// @name           Daptiv Change Window Name and Title
// @namespace      http://na04.daptiv.com/global
// @include        http://na04.daptiv.com/global/itembrowser.aspx
// ==/UserScript==

if ((window.name == "IB_BASIC") ||(window.name == "IB_Grid")) {
	window.name = "b"+String(Math.random());

	var items = document.getElementsByClassName("itembrowser-itemlabel");
	if (items.length > 0) {
		document.title = "Item: " + items[0].innerHTML.replace(/^\s+|\s+$/, '') + " - " + document.title;
	}
}