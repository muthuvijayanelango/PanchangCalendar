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
    //var startOfMonth= moment().clone().startOf("month").format("dddd");
    var startOfMonth = x[0].getElementsByTagName("Information")[1].childNodes[0].nodeValue;
    var dayIndex = localDayArr.indexOf(startOfMonth);
        
    for(var j=0; j<dayIndex; j++)
    {
        var element=document.createElement("td");
        element.className="calendar_number_empty";
        document.getElementById("lc").appendChild(element);
        //document.body.appendChild(element)
    }
    //var tblHead = document.createElement('thead');
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var prek = 0;
    var element=document.createElement("td");
    
        for(var k=0; k<=days; k++)
        {
        //var cell = document.createElement("td");
        var weekday = x[k].getElementsByTagName("Information")[1].childNodes[0].nodeValue;
        //var element=document.createElement("td");
        
        if(prek != k && weekday === "Sunday")
        {
        var element=document.createElement("tr");
        element.appendChild(document.createTextNode(""));
        document.getElementById("lc").appendChild(element);
        var prek = k;
        k = k-1;                             
        }
        
        else
        {
        var element=document.createElement("td");
        var Nakshathra=document.createElement("div");
        var Thithi=document.createElement("div");
        var Yoga=document.createElement("div");
        var Karna=document.createElement("div");
        //obj.dt === k ? element.className="calendar_number calendar_number--current":(element.className="calendar_number");
        //var day = dayArr[k]
        element.className ="date";
        element.appendChild(document.createTextNode(k+1));
        var Nakshathra_Value = x[k].getElementsByTagName("Information")[2].childNodes[0].nodeValue; 
	    var Thithi_Value = x[k].getElementsByTagName("Information")[3].childNodes[0].nodeValue; 
	    var Yoga_Value = x[k].getElementsByTagName("Information")[5].childNodes[0].nodeValue; 
	    var Karana_Value = x[k].getElementsByTagName("Information")[6].childNodes[0].nodeValue;
        document.getElementById("lc").appendChild(element);
        if(element.innerText != null)
        {
            
            Nakshathra.appendChild(document.createTextNode('\n'+ Nakshathra_Value));
            Nakshathra.className ="Nakshatra";
            document.getElementById("lc").appendChild(Nakshathra);
            Thithi.appendChild(document.createTextNode('\n'+ Thithi_Value));
            Thithi.className ="Nakshatra";
            document.getElementById("lc").appendChild(Thithi);
            Yoga.appendChild(document.createTextNode('\n'+ Yoga_Value));
            Yoga.className ="Yoga";
            document.getElementById("lc").appendChild(Yoga);
            Karna.appendChild(document.createTextNode('\n'+ Karana_Value));
            Karna.className ="Yoga";
            document.getElementById("lc").appendChild(Karna);
        }
        
        //element.appendChild(document.createTextNode('\n'+ Nakshathra));
        //element.appendChild(document.createTextNode('\n'+ Thithi));
        //element.appendChild(document.createTextNode('\n'+ Yoga));
        //element.appendChild(document.createTextNode('\n'+ Karana)); 
        
        }
        
    }
     
    
}