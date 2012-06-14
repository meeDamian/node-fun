var fs = require('fs'),
    http = require('http');
 
server = http.createServer(function(req,res) {
    fs.readFile('index.htm', function(err, data) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
    });
}).listen(8803);

var nowjs = require("now"),
    everyone = nowjs.initialize(server),
    actors = [];

nowjs.on('connect', function(){
    actors[ this.user.clientId ] = { x:0, y:0, color:"red" };
});

nowjs.on('disconnect', function(){
    for( var i in actors ) {
        if( i==this.user.clientId) {
            delete actors[i];
            break;
        }
    }
});

everyone.now.environment = {

    bigBlackThing: {
        width: 160,
        height: 160,
        x: 40,
        y: 40
    }
    
};

everyone.now.updateActor = function( x, y, info ) {

    // TODO: check is user move is allowed
    actors[ this.user.clientId ].x = x;
    actors[ this.user.clientId ].y = y;
    actors[ this.user.clientId ].color = info.color;

    var toUpdate = {};
    for( var i in actors ) {
        if( Math.abs(x - actors[i].x)<310 && Math.abs(y - actors[i].y)<310 ) {
            toUpdate[i] = {
                x: actors[i].x,
                y: actors[i].y,
                color: actors[i].color
            };
        }
    }

    for( var i in toUpdate ) {
        nowjs.getClient(i,function(err){
            this.now.drawActors( toUpdate );
        });
    }
};
