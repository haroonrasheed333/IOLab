<<<<<<< HEAD
$(document).ready(function() {
    $("#bookmarks").click(function(){
        var username = $("#username").val();
        //var username = "raymonst";
        var tagList1 = [];
        var tagList2=[];
        var trailListDup = [];
        var userData = [];

        $("#container").append("BOOKMARKS");
        // This cross-domain request requires that you use '?callback=?' because it is done using JSONP
        $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?', function(json){
            $(json).each(function(index) {
                // this.u // url
                // this.d // description
                // this.n // extended notes
                // this.t // array of tags
                tagList1.push(this.t);
                userData.push(this);
                $('<div></div>').html('<a href="' + this.u + '">' + this.d + " " + this.t +'</a>')
                .data('extended', this.n)
                .data('tags', this.t)
                .appendTo('#container');
            });
=======
//--------------------------------------------------------------------------------------------------------------

function getFeed(username) {

	// set initial variables
	var username = username;
	var tagList1 = [];
	var tagList2 = [];
	var trailListDup = [];
    var userData = [];
    
    // get the feed (requires that you use '?callback=?' because it is done using JSONP)
    $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?', function(json) {
    	
    	// show "loading" message
    	$("#loader").show();
    	
    	// create the full list of bookmarks
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
    		    .appendTo('#bookmarks');
    		
    	});

		// populate tagList[]    	
    	for (var i = 0; i < tagList1.length; i++){
    	    for (var j = 0; j < tagList1[i].length; j++){
    	        tagList2.push(tagList1[i][j]);
    	    }
    	}
>>>>>>> cleaned up script & styles

		// populate tagListDup[]    	
    	for (var z = 0; z < tagList2.length; z++) {
    	    if (tagList2[z].slice(0,6)=='trail:') {
    	        trailListDup.push(tagList2[z]);
    	    }
    	}

<<<<<<< HEAD
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


            /*console.log(userData);
            console.log(userData.sort(function(obj1, obj2){
                return obj1.t[1].step - obj2.t[1].step;
            }));*/

            var b=0;
            var c=0;
            var trailListSort = [];
                
            for(b=0;b<trailList.length;b++){
                var tr=trailList[b];
                $("#container").append("<br>" + tr.toUpperCase());

                
                
                for (c=0; c<userData.length;c++){
                    for(var d=0; d<userData[c].t.length;d++){
                        if (trailList[b]==userData[c].t[d]){

                            trailListSort.push(userData[c]);
                            /*$('<div></div>').html('<a href="' + userData[c].u + '">' + userData[c].t + "  |  " + userData[c].d +'</a>')
                            .data('extended', userData[c].n)
                            .data('tags', userData[c].t)
                            .appendTo('#container');*/
                        }
                    }
                                
                }

                console.log(trailListSort.sort(function(obj1, obj2){
                    return obj1.t.step - obj2.t.step;
                }));


                

                var i, j, tmp, tmp2=[];
               for (i = 0; i < trailListSort.length; i++) {
                  tmp = i;
                  for (j = i+1; j < trailListSort.length; j++) {
                    
                    var m,n=0, step='';
                    
                    for (m =0; m<trailListSort[j].t.length; m++){
                        step=trailListSort[j].t[m].slice(0,5);
                        if (step=='step:'){
                            n=m;
                            console.log("n:" + n );
                            break;
                        }
                    }
                    console.log(m);
                    console.log(n);
                     if ((parseInt(trailListSort[j].t[n].slice(5,trailListSort[j].t[n].length))) < parseInt((trailListSort[tmp].t[n].slice(5,trailListSort[j].t[n].length)))) {
                        tmp = j;
                     }
                  }
                  tmp2[i] = trailListSort[tmp];
                  trailListSort[tmp] = trailListSort[i];
                  trailListSort[i] = tmp2[i];
               }

                for (var x=0; x<trailListSort.length;x++){
                    $('<div></div>').html('<a href="' + trailListSort[x].u + '">' + trailListSort[x].t + "  |  " + trailListSort[x].d +'</a>')
                            .data('extended', trailListSort[x].n)
                            .data('tags', trailListSort[x].t)
                            .appendTo('#container');
                }
                trailListSort=[];

            }
            
            /*for (c=0; c<userData.length;c++){
                       $('<div></div>').html('<a href="' + trailListSort[c].u + '">' + trailListSort[c].t + "  |  " + trailListSort[c].d +'</a>')
                            .data('extended', trailListSort[c].n)
                            .data('tags', trailListSort[c].t)
                            .appendTo('#container'); 
                    }*/
        });
    });
    // When users click on a link, open it in a new window
            $('a').live('click', function() {
                window.open($(this).attr('href'));
                return false;
            });
