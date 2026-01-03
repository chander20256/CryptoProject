import { useState } from "react";
import { 
  Gamepad2, 
  Trophy, 
  Flame, 
  Star, 
  Lock, 
  Play,
  Users,
  Clock,
  Coins,
  Target,
  Zap,
  Crown,
  Gift,
  TrendingUp
} from "lucide-react";

// Games data structure
const gamesData = [
  {
    id: "spin-wheel",
    title: "Spin & Win",
    description: "Spin the wheel daily for instant rewards",
    icon: Target,
    reward: "₹50-500",
    plays: 1247,
    difficulty: "Easy",
    timeLimit: "1 min",
    category: "Daily",
    color: "from-cyan-500 to-emerald-500",
    isLocked: false,
    isPremium: false,
    streak: 5,
  },
  {
    id: "trivia-quiz",
    title: "Trivia Challenge",
    description: "Answer questions and earn points",
    icon: Zap,
    reward: "₹100-1000",
    plays: 892,
    difficulty: "Medium",
    timeLimit: "5 min",
    category: "Quiz",
    color: "from-cyan-500 to-blue-500",
    isLocked: false,
    isPremium: false,
    streak: 0,
  },
  {
    id: "scratch-card",
    title: "Lucky Scratch",
    description: "Scratch to reveal your prize",
    icon: Gift,
    reward: "₹20-200",
    plays: 2156,
    difficulty: "Easy",
    timeLimit: "30 sec",
    category: "Instant",
    color: "from-emerald-500 to-cyan-500",
    isLocked: false,
    isPremium: false,
    streak: 12,
  },
  {
    id: "memory-match",
    title: "Memory Master",
    description: "Match pairs to win big rewards",
    icon: Star,
    reward: "₹150-800",
    plays: 654,
    difficulty: "Medium",
    timeLimit: "3 min",
    category: "Puzzle",
    color: "from-cyan-400 to-emerald-400",
    isLocked: false,
    isPremium: false,
    streak: 3,
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    description: "Find hidden treasures in the map",
    icon: Crown,
    reward: "₹500-2000",
    plays: 445,
    difficulty: "Hard",
    timeLimit: "10 min",
    category: "Adventure",
    color: "from-yellow-500 to-emerald-500",
    isLocked: false,
    isPremium: true,
    streak: 0,
  },
  {
    id: "number-rush",
    title: "Number Rush",
    description: "Solve math puzzles against the clock",
    icon: TrendingUp,
    reward: "₹200-1500",
    plays: 723,
    difficulty: "Hard",
    timeLimit: "4 min",
    category: "Brain",
    color: "from-cyan-500 to-purple-500",
    isLocked: false,
    isPremium: true,
    streak: 0,
  },
  {
    id: "jackpot-slots",
    title: "Jackpot Slots",
    description: "Pull the lever and hit the jackpot",
    icon: Flame,
    reward: "₹1000-5000",
    plays: 1893,
    difficulty: "Easy",
    timeLimit: "2 min",
    category: "Casino",
    color: "from-emerald-500 to-yellow-500",
    isLocked: true,
    isPremium: true,
    unlockLevel: 10,
    streak: 0,
  },
  {
    id: "word-puzzle",
    title: "Word Wizard",
    description: "Create words from letters to earn",
    icon: Zap,
    reward: "₹100-600",
    plays: 567,
    difficulty: "Medium",
    timeLimit: "5 min",
    category: "Word",
    color: "from-cyan-500 to-emerald-400",
    isLocked: true,
    isPremium: false,
    unlockLevel: 5,
    streak: 0,
  },
];

