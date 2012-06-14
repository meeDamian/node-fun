var context,
    colors = ["red", "green", "blue", "yellow"],
    viewport = {
        width: 500,
        height: 500,
        x: 0,
        y: 0
    },
    prefs = {
        color: colors[0]
    },
    count = {
        current:0,
        new:null
    };

$(function(){

    context = $('#map')[0].getContext('2d');

    var form = document.getElementById('colors');
    for( var i in colors ) {
        var fieldset = document.createElement('fieldset'),
            input = document.createElement('input'),
            label = document.createElement('label');
            
        input.id = input.value = colors[i];
        input.type = "radio";
        input.name = "color";
        if(i==0) input.setAttribute("checked", "checked");
        fieldset.appendChild( input );
        
        label.setAttribute('for', colors[i] );
        label.innerHTML = colors[i];
        fieldset.appendChild( label );
        
        form.appendChild( fieldset );
    }
    
    $('input[name=color]').change(function(){
        prefs.color = $(this).val();
        now.updateActor( viewport.x, viewport.y, prefs );
    });
    

    $(document).keydown(function(e) {
        e.preventDefault();

        switch( e.which ) {
            case 37: viewport.x -= 5; break; // LEFT
            case 38: viewport.y -= 5; break; // UP
            case 39: viewport.x += 5; break; // RIGHT
            case 40: viewport.y += 5; break; // DOWN
        }
        now.updateActor( viewport.x, viewport.y, prefs );
    });

    now.ready(function(){
        now.updateActor( viewport.x, viewport.y, prefs );
    });
});

now.drawActors = function( actors ) {

    context.clearRect( 0, 0, viewport.width, viewport.height );
    context.beginPath();

    count.new = 0;
    for( var i in actors ) {
    
        if( actors.hasOwnProperty(i) ) count.new++;
        
        if( i==now.core.clientId ) {
        
            context.fillStyle = actors[i].color;
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

            var bbt = now.environment.bigBlackThing;
            context.fillStyle = "black";
            context.fillRect( 
                bbt.x - viewport.x, 
                bbt.y - viewport.y, 
                bbt.width, 
                bbt.width 
            );
        } else {
            context.fillStyle = actors[i].color;
            context.fillRect(
                viewport.width/2  + actors[i].x - viewport.x,
                viewport.height/2 + actors[i].y - viewport.y,
                5,
                5
            );
        }
    }
    
    if( count.current != count.new ) {
        $('title').text( $('title').text().replace(/\(.*?\)/,"("+count.new+")") );
        count.current = count.new;
    }
    
};
