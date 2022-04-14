var h2=document.querySelector(".calendar-picture h2");
var h3=document.querySelector(".calendar-picture h3");
var monthArr=["January","February","March","April","May","June","August","September","October","November","December"];
var dayArr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var day31MonthArr=["January","March","May","July","August","October","December"];

var d= new Date();
var obj=getDate();
loadXMLDoc();
//generateCalendar();

function getDate()
{
    var month=d.getMonth();
    month=monthArr[month];
    var day=d.getDay();
    day=dayArr[day]
    var date=d.getDate();
    //h2.innerHTML=date+","+day;
    //h3.innerHTML=month;
    return{m: month,dy: day,dt: date,yr: d.getFullYear()}
}

function loadXMLDoc()
{
    var x;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () 
	{
        // Request finished and response
		// is ready and Status is "OK"
		if (this.readyState == 4 && this.status == 200) 
		{
			generateCalendar(this);
		}
	};
	// Jan 2023.xml is the external xml file
	xmlhttp.open("GET", "Jan 2023.xml", true);
	xmlhttp.send();
}
function generateCalendar(xml)
{
    var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName("Panchang-Information");
    
    //var x;
    var days;
    if(obj.m === "February" && obj.yr %4!== 0)
    {
        days=28;
    }
    else if(obj.m === "February" && obj.yr %4 === 0)
    {
        days=29;
    }
    else if(day31MonthArr.includes(obj.m))
    {
        days=31;
    }
    else
    {
        days=30;
    }
    var localDayArr=["sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var startOfMonth= moment().clone().startOf("month").format("dddd");
    var dayIndex = localDayArr.indexOf(startOfMonth);
    
    for(var j=0; j<dayIndex; j++)
    {
        var element=document.createElement("div");
        element.className="calendar_number_empty";
        document.getElementById("lc").appendChild(element);
    }
    for(var k=1; k<=2; k++)
    {
        var element=document.createElement("div");
        obj.dt === k ? element.className="calendar_number calendar_number--current":(element.className="calendar_number");
        element.appendChild(document.createTextNode(k));
        var Nakshathra = x[k-1].getElementsByTagName("Information")[2].childNodes[0].nodeValue; 
	    var Thithi = x[k-1].getElementsByTagName("Information")[3].childNodes[0].nodeValue; 
	    var Yoga = x[k-1].getElementsByTagName("Information")[5].childNodes[0].nodeValue; 
	    var Karana = x[k-1].getElementsByTagName("Information")[6].childNodes[0].nodeValue;
        document.getElementById("lc").appendChild(element);
        element.appendChild(document.createTextNode('\n'+ Nakshathra));
        element.appendChild(document.createTextNode('\n'+ Thithi));
        element.appendChild(document.createTextNode('\n'+ Yoga));
        element.appendChild(document.createTextNode('\n'+ Karana));
    }
}