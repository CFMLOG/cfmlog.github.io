logs = [];
var editmode =null;
//									PRZYCISKI
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("sl_btn").addEventListener("click", save_log);
	checkcache();
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
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("rst_log_btn").addEventListener("click", reset_log);
}, false);

//			PRZYCISK DODAJ QSO POD ENTEREM
document.addEventListener("keypress", function(e){
	if (e.keyCode === 13) {
		if(editmode==null)document.getElementById("sl_btn").click();
		else {
			accept_edit_table();
		}
	}
});
function reset_log(){
	logs = [];
	localStorage['logs'] = "";
	document.getElementById("log_table").getElementsByTagName("TBODY")[0].innerHTML ="";
	alert("Wyczyszczono log");
}
function accept_edit_table(){
	var id = editmode.parentElement.id;
	if(editmode.getElementsByTagName("input").length >0){
		if(editmode.getElementsByTagName("input")[0].value == ""){
			return 0;
		}
	}
	switch(editmode.id){
		case "zk":
			var text = editmode.getElementsByTagName("input")[0].value;
			editmode.innerHTML = text.toUpperCase();
			logs[id].zk = text.toUpperCase();
			break;
		case "go":
			var text = editmode.getElementsByTagName("input")[0].value;
			var new_gn= parseInt(text);
			var str_new_gn ="";
			for(var i = 0; i <3 - (new_gn+"").length;i++)
				str_new_gn += "0";
			str_new_gn += new_gn;
			editmode.innerHTML = str_new_gn;
			logs[id].go = str_new_gn;
			break;
		case "ro":
			var text = editmode.getElementsByTagName("input")[0].value;
			editmode.innerHTML = text;
			logs[id].ro = text;
			break;
		case "gn":
			var text = editmode.getElementsByTagName("input")[0].value;
			var new_gn= parseInt(text);
			var str_new_gn ="";
			for(var i = 0; i <3 - (new_gn+"").length;i++)
				str_new_gn += "0";
			str_new_gn += new_gn;
			editmode.innerHTML = str_new_gn;
			logs[id].gn = str_new_gn;
			break;
		case "rn":
			var text = editmode.getElementsByTagName("input")[0].value;
			editmode.innerHTML = text;
			logs[id].rn = text;
			break;
		case "da":
			var text = editmode.getElementsByTagName("input")[0].value;
			editmode.innerHTML = text;
			logs[id].da = text;
			break;
		case "cs":
			var text = editmode.getElementsByTagName("input")[0].value;
			editmode.innerHTML = text;
			logs[id].cs = text;
			break;
		case "po":
			var text = editmode.getElementsByTagName("select")[0].value;
			editmode.innerHTML = text;
			logs[id].po = text;
			break;
		case "ea":
			var text = editmode.getElementsByTagName("select")[0].value;
			editmode.innerHTML = text;
			logs[id].ea = text;
			break;
		case "zn":
			var text = editmode.getElementsByTagName("input")[0].value;
			editmode.innerHTML = text.toUpperCase();
			logs[id].zn = text.toUpperCase();
			break;
	}
	localStorage['logs'] = JSON.stringify(logs);
	editmode = null;
}


