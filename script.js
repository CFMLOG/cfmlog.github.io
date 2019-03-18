logs = [];

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("sl_btn").addEventListener("click", save_log);
}, false);

function handleEnter(e){
	if (e.keyCode === 13) {
		document.getElementById("sl_btn").click();
	}
}

function GetText(id) {
	return document.getElementById(id).value;
}
function clear_field(){
	document.getElementById("izk").value ="";
	document.getElementById("irn").value ="59";
	document.getElementById("iro").value ="59";
	document.getElementById("igo").value ="";
}

function save_log() {
	 log = {				// w tym miejscu zostały użyte skróty. przykładowo: zk ozn. Znak Korespondenta
							//									 a izk - skrót od input znak korespondenta.
		zn: GetText("izn"),
		zk: GetText("izk"),
		rn: GetText("irn"),
		gn: GetText("ign"),
		ro: GetText("iro"),
		go: GetText("igo"),
		po: GetText("ipo"),
		ea: GetText("iea")
	};
	var isOK = true;
	if(log.zn == "" || log.zk == "" || log.rn == "" || log.ro == "" || log.go == "")
		isOK = false;

	if(!isOK)
		alert("Wypełnij wszystkie pola!");
	else{

		logs[logs.length] = log;

		var new_gn= parseInt(log.gn)+1;
		var str_new_gn ="";
		for(var i = 0; i <3 - (new_gn+"").length;i++)
			str_new_gn += "0";
		str_new_gn += new_gn;
		document.getElementById("ign").value = str_new_gn;
		clear_field();


		console.log("Znak korespondenta: " + log.zk);
		console.log("Grupa odebrana: " + log.go);
		console.log("RTSo: " + log.ro);
		console.log("Grupa nadawcza: " + log.gn);
		console.log("RTSn: " + log.rn);
		console.log("Pasmo: " + log.po);
		console.log("Emisja: " + log.ea);
		console.log("Znak Nadawcy: " + log.zn);

		view_log();
	}
}
wiersz = "";
function view_log() {

	var table = document.getElementById("log_table");
	var row = table.insertRow(table.length);

	var zk = row.insertCell(0);
	var go = row.insertCell(1);
	var ro = row.insertCell(2);
	var gn = row.insertCell(3);
	var rn = row.insertCell(4);
	var po = row.insertCell(5);
	var ea = row.insertCell(6);
	var zn = row.insertCell(7);

	zk.innerHTML = log.zk;
	go.innerHTML = log.go;
	ro.innerHTML = log.ro;
	gn.innerHTML = log.gn;
	rn.innerHTML = log.rn;// git tylko strongi to uppercase trzeba dac //DODANE 
	po.innerHTML = log.po;
	ea.innerHTML = log.ea; //ESSA JA BOI
	zn.innerHTML = log.zn;

}