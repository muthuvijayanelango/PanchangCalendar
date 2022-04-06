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
			panchangDetails(this);
		}
	};
	// Jan 2023.xml is the external xml file
	xmlhttp.open("GET", "Jan 2023.xml", true);
	xmlhttp.send();
}

function panchangDetails(xml) 
{
    var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName("Panchang-Information");
	// Start to fetch the data by using TagName
	for (i = 0; i < x.length; i++) 
	{
		xmlDoc=(new DOMParser()).parseFromString(xml.responseText,'text/xml');
		var x = xmlDoc.getElementsByTagName("Panchang-Information");
        var Nakshathra = x[i].getElementsByTagName("Information")[2].childNodes[0].nodeValue; 
		var Thithi = x[i].getElementsByTagName("Information")[3].childNodes[0].nodeValue; 
		var Yoga = x[i].getElementsByTagName("Information")[5].childNodes[0].nodeValue; 
		var Karana = x[i].getElementsByTagName("Information")[6].childNodes[0].nodeValue;
		document.write("Nakshathra="+Nakshathra+"<br>");
		document.write("Thithi="+Thithi+"<br>");
		document.write("Yoga="+Yoga+"<br>");
		document.write("Karana="+Karana+"<br><br><br>");
	}
}