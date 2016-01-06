

console.log(window.innerHeight+ ' '+ $(document).height());
console.log(window.innerWidth+ ' ' + $(document).width());

function buildShip(){
	for(i=0; i<150; i++){
		var color = "#"+((1<<24)*Math.random()|0).toString(16);
	    	$('.line-wrapper').append("<div class='line' style='border:1px solid "+color+"'></div>")
	}
}



var field = '1';

function newField(){
	
	field = (parseInt(field)+1).toString();
	beginGame()

}


var level = 30;

function beginGame(){
	//$('.twinkling, .clouds').remove();// IDK 
	
	$('body').append("<div class='field' id="+field+"></div>");
	
	var p = 1000; //Speed of asteroid creation

	setTimeout(function() {
		for (i=0; i<level; i++){
			(function(i){setTimeout(function(){flyBy(i, field)},i*200)})(i);
			//console.log('create circle in '+i*1000+'+ i sec')
		 
		}
	}, p)

	setTimeout(function(){ newField() },  p + 1000); //How long until a new asteroid field is created
}



function flyBy(i, field){

		var circle = "circle" + i;
//		var left = (Math.floor(Math.random() * 50)+25) +'%';
//		var tp = (Math.floor(Math.random() * 50)+25) + '%';

//	background: radial-gradient(circle at 50% 50%, #fff, #000);

		var left = (Math.floor(Math.random() * 50)+25) 
		var tp = (Math.floor(Math.random() * 50)+25) 
		var dir = (100-left) +'px ' + (100-tp) + 'px ';
		console.log(dir)
		var left = left +'%';
		var tp = tp +'%';

	//	var dir = '0% 0%'
		

		$('#'+field).append("<div class='circle' id='"+circle+"' style='left:"+left+";top:"+tp+";background: radial-gradient(circle at "+dir+", #777, #000);'></div>")
		contentLeft = $('#'+field).position().left;
		contentTop = $('#'+field).position().top;
		craftLeft = $('.line-wrapper').position().left
		craftTop = $('.line-wrapper').position().top

		circle = "#"+circle+""
		var h = Math.floor(Math.random()*100+Math.random()*1000);
		var w = h;
		var l = ((Math.random() * ($(document).width() - h )).toFixed())*(Math.random() < 0.5 ? -1 : 1)*1.5// + contentLeft 
		var t = ((Math.random() * ($(document).height() - h )).toFixed())*(Math.random() < 0.5 ? -1 : 1)*1.5// + contentTop 


	//	console.log(l +' '+ t + ' ' + ' ' +w+ ' '+h+' ' + circle) 
	//	console.log('');

		//setTimeout(function(){cometHitShip(circle)},2700)
		$(circle).animate({
			"left": l,
			"top": t,
			"height": h,
			"width": w,
			//"transition-timing-function":"easeInExpo"

		}, 5000, 'linear', function() {

			cometHitShip(circle, w)
			$(circle).remove()
	
		});
}

function cometHitShip(circle, w){

		if($(circle).position().left <= $('.line-wrapper').position().left && $(circle).position().left + w >= $('.line-wrapper').position().left) {
			if($(circle).position().top <= $('.line-wrapper').position().top && $(circle).position().top + w >= $('.line-wrapper').position().top) {
				//$('.line-wrapper').remove(); //Destroy ship
				console.log('game over');
			} 

		}   

}



$(document).click(function (e) { //Default mouse Position 


	console.log('this is the field '+field)
	$('.line-wrapper, .'+field).stop();
	$('.moveIt').removeClass('moveIt')	

	contentLeft = $('#'+field).position().left;
	contentTop = $('#'+field).position().top;
	craftLeft = $('.line-wrapper').position().left
	craftTop = $('.line-wrapper').position().top
	changeY = e.pageY-craftTop-contentTop;
	changeX = e.pageX-craftLeft-contentLeft;
	shipY = e.pageY-craftTop
	shipX = e.pageX-craftLeft

/*	
	console.log('shipY  '+shipY )
	console.log('shipX  '+shipX )
	console.log("contentLeft "+contentLeft);
	console.log("contentTop "+contentTop);
	console.log('osition().top;'+ $('.line-wrapper').position().top);
	console.log('osition().left;'+ $('.line-wrapper').position().left);
	console.log('e.pageY '+e.pageY)
	console.log('e.pageX '+e.pageX)
	console.log('changeY '+changeY)
	console.log('changeX '+changeX)
	console.log('')
*/

	var degrees = Math.atan(shipY/shipX)*(180/Math.PI) //Point ship in direction of click

	if(shipX > 0){ //Adjust degrees properly. 225 equals straight up
		degrees = 225 + degrees + 90;
	} else {
		degrees = 225 + degrees + 270;
	}

	$('.line-wrapper').css({
		"transform":"rotate("+degrees+"deg)"
	})

	$('.field, .clouds').animate({  //Moves background - Speed of Craft -
		"left":changeX*(-2),
		"top":changeY*(-2),
		
		},  1000, 'linear', function(){
			$('.line-wrapper').css({ //Turn ship to the opposite side
				//"transform":"rotate("+(180+degrees)+"deg)" 
				"transform":"rotate(225deg)" 
			})
			$('.line-wrapper').addClass('moveIt')
		/*	$('#'+field).animate({
				"left":"0",
				"top":"0"
			}, 2000)

		*/
	})


});



