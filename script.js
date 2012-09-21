//--------------------------------------------------------------------------------------------------------------

function getFeed(username) {

	// set initial variables
	var username = username;
	var tagList1 = [];
	var tagList2 = [];
	var trailListDup = [];
    var userData = [];
    var lastStepGroupMargin = "";
    var cycleIterator = 0;



    // function to change the "step" title
    function changeStepTitle(x) {
	    var stepTitle1 = "Step " + ((3 * x) + 1);
	    var stepTitle2 = "Step " + ((3 * x) + 2);
	    var stepTitle3 = "Step " + ((3 * x) + 3);
	    $("#trails-title-1").html(stepTitle1);
	    $("#trails-title-2").html(stepTitle2);
	    $("#trails-title-3").html(stepTitle3);
    }


    
    // get the feed (requires that you use '?callback=?' because it is done using JSONP)
    // IMPORTANT: include "count=", otherwise it defaults to 10 
    $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?count=100&callback=?', function(json) {
    	
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

        // populate taglist2, a one dimensional array with all the tags of an user
    	for (var i = 0; i < tagList1.length; i++){
    	    for (var j = 0; j < tagList1[i].length; j++){
    	        tagList2.push(tagList1[i][j]);
    	    }
    	}

    	// populate trailListDup, an array with all the trails of an user
    	for (var z = 0; z < tagList2.length; z++) {
    	    if (tagList2[z].slice(0,6)=='trail:') {
    	        trailListDup.push(tagList2[z]);
    	    }
    	}

        // calculate the largest step
        var stepListDup=[];
        for (var z = 0; z < tagList2.length; z++) {
            if (tagList2[z].slice(0,5)=='step:') {
                stepListDup.push(tagList2[z]);
            }
        }
        var temp1=[];
        for (var z=0; z<stepListDup.length; z++){
            temp1.push(parseInt(stepListDup[z].slice(5,stepListDup[z].length)));
        }
        var latgestStep = Math.max.apply(Math, temp1);

        // remove the duplicate entries from trailListDup   
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
            var trailTitle = '<div class="trail"><h2>' + trailList[b].replace('trail:','').replace('_',' ') + '</h2><div class="trail-steps" id="' + trailID+ '">';
            var stepString='';

            for (z = 1; z <= latgestStep; z++) {
            	if (z % 3 == 0) {
	                stepString = stepString + '<ul class="step step-last step-' + z + '"></ul>';
	            } else {
	                stepString = stepString + '<ul class="step step-' + z + '"></ul>';
	            }
            }

            // add in the title
            trailTitle = trailTitle + stepString;        
            $('#trails').append(trailTitle);
            
            // populate each trail: section
    	    for (var c = 0; c < userData.length; c++) {
    	    	for (var d = 0; d < userData[c].t.length; d++) {
    	    		if (trailList[b] == userData[c].t[d]) {
                        //var stepHTML = '<li><a target="_blank" href="' + userData[c].u + '">' + userData[c].d + '</a></li>';                        
                        var stepHTML = '<li><a target="iframe1" href="' + userData[c].u + '">' + userData[c].d + '</a></li>';                        
                        for (z = 1; z <= latgestStep; z++) {
                            stepMatch = 'step:' + z;
                            stepMatch1 = ' .step-' + z;
                            if ($.inArray(stepMatch, userData[c].t) > -1) {
                                $('#' + trailID + stepMatch1).append(stepHTML);
                            };
                        }
               		}
    	    	}
    	    }
    	    
    	    // close the div
            $('#trails').append('</div>');
        }
    
    // after the data is loaded
    }).success(function() { 
    
    	// hide the "loading" message
    	$("#loader").hide();
    	
    	// split the list items into chunks of 3
    	$(".trail").each(function(self) {
	    	self = $(this);
	    	var lists = self.find("ul");
	    	for (var i = 0; i < lists.length; i += 3) {
	    		wrapper = "<ul class='trail-steps-group'></ul>";	
	    		lists.slice(i, i+3).wrapAll(wrapper);
	    	}; 	
	    	self.find(".trail-steps-group").wrapAll("<div class='trail-steps-group-container'></div>");
	    	self.find(".trail-steps-group-container").width(1000000);
    	});
    	
    	// fade in the titles and then the list items
    	$("#trails h2").fadeIn(250);
    	setTimeout(function() {
    		$("#trails .step").each(function(i) {
    	        var self = $(this); 
    	        setTimeout(function() { 
    	        	self.fadeIn(250);
    	        	getH = self.height();
    	        	//console.log(getH, self.parent().parent().height());
    	        	if (self.parent().parent().parent().height() < getH) {
	    	        	self.parent().parent().parent().height(getH);
    	        	};
    	        }, 250 * i);
    	    });
    	}, 250);   	
    	
    	// show the prev/next buttons only if there are more than 3 steps
    	if ($(".trail-steps-group").length - $("#trails h2").length > 1) {
	    	$("#trails-nav-prev, #trails-nav-next").fadeIn(250);
    	} else {
	    	$("#trails-nav-prev, #trails-nav-next").fadeOut(250);
    	};

    	// calculate the left margin for the last chunk of list items (for carousel)
    	stepGroupCount = $(".trail-steps-group").length;
    	stepGroupWidth = $(".trail-steps-group").width();
    	lastStepGroupMargin = ((stepGroupCount * stepGroupWidth) / $(".trail").length - stepGroupWidth) * -1 + "px";
	    
	    // change the "step" title
	    changeStepTitle(cycleIterator);
    	
    });

    // "previous 3 items" click function
    // IMPORTANT: "unbind" first to prevent multiple fires
    $("#trails-nav-prev").unbind("click").on("click", function() {
        if ($(".trail-steps-group-container").css("marginLeft") == "0px") {
	    	$(".trail-steps-group-container").animate({
	        	"marginLeft" : "+=20px"
	        }, 100).animate({
	        	"marginLeft" : "-=20px"
	        }, 100);
        } else {
	    	$(".trail-steps-group-container").animate({
	        	"marginLeft" : "+=700px"
	        });
	        cycleIterator--;
	        changeStepTitle(cycleIterator);
        };
	    return false;
    });

    // "next 3 items" click function
    // IMPORTANT: "unbind" first to prevent multiple fires
    $("#trails-nav-next").unbind("click").on("click", function() {
        if ($(".trail-steps-group-container").css("marginLeft") == lastStepGroupMargin) {
	    	$(".trail-steps-group-container").animate({
	        	"marginLeft" : "-=20px"
	        }, 100).animate({
	        	"marginLeft" : "+=20px"
	        }, 100);			    
	    } else {
	    	$(".trail-steps-group-container").animate({
	    		"marginLeft" : "-=700px"
	    	});			    
	        cycleIterator++;
	        changeStepTitle(cycleIterator);
	    };
	    return false;    
    });
    	    
}



//--------------------------------------------------------------------------------------------------------------

$(document).ready(function() {

    $("#form-delicious").on("submit", function(username) {
    	$("#trails").html("");
    	var username = $("#form-delicious-username").val();
    	getFeed(username);
    	return false;
    });

});