const GameCard = ({ game, onPlay, userLevel }) => {
  const Icon = game.icon;
  const isUnlocked = !game.isLocked || userLevel >= (game.unlockLevel || 0);

  return (
    <div
      className={`
        relative group overflow-hidden rounded-2xl border transition-all duration-300
        ${
          isUnlocked
            ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1"
            : "bg-slate-100 dark:bg-slate-900/50 border-slate-300 dark:border-slate-800 opacity-60"
        }
      `}
    >
      {/* Gradient Header */}
      <div className={`h-32 bg-gradient-to-br ${game.color} relative`}>
        {/* Premium Badge */}
        {game.isPremium && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}

        {/* Streak Badge */}
        {game.streak > 0 && isUnlocked && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {game.streak} Day Streak
          </div>
        )}

        {/* Lock Icon */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 dark:bg-slate-900/90 rounded-full p-4">
              <Lock className="w-8 h-8 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
        )}

        {/* Game Icon */}
        {isUnlocked && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="bg-white dark:bg-slate-900 rounded-full p-4 shadow-xl border border-slate-200 dark:border-slate-800">
              <Icon className="w-8 h-8 text-cyan-500" />
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 pt-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          {game.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-4">
          {game.description}
        </p>

        {/* Lock Message */}
        {!isUnlocked && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 mb-4 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Unlock at Level {game.unlockLevel}
            </p>
          </div>
        )}

        {/* Game Stats */}
        {isUnlocked && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {game.reward}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {game.plays.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 text-xs">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  {game.timeLimit}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded-full font-medium ${
                  game.difficulty === "Easy"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : game.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {game.difficulty}
              </span>
            </div>
          </>
        )}

        {/* Play Button */}
        {isUnlocked && (
          <button
            onClick={() => onPlay(game)}
            className="w-full h-12 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-black transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
          >
            <Play className="w-5 h-5" />
            Play Now
          </button>
        )}
      </div>
    </div>
  );
};

const GamesSection = () => {
  const [userLevel] = useState(7);
  const [totalEarned] = useState(12450);
  const [gamesPlayed] = useState(147);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Daily",
    "Quiz",
    "Instant",
    "Puzzle",
    "Adventure",
    "Brain",
    "Casino",
    "Word",
  ];

  const filteredGames =
    selectedCategory === "All"
      ? gamesData
      : gamesData.filter((game) => game.category === selectedCategory);

  const handlePlay = (game) => {
    alert(`Starting ${game.title}! This would navigate to the game.`);
  };

  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-slate-950 transition-colors min-h-screen">
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute w-full h-full animate-glow-edge"
          style={{ animationDuration: "50s" }}
        >
          <div className="absolute top-0 left-0 rounded-full blur-3xl bg-cyan-500/40 w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-80 lg:h-80" />
        </div>

        <div
          className="absolute w-full h-full animate-glow-edge"
          style={{
            animationDuration: "50s",
            animationDelay: "-25s",
          }}
        >
          <div className="absolute bottom-0 right-0 rounded-full blur-3xl bg-emerald-400/35 w-24 h-24 sm:w-36 sm:h-36 md:w-52 md:h-52 lg:w-72 lg:h-72" />
        </div>
      </div>

      <div className="relative z-10 max-w-full px-6 py-8 lg:px-12 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium mb-6 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10">
            <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            Live Games · Real Rewards
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-3">
            <Gamepad2 className="w-10 h-10 text-cyan-500" />
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              Reward <span className="text-cyan-500">Games</span>
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Play games, have fun, and earn real rewards!
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-cyan-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your Level
              </p>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {userLevel}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Earned
              </p>
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ₹{totalEarned.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-cyan-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Games Played
              </p>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {gamesPlayed}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Best Streak
              </p>
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              12 Days
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-xl font-medium text-sm transition-all
                  ${
                    selectedCategory === category
                      ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={handlePlay}
              userLevel={userLevel}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <Gamepad2 className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              No games found in this category
            </p>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl p-6 shadow-2xl shadow-cyan-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">
                🎮 Level Up to Unlock More!
              </h3>
              <p className="text-white/90">
                Keep playing games and completing challenges to unlock premium games and bigger rewards
              </p>
            </div>
            <button className="h-12 px-8 rounded-xl font-bold bg-white text-cyan-600 hover:bg-slate-50 transition-colors whitespace-nowrap shadow-lg">
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesSection;