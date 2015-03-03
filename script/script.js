/*
	*Made by Franksoft
		-frankmer95@gmail.com
*/
function ref(where)
{//this is menu area 
	switch(where){
		case "Home":
			showhome();
			break;
		case "Table":
			table();
			break;
		case "About":
			about();
			break;
	}
	document.getElementById('menu').style.top="-100%";
}
function verfyfild(id, button)
{//this fuctione is for verify de num field
	var verify = document.getElementById(id).value;
	if(!isNaN(verify))
	{
		
		document.getElementById(button).disabled=false;
		document.getElementById(button).style.background="#22A7F0";
		document.getElementById('alert').innerHTML="";	
	}else
	{
		
		document.getElementById(button).disabled=true;
		document.getElementById(button).style.background="#c0392b";
		document.getElementById('alert').innerHTML="Deben ser valores numericos.";
	}
}
function reedJson(pointer, classStyle)
{//this function is for get element from a Js object
	return "<tr class="+classStyle+"><td>"+rule[pointer].letter+"</td><td>"+rule[pointer].max+"</td><td>"+rule[pointer].min+"</td><td>"+rule[pointer].valuee+"</td></tr>"
}
function table()
{//this show table of value
	var table = "<table class='stable'><tr><th>Letra</th><th>max</th><th>min</th><th>valor</th></tr>";
	for (var i in rule){
		if ((i % 2)!=0 ){
			table += reedJson(i,'light');
		}else{
			table += reedJson( i, 'dark');
		}
	}
	table += "</table>";
	document.getElementById('content').innerHTML=table;
}
function showhome()
{//this is de first page of our app 
	var home= "<ul class='homeUI'><a href='javascript:cuatrimestral()'><li>Calcular indice cuatrimestral</li></a><a href='javascript:acumulado()'><li>Calcular indice acumulado</li></a></ul>";
	document.getElementById('content').innerHTML=home;
}
function cuatrimestral()
{// this is the function for calc "indice cuatrimestral" 
	var display="";
	var kind = "cuatrimestral";
	var display = "<table class='count'><tr><th>Cantidad de materias:</th></tr><tr><td><input type='text' maxlength=\"1\" onKeyUp="+'"'+"verfyfild('num','ok')"+'"'+" id='num'></td></tr><tr><td><input type='button' value='ok' class='ok' id='ok' onclick="+'"'+"calc('"+kind+"')"+'"'+"></td></tr><tr><td id='alert'></td></tr></table>";
	document.getElementById('content').innerHTML=display;
}
function acumulado()
{// this is the function for calc "indice acumulado"
	var display="";
	var kind = "acumulado";
	var display = "<table class='count'><tr><th>Cantidad de cuatrimestres:</th></tr><tr><td><input type='text' maxlength=\"2\" onKeyUp="+'"'+"verfyfild('num','ok')"+'"'+" id='num'></td></tr><tr><td><input type='button' value='ok' class='ok' id='ok' onclick="+'"'+"calc('"+kind+"')"+'"'+"></td></tr><tr><td id='alert'></td></tr></table>";
	document.getElementById('content').innerHTML=display;
}
function calc(kind)
{//load the form for calc
	var counter = document.getElementById('num').value;
	var display;
	if(kind =="cuatrimestral"){
		display = "<table class='bigForm'><tr><th></th><th>Calificación</th><th>Creditos</th></tr>";
		for (var i = 0; i < counter; i++){
			display+="<tr><td>Materia "+(i+1)+":</td><td><input type='text' maxlength=\"3\" onKeyUp=\"verfyfild('subject"+i+"','calcb')\" id='subject"+i+"'></td><td><input type='text' maxlength=\"1\" onKeyUp=\"verfyfild('crdt"+i+"','calcb')\" id='crdt"+i+"'></td></tr>";
		}
		display +="<tr><td></td><td colspan='2'><input type='button' id='calcb' class='calcb' value='Calcular' onClick="+'"'+"calcular("+"'"+kind+"'"+","+"'"+counter+"'"+")"+'"'+"></td></tr><tr><td id='alert' colspan='2'></td></tr></table>";
	}else{
		display = "<table class='bigForm'>";
		for(var i = 0; i< counter; i++){
			display += "<tr><td>Cuatrimestre "+(i+1)+":</td><td><input type='text' id='cuatrimestre"+i+"' maxlength=\"4\" onKeyUp=\"verfyfild('cuatrimestre"+i+"','calcb')\"></td></tr>";
		}
		display += "<tr><td></td><td><input type='button' value='Calcular' class='calcb' id='calcb' onClick="+'"'+"calcular("+"'"+kind+"'"+","+"'"+counter+"'"+")"+'"'+"></td></tr><tr><td id=\"alert\" colspan=\"2\"></tr>";
	}
	document.getElementById('content').innerHTML=display;
}
function calcular(kind, conter)
{
	var cont = conter -1;
	var display;
	if (kind == "cuatrimestral"){
		var crdt, crdtTotal, cal, calTotal;
		crdtTotal=0;
		calTotal=0;
		for(var i = 0; i <= cont; i++){
			var genID= "subject"+i;
			cal = parseInt(document.getElementById(genID).value);
			genID = "crdt"+i;
			crdt = parseInt(document.getElementById(genID).value);
			crdtTotal = crdtTotal+crdt;
			calTotal = calTotal + (convert(cal)*crdt);
		}
		display = "<p>Su indice academico es: "+((calTotal/crdtTotal).toFixed(2))+"</p>";
	}else{
		var indice= 0;
		var sum=0;
		for(var i = 0; i <=cont; i++){
			var genID = "cuatrimestre"+i;
			sum += parseFloat(document.getElementById(genID).value);
		}
		indice = sum/(cont+1);
		display = "<p>Su indice academico es: "+(indice).toFixed(2)+"</p>";
	}
	document.getElementById('content').innerHTML=display;
}
function convert(cal)
{// convert the calification to value, from 0 to 4
	var calc = parseInt(cal);
	if(calc >= 90 && calc <= 100){
		return 4;
	}else if(calc >=80 && calc <90){
		return 3;
	}else if (calc >=70 && calc <80){
		return 2;
	}else if(calc >=60 && calc <70){
		return 1;
	}else if(calc >=0 && calc <60){
		return 0;
	}else{
		alert('ERROR. La calificacion debe ser de 0 a 100.');
	}
}
function showMenu()
{//this function load de menu
	document.getElementById('menu').style.top=0;
}
function about()
{// this function is for load the about of our website
	var display = '<p>"Esta aplicación fue diseñada para que cualquier estudiante universitario pueda calcular su índice académico. Tanto el cuatrimestral, como el acumulado."</p><br><br><p>Desarrollada por Franksoft.</p>';
	document.getElementById('content').innerHTML=display;
}
/*
	*Note: for print a float is: toFix(2);
*/