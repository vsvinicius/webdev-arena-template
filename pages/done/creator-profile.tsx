import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Eye, Heart, Video } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Creator {
  id: string;
  name: string;
  avatar: string;
  isLive: boolean;
  viewerCount: number;
  streamTitle: string;
  category?: string;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  creator: string;
  views: string;
  duration: string;
}

interface FeaturedCreator {
  id: string;
  name: string;
  avatar: string;
  title: string;
  gradient: string;
}

const TopCreatorsScreen = ({
  onBack,
  featuredCreators,
  onCreatorClick,
  isDarkMode,
}: {
  onBack: () => void;
  featuredCreators: FeaturedCreator[];
  onCreatorClick: (id: string) => void;
  isDarkMode: boolean;
}) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <header className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-black' : 'bg-white border-b border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Top creators</h1>
        </div>
        <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </header>

      <div className="px-6 py-6 mx-auto max-w-7xl">
        <div className="lg:hidden space-y-4">
          {featuredCreators.map((creator) => (
            <div
              key={creator.id}
              className={`bg-gradient-to-r ${creator.gradient} rounded-2xl p-6 cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden min-h-[140px]`}
              onClick={() => onCreatorClick(creator.id)}
            >
              <div className="absolute top-4 right-4 opacity-30">
                <div className="relative w-16 h-16">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-white"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 22.5
                          }deg)`,
                        transformOrigin: "center 16px",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex items-center h-full">
                <div className="flex-1">
                  <h2 className="text-white text-2xl font-bold leading-tight mb-2">
                    {creator.name.split(" ").map((word, index) => (
                      <div key={index} className="uppercase tracking-wide">
                        {word}
                      </div>
                    ))}
                  </h2>
                  <p className="text-white/90 text-sm font-medium">
                    {creator.title}
                  </p>
                </div>
                <div className="ml-4">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-white/30"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {featuredCreators.map((creator) => (
            <div
              key={creator.id}
              className={`bg-gradient-to-r ${creator.gradient} rounded-2xl p-8 cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden h-48`}
              onClick={() => onCreatorClick(creator.id)}
            >
              <div className="absolute top-4 right-4 opacity-30">
                <div className="relative w-12 h-12">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-white"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                        transformOrigin: "center 12px",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-white text-xl font-bold leading-tight mb-2 uppercase tracking-wide">
                    {creator.name}
                  </h2>
                  <p className="text-white/90 text-sm font-medium">
                    {creator.title}
                  </p>
                </div>
                <div className="flex justify-end">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



const ProfileMenu = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleTheme,
  onTopCreatorsClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onTopCreatorsClick: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      <div
        className={`fixed top-16 right-4 w-80 max-h-96 overflow-y-auto ${isDarkMode ? "bg-gray-900" : "bg-white"
          } rounded-xl shadow-lg z-50 border ${isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
      >
        <div className="p-4">
          <div
            className={`flex items-center space-x-3 mb-4 pb-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
          >
            <img
              src="https://i.pravatar.cc/150?img=50"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3
                className={`font-semibold ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                John Doe
              </h3>
              <p
                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                @johndoe
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onTopCreatorsClick();
                onClose();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isDarkMode
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              Top Creators
            </button>
          </div>

          <div
            className={`border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"
              } pt-4 mt-4`}
          >
            <button
              onClick={toggleTheme}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isDarkMode
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const CreatorProfile = ({
  creatorId,
  onBack,
}: {
  creatorId: string;
  onBack: () => void;
}) => {
  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [heartAnimations, setHeartAnimations] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "David",
      avatar: "https://i.pravatar.cc/30?img=20",
      message: "This teacher so so amazing, his eyes are a little scary",
      time: "24min",
      donated: true,
    },
    {
      id: 2,
      user: "Francisco",
      avatar: "https://i.pravatar.cc/30?img=21",
      message: "This teacher so so amazing, his eyes are a little scary",
      time: "24min",
    },
    {
      id: 3,
      user: "Bernard",
      avatar: "https://i.pravatar.cc/30?img=22",
      message: "Welcome from brazil. I love your work so much!",
      time: "1h",
    },
    {
      id: 4,
      user: "Francisco",
      avatar: "https://i.pravatar.cc/30?img=21",
      message: "Pretty excellent! 🔥",
      time: "34min",
    },
  ]);


  const getCreatorData = (id: string) => {
    const creators = {
      "1": {
        name: "Alex Rangers",
        avatar: "https://i.pravatar.cc/1000?img=1",
        followers: "159K",
        isLive: true,
      },
      "2": {
        name: "Sarah Connor",
        avatar: "https://i.pravatar.cc/1000?img=2",
        followers: "89K",
        isLive: false,
      },
      "3": {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/1000?img=3",
        followers: "234K",
        isLive: true,
      },
      "4": {
        name: "Emma Watson",
        avatar: "https://i.pravatar.cc/1000?img=4",
        followers: "412K",
        isLive: false,
      },
      "5": {
        name: "Ronald Smith",
        avatar: "https://i.pravatar.cc/1000?img=5",
        followers: "678K",
        isLive: true,
      },
      "6": {
        name: "Cody Ray",
        avatar: "https://i.pravatar.cc/1000?img=6",
        followers: "345K",
        isLive: true,
      },
      "7": {
        name: "Meet Goday",
        avatar: "https://i.pravatar.cc/1000?img=7",
        followers: "892K",
        isLive: true,
      },
      "8": {
        name: "Zirka Streaming",
        avatar: "https://i.pravatar.cc/1000?img=8",
        followers: "567K",
        isLive: true,
      },
      "9": {
        name: "Zirka Sharing",
        avatar: "https://i.pravatar.cc/1000?img=9",
        followers: "445K",
        isLive: false,
      },
      "10": {
        name: "Zirka Event",
        avatar: "https://i.pravatar.cc/1000?img=10",
        followers: "723K",
        isLive: true,
      },
      "11": {
        name: "Creative Mind",
        avatar: "https://i.pravatar.cc/1000?img=11",
        followers: "298K",
        isLive: false,
      },
      "12": {
        name: "Randy Rangers",
        avatar: "https://i.pravatar.cc/1000?img=12",
        followers: "159K",
        isLive: true,
      },
    };
    return (
      creators[id as keyof typeof creators] || {
        name: "Randy Rangers",
        avatar: "https://i.pravatar.cc/1000?img=12",
        followers: "159K",
        isLive: true,
      }
    );
  };

  const creator = getCreatorData(creatorId);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: "You",
        avatar: "https://i.pravatar.cc/30?img=50",
        message: message.trim(),
        time: "now",
        donated: false,
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setMessage("");

    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleHeartClick = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
    };

    setHeartAnimations((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHeartAnimations((prev) =>
        prev.filter((heart) => heart.id !== newHeart.id)
      );
    }, 3000);

    const donationComment = {
      id: comments.length + 1,
      user: "You",
      avatar: "https://i.pravatar.cc/30?img=50",
      message: "Thanks for the amazing content! ❤️",
      time: "now",
      donated: true,
    };

    setComments((prevComments) => [...prevComments, donationComment]);
  };

  const likeComment = (commentId: number) => {
    console.log("Liked comment:", commentId);
    const smallHeart = {
      id: Date.now(),
      x: Math.random() * 20 + 70,
      y: Math.random() * 40 + 30,
    };

    setHeartAnimations((prev) => [...prev, smallHeart]);

    setTimeout(() => {
      setHeartAnimations((prev) =>
        prev.filter((heart) => heart.id !== smallHeart.id)
      );
    }, 2000);
  };

  const handleFollowClick = () => {
    setIsFollowing((prevState) => !prevState);

  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="relative h-screen overflow-hidden">
          {/* Creator Background */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"
            style={{
              backgroundImage: `url(${creator.avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
          </div>

          {/* Heart Animations Overlay */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {heartAnimations.map((heart) => (
              <div
                key={heart.id}
                className="absolute animate-heartFloat"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                }}
              >
                <svg
                  className="w-8 h-8 text-red-500 animate-heartPulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Header */}
          <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </header>

          {/* Creator Info - Top Right */}
          <div className="absolute top-12 flex items-center justify-between z-20 w-full px-4 pt-2 gap-2">
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-start">
                <Avatar>
                  <AvatarImage src={creator.avatar} />
                </Avatar>
                <div className="flex flex-col justify-between h-full">
                  <span className="text-sm font-bold">{creator.name}</span>
                  <span className="text-xs font-medium opacity-70 lowercase">{creator.followers} followers</span>
                </div>
              </div>
              <button
                onClick={handleFollowClick}
                className="bg-orange-500 ml-2 text-white flex  items-center gap-1 text-xs font-bold px-3 py-2 rounded-full hover:bg-orange-600 transition-colors h-fit"
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            <div
              className="bg-black bg-opacity-15 flex items-center gap-1 text-white text-xs px-3 py-2 rounded-full h-fit"
            >
              <Eye className="h-4 w-4" />
              159K
            </div>
          </div>

          {/* Creator Name - Bottom Left */}
          {/* <div className="absolute top-12 left-4 z-20">
            <h1 className="text-white text-xl font-bold mb-1">
              {creator.name}
            </h1>
            <p className="text-white/80 text-sm">2.9K viewers</p>
          </div> */}

          {/* Comments Section */}
          <div className="absolute bottom-20 left-4 right-4 z-20">
            <div className="space-y-3 max-h-40 overflow-y-auto scrollbar-hide">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start space-x-2 animate-fadeIn"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`text-sm font-medium ${comment.user === "You"
                          ? "text-orange-400"
                          : "text-white"
                          }`}
                      >
                        {comment.user}
                      </span>
                      {comment.donated && (
                        <span className="bg-white bg-opacity-45 text-white text-xs pr-1.5 pl-[3px] py-0.5 rounded-full flex items-center space-x-1">
                          <div className="rounded-full bg-white w-6 h-6 flex items-center justify-center p-1">
                            <Heart fill="#F93B3E" color="#F93B3E" className="w-4" />
                          </div>
                          <span className="font-bold">{comment.user} Donated</span>
                        </span>
                      )}
                      <span className="text-gray-400 text-xs">
                        • {comment.time}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm leading-tight">
                      {comment.message}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => likeComment(comment.id)}
                      className="text-red-400 hover:text-red-300 transition-colors transform hover:scale-110"
                    >
                      <Heart fill="#F93B3E" color="#F93B3E" className="w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-800/50 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-600/30">
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
                  maxLength={200}
                />
              </div>

              {message.trim() && (
                <button
                  onClick={handleSendMessage}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              )}
              <div>
                <button
                  onClick={handleHeartClick}
                  className="rounded-full bg-gradient-to-r from-[#303030] to-[#222222] p-2 transition-all transform hover:scale-110 active:scale-95"
                >
                  <Heart fill="#F93B3E" color="#F93B3E" className="w-5 h-5" />
                </button>
                <button className="rounded-full bg-gradient-to-r from-[#303030] to-[#222222] p-2 relative right-2 -z-10">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Creator Video/Image */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${creator.avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30"></div>
          </div>

          {/* Heart Animations Overlay */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {heartAnimations.map((heart) => (
              <div
                key={heart.id}
                className="absolute animate-heartFloat"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                }}
              >
                <svg
                  className="w-12 h-12 text-red-500 animate-heartPulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 z-10"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Right Side - Chat and Controls */}
        <div className="w-96 bg-transparent flex flex-col absolute right-4 top-0 bottom-0 pt-4 pb-4">
          {/* Creator Info Header */}
          <div className="p-4 mb-4 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <div className="flex-1">
                <h2 className="text-white font-bold text-lg">{creator.name}</h2>
                <p className="text-white/80 text-sm">
                  {creator.followers} followers
                </p>
              </div>
              <button
                onClick={handleFollowClick}
                className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>159K viewers</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 px-4 overflow-y-auto scrollbar-hide">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="animate-fadeIn bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {comment.donated && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{comment.user} Donated</span>
                          </span>
                        )}
                        {!comment.donated && (
                          <span
                            className={`text-sm font-medium ${comment.user === "You"
                              ? "text-orange-300"
                              : "text-white"
                              }`}
                          >
                            {comment.user}
                          </span>
                        )}
                        <span className="text-white/60 text-xs">
                          • {comment.time}
                        </span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">
                        {comment.message}
                      </p>
                    </div>
                    <button
                      onClick={() => likeComment(comment.id)}
                      className="text-red-400 hover:text-red-300 transition-all transform hover:scale-110 active:scale-95 p-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 mt-4 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-white/10 rounded-full px-4 py-3 backdrop-blur-sm border border-white/20">
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-white placeholder-white/60 text-sm focus:outline-none"
                  maxLength={200}
                />
              </div>

              <button
                onClick={handleHeartClick}
                className="text-red-400 hover:text-red-300 p-2 transition-all transform hover:scale-110 active:scale-95"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button className="text-white hover:text-gray-300 p-2 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }

        .animate-heartFloat {
          animation: heartFloat 3s ease-out forwards;
        }

        .animate-heartPulse {
          animation: heartPulse 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heartFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          20% {
            opacity: 1;
            transform: translateY(-20px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) scale(0.5);
          }
        }

        @keyframes heartPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }

        /* Toast animations */
        .toast-slide-in {
          animation: slideInRight 0.3s ease-out forwards;
        }

        .toast-slide-out {
          animation: slideOutRight 0.3s ease-in forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }

        /* Hide scrollbar for video container */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showTopCreators, setShowTopCreators] = useState(false);
  const [showCreatorProfile, setShowCreatorProfile] = useState(false);
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  const favoriteCreators: Creator[] = [
    {
      id: "1",
      name: "Alex",
      avatar: "https://i.pravatar.cc/150?img=1",
      isLive: true,
      viewerCount: 1200,
      streamTitle: "Gaming Session",
    },
    {
      id: "2",
      name: "Sarah",
      avatar: "https://i.pravatar.cc/150?img=2",
      isLive: false,
      viewerCount: 0,
      streamTitle: "",
    },
    {
      id: "3",
      name: "Mike",
      avatar: "https://i.pravatar.cc/150?img=3",
      isLive: true,
      viewerCount: 850,
      streamTitle: "Music Stream",
    },
    {
      id: "4",
      name: "Emma",
      avatar: "https://i.pravatar.cc/150?img=4",
      isLive: false,
      viewerCount: 0,
      streamTitle: "",
    },
  ];

  const liveCreators: Creator[] = [
    {
      id: "1",
      name: "Ronald",
      avatar: "https://i.pravatar.cc/1000?img=3",
      isLive: true,
      viewerCount: 68400,
      streamTitle: "WINDS OF DESTINY",
    },
    {
      id: "2",
      name: "Cody Ray",
      avatar: "https://i.pravatar.cc/1000?img=8",
      isLive: true,
      viewerCount: 45200,
      streamTitle: "THREADS OF FATE",
    },
  ];

  const popularVideos: Video[] = [
    {
      id: "1",
      title: "Epic Gaming Moments",
      thumbnail: "https://picsum.photos/400/300?random=1",
      creator: "GameMaster",
      views: "2.4M",
      duration: "0:24",
    },
    {
      id: "2",
      title: "Cooking Masterclass",
      thumbnail: "https://picsum.photos/400/300?random=2",
      creator: "ChefPro",
      views: "856K",
      duration: "2:15",
    },
    {
      id: "3",
      title: "Music Production",
      thumbnail: "https://picsum.photos/400/300?random=3",
      creator: "BeatMaker",
      views: "2.1M",
      duration: "1:45",
    },
    {
      id: "4",
      title: "Programming Basics",
      thumbnail: "https://picsum.photos/400/300?random=4",
      creator: "CodeMaster",
      views: "1.8M",
      duration: "3:12",
    },
    {
      id: "5",
      title: "Art Drawing Techniques",
      thumbnail: "https://picsum.photos/400/300?random=5",
      creator: "ArtGuru",
      views: "945K",
      duration: "2:30",
    },
    {
      id: "6",
      title: "Fitness Workout Routine",
      thumbnail: "https://picsum.photos/400/300?random=6",
      creator: "FitTrainer",
      views: "1.2M",
      duration: "1:20",
    },
    {
      id: "7",
      title: "Photography Tips",
      thumbnail: "https://picsum.photos/400/300?random=7",
      creator: "PhotoPro",
      views: "678K",
      duration: "2:45",
    },
    {
      id: "8",
      title: "Dance Tutorial",
      thumbnail: "https://picsum.photos/400/300?random=8",
      creator: "DanceMaster",
      views: "1.5M",
      duration: "1:55",
    },
    {
      id: "9",
      title: "Travel Vlog: Japan",
      thumbnail: "https://picsum.photos/400/300?random=9",
      creator: "TravelBug",
      views: "2.8M",
      duration: "4:12",
    },
    {
      id: "10",
      title: "Tech Review: Latest Phone",
      thumbnail: "https://picsum.photos/400/300?random=10",
      creator: "TechReview",
      views: "3.1M",
      duration: "3:45",
    },
    {
      id: "11",
      title: "DIY Home Decor",
      thumbnail: "https://picsum.photos/400/300?random=11",
      creator: "DIYQueen",
      views: "892K",
      duration: "2:18",
    },
    {
      id: "12",
      title: "Comedy Sketch",
      thumbnail: "https://picsum.photos/400/300?random=12",
      creator: "FunnyGuy",
      views: "1.7M",
      duration: "1:33",
    },
  ];

  const featuredCreators: FeaturedCreator[] = [
    {
      id: "7",
      name: "Meet Goday",
      avatar: "https://i.pravatar.cc/150?img=7",
      title: "Most viewed Creator",
      gradient: "from-orange-400 to-red-500",
    },
    {
      id: "8",
      name: "Zirka Streaming",
      avatar: "https://i.pravatar.cc/150?img=8",
      title: "The new Trendy",
      gradient: "from-cyan-400 via-purple-500 to-red-500",
    },
    {
      id: "9",
      name: "Zirka Sharing",
      avatar: "https://i.pravatar.cc/150?img=9",
      title: "Most viewed Newbie",
      gradient: "from-pink-400 via-purple-500 to-blue-500",
    },
    {
      id: "10",
      name: "Zirka Event",
      avatar: "https://i.pravatar.cc/150?img=10",
      title: "Most engage Host",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      id: "11",
      name: "Creative Mind",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "Art & Design Expert",
      gradient: "from-green-400 to-blue-500",
    },
    {
      id: "12",
      name: "Tech Guru",
      avatar: "https://i.pravatar.cc/150?img=12",
      title: "Technology Influencer",
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  const handleSearch = () => {
    toast.warning("Coming soon");
  };

  const navigateToLive = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    setShowCreatorProfile(true);
    setShowTopCreators(false);
  };

  const navigateToCreator = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    setShowCreatorProfile(true);
    setShowTopCreators(false);
  };

  const playVideo = (videoId: string) => {
    const videoToCreatorMap: { [key: string]: string } = {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      "11": "11",
      "12": "12",
    };

    const creatorId = videoToCreatorMap[videoId] || "1";
    setSelectedCreatorId(creatorId);
    setShowCreatorProfile(true);
    setShowTopCreators(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const hideTopCreators = () => {
    setShowTopCreators(false);
  };

  const hideCreatorProfile = () => {
    setShowCreatorProfile(false);
    setSelectedCreatorId("");
  };

  const navigateToTopCreators = () => {
    setShowTopCreators(true);
    setShowCreatorProfile(false);
    setIsProfileMenuOpen(false);
  };

  const Toast = ({ message, show, onHide }: { message: string; show: boolean; onHide: () => void }) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(() => {
          onHide();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [show, onHide]);

    if (!show) return null;

    return (
      <div className="fixed top-4 right-4 z-[9999]" style={{ zIndex: 9999 }}>
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-2 transform transition-all duration-300 ease-out animate-bounce">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-sm">{message}</span>
        </div>
      </div>
    );
  };

  const hideToast = () => {
    setShowToast(false);
    setToastMessage('');
  };

  if (!mounted) {
    return null;
  }

  if (showCreatorProfile) {
    return (
      <>
        <Head>
          <title>Creator Profile - Zirka</title>
          <meta name="description" content="Creator live stream on Zirka" />
        </Head>
        <CreatorProfile
          creatorId={selectedCreatorId}
          onBack={hideCreatorProfile}
        />
      </>
    );
  }

  if (showTopCreators) {
    return (
      <>
        <Head>
          <title>Top Creators - Zirka</title>
          <meta
            name="description"
            content="Discover the top creators on Zirka"
          />
        </Head>
        <TopCreatorsScreen
          onBack={hideTopCreators}
          featuredCreators={featuredCreators}
          onCreatorClick={navigateToCreator}
          isDarkMode={isDarkMode}
        />
      </>
    );
  }

  const themeClasses = isDarkMode
    ? "bg-black text-white"
    : "bg-white text-black";
  const headerClasses = isDarkMode
    ? "bg-black"
    : "bg-white border-b border-gray-200";

  return (
    <>
      <Head>
        <title>Zirka - Creator Discovery</title>
        <meta
          name="description"
          content="Discover amazing creators and live streams"
        />
      </Head>

      <Toast message={toastMessage} show={showToast} onHide={hideToast} />

      <style jsx global>{`
        .toast-slide-in {
          animation: slideInRight 0.3s ease-out forwards;
        }

        .toast-slide-out {
          animation: slideOutRight 0.3s ease-in forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }

        /* Hide scrollbar for video container */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Toaster position="top-right" richColors />
      <div className={`min-h-screen ${themeClasses} lg:px-10`}>
        <header
          className={`flex items-center justify-between p-4 ${headerClasses} relative`}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSearch}
              className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-xl font-bold">zirka</h1>
          <div className="flex items-center space-x-4" ref={profileMenuRef}>
            <button
              onClick={toggleProfileMenu}
              className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <img
                src="https://i.pravatar.cc/150?img=50"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          </div>

          <ProfileMenu
            isOpen={isProfileMenuOpen}
            onClose={() => setIsProfileMenuOpen(false)}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onTopCreatorsClick={navigateToTopCreators}
          />
        </header>

        <div className="hidden lg:block">
          <div className="space-y-8 py-6">
            <section>
              <h2
                className={`text-lg font-medium mb-4 px-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                <strong>Your</strong> favorites
              </h2>
              <div className="flex space-x-4 overflow-x-auto pb-2 px-6">
                {favoriteCreators.map((creator) => (
                  <div key={creator.id} className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-14 h-14 rounded-full object-cover cursor-pointer"
                        onClick={() => navigateToCreator(creator.id)}
                      />
                      {creator.isLive && (
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 ${isDarkMode ? "border-black" : "border-white"
                            }`}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2
                className={`text-lg font-medium mb-4 px-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                Creators on live
              </h2>
              <div className="flex space-x-6 overflow-x-hidden pb-2 px-6 pr-10">
                {liveCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-6 h-80 w-1/2 flex-shrink-0 cursor-pointer overflow-hidden"
                    onClick={() => navigateToLive(creator.id)}
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8)), url(${creator.avatar})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundBlendMode: "overlay",
                    }}
                  >
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                        LIVE
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 text-white text-sm font-medium">
                      {formatViewerCount(creator.viewerCount)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl mb-2">
                        {creator.streamTitle}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-white text-base">
                          {creator.name}
                        </span>
                        <span className="text-white text-sm">• 2m</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 px-6">
                <h2
                  className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  Popular videos
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const container = document.getElementById('popular-videos-container');
                      if (container) {
                        container.scrollBy({ left: -300, behavior: 'smooth' });
                      }
                    }}
                    className={`p-2 rounded-full transition-colors ${isDarkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-600 hover:text-black"
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const container = document.getElementById('popular-videos-container');
                      if (container) {
                        container.scrollBy({ left: 300, behavior: 'smooth' });
                      }
                    }}
                    className={`p-2 rounded-full transition-colors ${isDarkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-600 hover:text-black"
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                id="popular-videos-container"
                className="flex space-x-4 overflow-x-auto pb-4 px-6 mr-6 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {popularVideos.map((video, index) => {
                  const gradients = [
                    "from-orange-500 to-red-600",
                    "from-green-500 to-blue-600",
                    "from-purple-500 to-pink-600",
                    "from-blue-500 to-cyan-600",
                    "from-pink-500 to-orange-600",
                    "from-indigo-500 to-purple-600",
                    "from-yellow-500 to-red-600",
                    "from-teal-500 to-green-600",
                    "from-red-500 to-pink-600",
                    "from-cyan-500 to-blue-600",
                    "from-amber-500 to-orange-600",
                    "from-violet-500 to-purple-600",
                  ];
                  return (
                    <div
                      key={video.id}
                      className={`relative bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl h-48 w-1/3 flex-shrink-0 cursor-pointer overflow-hidden`}
                      onClick={() => playVideo(video.id)}
                      style={{
                        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${video.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "overlay",
                      }}
                    >
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/30 text-white text-xs font-medium px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 text-white text-xs font-medium">
                        {video.views}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <h3 className="text-white font-semibold text-sm">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <p className="text-white/80 text-xs">
                            {video.creator}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        <div className="lg:hidden space-y-6">
          <section className="pt-4">
            <h2
              className={`text-lg font-medium mb-4 px-4 text-opacity-70 ${isDarkMode ? "text-white" : "text-black"
                }`}
            >
              <strong className="text-opacity-100">Your</strong> favorites
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 px-4">
              {favoriteCreators.map((creator) => (
                <div key={creator.id} className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-24 h-24 rounded-full object-cover cursor-pointer"
                      onClick={() => navigateToCreator(creator.id)}
                    />
                    {creator.isLive && (
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 ${isDarkMode ? "border-black" : "border-white"
                          }`}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2
              className={`text-lg font-medium mb-4 px-4 text-opacity-70 ${isDarkMode ? "text-white" : "text-black"
                }`}
            >
              <strong className="text-opacity-100">Creators</strong> on live
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 px-4">
              {liveCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-4 max-sm:w-72 max-sm:h-96 md:h-64 md:w-80 flex-shrink-0 cursor-pointer overflow-hidden"
                  onClick={() => navigateToLive(creator.id)}
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8)), url(${creator.avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                  }}
                >
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      LIVE
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 text-white text-xs font-medium">
                    {formatViewerCount(creator.viewerCount)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {creator.streamTitle}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-white text-sm">{creator.name}</span>
                      <span className="text-white text-xs">• 2m</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pb-8">
            <h2
              className={`text-lg font-medium mb-4 px-4 text-opacity-70 ${isDarkMode ? "text-white" : "text-black"
                }`}
            >
              <strong className="text-opacity-100">Popular</strong> videos
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 px-4">
              {popularVideos.map((video, index) => {
                const gradients = [
                  "from-orange-500 to-red-600",
                  "from-green-500 to-blue-600",
                  "from-purple-500 to-pink-600",
                  "from-blue-500 to-cyan-600",
                  "from-pink-500 to-orange-600",
                  "from-indigo-500 to-purple-600",
                  "from-yellow-500 to-red-600",
                  "from-teal-500 to-green-600",
                  "from-red-500 to-pink-600",
                  "from-cyan-500 to-blue-600",
                  "from-amber-500 to-orange-600",
                  "from-violet-500 to-purple-600",
                ];
                return (
                  <div
                    key={video.id}
                    className={`relative bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl h-32 w-72 flex-shrink-0 cursor-pointer overflow-hidden`}
                    onClick={() => playVideo(video.id)}
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(249, 115, 22, 0.8), rgba(239, 68, 68, 0.8)), url(${video.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundBlendMode: "overlay",
                    }}
                  >
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/30 text-white text-xs font-medium px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 text-white text-xs font-medium">
                      {video.views}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-white font-semibold text-sm">
                        {video.title}
                      </h3>
                      <p className="text-white/80 text-xs">{video.creator}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
