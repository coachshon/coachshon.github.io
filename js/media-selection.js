function selected(icon) {
	var pos = icon.src.lastIndexOf(".");
	var source = icon.src.slice(0, pos);
	source = source + "_selected.png";
	icon.src = source;
}

function unselected(icon) {
	var pos = icon.src.lastIndexOf("_");
	var source = icon.src.slice(0, pos);
	source = source + ".png";
	icon.src = source;
}