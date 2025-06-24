import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Bell, BookText, ChevronRight, Circle, MessageCircle, Search, SendHorizontal, User, Users } from 'lucide-react';
import { Inter } from 'next/font/google';
import { useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const font = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
});

type User = {
  name: string;
  avatar: string;
  age: string;
  neighborhood: string;
  city: string;
}

type Post = {
  user: User;
  title: string;
  createdAt: string;
  description: string;
  imageSrc?: string;
  replies: { user: User; text: string; }[];
}

type City = {
  name: string;
  imageSrc: string;
  population: string;
}

type Message = User & { text: string };


const MESSAGES = [
  "Hey, are we still on for tomorrow?",
  "Just finished the book you recommended. Loved it!",
  "Anyone up for coffee later?",
  "That sunset today was unreal 🌅",
  "Can someone help me with this math problem? 😅",
  "Totally forgot about the meeting... my bad!",
  "Look what I found at the thrift store 👕",
  "Thinking about starting a new hobby... any suggestions?",
  "Who's going to the concert next weekend?",
  "Made pancakes for breakfast 🥞 Best decision ever."
]

const PAGES = [
  {
    name: 'Explore',
    Icon: BookText,
    id: 'main'
  },
  {
    name: 'Search',
    Icon: Search,
    id: 'search'
  },
  {
    name: 'Messages',
    Icon: MessageCircle,
    id: 'messages'
  },
  {
    name: 'Activity',
    Icon: Bell,
    id: 'activity'
  },
  {
    name: 'Profile',
    Icon: User,
    id: 'profile'
  },
  {
    name: 'Following',
    Icon: Users,
    id: 'following'
  },
]

