"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Crown,
  Wallet,
  Shield,
  Clock,
  Trophy,
  User,
  ChevronRight,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Zap,
  LogOut,
  RefreshCw,
} from "lucide-react"

interface Token {
  symbol: string
  name: string
  icon: string
  address?: string
  decimals: number
  price: number
  amount: string
  color: string
}

export default function PaymentPage() {
  const [selectedToken, setSelectedToken] = useState<Token>({
    symbol: "ETH",
    name: "Ethereum",
    icon: "⟠",
    decimals: 18,
    price: 2500,
    amount: "0.004",
    color: "from-blue-500 to-purple-600",
  })

  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState("0x742d35Cc6634C0532925a3b8D404fddBd4f4c4f4")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirming" | "confirmed" | "failed">("pending")
  const [transactionHash] = useState("0x1234567890abcdef1234567890abcdef12345678")

  // Available tokens
  const tokens: Token[] = [
    {
      symbol: "ETH",
      name: "Ethereum",
      icon: "⟠",
      decimals: 18,
      price: 2500,
      amount: "0.004",
      color: "from-blue-500 to-purple-600",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      icon: "💵",
      address: "0xA0b86a33E6441b8C4505B4afDcA7FBf0251f7046",
      decimals: 6,
      price: 1,
      amount: "10.00",
      color: "from-blue-400 to-cyan-500",
    },
    {
      symbol: "USDT",
      name: "Tether",
      icon: "💰",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
      price: 1,
      amount: "10.00",
      color: "from-green-500 to-emerald-600",
    },
  ]

  // Mock wallet connectors
  const walletConnectors = [
    { id: "metamask", name: "MetaMask", icon: "🦊" },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
    { id: "coinbase", name: "Coinbase Wallet", icon: "🔵" },
    { id: "trust", name: "Trust Wallet", icon: "🛡️" },
  ]

  // Copy address to clipboard
  const copyAddress = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Handle wallet connection
  const connectWallet = (connectorId: string) => {
    setIsWalletConnected(true)
    console.log(`Connecting to ${connectorId}`)
  }

  // Handle payment
  const handlePayment = () => {
    setPaymentStatus("confirming")
    // Simulate transaction confirmation
    setTimeout(() => {
      setPaymentStatus("confirmed")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg mb-6">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">ChessCrypto</span>
          </div>

          <div className="flex items-center space-x-4">
            {isWalletConnected ? (
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Wallet className="w-3 h-3 mr-1" />
                  {formatAddress(walletAddress)}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsWalletConnected(false)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">WALLET REQUIRED</Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Game Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Match Details */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                  Match Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Game Type</span>
                  <span className="text-white font-semibold">Blitz 15+10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Entry Fee</span>
                  <span className="text-yellow-400 font-bold text-lg">$10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Total Prize</span>
                  <span className="text-green-400 font-bold text-lg">$20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Match ID</span>
                  <span className="text-white/60 font-mono text-sm">#CHC-2024-001</span>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-white/80 text-sm">Smart contract escrow</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <span className="text-white/80 text-sm">Automatic winner payout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    <span className="text-white/80 text-sm">Decentralized & transparent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opponent Info */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl">Your Opponent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-lg">ChessKnight</div>
                    <div className="text-white/60">Rating: 1820</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        PAID
                      </Badge>
                      <span className="text-white/60 text-sm">Waiting for you...</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timer */}
            <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-white/80 text-sm mb-1">Payment expires in</div>
                <div className="text-3xl font-mono text-red-400 font-bold">04:32</div>
                <div className="text-white/60 text-xs mt-1">Match will be cancelled if not paid</div>
              </CardContent>
            </Card>
          </div>

          {/* Center - Wallet Connection & Payment */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Wallet className="mr-3 h-7 w-7 text-yellow-400" />
                  Crypto Payment
                </CardTitle>
                <p className="text-white/60 mt-2">Connect your wallet and pay with cryptocurrency</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Wallet Connection */}
                {!isWalletConnected ? (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Wallet className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-white text-xl font-semibold mb-2">Connect Your Wallet</h3>
                      <p className="text-white/60 mb-6">Choose your preferred wallet to continue</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                        {walletConnectors.map((connector) => (
                          <Button
                            key={connector.id}
                            onClick={() => connectWallet(connector.id)}
                            className="h-16 bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center space-x-3"
                          >
                            <span className="text-2xl">{connector.icon}</span>
                            <span>{connector.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Wallet Info */}
                    <Card className="bg-black/20 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-semibold">Wallet Connected</div>
                              <div className="text-white/60 text-sm font-mono">{formatAddress(walletAddress)}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyAddress(walletAddress)}
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Token Selection */}
                    <div>
                      <h3 className="text-white font-semibold mb-4">Select Payment Token</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {tokens.map((token) => (
                          <Button
                            key={token.symbol}
                            variant={selectedToken.symbol === token.symbol ? "default" : "outline"}
                            className={`h-20 flex-col ${
                              selectedToken.symbol === token.symbol
                                ? `bg-gradient-to-r ${token.color} text-white`
                                : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                            }`}
                            onClick={() => setSelectedToken(token)}
                          >
                            <span className="text-2xl mb-1">{token.icon}</span>
                            <span className="text-sm font-semibold">{token.symbol}</span>
                            <span className="text-xs opacity-60">{token.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Balance & Payment Details */}
                    <Card className="bg-black/20 border-white/10">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white/80">Your Balance</span>
                            <span className="text-white font-bold">
                              {selectedToken.symbol === "ETH" && "0.125 ETH"}
                              {selectedToken.symbol === "USDC" && "50.00 USDC"}
                              {selectedToken.symbol === "USDT" && "25.50 USDT"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80">Required Amount</span>
                            <span className="text-white font-bold">
                              {selectedToken.amount} {selectedToken.symbol}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80">USD Value</span>
                            <span className="text-white/60">≈ $10.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80">Network Fee</span>
                            <span className="text-white/60">
                              {selectedToken.symbol === "ETH" && "~$2.50"}
                              {selectedToken.symbol === "USDC" && "~$1.20"}
                              {selectedToken.symbol === "USDT" && "~$1.50"}
                            </span>
                          </div>
                          <Separator className="bg-white/10" />
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">Total to Pay</span>
                            <span className="text-yellow-400 font-bold text-lg">
                              {selectedToken.amount} {selectedToken.symbol}
                            </span>
                          </div>
                        </div>

                        {/* Payment Address */}
                        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-white/80 text-sm mb-2">Contract Address:</div>
                          <div className="flex items-center space-x-2">
                            <code className="flex-1 bg-black/30 p-2 rounded text-white/90 text-sm font-mono break-all">
                              0x742d35Cc6634C0532925a3b8D404fddBd4f4c4f4
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyAddress("0x742d35Cc6634C0532925a3b8D404fddBd4f4c4f4")}
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Transaction Status */}
                    {paymentStatus !== "pending" && (
                      <Card className="bg-black/20 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            {paymentStatus === "confirming" && (
                              <>
                                <RefreshCw className="h-5 w-5 text-yellow-400 animate-spin" />
                                <div>
                                  <div className="text-yellow-400 font-semibold">Transaction Confirming</div>
                                  <div className="text-white/60 text-sm">Please wait for blockchain confirmation</div>
                                </div>
                              </>
                            )}
                            {paymentStatus === "confirmed" && (
                              <>
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                                <div>
                                  <div className="text-green-400 font-semibold">Payment Confirmed!</div>
                                  <div className="text-white/60 text-sm">Redirecting to game...</div>
                                </div>
                              </>
                            )}
                            {paymentStatus === "failed" && (
                              <>
                                <AlertCircle className="h-5 w-5 text-red-400" />
                                <div>
                                  <div className="text-red-400 font-semibold">Payment Failed</div>
                                  <div className="text-white/60 text-sm">Please try again</div>
                                </div>
                              </>
                            )}
                          </div>
                          {/* {transactionHash && paymentStatus !== "pending" && (
                            <div className="mt-3 p-2 bg-white/5 rounded text-xs">
                              <span className="text-white/60">TX: </span>
                              <span className="text-white/80 font-mono">{formatAddress(transactionHash)}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="ml-2 h-6 px-2 text-blue-400 hover:text-blue-300"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          )} */}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Cancel Match
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600"
                    onClick={handlePayment}
                    disabled={!isWalletConnected || paymentStatus === "confirmed" || paymentStatus === "confirming"}
                  >
                    {paymentStatus === "confirming" ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Confirming...
                      </>
                    ) : paymentStatus === "confirmed" ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Payment Complete
                      </>
                    ) : (
                      <>
                        Pay {selectedToken.amount} {selectedToken.symbol}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-green-400 font-semibold text-sm">Secure Smart Contract</div>
                      <div className="text-white/80 text-sm mt-1">
                        Your payment is secured by smart contract escrow. Funds are automatically released to the winner
                        when the match ends.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-8">
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge
                    className={`${
                      paymentStatus === "confirmed"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                        paymentStatus === "confirmed" ? "bg-green-400" : "bg-orange-400"
                      }`}
                    ></div>
                    {paymentStatus === "confirmed" ? "PAYMENT CONFIRMED" : "AWAITING PAYMENT"}
                  </Badge>
                  <span className="text-white/80 text-sm">Powered by Ethereum blockchain</span>
                </div>

                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Smart Contract Secured</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                  <span>View Contract</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
