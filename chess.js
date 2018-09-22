class Board {
	constructor() {
		this.size = 8;
		this.white = new Player('white',1);
		this.black = new Player('black',-1);
		this.tiles = [];
		
		this.loopTiles(function(i){
			this.tiles[i] = [];
		},function(i,j) {
			this.tiles[i][j] = new Tile(i,j);
		});
		
		this.loopTiles(undefined,function(i,j) {
			try{this.tiles[i][j].north     = this.tiles[i+1][j];}catch(e){}
			try{this.tiles[i][j].south     = this.tiles[i-1][j];}catch(e){}
			try{this.tiles[i][j].east      = this.tiles[i][j+1];}catch(e){}
			try{this.tiles[i][j].west      = this.tiles[i][j-1];}catch(e){}
			try{this.tiles[i][j].northeast = this.tiles[i+1][j+1];}catch(e){}
			try{this.tiles[i][j].northwest = this.tiles[i+1][j-1];}catch(e){}
			try{this.tiles[i][j].southeast = this.tiles[i-1][j+1];}catch(e){}
			try{this.tiles[i][j].southwest = this.tiles[i-1][j-1];}catch(e){}
		});

		this.reset();
	}
	loopTiles(singleInner,doubleInner) {
		for(var i=0;i<this.size;i++) {
			if (typeof singleInner === 'function')
			  singleInner.call(this,i);
			for(var j=0;j<this.size;j++) {
        if (typeof doubleInner === 'function')
          doubleInner.call(this,i,j);
			}
		}
	}
	reset() {
	  this.loopTiles(function(i) {
    },function(i,j){
	    var player,piece;
	    var tile = this.tiles[i][j],
          jPos = Math.abs(j-3.5),
          newJ = Math.round(map(j,0,7,0,1));
	    if (i == 0 || i == 1)
	      player = this.white;
	    if (i == 6 || i == 7)
	      player = this.black;
	    if (i == 0 || i == 7) {
	      if (jPos == 3.5) { // 0 or 7
	        piece = player['rook'+newJ];
        }
        else if (jPos == 2.5) { // 1 or 6
          piece = player['knight'+newJ];
        }
        else if (jPos == 1.5) { // 2 or 5
          piece = player['bishop'+newJ];
        }
        else if (j == 3) {
          piece = player['queen'];
        }
        else if (j == 4) {
          piece = player['king'];
        }
      }
	    else if (i == 1) {
	      piece = player['pawn'+j];
      }
      else if (i == 6) {
	      piece = player['pawn'+j];
      }
      else {
        piece = undefined;
      }
      if (piece !== undefined) {
        tile.piece = piece;
        piece.tile = tile;
      }
    });
  }
  log() {
	  var pieces = [];
	  this.loopTiles(function(i) {
	    pieces[i] = [];
    },function(i,j) {
	    // pieces[i][j] = this.tiles[i][j].piece;
	    pieces[i][j] = this.tiles[i][j].nameX+this.tiles[i][j].nameY;
    });
	  console.table(pieces);
  }
}

class Tile {
	constructor(i,j) {
		this.nameX = ['a','b','c','d','e','f','g','h'][i];
		this.nameY = ''+(j+1);
		this.position = createVector(i,j);
		this.posX = i;
		this.posY = j;
		this.piece = undefined;
		this.north = undefined;
		this.south = undefined;
		this.west = undefined;
		this.east = undefined;
		this.northeast = undefined;
		this.northwest = undefined;
		this.southeast = undefined;
		this.southwest = undefined;
	}
	everyDir() {
	  return this.orthogonals().concat(this.diagonals());
  }
	orthogonals() {
	  return [this.norths(),this.wests(),this.souths(),this.easts()].flatten().compact();
  }
	diagonals() {
	  return [this.northeasts(),this.northwests(),this.southeasts(),this.southwests()].flatten().compact();
  }
  norths() {
	  if (this.north === undefined)
	    return [];
    else
	    return [this.north,this.north.norths()].flatten().compact();
  }
  souths() {
	  if (this.south === undefined)
	    return [];
    else
	    return [this.south,this.south.souths()].flatten().compact();
  }
  wests() {
	  if (this.west === undefined)
	    return [];
    else
	    return [this.west,this.west.wests()].flatten().compact();
  }
  easts() {
	  if (this.east === undefined)
	    return [];
    else
	    return [this.east,this.east.easts()].flatten().compact();
  }
	northeasts() {
	  if (this.northeast === undefined)
	    return [];
    else
	    return [this.northeast,this.northeast.northeasts()].flatten().compact();
  }
	northwests() {
	  if (this.northwest === undefined)
	    return [];
    else
	    return [this.northwest,this.northwest.northwests()].flatten().compact();
  }
	southeasts() {
	  if (this.southeast === undefined)
	    return [];
    else
	    return [this.southeast,this.southeast.southeasts()].flatten().compact();
  }
	southwests() {
	  if (this.southwest === undefined)
	    return [];
    else
	    return [this.southwest,this.southwest.southwests()].flatten().compact();
  }
}

