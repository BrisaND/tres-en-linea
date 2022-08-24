let board = [

    [1,2,3],
    [4,5,6],
    [7,8,9]

];

class Player{

    constructor(id, color){

        this.id = id;
        this.isTurn = id == 1 ? true : false;
        this.symbol = id == 1 ? "o" : "x";
        this.color = color;
        this.won = false;
        this.points = 0;

    }

    win() {

        $(".heading").text("Player " + (this.id == 1 ? "One" : "Two") + " Wins!");
        $(".heading").css("color", this.color);
        this.points++;
        //this.points += 1;
        $(".p" + this.id).text("Player " + this.id + ": " + this.points);
        this.won = true;

    }

}

var players = [

    new Player(1,'tomato'),
    new Player(2,'#1946d8')

]

class Space{

    constructor(id){

        this.played = false;
        this.id = id;

    }

    addSymbol(spaceElement, symbol){

        // error handled

        if ($(spaceElement).length){

            $(spaceElement).append("<div class='" + symbol + "'>" + symbol + "</div>");

            this.played = true;

        }else{

            console.log("no se encontró el elemento");

        }
        
    }

}

var spaces = [

    new Space("one"),
    new Space("two"),
    new Space("three"),
    new Space("four"),
    new Space("five"),
    new Space("six"),
    new Space("seven"),
    new Space("eight"),
    new Space("nine")

];

// gameplay
$(".board").on("click", function (event){

    if (!players.some (p => p.won)){
        
        spaces.some(function(s, index){
            
            if(s.id == event.target.id && !s.played == true){
            
                players.forEach(function(p){
               
                    if (p.isTurn ){

                        s.addSymbol(event.target, p.symbol);
                        saveSpacePlayed(index, p.symbol);

                        if (isThreeInLine(p.symbol)){
    
                            p.win();
                        }
                    }
                    
                    
                });
                
                switchTurn();

            }
    
    
        });
        
    }

});

function switchTurn(){

    players.forEach(p => p.isTurn = !p.isTurn);

}

function saveSpacePlayed(index, symbol){

    let rowIndex, columnIndex;

    switch(index){

        case 0: case 1: case 2:
            rowIndex = 0;
            break;

        case 3: case 4: case 5:
            rowIndex = 1;
            break;

        case 6: case 7: case 8:
            rowIndex = 2;
            break;

    }
    
    columnIndex = board[rowIndex].indexOf(index + 1);

    board[rowIndex][columnIndex] = symbol;

}

function isThreeInLine(symbol){
   // [//    0
    //   0 1 2
  //      [1,2,3],
    //     1
    //   0 1 2
 //       [4,5,6],
    //     2
    //   0 1 2
  //      [7,8,9]
 //   ]

    //match rows
    //top [0,0] + [0,1] + [0,2]
    //midle [1,0] + [1,1] + [1,2]
    //bottom [2,0] + [2,1] + [2,2]

    //match columns
    //left [0,0] + [1,0] + [2,0]
    //midle [0,1] + [1,1] + [2,1]
    //right [0,2] + [1,2] + [2,2]

    //match diagonals
    // left to right [0,0] + [1,0] + [2,0]
    // right to left [0,1] + [1,1] + [2,1]
    
    if ((board[0][0] == symbol && board[0][1] == symbol && board[0][2] == symbol) ||
        (board[1][0] == symbol && board[1][1] == symbol && board[1][2] == symbol) ||
        (board[2][0] == symbol && board[2][1] == symbol && board[2][2] == symbol) ||
        (board[0][0] == symbol && board[1][0] == symbol && board[2][0] == symbol) ||
        (board[0][1] == symbol && board[1][1] == symbol && board[2][1] == symbol) ||
        (board[0][2] == symbol && board[1][2] == symbol && board[2][2] == symbol) ||
        (board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol) ||
        (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol)){

        return true;

    }else {

        return false;
        
    }
}
