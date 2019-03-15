document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("sl_btn").addEventListener("click", save_log);
}, false);

function GetText(id) {
	return document.getElementById(id).value;
}


function save_log() {
	var log = {
		zk: GetText("izk"),
		rn: GetText("irn"),
		gn: GetText("ign"),
		ro: GetText("iro"),
		go: GetText("igo"),
		po: GetText("ipo"),
		ea: GetText("iea")
	};
	console.log("Znak korespondenta: " + log.zk);
	console.log("RTSn: " + log.rn);
	console.log("Grupa nadawcza: " + log.gn);
	console.log("RTSo: " + log.ro);
	console.log("Grupa odebrana: " + log.go);
	console.log("Pasmo: " + log.po);
	console.log("Emisja: " + log.ea);
}