//CASHOWANIE ZMIENNEJ LOGS (ODCZYT)
function checkcache(){
	var click =0;
	document.body.addEventListener("click", function (evt) {
		click++;
		if(click === 1){	
			setTimeout(function(){click =0;},400);
		}else if(click===2){
			if(editmode == null) {
			click =0;
			var clicked_obj = evt.target;
			if(clicked_obj.tagName =="TD" && clicked_obj.parentElement.parentElement.nodeName =="TBODY"){
				editmode =clicked_obj;
				var text = clicked_obj.innerHTML;
				if(clicked_obj.id == "ro" || clicked_obj.id == "rn" || clicked_obj.id == "go" ||clicked_obj.id == "gn"){
					clicked_obj.innerHTML = "<input type=\"number\"class=\"sml_input\" value=\""+text+"\"></input>";
					clicked_obj.getElementsByTagName("input")[0].focus();
				}else if(clicked_obj.id=="po"){
					clicked_obj.innerHTML = '<select class=\"sml_input\"><option>160m</option><option selected="selected">80m</option><option>40m</option><option>20m</option><option>17m</option><option>15m</option><option>12m</option><option>10m</option><option>6m</option><option>2m</option></select>';
					clicked_obj.getElementsByTagName("select")[0].focus();
				}else{
					clicked_obj.innerHTML = "<input class=\"sml_input\" value=\""+text+"\"></input>";
					clicked_obj.getElementsByTagName("input")[0].focus();
				}
			}
		}else{
			accept_edit_table();
		}
	}

	});
	

	var stored = localStorage['logs'];
	if (stored) {
		logs = JSON.parse(stored);
		var table = document.getElementById('log_table').getElementsByTagName('tbody')[0];

		for(var i =0;i<logs.length;i++){
			var row = table.insertRow(0);
			row.id = i;
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
			zk.id = "zk";
			go.id = "go";
			ro.id = "ro";
			gn.id = "gn";
			rn.id = "rn";
			da.id = "da";
			cs.id = "cs";
			po.id = "po";
			ea.id = "ea";
			zn.id = "zn";
			zk.innerHTML = logs[i].zk;
			go.innerHTML = logs[i].go;
			ro.innerHTML = logs[i].ro;
			gn.innerHTML = logs[i].gn;
			rn.innerHTML = logs[i].rn;
			da.innerHTML = logs[i].da;
			cs.innerHTML = logs[i].cs;
			po.innerHTML = logs[i].po;
			ea.innerHTML = logs[i].ea;
			zn.innerHTML = logs[i].zn;


		}
	
	}
}

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
		da: (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate())
		};
	var isOK = true;
	
	
	if(log.rn == ""){ document.getElementById("irn").focus(); isOK = false;}
	if(log.ro == ""){ document.getElementById("iro").focus(); isOK = false;}
	if(log.go == ""){ document.getElementById("igo").focus(); isOK = false;}
	if(log.zk == ""){ document.getElementById("izk").focus(); isOK = false;}
	if(log.zn == ""){ document.getElementById("izn").focus(); isOK = false;}

	if(isOK){

		logs[logs.length] = log;
		localStorage['logs'] = JSON.stringify(logs);
		var new_gn= parseInt(log.gn)+1;
		var str_new_gn ="";
		for(var i = 0; i <3 - (new_gn+"").length;i++)
			str_new_gn += "0";
		str_new_gn += new_gn;
		document.getElementById("ign").value = str_new_gn;
		//clear_field();
		view_log();
		document.getElementById("izk").focus();
	}
}
wiersz = "";
function view_log() {

	var table = document.getElementById('log_table').getElementsByTagName('tbody')[0];
	var row = table.insertRow(0);
	row.id = logs.length-1;

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
	zk.id = "zk";
	go.id = "go";
	ro.id = "ro";
	gn.id = "gn";
	rn.id = "rn";
	da.id = "da";
	cs.id = "cs";
	po.id = "po";
	ea.id = "ea";
	zn.id = "zn";

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
	var text = "ADIF 2.0\nWYGENEROWANY PRZEZ CFMLOG http://github.com/kpxdi/cfmlog \n<EOH>\n";
	for(var i =0;i<logs.length;i++){
		text += "<QSO_DATE:"+ logs[i].da.length +">"+logs[i].da + " <TIME_ON:"+ logs[i].cs.length +">"+ logs[i].cs +" <BAND:"+ logs[i].po.length +">"+ logs[i].po +" <FREQ:5>3.700 <MODE:"+ logs[i].ea.length +">"+ logs[i].ea;
		text +=	"<CALL:"+ logs[i].zk.length +">" + logs[i].zk + " <RST_RCVD:"+logs[i].ro.length+">" + logs[i].ro + " <SRX:"+ logs[i].go.length +">" + logs[i].go + " <RST_SENT:"+ logs[i].rn.length +">"+ logs[i].rn +" <STX:"+ (logs[i].gn.length + logs[i].zn.length) +">"+ logs[i].gn + logs[i].zn +"<COMMENT:" + comment.length + ">"+ comment;
		text += "<OPERATOR:"+ operator.length +">"+ operator +"<CONTEST_ID:5> 2019 <EOR>\n";
	}
    blob = new Blob([text], { type: 'text/plain' }),
    link = document.createElement('a');
	link.download = date.getFullYear()+":"+(date.getMonth()+1)+":"+date.getDate()+":"+date.getHours()+":"+date.getMinutes()+".adi";
	link.href = (window.webkitURL || window.URL).createObjectURL(blob);
	link.dataset.downloadurl = ['text/plain', link.download, link.href].join(':');
	link.click();

}