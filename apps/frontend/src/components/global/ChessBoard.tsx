"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { UserButton, useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Clock, User, Flag, RotateCcw, MessageSquare, Settings } from "lucide-react"
import { Chessboard } from "react-chessboard"


gsap.registerPlugin(ScrollTrigger)

function ChessGamePlatform() {
  const chessboardOptions = {
    // Professional chess board styling
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg mb-6">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">ChessCrypto</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">LIVE MATCH</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white/80 text-sm">
              Prize Pool: <span className="text-yellow-400 font-bold">$20</span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Player 1 Info */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Player 1</CardTitle>
                  <CardDescription className="text-white/60">Rating: 1850</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Entry Fee</span>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">$10 PAID</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-green-400" />
                <span className="text-2xl font-mono text-green-400">15:00</span>
              </div>
              <div className="text-white/60 text-sm">Pieces Captured: 3</div>
            </CardContent>
          </Card>

          {/* Game Controls */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Game Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
                <Flag className="mr-2 h-4 w-4" />
                Resign
              </Button>
              <Button className="w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30">
                <RotateCcw className="mr-2 h-4 w-4" />
                Offer Draw
              </Button>
              <Button className="w-full bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center - Chess Board */}
        <div className="lg:col-span-2">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
            <div className="relative">
              {/* Player 2 Info Bar */}
              <div className="flex items-center justify-between mb-4 p-3 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Player 2</div>
                    <div className="text-white/60 text-sm">Rating: 1920</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-400" />
                    <span className="text-xl font-mono text-red-400">12:45</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">$10 PAID</Badge>
                </div>
              </div>

              {/* Chess Board */}
              <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 p-2 rounded-lg shadow-2xl">
                <div className="bg-white p-1 rounded">
                  <Chessboard
                    id="professional-board"
                    boardWidth={500}
                    customBoardStyle={{
                      borderRadius: "4px",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    customDarkSquareStyle={{ backgroundColor: "#8B4513" }}
                    customLightSquareStyle={{ backgroundColor: "#F5DEB3" }}
                  />
                </div>

                {/* Game Status Overlay */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/90 text-white font-semibold">YOUR TURN</Badge>
                </div>
              </div>

              {/* Player 1 Info Bar */}
              <div className="flex items-center justify-between mt-4 p-3 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Player 1 (You)</div>
                    <div className="text-white/60 text-sm">Rating: 1850</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-xl font-mono text-green-400">15:00</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">$10 PAID</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Game Info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Player 2 Info */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Player 2</CardTitle>
                  <CardDescription className="text-white/60">Rating: 1920</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Entry Fee</span>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">$10 PAID</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-red-400" />
                <span className="text-2xl font-mono text-red-400">12:45</span>
              </div>
              <div className="text-white/60 text-sm">Pieces Captured: 1</div>
            </CardContent>
          </Card>

          {/* Move History */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Move History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-white/60">1.</div>
                  <div className="text-white">e4</div>
                  <div className="text-white">e5</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-white/60">2.</div>
                  <div className="text-white">Nf3</div>
                  <div className="text-white">Nc6</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-white/60">3.</div>
                  <div className="text-white">Bb5</div>
                  <div className="text-white">a6</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-white/60">4.</div>
                  <div className="text-white bg-green-500/20 px-1 rounded">Ba4</div>
                  <div className="text-white/60">...</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Stats */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Game Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Total Prize</span>
                <span className="text-yellow-400 font-bold">$20</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Game Type</span>
                <span className="text-white">15+10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Moves Played</span>
                <span className="text-white">7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Winner Takes</span>
                <span className="text-green-400 font-bold">$20</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="container mx-auto mt-6">
        <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  LIVE GAME
                </Badge>
                <span className="text-white/80">Match ID: #CHC-2024-001</span>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
                  Leave Game
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function App() {
  const { isSignedIn } = useUser()

  // For demo purposes, show the chess platform directly
  // In real app, you'd route between landing page and game
  return <ChessGamePlatform />
}

export default App
