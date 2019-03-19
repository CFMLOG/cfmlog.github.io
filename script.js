logs = [];
//									PRZYCISKI
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("sl_btn").addEventListener("click", save_log);
}, false);
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("sf_btn").addEventListener("click", save_to_file_open);
}, false);
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("return_btn").addEventListener("click", save_to_file_return);
}, false);
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("save_btn").addEventListener("click", save_to_file);
}, false);

//			PRZYCISK DODAJ QSO POD ENTEREM
document.addEventListener("keypress", function(e){
	if (e.keyCode === 13) {
		document.getElementById("sl_btn").click();
	}
});

function GetText(id) {
	return document.getElementById(id).value;
}
// CZYSZCZENIE PÓL PO DODANIU QSO
function clear_field(){
	document.getElementById("izk").value ="";
	document.getElementById("irn").value ="59";
	document.getElementById("iro").value ="59";
	document.getElementById("igo").value ="";
}

function save_log() {
	var date = new Date();
	 log = {				// w tym miejscu zostały użyte skróty. przykładowo: zk ozn. Znak Korespondenta
							//									 a izk - skrót od input znak korespondenta.
		zn: GetText("izn"),
		zk: GetText("izk"),
		rn: GetText("irn"),
		gn: GetText("ign"),
		ro: GetText("iro"),
		go: GetText("igo"),
		po: GetText("ipo"),
		ea: GetText("iea"),
		cs: (date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()),
		da: (date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate())
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
		view_log();
		document.getElementById("izk").focus();
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
	var da = row.insertCell(5);
	var cs = row.insertCell(6);
	var po = row.insertCell(7);
	var ea = row.insertCell(8);
	var zn = row.insertCell(9);

	zk.innerHTML = log.zk;
	go.innerHTML = log.go;
	ro.innerHTML = log.ro;
	gn.innerHTML = log.gn;
	rn.innerHTML = log.rn;
	da.innerHTML = log.da;
	cs.innerHTML = log.cs;
	po.innerHTML = log.po;
	ea.innerHTML = log.ea;
	zn.innerHTML = log.zn;

}
//	POJAWIENIE SIĘ PANELU ZAPISU LOGÓW PO PRZYCISKU ZAPISZ LOG
function save_to_file_open(){
	if(logs.length <1) alert("NIE ZALOGOWAŁEŚ JESZCZE ŻADNEGO QSO!"); else{
		//document.getElementById("blurpage").style.display = "block";
		document.getElementById("savetofile_container").style.display = "block";
	}
}
//	ZAMKNIĘCIE PANELU ZAPISU LOGÓW PO PRZYCISKU POWROT
function save_to_file_return(){
	//document.getElementById("blurpage").style.display = "none";
	document.getElementById("savetofile_container").style.display = "none";
}
//	AKCJA PRZYCISKU ZAPISZ
function save_to_file(){
	var file_format = document.getElementById("file_format");
	var operator = document.getElementById("operator").value;
	var comment = document.getElementById("comment").value;
	file_format = file_format.options[file_format.selectedIndex].value;
	switch(file_format){
		case "adif":
			adif_save(operator,comment);
			break;
	}

}
// ZAPIS PLIKU ADIF
function adif_save(operator, comment){
	var date = new Date;
	console.log("aaa");
	var text = "ADIF 2.0\nWYGENEROWANY PRZEZ CFMLOG http://github.com/kpxdi/glolog \n<EOH>\n";
	for(var i =0;i<logs.length;i++){
		text += "<QSO_DATE:8>"+logs[i].date + " <TIME_ON:6>"+ logs[i].time +" <BAND:3>"+ logs[i].po +" <FREQ:5>3.700 <MODE:3>"+ logs[i].ea;
		text +=	"<CALL:6>" + logs[i].zk + " <RST_RCVD:2>" + logs[i].ro + " <SRX:3>" + logs[i].go + " <RST_SENT:2>"+ logs[i].rn +" <STX:9>"+ logs[i].gn + logs[i].zn +"<COMMENT:5>"+ comment;
		text += "<OPERATOR:5>"+ operator +"<CONTEST_ID:5> 2019 <EOR>\n";
	}
    blob = new Blob([text], { type: 'text/plain' }),
    link = document.createElement('a');
	link.download = date.getFullYear()+":"+date.getMonth()+":"+date.getDate()+":"+date.getHours()+":"+date.getMinutes()+".adi";
	link.href = (window.webkitURL || window.URL).createObjectURL(blob);
	link.dataset.downloadurl = ['text/plain', link.download, link.href].join(':');
	link.click();

}
