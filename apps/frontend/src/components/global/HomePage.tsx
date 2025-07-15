"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Zap, Shield, Trophy, Coins, Users, ChevronRight, Play, Wallet, Timer, Target } from "lucide-react"
// import "./App.css"

gsap.registerPlugin(ScrollTrigger)

 export default function HomePage() {
  const { isSignedIn, user } = useUser()
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline()
    tl.from(".hero-title", {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        {
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ".hero-buttons",
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".hero-stats",
        {
          duration: 1,
          scale: 0.8,
          opacity: 0,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )

    // Chess piece floating animation
    gsap.to(".chess-piece", {
      y: -20,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    })

    // Features animation
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    })

    // How it works animation
    gsap.from(".step-card", {
      scrollTrigger: {
        trigger: howItWorksRef.current,
        start: "top 80%",
      },
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: "power3.out",
    })

    // Pricing animation
    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 80%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">ChessCrypto</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-white/80 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-white/80 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-white/80 hover:text-white transition-colors"
            >
              Betting
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-white/80">Welcome, {user?.firstName}</span>
                <UserButton afterSignOutUrl="/" />
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600">
                  Play Now
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="chess-piece text-8xl mb-8">♛</div>

          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6">
            Chess Meets
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {" "}
              Crypto
            </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Challenge players worldwide in high-stakes chess matches. Pay $10 in crypto, play to win, and take home the
            entire pot. Winner takes all.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isSignedIn ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Playing
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 text-lg px-8 py-4"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Playing
                </Button>
              </SignUpButton>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          <div className="hero-stats grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">$20</div>
              <div className="text-white/60">Prize Pool Per Game</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-white/60">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-white/60">Games Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose ChessCrypto?</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Experience the thrill of competitive chess with real crypto rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Wallet className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Crypto Payments</CardTitle>
                <CardDescription className="text-white/60">
                  Secure crypto transactions with instant payouts to winners
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Fair Play</CardTitle>
                <CardDescription className="text-white/60">
                  Advanced anti-cheat system ensures fair and competitive matches
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Instant Matching</CardTitle>
                <CardDescription className="text-white/60">
                  Get matched with players of similar skill level in seconds
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Trophy className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Winner Takes All</CardTitle>
                <CardDescription className="text-white/60">
                  No house edge - the entire $20 pot goes to the winner
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Users className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Global Community</CardTitle>
                <CardDescription className="text-white/60">
                  Play against chess enthusiasts from around the world
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Timer className="h-12 w-12 text-red-400 mb-4" />
                <CardTitle className="text-white">Time Controls</CardTitle>
                <CardDescription className="text-white/60">
                  Various time formats from blitz to classical games
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Simple steps to start your crypto chess journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="step-card bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">1</span>
                </div>
                <CardTitle className="text-white">Sign Up</CardTitle>
                <CardDescription className="text-white/60">
                  Create your account with Clerk authentication
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="step-card bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">2</span>
                </div>
                <CardTitle className="text-white">Pay Entry</CardTitle>
                <CardDescription className="text-white/60">
                  Both players pay $10 in crypto to enter the match
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="step-card bg-gradient-to-br from-green-500/20 to-blue-500/20 border-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">3</span>
                </div>
                <CardTitle className="text-white">Play Chess</CardTitle>
                <CardDescription className="text-white/60">
                  Compete in an intense chess match with real stakes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="step-card bg-gradient-to-br from-yellow-500/20 to-red-500/20 border-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">4</span>
                </div>
                <CardTitle className="text-white">Win & Earn</CardTitle>
                <CardDescription className="text-white/60">Winner takes the entire $20 pot instantly</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple Betting Structure</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Transparent pricing with no hidden fees</p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="pricing-card bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border-yellow-400/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold mb-4">
                  Winner Takes All
                </Badge>
                <CardTitle className="text-4xl font-bold text-white mb-2">$10</CardTitle>
                <CardDescription className="text-white/60 text-lg">Entry fee per player</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">$20 Total Prize</div>
                  <div className="text-white/60">Winner takes the entire pot</div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center text-white/80">
                    <Target className="h-5 w-5 text-green-400 mr-3" />
                    No house edge
                  </div>
                  <div className="flex items-center text-white/80">
                    <Coins className="h-5 w-5 text-green-400 mr-3" />
                    Instant crypto payouts
                  </div>
                  <div className="flex items-center text-white/80">
                    <Shield className="h-5 w-5 text-green-400 mr-3" />
                    Secure transactions
                  </div>
                  <div className="flex items-center text-white/80">
                    <Zap className="h-5 w-5 text-green-400 mr-3" />
                    Fair matchmaking
                  </div>
                </div>

                <div className="pt-6">
                  {isSignedIn ? (
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 text-lg py-3">
                      <Play className="mr-2 h-5 w-5" />
                      Start Playing Now
                    </Button>
                  ) : (
                    <SignUpButton mode="modal">
                      <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 text-lg py-3">
                        <Play className="mr-2 h-5 w-5" />
                        Get Started
                      </Button>
                    </SignUpButton>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Play for Real Stakes?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of players competing in high-stakes chess matches. Your next victory could be worth $20 in
            crypto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 text-lg px-8 py-4"
              >
                <Crown className="mr-2 h-5 w-5" />
                Challenge a Player
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 text-lg px-8 py-4"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Join ChessCrypto
                </Button>
              </SignUpButton>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent"
            >
              Learn More
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-6 w-6 text-yellow-400" />
                <span className="text-xl font-bold text-white">ChessCrypto</span>
              </div>
              <p className="text-white/60">The premier platform for competitive chess with crypto rewards.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Game</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Play Now
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tournaments
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rules
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Responsible Gaming
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 ChessCrypto. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


