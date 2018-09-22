var notationsX = ['a','b','c','d','e','f','g','h'];
var notationsY = [1,2,3,4,5,6,7,8];
class Board {
  constructor() {
    this.size = 8;
    this.white = new Player('white',1);
    this.black = new Player('black',-1);
    this.tiles = [];
    
    this.loopTiles((i)=>{this.tiles[i]=[];},(i,j)=>{this.tiles[i][j]=new Tile(i,j);});
    
    this.loopTiles(undefined,(i,j)=>{
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
    this.loopTiles((i)=>{},(i,j)=>{
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
  log(toCall) {
    var pieces = [];
    this.loopTiles((i)=>{pieces[i] = [];},(i,j)=>{
      var tile = this.tiles[i][j],
          called;
      if (typeof toCall === 'undefined')
        called = tile;
      else {
        if (typeof tile[toCall] === 'function')
          called = tile[toCall]();
        else
          called = tile[toCall];
      }
      pieces[i][j] = called;
    });
    console.table(pieces);
  }
  show() {
    this.loopTiles(undefined,(i,j)=>{this.tiles[i][j].show();});
  }
  move(fromT,toT) {
    var fx = fromT[0],
        fy = fromT[1],
        tx = toT[0],
        ty = toT[1];
    try{this.tiles[notationsY.indexOf(fy)][notationsX.indexOf(fx)].piece.moveTo(this.tiles[notationsY.indexOf(ty)][notationsX.indexOf(tX)])}catch(e){}
  }
  findTile(name) {
    var tile;
    this.loopTiles(undefined,(i,j)=>{if (this.tiles[i][j].name === name){tile=this.tiles[i][j];}});
    return tile;
  }
}

class Tile {
  constructor(i,j) {
    this.nameX = notationsX[j];
    this.nameY = ''+(i+1);
    this.name = this.nameX + this.nameY;
    this.position = createVector(i,j);
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
  evenOdd() {
    return (this.position.x+this.position.y)%2;
  }
  show() {
    push();
    translate(this.position.x*100,this.position.y*100);
    if (this.evenOdd())
      fill(255,255,0);
    else
      fill(0,0,255);
    rect(0,0,100,100);
    // try{this.piece.show();}catch(e){}
    rotate(Math.PI/2);
    fill(0);
    textSize(32);
    text(this.namePiece(),10,-50);
    pop();
  }
  namePiece() {
    return this.name+(this.piece||'');
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
    this.captured = false;
    this.tile = undefined;
  }
  capture() {
    this.captured = true;
    this.tile = undefined;
  }
  toString() {
    return this.type.capitalize();
  }
  show() {
    fill(0);
    textSize(32);
    text(this.toString(),10,50);
  }
  moves() {
    return this.allTiles().compact().select(this.filterTiles,this);
  }
  move(toTile) {
    if (this.canMove(toTile)) {
      if (toTile.piece)
        toTile.piece.capture();
      toTile.piece = this;
      this.tile.piece = undefined;
      this.tile = toTile;
    }
  }
  canMove(toTile) {
    var self = this;
    return (toTile.piece == undefined || toTile.piece.player != this.player) &&
      this.moves().includes(toTile);
  }
  filterTiles(t) {
    return t.piece === undefined || t.piece.player != this.player;
  }
}

class Pawn extends Piece {
  constructor(player) {
    super(player,'pawn');
  }
  normalTiles() {
    return [this.player.direction == 1 ? this.tile.north : this.tile.south];
  }
  attackTiles() {
    var tile = this.tile;
    return (this.player.direction == 1 ?
        [tile.northeast,tile.northwest]
        :
        [tile.southeast,tile.southwest]
    );
  }
  allTiles() {
    return this.normalTiles().concat(this.attackTiles());
  }
  normalMove() {
    return this.normalTiles().compact().select(this.filterTiles,this)[0];
  }
  attackMoves() {
    var player = this.player;
    return this.attackTiles().compact().select((t)=>{return t.piece && t.piece.player!=player;});
  }
  canMove(toTile) {
    var straight = this.normalTiles()[0],
        atk = this.attackTiles(),
        atkE = atk[0],
        atkW = atk[1];
    return (straight == toTile && straight.piece === undefined) ||
           (atkE == toTile && atkE.piece && atkE.piece.player != this.player) ||
           (atkW == toTile && atkW.piece && atkW.piece.player != this.player);
    // fixme en-passant
  }
}

class Rook extends Piece {
  constructor(player) {
    super(player,'rook');
  }
  allTiles() {
    return this.tile.orthogonals();
  }
}

class Bishop extends Piece {
  constructor(player) {
    super(player,'bishop');
  }
  allTiles() {
    return this.tile.diagonals();
  }
}

class Knight extends Piece {
  constructor(player) {
    super(player,'knight');
  }
  allTiles() {
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
  allTiles() {
    return this.tile.every();
  }
}

class King extends Piece {
  constructor(player) {
    super(player,'king');
  }
  allTiles() {
    var tile = this.tile;
    return [tile.north,tile.south,tile.east,tile.west,tile.northeast,tile.northwest,tile.southeast,tile.southwest];
  }
}