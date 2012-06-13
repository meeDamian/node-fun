var context,
    colors = ["red", "green", "blue", "yellow"],
    viewport = {
        width: 500,
        height: 500,
        x: 0,
        y: 0
    };

$(function(){

    context = $('#map')[0].getContext('2d');

    for( var i in colors ) {
        var $n = $("");
        colors[i];
    }

    $(document).keydown(function(e) {
        e.preventDefault();
        switch( e.which ) {
            case 37: viewport.x -= 5; break; // LEFT
            case 38: viewport.y -= 5; break; // UP
            case 39: viewport.x += 5; break; // RIGHT
            case 40: viewport.y += 5; break; // DOWN
        }
        now.updateActor( viewport.x, viewport.y );
    });

    now.ready(function(){
        now.updateActor( viewport.x, viewport.y );
    });
});

now.drawActors = function( actors ) {

    context.clearRect( 0, 0, viewport.width, viewport.height );
    context.beginPath();

    for( var i in actors ) {
        if( i==now.core.clientId) {
            context.fillStyle = "red";
            context.fillRect( 
                viewport.width/2  + actors[i].x - viewport.x,
                viewport.height/2 + actors[i].y - viewport.y,
                5,
                5
            );

            for( var x = -actors[i].x % 40; x<500; x+=40 ) {
                context.moveTo( x, 0 );
                context.lineTo( x, 500 );
            }

            for( var y = -actors[i].y % 40; y<500; y+=40 ) {
                context.moveTo( 0, y );
                context.lineTo( 500, y );
            }

            context.strokeStyle = "#eee";
            context.stroke();
        } else {
            context.fillStyle = "black";
            context.fillRect(
                viewport.width/2  + actors[i].x - viewport.x,
                viewport.height/2 + actors[i].y - viewport.y,
                5,
                5
            );
        }
    }
};
