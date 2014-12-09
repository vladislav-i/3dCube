$(document).ready(function() {
	$("#prev").click(function(){ 
		getThumbs(this.value, $("#search").val());
	});
	
	$("#next").click(function(){
		getThumbs(this.value, $("#search").val());
	});
	
	//when user click search we want to ask what image
	$("#search").click(function() {
		var s = prompt("Enter key word for image search");
		//if cancell don't return any value
		if (s!=null) {	
			//http requests
			getThumbs(0,s);
			this.value=s;
			//document.getElementById("prev").disabled=true;
			//document.getElementById("next").disabled=false;
			//$( "#prev" ).prop( "disabled", true );
			//$( "#next" ).prop( "disabled", false );
			//$( "#next" ).prop( "disabled", false );
		}
	});
	
	$( "#prev" ).prop( "disabled", true );
	$( "#next" ).prop( "disabled", true );
	
	function getThumbs(page,s) {
			var client = new XMLHttpRequest();
			//function calls when the state of request changed
			// == 4 is done and successful 
			client.onreadystatechange= function(){
				if (client.readyState == 4 && client.status == 200) {
					//call function with responce 
					var str = client.responseText;
					if (str.indexOf("jsonFlickrApi")===0){
							eval(str);
						};
				}
			};
			var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=923950ffc3477ee79f9178ff3add1fc0&per_page=9&format=json&tags="+encodeURIComponent(s) + "&page="+page;
			//get request to get info back from url
			//true not in order, will not wait for responce.
			client.open("GET",url,true);
			//send is always empty for get
			client.send();
	}
	
	function jsonFlickrApi(d){
		var t=document.getElementById("thumbs");
		var imgs=t.getElementsByTagName("td"); //created imgs array
		for (var i=0; i<d.photos.photo.length; i++) {
			var p=d.photos.photo[i]; //particular photo
			tUrl="http://farm"+ p.farm +".static.flickr.com/" + p.server + "/" + p.id + "_" + p.secret + "_" + "t.jpg";
			pUrl="http://www.flickr.com/photos/"+p.owner+"/"+p.id;
			imgs[i].innerHTML='<a href="'+pUrl+'"><img alt="' +p.title+'" src="' +tUrl +'"/></a>';
		}
		//disable next button if pages run out of images
		if ($("#next").val() < d.photos.pages) {
			$("#next").val(d.photos.page+1);
			$( "#next" ).prop( "disabled", false );
		}else{
			$( "#next" ).prop( "disabled", true );
		}
		
		if (d.photos.page > 1) {
			$("#prev").val(d.photos.page-1);
			$( "#prev" ).prop( "disabled", false );
		}else{
			$( "#prev" ).prop( "disabled", true );
		}
	}
	
});