const USERS: User[] = [
  {
    "name": "Emma",
    "avatar": "https://randomuser.me/api/portraits/women/11.jpg",
    "age": "26",
    "neighborhood": "Hill",
    "city": "Salem"
  },
  {
    "name": "Liam",
    "avatar": "https://randomuser.me/api/portraits/men/12.jpg",
    "age": "31",
    "neighborhood": "Oak",
    "city": "Newton"
  },
  {
    "name": "Olivia",
    "avatar": "https://randomuser.me/api/portraits/women/13.jpg",
    "age": "29",
    "neighborhood": "Lake",
    "city": "Clinton"
  },
  {
    "name": "Noah",
    "avatar": "https://randomuser.me/api/portraits/men/14.jpg",
    "age": "33",
    "neighborhood": "Elm",
    "city": "Franklin"
  },
  {
    "name": "Ava",
    "avatar": "https://randomuser.me/api/portraits/women/15.jpg",
    "age": "25",
    "neighborhood": "West",
    "city": "Milton"
  },
  {
    "name": "Mason",
    "avatar": "https://randomuser.me/api/portraits/men/16.jpg",
    "age": "34",
    "neighborhood": "Park",
    "city": "Greenville"
  },
  {
    "name": "Sophia",
    "avatar": "https://randomuser.me/api/portraits/women/17.jpg",
    "age": "30",
    "neighborhood": "Bay",
    "city": "Elgin"
  },
  {
    "name": "Ethan",
    "avatar": "https://randomuser.me/api/portraits/men/18.jpg",
    "age": "27",
    "neighborhood": "Ash",
    "city": "Shelby"
  },
  {
    "name": "Isabella",
    "avatar": "https://randomuser.me/api/portraits/women/19.jpg",
    "age": "32",
    "neighborhood": "Cove",
    "city": "Lowell"
  },
  {
    "name": "Logan",
    "avatar": "https://randomuser.me/api/portraits/men/20.jpg",
    "age": "28",
    "neighborhood": "Glen",
    "city": "Camden"
  },
  {
    "name": "Amelia",
    "avatar": "https://randomuser.me/api/portraits/women/21.jpg",
    "age": "26",
    "neighborhood": "Wood",
    "city": "Monroe"
  },
  {
    "name": "James",
    "avatar": "https://randomuser.me/api/portraits/men/22.jpg",
    "age": "35",
    "neighborhood": "Dale",
    "city": "Trenton"
  },
  {
    "name": "Mia",
    "avatar": "https://randomuser.me/api/portraits/women/23.jpg",
    "age": "24",
    "neighborhood": "Hill",
    "city": "Waynesboro"
  },
  {
    "name": "Benjamin",
    "avatar": "https://randomuser.me/api/portraits/men/24.jpg",
    "age": "36",
    "neighborhood": "Pine",
    "city": "Harrison"
  },
  {
    "name": "Charlotte",
    "avatar": "https://randomuser.me/api/portraits/women/25.jpg",
    "age": "27",
    "neighborhood": "East",
    "city": "Oxford"
  },
  {
    "name": "Elijah",
    "avatar": "https://randomuser.me/api/portraits/men/26.jpg",
    "age": "29",
    "neighborhood": "Brook",
    "city": "Lebanon"
  },
  {
    "name": "Harper",
    "avatar": "https://randomuser.me/api/portraits/women/27.jpg",
    "age": "28",
    "neighborhood": "Park",
    "city": "Danville"
  },
  {
    "name": "Lucas",
    "avatar": "https://randomuser.me/api/portraits/men/28.jpg",
    "age": "33",
    "neighborhood": "West",
    "city": "Vernon"
  },
  {
    "name": "Ella",
    "avatar": "https://randomuser.me/api/portraits/women/29.jpg",
    "age": "30",
    "neighborhood": "Lake",
    "city": "Florence"
  },
  {
    "name": "William",
    "avatar": "https://randomuser.me/api/portraits/men/30.jpg",
    "age": "31",
    "neighborhood": "Oak",
    "city": "Barstow"
  },
  {
    "name": "Aria",
    "avatar": "https://randomuser.me/api/portraits/women/31.jpg",
    "age": "25",
    "neighborhood": "Hill",
    "city": "Union"
  },
  {
    "name": "Henry",
    "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
    "age": "34",
    "neighborhood": "Bay",
    "city": "Ellisville"
  },
  {
    "name": "Lily",
    "avatar": "https://randomuser.me/api/portraits/women/33.jpg",
    "age": "27",
    "neighborhood": "Pine",
    "city": "Hudson"
  },
  {
    "name": "Jack",
    "avatar": "https://randomuser.me/api/portraits/men/34.jpg",
    "age": "29",
    "neighborhood": "Ash",
    "city": "Madison"
  },
  {
    "name": "Grace",
    "avatar": "https://randomuser.me/api/portraits/women/35.jpg",
    "age": "26",
    "neighborhood": "Elm",
    "city": "Crosby"
  },
  {
    "name": "Owen",
    "avatar": "https://randomuser.me/api/portraits/men/36.jpg",
    "age": "32",
    "neighborhood": "Glen",
    "city": "Troy"
  },
  {
    "name": "Chloe",
    "avatar": "https://randomuser.me/api/portraits/women/37.jpg",
    "age": "28",
    "neighborhood": "East",
    "city": "Salem"
  },
  {
    "name": "Sebastian",
    "avatar": "https://randomuser.me/api/portraits/men/38.jpg",
    "age": "35",
    "neighborhood": "West",
    "city": "Newton"
  },
  {
    "name": "Scarlett",
    "avatar": "https://randomuser.me/api/portraits/women/39.jpg",
    "age": "31",
    "neighborhood": "Park",
    "city": "Clinton"
  },
  {
    "name": "Alexander",
    "avatar": "https://randomuser.me/api/portraits/men/40.jpg",
    "age": "36",
    "neighborhood": "Hill",
    "city": "Franklin"
  },
  {
    "name": "Zoe",
    "avatar": "https://randomuser.me/api/portraits/women/41.jpg",
    "age": "24",
    "neighborhood": "Lake",
    "city": "Milton"
  },
  {
    "name": "Daniel",
    "avatar": "https://randomuser.me/api/portraits/men/42.jpg",
    "age": "33",
    "neighborhood": "Oak",
    "city": "Greenville"
  },
  {
    "name": "Nora",
    "avatar": "https://randomuser.me/api/portraits/women/43.jpg",
    "age": "29",
    "neighborhood": "Bay",
    "city": "Elgin"
  },
  {
    "name": "Matthew",
    "avatar": "https://randomuser.me/api/portraits/men/44.jpg",
    "age": "30",
    "neighborhood": "Elm",
    "city": "Shelby"
  },
  {
    "name": "Hannah",
    "avatar": "https://randomuser.me/api/portraits/women/45.jpg",
    "age": "28",
    "neighborhood": "Wood",
    "city": "Lowell"
  },
  {
    "name": "Wyatt",
    "avatar": "https://randomuser.me/api/portraits/men/46.jpg",
    "age": "34",
    "neighborhood": "Cove",
    "city": "Camden"
  },
  {
    "name": "Abigail",
    "avatar": "https://randomuser.me/api/portraits/women/47.jpg",
    "age": "27",
    "neighborhood": "Glen",
    "city": "Monroe"
  },
  {
    "name": "David",
    "avatar": "https://randomuser.me/api/portraits/men/48.jpg",
    "age": "35",
    "neighborhood": "West",
    "city": "Trenton"
  },
  {
    "name": "Emily",
    "avatar": "https://randomuser.me/api/portraits/women/49.jpg",
    "age": "26",
    "neighborhood": "Hill",
    "city": "Waynesboro"
  }
];

const CURRENT_USER: User = {
  "name": "Scarlett",
  "avatar": "https://picsum.photos/id/64/200",
  "age": "31",
  "neighborhood": "Park",
  "city": "Clinton"
};

const NEAR_BY_USERS: User[] = USERS.slice(0, 10);
const RECENTLY_JOINED_USERS: User[] = USERS.slice(11, 30);

const POSTS: Post[] = [
  {
    "user": { "name": "Emma", "avatar": "https://randomuser.me/api/portraits/women/11.jpg", "age": "26", "neighborhood": "Hill", "city": "Salem" },
    "title": "Afternoon walk in the woods",
    "createdAt": "2025-06-22T14:45:00Z",
    "description": "The light today was magical. Found a small trail behind the lake.",
    "imageSrc": "https://picsum.photos/seed/forest/800/600",
    "replies": [
      { "user": { "name": "Liam", "avatar": "https://randomuser.me/api/portraits/men/12.jpg", "age": "31", "neighborhood": "Oak", "city": "Newton" }, "text": "Looks peaceful! I love that place too." },
      { "user": { "name": "Sophia", "avatar": "https://randomuser.me/api/portraits/women/17.jpg", "age": "30", "neighborhood": "Bay", "city": "Elgin" }, "text": "Gorgeous lighting 🌿" }
    ]
  },
  {
    "user": { "name": "Noah", "avatar": "https://randomuser.me/api/portraits/men/14.jpg", "age": "33", "neighborhood": "Elm", "city": "Franklin" },
    "title": "Just baked banana bread 🍌",
    "createdAt": "2025-06-21T09:10:00Z",
    "description": "Tried a new recipe with walnuts this time. Turned out better than expected!",
    "imageSrc": "https://picsum.photos/seed/banana/800/600",
    "replies": [
      { "user": { "name": "Amelia", "avatar": "https://randomuser.me/api/portraits/women/21.jpg", "age": "26", "neighborhood": "Wood", "city": "Monroe" }, "text": "Save me a slice!" }
    ]
  },
  {
    "user": { "name": "Mason", "avatar": "https://randomuser.me/api/portraits/men/16.jpg", "age": "34", "neighborhood": "Park", "city": "Greenville" },
    "title": "Early morning jog",
    "createdAt": "2025-06-23T06:30:00Z",
    "description": "Got up at 5am and caught the sunrise. Totally worth it.",
    "imageSrc": "https://picsum.photos/seed/sunrise/800/600",
    "replies": []
  },
  {
    "user": { "name": "Olivia", "avatar": "https://randomuser.me/api/portraits/women/13.jpg", "age": "29", "neighborhood": "Lake", "city": "Clinton" },
    "title": "Tiny sketchbook update ✏️",
    "createdAt": "2025-06-20T18:20:00Z",
    "description": "Working on small ink pieces. Here’s today’s doodle.",
    "imageSrc": "https://picsum.photos/seed/sketch/800/600",
    "replies": [
      { "user": { "name": "Jack", "avatar": "https://randomuser.me/api/portraits/men/34.jpg", "age": "29", "neighborhood": "Ash", "city": "Madison" }, "text": "Clean lines! What pen do you use?" }
    ]
  },
  {
    "user": { "name": "Ava", "avatar": "https://randomuser.me/api/portraits/women/15.jpg", "age": "25", "neighborhood": "West", "city": "Milton" },
    "title": "Cozy corner ☕",
    "createdAt": "2025-06-22T10:00:00Z",
    "description": "Rainy Sunday. Just books, tea, and a blanket.",
    "imageSrc": "https://picsum.photos/seed/cozy/800/600",
    "replies": []
  },
  {
    "user": { "name": "Logan", "avatar": "https://randomuser.me/api/portraits/men/20.jpg", "age": "28", "neighborhood": "Glen", "city": "Camden" },
    "title": "Started a puzzle!",
    "createdAt": "2025-06-19T16:45:00Z",
    "description": "1,000 pieces. Let’s see if I survive.",
    "imageSrc": "https://picsum.photos/seed/puzzle/800/600",
    "replies": [
      { "user": { "name": "Zoe", "avatar": "https://randomuser.me/api/portraits/women/41.jpg", "age": "24", "neighborhood": "Lake", "city": "Milton" }, "text": "Love a good challenge!" },
      { "user": { "name": "David", "avatar": "https://randomuser.me/api/portraits/men/48.jpg", "age": "35", "neighborhood": "West", "city": "Trenton" }, "text": "Don’t give up!" }
    ]
  },
  {
    "user": { "name": "Lily", "avatar": "https://randomuser.me/api/portraits/women/33.jpg", "age": "27", "neighborhood": "Pine", "city": "Hudson" },
    "title": "Little garden wins 🌱",
    "createdAt": "2025-06-18T15:30:00Z",
    "description": "First tomato is ready! Growing things is magic.",
    "imageSrc": "https://picsum.photos/seed/garden/800/600",
    "replies": []
  },
  {
    "user": { "name": "Henry", "avatar": "https://randomuser.me/api/portraits/men/32.jpg", "age": "34", "neighborhood": "Bay", "city": "Oxford" },
    "title": "Old truck restoration progress",
    "createdAt": "2025-06-17T11:00:00Z",
    "description": "Spent the weekend under the hood. Exhausting but rewarding.",
    "imageSrc": "https://picsum.photos/seed/truck/800/600",
    "replies": [
      { "user": { "name": "Grace", "avatar": "https://randomuser.me/api/portraits/women/35.jpg", "age": "26", "neighborhood": "Elm", "city": "Crosby" }, "text": "Respect. That's serious work!" }
    ]
  },
  {
    "user": { "name": "Elijah", "avatar": "https://randomuser.me/api/portraits/men/26.jpg", "age": "29", "neighborhood": "Brook", "city": "Lebanon" },
    "title": "Spontaneous camping trip",
    "createdAt": "2025-06-21T21:00:00Z",
    "description": "No signal, no stress. Just stars and firewood.",
    "imageSrc": "https://picsum.photos/seed/camping/800/600",
    "replies": []
  },
  {
    "user": { "name": "Charlotte", "avatar": "https://randomuser.me/api/portraits/women/25.jpg", "age": "27", "neighborhood": "East", "city": "Oxford" },
    "title": "Baked my first pie 🥧",
    "createdAt": "2025-06-19T13:15:00Z",
    "description": "Blueberry filling and a flaky crust. Not bad for a first try!",
    "imageSrc": "https://picsum.photos/seed/pie/800/600",
    "replies": [
      { "user": { "name": "Daniel", "avatar": "https://randomuser.me/api/portraits/men/42.jpg", "age": "33", "neighborhood": "Oak", "city": "Greenville" }, "text": "Looks delicious. Save me a slice!" }
    ]
  }
]
const POPULAR_CITIES: City[] = [
  {
    "name": "Springfield",
    "imageSrc": "https://picsum.photos/seed/springfield/800/600",
    "population": "30,000"
  },
  {
    "name": "Greenville",
    "imageSrc": "https://picsum.photos/seed/greenville/800/600",
    "population": "18,500"
  },
  {
    "name": "Fairview",
    "imageSrc": "https://picsum.photos/seed/fairview/800/600",
    "population": "22,100"
  },
  {
    "name": "Franklin",
    "imageSrc": "https://picsum.photos/seed/franklin/800/600",
    "population": "27,800"
  },
  {
    "name": "Milton",
    "imageSrc": "https://picsum.photos/seed/milton/800/600",
    "population": "15,200"
  },
  {
    "name": "Ashland",
    "imageSrc": "https://picsum.photos/seed/ashland/800/600",
    "population": "12,400"
  },
  {
    "name": "Danville",
    "imageSrc": "https://picsum.photos/seed/danville/800/600",
    "population": "19,300"
  },
  {
    "name": "Shelby",
    "imageSrc": "https://picsum.photos/seed/shelby/800/600",
    "population": "16,750"
  },
  {
    "name": "Camden",
    "imageSrc": "https://picsum.photos/seed/camden/800/600",
    "population": "23,600"
  },
  {
    "name": "Lowell",
    "imageSrc": "https://picsum.photos/seed/lowell/800/600",
    "population": "14,900"
  }
]