return false;
=======
    	var x, 
    	len = trailListDup.length, 
    	trailList = [], 
    	obj = {};
    	
    	for (x = 0; x < len; x++) {
    	    obj[trailListDup[x]] = 0;
    	}
    	for (x in obj) {
    	    trailList.push(x);
    	}

    	// create each trail: section
    	var b = 0;
    	for (b = 0; b < trailList.length; b++) {
    	
    	    // create title for each trail:
    		var trailID = 'trail' + b;
    	    var trailTitle = '<div class="trail"><h2>' + trailList[b].replace('trail:','').replace('_',' ') + '</h2><div id="' + trailID + '"><ul class="step-1"></ul><ul class="step-2"></ul><ul class="step-3"></ul>';    	    
    		$('#trails').append(trailTitle);
    		    		
/*
    	    var element1 = document.createElement("br");
    	    document.body.appendChild(element1);
    	    var element = document.createElement("h3");
    	    var tr = trailList[b];
    	    element.appendChild(document.createTextNode(tr.toUpperCase()));
    	    document.body.appendChild(element);
*/   
			// populate each trail: section
    	    for (var c = 0; c < userData.length; c++) {
    	    	for (var d = 0; d < userData[c].t.length; d++) {
    	    		if (trailList[b] == userData[c].t[d]) {
	    	    		var stepHTML = '<li><a target="_blank" href="' + userData[c].u + '">' + userData[c].d + '</a></li>';	    	    		
/* 	    	    		var stepHTML = '<li><a href="' + userData[c].u + '">' + userData[c].d + "  |  " + userData[c].t +'</a></li>';	    	    		 */
	    	    		if ($.inArray("step:1", userData[c].t) > -1) {
		    	    		$('#' + trailID + " .step-1").append(stepHTML);
	    	    		} else if ($.inArray("step:2", userData[c].t) > -1) {
		    	    		$('#' + trailID + " .step-2").append(stepHTML);
	    	    		} else if ($.inArray("step:3", userData[c].t) > -1) {
		    	    		$('#' + trailID + " .step-3").append(stepHTML);
	    	    		};

/*
    	    			$('<li></li>').html(stepHTML)
    	    			.data('extended', userData[c].n)
    	    			.data('tags', userData[c].t)
    	    			.appendTo('#' + trailID);
*/
    	    		}
    	    	}
    	    }

    		$('#trails').append('</div>');
    	    
    	}
    
    }).success(function() { 
    	$("#loader").hide();
    	$("#trails h2").fadeIn(function() {
	    	$("#trails .step-1").fadeIn(function() {
		    	$("#trails .step-2").fadeIn(function() {
			    	$("#trails .step-3").fadeIn(1000);
		    	});
	    	});
    	});
    });
    
}



//--------------------------------------------------------------------------------------------------------------

$(document).ready(function() {
    $("#form-delicious").on("submit", function(username) {
    	var username = $("#form-delicious-username").val();
    	getFeed(username);
    	return false;
    });    
    $("#form-delicious").submit();
>>>>>>> cleaned up script & styles
});