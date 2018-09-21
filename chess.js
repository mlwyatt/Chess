class Board {
	constructor() {
		this.size = 8;
		this.white = new Player('white');
		this.black = new Player('black');
		this.tiles = [];
		
		this.loopSize(function(i){
			this.tiles[i] = [];
		},function(i,j) {
			this.tiles[i][j] = new Tile();
		});
		
		this.loopSize(undefined,function(i,j) {
			this.tiles[i][j].north = this.tiles[i][j];
			this.tiles[i][j].south = this.tiles[i][j];
			this.tiles[i][j].east = this.tiles[i][j];
			this.tiles[i][j].west = this.tiles[i][j];
			this.tiles[i][j].northeast = this.tiles[i][j];
			this.tiles[i][j].northwest = this.tiles[i][j];
			this.tiles[i][j].southeast = this.tiles[i][j];
			this.tiles[i][j].southwest = this.tiles[i][j];
		});
	}
	
	loopSize(singleInner,doubleInner) {
		for(var i=0;i<this.size;i++) {
			singleInner.call(this,i);
			for(var j=0;j<this.size;j++) {
				doubleInner.call(this,i,j);
			}
		}
	}
}

class Tile {
	constructor() {
		this.nameX = '';
		this.nameY = '';
		this.posX = 0;
		this.posY = 0;
		this.piece = undefined;
		this.north = undefined;
		this.south = undefined;
		this.west = undefined;
		this.east = undefined;
		this.northeast = undefined;
		this.northwest = undefined;
		this.sourtheast = undefined;
		this.southwest = undefined;
	}
}

class Player {
	constructor(color) {
		this.color   = color;
		this.rookQ   = new Rook();
		this.rookK   = new Rook();
		this.bishopQ = new Bishop();
		this.bishopK = new Bishop();
		this.knightQ = new Knight();
		this.knightK = new Knight();
		this.queen   = new Queen();
		this.king    = new King();
		this.pawn1   = new Pawn();
		this.pawn2   = new Pawn();
		this.pawn3   = new Pawn();
		this.pawn4   = new Pawn();
		this.pawn5   = new Pawn();
		this.pawn6   = new Pawn();
		this.pawn7   = new Pawn();
		this.pawn8   = new Pawn();
	}
	
	pieces() {
		return [
				this.pawn1,this.pawn2,this.pawn3,this.pawn4,this.pawn5,this.pawn6,this.pawn7,this.pawn8,
				this.rookQ,this.rookK,
				this.bishopQ,this.bishopK,
				this.knightQ,this.knightK,
				this.queen,this.king
			];
	}
}

class Piece {
	constructor(type) {
		this.type = type;
		this.posX = 0;
		this.posY = 0;
		this.captured = false;
	}
	
	capture() {
		this.capture = true;
	}
}

class Pawn extends Piece {
	constructor() {
		super('pawn');
	}
}

class Rook extends Piece {
	constructor() {
		super('rook');
	}
}

class Bishop extends Piece {
	constructor() {
		super('bishop');
	}
}

class Knight extends Piece {
	constructor() {
		super('knight');
	}
}

class Queen extends Piece {
	constructor() {
		super('queen');
	}
}

class King extends Piece {
	constructor() {
		super('king');
	}
}