function Header({ search, setSearch, onChangePage }: { search: string; setSearch: (value: string) => void; onChangePage: (page: string) => void; }) {
  return (
    <header className='flex items-center justify-between w-full gap-2 p-2 bg-white border-b border-gray-200 h-14 md:h-20 md:px-8'>
      <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="logo" className='w-10 h-10 cursor-pointer md:h-14 md:w-14' onClick={() => onChangePage('main')} />
      <div className="max-w-96 flex items-center gap-1 rounded-md bg-[#EFF1F7] border-none border px-4 focus-within:ring-1 focus-within:ring-ring w-full md:mr-96">
        <Search className="w-4 h-4 text-gray-400" strokeWidth={3} />
        <Input className="p-0 border-none shadow-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-500" placeholder="Search for a match by city, age, gender..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='flex items-center justify-center gap-2 md:gap-4'>
        <Button
          className="w-8 h-8 bg-transparent rounded-full shadow-none hover:bg-transparent hover:ring-1 hover:ring-ring transition-all duration-200"
          onClick={() => onChangePage('messages')}
        >
          <MessageCircle className='text-gray-400' strokeWidth={3} />
        </Button>

        <Button
          className="w-8 h-8 bg-transparent rounded-full shadow-none hover:bg-transparent hover:ring-1 hover:ring-ring transition-all duration-200"
          onClick={() => onChangePage('activity')}
        >
          <Bell className='text-gray-400' strokeWidth={3} />
        </Button>
        <Avatar onClick={() => onChangePage('profile')} className='hover:ring-1 hover:ring-ring transition-all duration-200 cursor-pointer'>
          <AvatarImage src="https://picsum.photos/id/64/200" />
        </Avatar>
      </div>
    </header>
  )
}
function UserCarouselItem({ user, onSendMessage }: { user: User; onSendMessage: (message: Message) => void }) {
  const { avatar, name, age, neighborhood } = user;
  const [messageMode, setMessageMode] = useState(false);
  const [message, setMessage] = useState('');

  function handleSendMessage() {
    setMessageMode(false);
    onSendMessage({ text: message, ...user });
    setMessage('');
  }

  return (
    <CarouselItem key={name} className="pl-2 mb-2 basis-1/3 md:basis-1/4 md:pl-4">
      <Card className='grid h-56 gap-2 text-center text-black bg-white border-none' style={{ gridTemplateRows: '50% 1fr 1fr 1fr' }}>
        <img src={avatar} className='object-fill w-full h-full rounded-t-md' alt="avatar" />
        <p className='font-bold'>{name}</p>
        <p className='text-xs font-bold text-gray-400'>{`${age} yo • ${neighborhood}`}</p>
        <div className={`flex items-center gap-2 mx-2 justify-items-center mb-2 ${messageMode ? 'block' : 'hidden'}`}>
          <Input className="w-full" value={message} onChange={(e) => setMessage(e.target.value)} />
          <SendHorizontal className="h-6 w-8 rounded-full text-[#FF3AB2] cursor-pointer" strokeWidth={3} onClick={handleSendMessage} />
        </div>
        <Button className={`shadow-none bg-[#F6E6F3] text-[#FF3AB2] mb-2 mx-2 ${!messageMode ? 'block' : 'hidden'}`} onClick={() => setMessageMode(true)}>
          Message
        </Button>
      </Card>
    </CarouselItem>
  )
}
function NearByCarousel({ onSendMessage }: { onSendMessage: (message: Message) => void; }) {
  return (
    <Carousel opts={{ loop: true }}>
      <section className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <Circle className='w-3 h-3 text-green-500' fill='#22c55e' />
          <h1 className='text-lg font-semibold'>
            Online in your neighborhood
          </h1>
        </div>
        <div className='flex gap-2'>
          <CarouselPrevious className='translate-none static px-1 h-6 w-6 shadow-none bg-[#F6E6F3] border-none rounded-md text-[#FF3AB2] hover:bg-[#F6E6F3] hover:text-[#FF3AB2]' />
          <CarouselNext className='translate-none static px-1 h-6 w-6 shadow-none bg-[#F6E6F3] border-none rounded-md text-[#FF3AB2] hover:bg-[#F6E6F3] hover:text-[#FF3AB2]' />
        </div>
      </section>
      <CarouselContent className="-ml-2 md:w-[50vw]">
        {NEAR_BY_USERS.map((user) =>
          <UserCarouselItem key={user.name} user={user} onSendMessage={onSendMessage} />
        )}
      </CarouselContent>
    </Carousel>
  )
}

