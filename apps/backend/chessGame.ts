import { Server, Socket } from 'socket.io';
import { Chess } from 'chess.js'

 export class ChessGame{
     player1: Socket;
     player2:Socket | null = null;
     roomId: string;
     gameId: string;
     chess = new Chess();
     io: Server;



    constructor(player1: Socket,  gameId: string, roomId: string, io: Server ){
        this.player1 = player1;
        this.gameId = gameId;
        this.roomId = roomId
        this.io = io;
    }

    joinGame(player2: Socket){
        this.player2 = player2;
        this.player1.join(this.roomId)
        this.player2.join(this.roomId);
        this.player1.emit('assign-color', {color: 'White'});
        this.player2.emit('assign-color', {color: 'Black'});
        this.io.to(this.roomId).emit('gameStart', {
            fen: this.chess.fen(),
            message: 'Game has started!'
        });
    }

    disconnect(disconnectedPlayer: Socket) {
        const winner = (disconnectedPlayer.id === this.player1.id) ? 'black' : 'white';
    
        this.io.to(this.roomId).emit('gameOver', {
            winner,
            reason: 'opponent disconnected',
            fen: this.chess.fen()
        });
    
        // Remove players from the room
        this.player1.leave(this.roomId);
        this.player2?.leave(this.roomId);
    
        // Optional: Clean up from activeGames Map
    }

    makeMove(player: Socket, move:{
        from: string, 
        to: string,
        promotion?:string
    }, ){
        const currentTurn = this.chess.turn();
        if (currentTurn === 'w' && player.id !== this.player1.id) {
            player.emit('error', 'Not your turn');
            return;
        }
    
        if (currentTurn === 'b' && player.id !== this.player2?.id) {
            player.emit('error', 'Not your turn');
            return;
        }
        
        const result = this.chess.move({
            from: move.from,
            to: move.to,
            promotion: move.promotion
        })

        if(!result){
            player.emit('invalid-move', {
                message: 'this is not the valid move'
            })
        }

        this.io.to(this.roomId).emit('moveMade', {
            move: result,
            fen: this.chess.fen()
        })

        if (this.chess.isCheckmate()) {
            const winner = this.chess.turn() === 'w' ? this.player2 : this.player1;
            this.io.to(this.roomId).emit('gameOver', {
                reason: 'checkmate',
                winner: winner?.id,
                fen: this.chess.fen()
            });
            
        }

        if (this.chess.isDraw()) {
            this.io.to(this.roomId).emit('gameOver', {
                reason: 'draw',
                message: 'The game is a draw.',
                fen: this.chess.fen()
            });
        
            
        }

        
        
        
    }


}