buildShip()
newField()








        // ----------------------------------------
        // Particle
        // ----------------------------------------

        function Particle( x, y, radius ) {
            this.init( x, y, radius );
        }

        Particle.prototype = {

            init: function( x, y, radius ) {

                this.alive = true;

                this.radius = radius || 10;
                this.wander = 0.15;
                this.theta = random( TWO_PI );
                this.drag = 0.92;
                this.color = '#fff';

                this.x = x || 0.0;
                this.y = y || 0.0;

                this.vx = 0.0;
                this.vy = 0.0;
            },

            move: function() {

                this.x += this.vx;
                this.y += this.vy;

                this.vx *= this.drag;
                this.vy *= this.drag;

                this.theta += random( -0.5, 0.5 ) * this.wander;
                this.vx += sin( this.theta ) * 0.1;
                this.vy += cos( this.theta ) * 0.1;

                this.radius *= 0.96;
                this.alive = this.radius > 0.5;
            },

            draw: function( ctx ) {

                ctx.beginPath();
                ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        };

        // ----------------------------------------
        // Example
        // ----------------------------------------

        var MAX_PARTICLES = 280;
        var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

        var particles = [];
        var pool = [];

        var demo = Sketch.create({
            container: document.getElementById( 'container' )
        });

        demo.setup = function() {

            // Set off some initial particles.
            var i, x, y;

            for ( i = 0; i < 20; i++ ) {
                x = ( demo.width * 0.5 ) + random( -100, 100 );
                y = ( demo.height * 0.5 ) + random( -100, 100 );
                demo.spawn( x, y );
            }
        };

        demo.spawn = function( x, y, size ) {

            if ( particles.length >= MAX_PARTICLES )
                pool.push( particles.shift() );

            particle = pool.length ? pool.pop() : new Particle();
            particle.init( x, y, random( 5, size ) );

            particle.wander = random( 0.5, 2.0 );
            particle.color = random( COLOURS );
            particle.drag = random( 0.9, 0.99 );

            theta = random( TWO_PI );
            force = random( 2, 4 );

            particle.vx = sin( theta ) * force;
            particle.vy = cos( theta ) * force;

            particles.push( particle );
        };

        demo.update = function() {

            var i, particle;

            for ( i = particles.length - 1; i >= 0; i-- ) {

                particle = particles[i];

                if ( particle.alive ) particle.move();
                else pool.push( particles.splice( i, 1 )[0] );
            }
        };

        demo.draw = function() {

            demo.globalCompositeOperation  = 'lighter';

            for ( var i = particles.length - 1; i >= 0; i-- ) {
                particles[i].draw( demo );
            }
        };

        demo.mousemove = function() {
            var particle, theta, force, touch, max, i, j, n;

            for ( i = 0, n = demo.touches.length; i < n; i++ ) {

                touch = demo.touches[i], max = random( 1, 4 );
                for ( j = 0; j < max+50; j++ ) {
                  //demo.spawn( touch.x, touch.y );
		  //demo.spawn( window.innerWidth/2, window.innerHeight/2+100, 50 );

                }

            }
        };
                  

	setInterval(function() { //Rocket fires continously
            var particle, theta, force, touch, max, i, j, n;

            for ( i = 0, n = demo.touches.length; i < n; i++ ) {

                touch = demo.touches[i], max = random( 1, 4 );
                for ( j = 0; j < max+50; j++ ) {
                  //demo.spawn( touch.x, touch.y );
		  //demo.spawn( window.innerWidth/2, window.innerHeight/2+100, 50 );
		  demo.spawn( 150,150, 50 );

                }

            }
        }, 200);



