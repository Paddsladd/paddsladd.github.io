class hiScore_class{
	constructor(siteURL){
		this._hiscores_load_URL='https://skolplus.se/callback/hiscores_load.php';
		this._hiscores_save_URL='https://skolplus.se/callback/hiscores_save.php';
	}

	loadHiscores(gameID,callback_loaded) {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		  if (this.readyState == 4){
			if (this.status == 200) {
				if (this.responseText==''){
					return [];
				}
				else {
					callback_loaded(JSON.parse(this.responseText));
				}
			}
			 else {
				 console.log('Ajax ERROR: '+this.statusText);
				 callback_loaded('');
			 }
		  }
	  };
	  xhttp.open("GET", this._hiscores_load_URL+'?g='+gameID, true);
	  xhttp.send();
	}
	format_hiscore(list_arr,txt_points){
		var i;
		if (list_arr==[]) return;
		while ( list_arr.length<10){
			list_arr.push({n:'',s:0});
		}
		var html='<div class="hs" style="font-size:18px;font-weight:bold;text-align:left;" >';
		for (i=0;i<list_arr.length;i++){
			html+='<div class="hs_row" style="margin-top:4px;background-color:#f0f0f0;">';
			html+='<div class="hs_col1" style="display:inline-block;background-color:black;color:white;width:28px;text-align:center;border-radius:15px;padding:3px;">'+(i+1)+'</div>';
			html+='<div class="hs_col2" style="display:inline-block;margin-left:20px;min-width:160px;padding:3px;">';
			if (list_arr[i].s>0){
				html+=list_arr[i].s+' '+txt_points;
			}
			html+='</div>';
			html+='<div class="hs_col3" style="display:inline-block;margin-left:20px;padding:3px;">'+this.safetext(list_arr[i].n)+'</div>';
			html+='</div>';
		}
		html+='</div>';
		return html;
	}

	saveHiscore(gameID,name,score,callback_saved) {
		name=name.trim();
		if (name==''){
			console.log('not saved, name missing');
			return;
		}
		if (score==0){
			console.log('not saved, score zero');
			return;
		}
		var myindex=Math.floor(Math.random()*1000000);
		var hash=(myindex+score)%637;

		

		 var formData = new FormData();
		formData.append("i", myindex);
		formData.append("g", gameID);
		formData.append("n", name);
		formData.append("s", score);
		formData.append("h", hash);
		
         var xhr = new window.XMLHttpRequest()
		  xhr.onreadystatechange = function() {
			  if (this.readyState == 4){
				if (this.status == 200) {
					if (this.responseText=='OK'){
						callback_saved(true);
					}
					else {
						console.log(this.responseText);
						callback_saved(false);
					}	
				}
				 else {
					 console.log('Ajax ERROR: '+this.statusText);
					 callback_saved(false);
				 }
			  }
		  };
         xhr.open('POST', this._hiscores_save_URL, true)
         //xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
         xhr.send(formData);
		 //console.log(formData);
		 console.log('Hiscore saved as', name, 'with', score, 'points');

	}
	safetext(text){
		var table = {'<': 'lt','>': 'gt','"': 'quot','\'': 'apos','&': 'amp','\r': '#10','\n': '#13'};
		return text.toString().replace(/[<>"'\r\n&]/g, function(chr){return '&' + table[chr] + ';';	});
	};
}