function RecentlyJoinedCarousel() {
  return (
    <Carousel opts={{ loop: true }} className='bg-white p-2 rounded-lg mt-2 md:hidden'>
      <section className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <h1 className='text-lg font-semibold'>
            Recently joined
          </h1>
        </div>
      </section>
      <CarouselContent className="-ml-2">
        {RECENTLY_JOINED_USERS.map(({ name, avatar, age, city }) => (
          <CarouselItem key={name} className="pl-2 mb-2 basis-1/3 text-sm">
            <Avatar>
              <AvatarImage src={avatar} />
            </Avatar>
            <div>
              <span className='font-semibold block'>{name}</span>
              <span className='font-medium text-xs text-gray-500 relative bottom-1'>{age} yo </span>
              <p className='text-xs font-semibold text-gray-400'>{city}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

function PopularCitiesCarousel() {
  return (
    <Carousel opts={{ loop: true }} className='bg-white p-2 rounded-lg mt-4 md:hidden'>
      <section className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <h1 className='text-lg font-semibold'>
            Popular Cities
          </h1>
        </div>
      </section>
      <CarouselContent className="-ml-2">
        {POPULAR_CITIES.map(({ name, imageSrc, population }) => (
          <CarouselItem key={name} className="pl-2 mb-2 basis-1/2 text-sm flex mr-2 ">
            <Avatar className='rounded-md'>
              <AvatarImage src={imageSrc} />
            </Avatar>
            <div className='ml-2'>
              <span className='font-semibold block'>{name}</span>
              <span className='font-medium text-xs text-gray-500'>{population} members</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

function PostCard({ post, onReply }: { post: Post; onReply: (title: string, reply: string) => void }) {
  const { user, createdAt, description, replies, title, imageSrc } = post;
  const [replyMode, setReplyMode] = useState(false);
  const [reply, setReply] = useState('');

  function handleSendReply(title: string) {
    setReplyMode(false);
    onReply(title, reply)
    setReply('');
  }

  return (
    <Card key={user.name} className='w-fit text-black bg-white border-none mb-4'>
      <CardHeader className='p-4 flex-row items-center gap-2 pb-0'>
        <Avatar>
          <AvatarImage src={user.avatar} />
        </Avatar>
        <div>
          <p className='font-semibold'>{user.name} <span className='font-medium text-sm text-gray-500'>• {user.age} yo </span></p>
          <p className='text-sm font-medium text-gray-400'>{new Date(createdAt).toLocaleString('en-US', { dateStyle: 'medium' })} • {user.city}</p>
        </div>
      </CardHeader>
      <CardContent className='p-4 pb-0'>
        <h1 className='font-bold pb-4'>{title}</h1>
        {imageSrc && <img src={imageSrc} alt="post image" className='rounded-lg mb-2' />}
        <p>{description}</p>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex-col'>
        <Separator className='bg-gray-200 my-4' />
        <div className={`flex w-full items-center gap-2 mx-2 justify-items-center mb-2 ${replyMode ? 'block' : 'hidden'}`}>
          <Input className="w-full" value={reply} onChange={(e) => setReply(e.target.value)} />
          <SendHorizontal className="h-6 w-8 rounded-full text-[#FF3AB2] cursor-pointer" strokeWidth={3} onClick={() => handleSendReply(title)} />
        </div>
        <div className={`justify-between w-full  ${!replyMode ? 'flex' : 'hidden'}`}>
          <div className='flex items-center gap-1 text-sm text-gray-500 font-medium place-self-end'>
            <MessageCircle className='text-gray-400 w-4 h-4' strokeWidth={3} />
            {replies.length}
          </div>
          <Button className='shadow-none bg-[#F6E6F3] text-[#FF3AB2] place-self-end' onClick={() => setReplyMode(true)}>
            Reply
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function RecentPosts({ posts, onReply }: { posts: Post[]; onReply: (title: string, reply: string) => void }) {

  return (
    <div className='mt-4'>
      <h1 className='text-lg font-semibold mb-2'>
        Recent posts
      </h1>
      <div className='flex flex-col'>
        {posts.map((post) => (
          <PostCard post={post} key={post.title} onReply={onReply} />
        ))}
      </div>
    </div>
  )

}

function ExplorePage({ posts, onChangePost, onSendMessage }: { posts: Post[]; onChangePost: React.Dispatch<React.SetStateAction<Post[]>>; onSendMessage: (message: Message) => void; }) {

  function handlePostReply(title: string, reply: string) {
    onChangePost((prevState) => prevState.map((post) => ({
      ...post,
      replies: post.title === title ? [...post.replies, { user: CURRENT_USER, text: reply }] : post.replies
    })))
  }

  return (
    <main className='p-3 w-full md:pt-10'>
      <NearByCarousel onSendMessage={onSendMessage} />
      <RecentlyJoinedCarousel />
      <PopularCitiesCarousel />
      <RecentPosts posts={posts} onReply={handlePostReply} />
    </main>
  )
}

function UserCard({ user, onSendMessage }: { user: User; onSendMessage: (message: Message) => void }) {
  const { avatar, name, age, city } = user;
  const [messageMode, setMessageMode] = useState(false);
  const [message, setMessage] = useState('');

  function handleSendMessage() {
    setMessageMode(false);
    onSendMessage({ text: message, ...user });
    setMessage('');
  }

  return (
    <Card className='w-[45%] grid h-56 gap-2 text-center text-black bg-white border-none md:w-[20%]' style={{ gridTemplateRows: '50% 1fr 1fr 1fr' }}>
      <img src={avatar} className='object-fill w-full h-full rounded-t-md' alt="avatar" />
      <p className='font-bold'>{name}</p>
      <p className='text-xs font-bold text-gray-400'>{`${age} yo • ${city}`}</p>
      <div className={`flex items-center gap-2 mx-2 justify-items-center mb-2 ${messageMode ? 'block' : 'hidden'}`}>
        <Input className="w-full" value={message} onChange={(e) => setMessage(e.target.value)} />
        <SendHorizontal className="h-6 w-8 rounded-full text-[#FF3AB2] cursor-pointer" strokeWidth={3} onClick={handleSendMessage} />
      </div>
      <Button className={`shadow-none bg-[#F6E6F3] text-[#FF3AB2] mb-2 mx-2 ${!messageMode ? 'block' : 'hidden'}`} onClick={() => setMessageMode(true)}>
        Message
      </Button>
    </Card>
  )
}

function SearchPage({ search, onSendMessage }: { search: string; onSendMessage: (message: Message) => void }) {
  const filteredUsers = useMemo(() => USERS.filter(({ name, age, avatar, city }) =>
    ['men', 'women'].includes(search) ? avatar.includes('/' + search + '/') : (
      name.toLowerCase().includes(search.toLowerCase()) ||
      age.toLowerCase().includes(search.toLowerCase()) ||
      city.toLowerCase().includes(search.toLowerCase()))
  ), [search]);

  return (
    <div className='min-h-[80vh] p-3 bg-[#F4F6FA]'>
      <h1 className='font-medium text-xl mb-4 md:text-2xl md:pt-5'>Your match is here!</h1>
      <div className='flex flex-wrap gap-4'>
        {filteredUsers.map((user) => (
          <UserCard key={user.name} user={user} onSendMessage={onSendMessage} />
        ))}
      </div>
    </div>
  )
}

function MessagesPage({ messages }: { messages: (User & { text: string })[] }) {
  return (
    <div className='p-3'>
      <h1 className="text-2xl font-bold tracking-tight mt-4">Your messages</h1>
      <section>
        {messages.map(({ text, name, avatar }) => (
          <article key={text} className="flex gap-2 items-center w-full mt-3 bg-white py-4 px-2 rounded-md border border-gray-200">
            <div className={`flex items-center justify-center rounded-full w-10 h-10 shadow-none border border-gray-200 bg-[#2258DC] p-2`}>
              <Avatar>
                <AvatarImage src={avatar} />
              </Avatar>
            </div>
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
            <ChevronRight className="ml-auto" />
          </article>
        ))}
      </section>
    </div>
  )
}

function ProfilePage({ user }: { user: User }) {
  return (
    <div className="min-h-[80vh]">
      <Avatar className="w-28 h-28 m-auto mt-32 outline-dashed outline-offset-4 outline-[#FF3AB2]">
        <AvatarImage src={user.avatar} />
      </Avatar>
      <p className='text-lg text-center mt-8 font-bold'>{user.name}</p>
      <p className='text-lg text-center'>{user.age} years old</p>
      <p className='text-lg text-center'>{user.city} • {user.neighborhood}</p>
    </div>
  )
}

function NotificationsPage() {
  return (
    <div className="min-h-[85vh] p-4">
      <img src="https://opendoodles.s3-us-west-1.amazonaws.com/swinging.svg" alt="all caught up" className='mt-20 md:w-3/4 md:mx-auto' />
      <h1 className='text-2xl font-bold text-center mt-10'>You&apos;re all caught up!</h1>
      <p className='text-sm text-center text-gray-400'>Return later to see your latest notifications</p>
    </div>
  )
}

function FollowingPage({ followingUsers, onUnfollow }: { followingUsers: (User & { following: boolean })[]; onUnfollow: (name: string) => void; }) {
  return (
    <div className='min-h-[80vh] p-3 bg-[#F4F6FA]'>
      <h1 className='font-medium text-xl mb-4'>Profiles you follow</h1>
      <div className='flex flex-wrap gap-4'>
        {followingUsers.map(({ avatar, name, age, city, following }) => (
          <Card key={name} className='w-[45%] grid h-56 gap-2 text-center text-black bg-white border-none md:w-[20%]' style={{ gridTemplateRows: '50% 1fr 1fr 1fr' }}>
            <img src={avatar} className='object-fill w-full h-full rounded-t-md' alt="avatar" />
            <p className='font-bold'>{name}</p>
            <p className='text-xs font-bold text-gray-400'>{`${age} yo • ${city}`}</p>
            <Button className='shadow-none bg-[#F6E6F3] text-[#FF3AB2] mb-2 mx-2' onClick={() => onUnfollow(name)}>
              {following ? 'Unfollow' : 'Follow'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const animationRef = useRef<SVGSVGElement | null>(null);
  const [place, setPlace] = useState('23px');
  const [selectedPage, setSelectedPage] = useState<string>('main');
  const [search, setSearch] = useState('');
  const [followingUsers, setFollowingUsers] = useState(USERS.slice(10, 29).map((user) => ({ ...user, following: true })))
  const [posts, setPosts] = useState(POSTS);
  const [seeMore, setSeeMore] = useState<string>('recently')

  useEffect(() => {
    if (!animationRef.current) return;
    setPlace(`${Math.round(animationRef.current.getBoundingClientRect().left)}px`)
  }, []);

  const [messages, setMessages] = useState<Message[]>(USERS.slice(0, 10).map((user, i) => ({ ...user, text: MESSAGES[i] })));

  function onChangeSearch(value: string) {
    setSelectedPage('search');
    setSearch(value);
  }

  function handleClickIcon(e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) {
    setPlace(`${Math.round(e.currentTarget.getBoundingClientRect().left)}px`);
    setSelectedPage(id);
  }

  function handleToggleFollow(name: string) {
    setFollowingUsers((prevState) => prevState.map((user) => ({ ...user, following: user.name === name ? !user.following : user.following })))
  }

  return (
    <div className={`${font.className} min-h-screen h-screen w-screen bg-[#F4F6FA] text-black overflow-x-hidden`}>
      <Header search={search} setSearch={onChangeSearch} onChangePage={setSelectedPage} />
      <div className='flex w-full bg-[#F4F6FA]'>
        <div className="h-full w-1/3 sticky top-0 hidden md:block">
          <div className="bg-[#F4F6FA] text-gray-500 font-medium pt-10">
            <div className="flex flex-col gap-4">
              {PAGES.map(({ id, name, Icon }) => (
                <div className={twMerge(selectedPage === id && 'text-[#FF3AB2] font-semibold')} key={id}>
                  <button onClick={() => setSelectedPage(id)} className={twMerge('flex items-end gap-2 text-sm pl-10 hover:bg-[#F4F6FA] hover:text-gray-500 hover:font-bold', selectedPage === id && 'text-[#FF3AB2] font-semibold hover:text-[#FF3AB2]')}>
                    <Icon onClick={(e) => handleClickIcon(e, id)} className='w-5 h-5' />
                    {name}
                  </button>
                </div>
              ))}
            </div>
            <div className='pl-10 pt-10'>
              <p className='text-black font-semibold text-base'>Recently Joined <span className='text-sm text-[#FF3AB2] pl-1 hover:underline cursor-pointer' onClick={() => setSeeMore('recently')}>More</span></p>
              <div className='flex gap-1 mt-3'>
                {RECENTLY_JOINED_USERS.slice(0, 5).map(({ avatar }) => (
                  <Avatar key={avatar} className='w-9 h-9'>
                    <AvatarImage src={avatar} />
                  </Avatar>
                ))}
              </div>
            </div>
            <div className='pl-10 pt-10'>
              <p className='text-black font-semibold text-base'>Popular cities <span className='text-sm text-[#FF3AB2] pl-1 hover:underline cursor-pointer' onClick={() => setSeeMore('cities')}>More</span></p>
              <div className='mt-3'>
                {POPULAR_CITIES.slice(0, 3).map(({ imageSrc, name, population }) => (
                  <div key={imageSrc} className='flex items-center pb-3'>
                    <Avatar className='rounded-md w-9 h-9'>
                      <AvatarImage src={imageSrc} />
                    </Avatar>
                    <div className='ml-2'>
                      <span className='font-semibold block text-black text-sm'>{name}</span>
                      <span className='font-medium text-xs text-gray-500'>{population} members</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          {(selectedPage === 'main' && search.length === 0) && <ExplorePage posts={posts} onChangePost={setPosts} onSendMessage={(message) => setMessages(prevState => [...prevState, message])} />}
          {(selectedPage === 'search' || search.length > 0) && <SearchPage search={search} onSendMessage={(message) => setMessages(prevState => [...prevState, message])} />}
          {(selectedPage === 'messages' && search.length === 0) && <MessagesPage messages={messages} />}
          {(selectedPage === 'profile' && search.length === 0) && <ProfilePage user={CURRENT_USER} />}
          {(selectedPage === 'activity' && search.length === 0) && <NotificationsPage />}
          {(selectedPage === 'following' && search.length === 0) && <FollowingPage followingUsers={followingUsers} onUnfollow={handleToggleFollow} />}
        </div>
        <div className='h-full w-1/3 sticky top-0 hidden md:block pl-10'>
          <h1 className='text-lg font-semibold mt-10 mb-4'>
            {seeMore === 'recently' ? 'Recently joined' : 'Popular cities'}
          </h1>
          <div className={twMerge('hidden flex-col gap-6', seeMore === 'recently' && 'flex')}>
            {RECENTLY_JOINED_USERS.map(({ name, avatar, age, city }) => (
              <div key={name} className="flex gap-2">
                <Avatar>
                  <AvatarImage src={avatar} />
                </Avatar>
                <div>
                  <span className='font-semibold'>{name}</span>
                  <span className='font-medium text-xs text-gray-500 pl-1'> • {age} yo </span>
                  <p className='text-xs font-semibold text-gray-400'>{city}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={twMerge('hidden flex-col gap-6', seeMore !== 'recently' && 'flex')}>
            {POPULAR_CITIES.map(({ imageSrc, name, population }) => (
              <div key={imageSrc} className='flex items-center pb-3'>
                <Avatar className='rounded-md w-9 h-9'>
                  <AvatarImage src={imageSrc} />
                </Avatar>
                <div className='ml-2'>
                  <span className='font-semibold block text-black text-sm'>{name}</span>
                  <span className='font-medium text-xs text-gray-500'>{population} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className='sticky h-20 bg-[#F6E6F3] w-full bottom-0 rounded-lg px-2 shadow-lg md:hidden'>
        <div className='flex items-center justify-center w-full h-full relative'>
          {
            PAGES.map(({ id, name, Icon }, i) => (
              <div className="relative w-full flex flex-col items-center" key={id}>
                <Icon ref={i === 0 ? animationRef : undefined} onClick={(e) => handleClickIcon(e, id)} className={twMerge('text-white', selectedPage === id && 'text-[#FF3AB2]')} />
                <p className={twMerge('mt-1 text-xs transition-all duration-500 text-white', selectedPage === id && 'text-[#FF3AB2] font-semibold')}>{name}</p>
              </div>
            ))
          }
          <div className="absolute bottom-2 transition-all duration-500" style={{ left: place }}>
            <Circle color="#FF3AB2" fill="#FF3AB2" className="w-1 h-1" />
          </div>
        </div>
      </footer>
    </div>
  )
}