class Player {
	constructor(color,direction) {
		this.color   = color;
		this.direction = direction;
		// this.piece0 is queen-side piece
		// this.piece1 is king-side piece
    // except pawns, 0-7 is a-h columns
		this.rook0   = new Rook(this);
		this.rook1   = new Rook(this);
		this.bishop0 = new Bishop(this);
		this.bishop1 = new Bishop(this);
		this.knight0 = new Knight(this);
		this.knight1 = new Knight(this);
		this.queen   = new Queen(this);
		this.king    = new King(this);
		this.pawn0   = new Pawn(this);
		this.pawn1   = new Pawn(this);
		this.pawn2   = new Pawn(this);
		this.pawn3   = new Pawn(this);
		this.pawn4   = new Pawn(this);
		this.pawn5   = new Pawn(this);
		this.pawn6   = new Pawn(this);
		this.pawn7   = new Pawn(this);
	}
	
	pieces() {
	  return [
      this.pawn0, this.pawn1,this.pawn2,this.pawn3,this.pawn4,this.pawn5,this.pawn6,this.pawn7,
      this.rook0,this.rook1,
      this.bishop0,this.bishop1,
      this.knight0,this.knight1,
      this.queen,this.king
    ];
	}
}

class Piece {
	constructor(player,type) {
	  this.player = player;
		this.type = type;
		this.posX = 0;
		this.posY = 0;
		this.captured = false;
		this.tile = undefined;
	}
	
	capture() {
		this.capture = true;
	}
}

class Pawn extends Piece {
	constructor(player) {
		super(player,'pawn');
	}
	moves() {
	  if (this.player.direction == 1) {
	    return [this.tile.north,this.tile.northeast,this.tile.northwest].compact();
    }
    else {
      return [this.tile.south,this.tile.southeast,this.tile.southwest].compact();
    }
  }
}

class Rook extends Piece {
	constructor(player) {
		super(player,'rook');
	}
	moves() {
	  return this.tile.orthogonals();
  }
}

class Bishop extends Piece {
	constructor(player) {
		super(player,'bishop');
	}
	moves() {
	  return this.tile.diagonals();
  }
}

class Knight extends Piece {
	constructor(player) {
		super(player,'knight');
	}
	moves() {
	  var tile = this.tile,
        toRet = [];
	  try{toRet.push(tile.north.northwest);}catch(e){}
	  try{toRet.push(tile.north.northeast);}catch(e){}
	  try{toRet.push(tile.west.northwest);}catch(e){}
	  try{toRet.push(tile.west.southwest);}catch(e){}
	  try{toRet.push(tile.east.northeast);}catch(e){}
	  try{toRet.push(tile.east.southeast);}catch(e){}
	  try{toRet.push(tile.south.southwest);}catch(e){}
	  try{toRet.push(tile.south.southeast);}catch(e){}
	  return toRet;
  }
}

class Queen extends Piece {
	constructor(player) {
		super(player,'queen');
	}
	moves() {
	  return this.tile.every();
  }
}

class King extends Piece {
	constructor(player) {
		super(player,'king');
	}
	moves() {
	  var tile = this.tile;
	  return [tile.north,tile.south,tile.east,tile.west,tile.northeast,tile.northwest,tile.southeast,tile.southwest].compact();
  }
}