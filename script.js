// --------------------------------------------------
//http://feeds.delicious.com/v2/json/raymonst
// function #1

function x() {


               
                    var username = "haroonrasheed";
					var traillist = [];
                    // This cross-domain request requires that you use '?callback=?' because it is done using JSONP
                    $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?',
                     function(json){
                        $(json).each(function(index) {
							
                            // this.u // url
                            // this.d // description
                            // this.n // extended notes
                            // this.t // array of tags
                            $('<li></li>').html('<a href="' + this.u + '">' + this.d + " " + this.t +'</a>')
								.data('extended', this.n)
								.data('tags', this.t)
								.appendTo('#bookmarks ul');
								traillist.push(this.t);
								console.log(traillist);
								console.log(traillist.length);
                        });
						
						
                    });
					console.log(traillist.length);
					
					
					
					for(var i=0; i<traillist.length; i++){
					console.log(traillist[i]);
					}
					
					
					$.getJSON('http://feeds.delicious.com/v2/json/' + 'raymonst/trail:oakland' + '?callback=?',
                     function(json){
                        $(json).each(function(index) {
                            // this.u // url
                            // this.d // description
                            // this.n // extended notes
                            // this.t // array of tags
                            $('<li></li>').html('<a href="' + this.u + '">' + this.d  +'</a>')
								.data('extended', this.n)
								.data('tags', this.t)
								.appendTo('#trail ul');
                        });
						
						
                    });
                    return false;
           

}



// --------------------------------------------------
// document ready

$(document).ready(function() {
	x();
});