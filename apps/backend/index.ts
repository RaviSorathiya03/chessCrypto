import { createServer } from 'http';
import { Server, Socket } from "socket.io";
import { ChessGame } from './chessGame';
import { Chess } from 'chess.js'
let waitingPlayer: Socket | null = null;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

const activeGames = new Map<string, ChessGame>();




io.on('connection', (socket)=>{
    socket.on('joinGame', ()=>{
        if(waitingPlayer === null){
            waitingPlayer = socket;
            socket.emit('waiting', {
                message: 'Wait for other player to join the game'
            })
        } else{
            const gameId = `${waitingPlayer.id}-${socket.id}-${Date.now()}`;
            const roomId = gameId;
            const g1 = new ChessGame(waitingPlayer, gameId, roomId, io);
            g1.joinGame(socket);
            activeGames.set(gameId, g1);
            waitingPlayer = null;
        }
    })

    socket.on('makeMove', (data)=>{
        const {gameId, from , to, promotion} = data;
        const game = activeGames.get(gameId);
        if(game){
            game.makeMove(socket, {from, to, promotion});
        } else{
            socket.emit('error', {
                message: 'Game does not exist'
            })
        }

    })

    socket.on('disconnect', () => {
        for (const [gameId, game] of activeGames) {
            if (game.player1.id === socket.id || game.player2?.id === socket.id) {
                game.disconnect(socket);
                activeGames.delete(gameId);
                break;
            }
        }
    
        if (waitingPlayer?.id === socket.id) {
            waitingPlayer = null;
        }
    });
    
})

httpServer.listen(8080);
