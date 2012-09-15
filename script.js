function x(){
	var username = "raymonst";
	var tagList1 = [];
	var tagList2=[];
	var trailListDup = [];
    var userData = [];
    // This cross-domain request requires that you use '?callback=?' because it is done using JSONP
    $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?',
        function(json){
            $(json).each(function(index) {
						
            // this.u // url
            // this.d // description
            // this.n // extended notes
            // this.t // array of tags
            tagList1.push(this.t);
            userData.push(this);
            $('<li></li>').html('<a href="' + this.u + '">' + this.d + " " + this.t +'</a>')
				.data('extended', this.n)
				.data('tags', this.t)
				.appendTo('#bookmarks ul');

            });

            for(var i=0; i<tagList1.length; i++){
                for(var j=0; j<tagList1[i].length; j++){
                    tagList2.push(tagList1[i][j]);
                }
            }

            for(var z=0; z<tagList2.length; z++){
                if (tagList2[z].slice(0,6)=='trail:'){
                    trailListDup.push(tagList2[z]);
                }
            }
            
            var x, len=trailListDup.length, trailList=[], obj={};

            for (x=0;x<len;x++) {
                obj[trailListDup[x]]=0;
            }
            for (x in obj) {
                trailList.push(x);
            }

            var b=0;
            
            for(b=0;b<trailList.length;b++){

            	var element1 = document.createElement("br");
                document.body.appendChild(element1);
                var element = document.createElement("h3");
                var tr=trailList[b];
                element.appendChild(document.createTextNode(tr.toUpperCase()));
                document.body.appendChild(element);
                
                for (var c=0; c<userData.length;c++){
					for(var d=0; d<userData[c].t.length;d++){
						if (trailList[b]==userData[c].t[d]){
							$('<p></p>').html('<a href="' + userData[c].u + '">' + userData[c].d + "  |  " + userData[c].t +'</a>')
                        .data('extended', userData[c].n)
                        .data('tags', userData[c].t)
                        .appendTo('body');
						}
					}
				}
            }
        });
}

$(document).ready(function() {
	x();
	return false;
});