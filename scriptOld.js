

console.log(window.innerWidth);
console.log(window.innerHeight);


function buildShip(){
	for(i=0; i<150; i++){
	    	$('.line-wrapper').append("<div class='line'></div>")
	}
}







var level = 3;

function beginGame(){
	for (i=0; i<level; i++){
		(function(i){setTimeout(function(){flyBy(i)},i*1000)})(i);
		//console.log('create circle in '+i*1000+'+ i sec')
		 
	}
}



function flyBy(i){

		var circle = "circle" + i;
		//console.log(circle);
		$('#content').append("<div class='circle' id='"+circle+"'></div>")
		//$('body').append("<div class='circle' id='"+circle+"'></div>")

		circle = "#"+circle+""
		h = Math.floor(Math.random()*100+1000);
		w = h;
		l = Math.floor(window.innerWidth*((Math.random()*150+1))/100)-(h/2)+'px';
		t = Math.floor(window.innerHeight*((Math.random()*150+1))/100)-(h/2)+'px';
		//console.log(l +' '+ t + ' ' + ' ' +w+ ' '+h+' ' + circle) 
		//setTimeout(function(){cometHitShip(circle)},2700)
		$(circle).animate({
			"left": l,
			"top": t,
			"height": h,
			"width": w,
			"transition-timing-function":"linear"

		}, 3000, function() {

			cometHitShip(circle)
			console.log(circle + ' removed');
			$(circle).remove()
	
		});
}

function cometHitShip(circle){

		if($(circle).position().left <= $('.line-wrapper').position().left && $(circle).position().left + w >= $('.line-wrapper').position().left) {
			if($(circle).position().top <= $('.line-wrapper').position().top && $(circle).position().top + w >= $('.line-wrapper').position().top) {
				//$('.line-wrapper').remove(); //Destroy ship
				console.log('game over');
			} 

		}   

}



$(document).click(function (e) { //Default mouse Position 

	$('.line-wrapper, #content').stop();	

	changeY = e.pageY-$('.line-wrapper').position().top;
	changeX = e.pageX-$('.line-wrapper').position().left;

	var degrees = Math.atan(changeY/changeX)*(180/Math.PI)

	if(changeX > 0){ //Adjust degrees properly. 225 equals straight up
		degrees = 225 + degrees + 90;
	} else {
		degrees = 225 + degrees + 270;
	}

	$('.line-wrapper').css({
		"transform":"rotate("+degrees+"deg)"
	})

	$('.line-wrapper').animate({
		"left":e.pageX,
		"top":e.pageY,
		}, 1000, function(){
			$('.line-wrapper').css({ //Turn ship to the opposite side
				"transform":"rotate("+(180+degrees)+"deg)" 
			})
		
			$('.line-wrapper').animate({
				"left":"50%",
				"top":"50%",
			}, 1000, function(){
				$('.line-wrapper').css({
					"transform":"rotate(225deg)" 
					})
			})
	})


	$('#content').animate({
		"left":-1*changeX,
		"top":-1*changeY
		}, 1000, function(){
			//var innerds = $("#content .circle").detach();
			//innerds[0].style.left = innerds[0].style.left + (-2)*changeX;
			//innerds[0].style.top = innerds[0].style.top + (-2)*changeY;
			//$('body').append(innerds);
			pushCircles(changeX, changeY)

			$('#content').animate({
				"left":0,
				"top":0
			}, 1000)
	})



});


var holder = 0;

function pushCircles(changeX, changeY){

	holder+=1 
	div = 'holder'+holder 
	var width = $("#content").css("width") 
	var height = $("#content").css("height") 
	var left = $("#content").css("left")
	var topp = $("#content").css("top")
	console.log(topp + ' ' + left+ ' ' +height+ ' ' +width);
	

	$('body').append("<div id="+div+" style='left:"+left+";top:"+topp+";z-index:1;height:100%;width:100%;position:fixed'></div>");//position:fixed'
	$("#content .circle").detach().appendTo('#'+div)


	
}


buildShip()
beginGame()


/**
	//$('#'+div).html($('#content').html());
	//$('#content').empty();
//	var element = $('#content .circle').detach();
//	$('#'+div).append(element);

So what shoudl I work on?  Cases? Code? 

CODE:

Fix ship direction 7
Add particles 8
Move background with ship, and back.  7
Mess with gameplay



***/

/*

document.onkeydown = checkKey;


function checkKey(e) {

	e = e || window.event;

	if (e.keyCode == '38') {
		// up arrow
		$('.line').css({'transform': 'rotateZ(170deg)'});
		$('.line-wrapper').css({'transform': 'rotateZ(170deg)'});

	}
	
	else if (e.keyCode == '40') {
		// down arrow
		$('.line').css({'transform': 'rotateZ(45deg)'});
		$('.line-wrapper').css({'transform': 'rotateZ(45deg)'});

	}
	else if (e.keyCode == '37') {
		// left arrow
		$('.line').css({'transform': 'rotateZ(90deg)'});
		$('.line-wrapper').css({'transform': 'rotateZ(90deg)'});


	}
	else if (e.keyCode == '39') {
		// right arrow
		$('.line').css({'transform': 'rotateZ(220deg)'});
		$('.line-wrapper').css({'transform': 'rotateZ(220deg)'});



	}

}
*/

