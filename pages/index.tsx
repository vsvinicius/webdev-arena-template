import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, } from "@/components/ui/carousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Bell, ChevronDown, Circle, Crown, Facebook, Heart, Instagram, LayoutGrid, Search, ShoppingBag, Smartphone, Star, Twitter, Youtube, Zap } from "lucide-react";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type Vesture = {
  name: string;
  price: string;
  salePrice: string;
  totalItems: number;
  remainingItems: number;
  imageSrc: string;
  stars: string;
}

type Shopp = {
  mark: string;
  slogan: string;
  img1: string;
  price1: number;
  img2: string;
  price2: number;
  img3: string;
  price3: number;
}

const SALE_ITEMS = [
  {
    "name": "Classic White T-Shirt",
    "price": "$39.90",
    "salePrice": "$29.90",
    "totalItems": 120,
    "remainingItems": 42,
    "imageSrc": "https://picsum.photos/seed/tshirt/500/350",
    "stars": "4.5"
  },
  {
    "name": "Denim Jacket",
    "price": "$89.90",
    "salePrice": "$69.90",
    "totalItems": 80,
    "remainingItems": 17,
    "imageSrc": "https://picsum.photos/seed/denimjacket/500/350",
    "stars": "4.8"
  },
  {
    "name": "Black Slim Jeans",
    "price": "$69.90",
    "salePrice": "$49.90",
    "totalItems": 150,
    "remainingItems": 56,
    "imageSrc": "https://picsum.photos/seed/jeans/500/350",
    "stars": "4.2"
  },
  {
    "name": "Oversized Hoodie",
    "price": "$59.90",
    "salePrice": "$44.90",
    "totalItems": 100,
    "remainingItems": 23,
    "imageSrc": "https://picsum.photos/seed/hoodie/500/350",
    "stars": "4.6"
  },
  {
    "name": "Beige Chino Pants",
    "price": "$54.90",
    "salePrice": "$39.90",
    "totalItems": 95,
    "remainingItems": 30,
    "imageSrc": "https://picsum.photos/seed/chinos/500/350",
    "stars": "4.1"
  },
  {
    "name": "Cotton Summer Dress",
    "price": "$79.90",
    "salePrice": "$59.90",
    "totalItems": 60,
    "remainingItems": 14,
    "imageSrc": "https://picsum.photos/seed/dress/500/350",
    "stars": "4.9"
  },
  {
    "name": "Striped Polo Shirt",
    "price": "$44.90",
    "salePrice": "$34.90",
    "totalItems": 110,
    "remainingItems": 40,
    "imageSrc": "https://picsum.photos/seed/polo/500/350",
    "stars": "4.0"
  },
  {
    "name": "Wool Cardigan",
    "price": "$89.90",
    "salePrice": "$69.90",
    "totalItems": 70,
    "remainingItems": 12,
    "imageSrc": "https://picsum.photos/seed/cardigan/500/350",
    "stars": "4.7"
  },
  {
    "name": "Linen Button-Up Shirt",
    "price": "$59.90",
    "salePrice": "$44.90",
    "totalItems": 90,
    "remainingItems": 27,
    "imageSrc": "https://picsum.photos/seed/linen/500/350",
    "stars": "4.3"
  },
  {
    "name": "Athletic Joggers",
    "price": "$49.90",
    "salePrice": "$39.90",
    "totalItems": 130,
    "remainingItems": 48,
    "imageSrc": "https://picsum.photos/seed/joggers/500/350",
    "stars": "4.4"
  }
]

const DIFFERENT_SHOP = [
  {
    "mark": "Nike Sae Mall",
    "slogan": `"Just do it bro!"`,
    "img1": "https://picsum.photos/seed/bag/400/400",
    "price1": 650000,
    "img2": "https://picsum.photos/seed/heels/400/400",
    "price2": 270000,
    "img3": "https://picsum.photos/seed/hat/400/400",
    "price3": 99000
  },
  {
    "mark": "Barudak Disaster Mall",
    "slogan": `"Unleash Your Fashion"`,
    "img1": "https://picsum.photos/seed/coat/400/400",
    "price1": 324000,
    "img2": "https://picsum.photos/seed/sneakers/400/400",
    "price2": 199000,
    "img3": "https://picsum.photos/seed/tshirt/400/400",
    "price3": 120000
  },
  {
    "mark": "Galaxy Galleria Mall",
    "slogan": `"Be Extraordinary"`,
    "img1": "https://picsum.photos/seed/shirts/400/400",
    "price1": 179000,
    "img2": "https://picsum.photos/seed/runningshoes/400/400",
    "price2": 199000,
    "img3": "https://picsum.photos/seed/pants/400/400",
    "price3": 253000
  },
  {
    "mark": "Aurora Well Mall",
    "slogan": `"Chic, Bold, Confident"`,
    "img1": "https://picsum.photos/seed/bag2/400/400",
    "price1": 250000,
    "img2": "https://picsum.photos/seed/shorts/400/400",
    "price2": 162000,
    "img3": "https://picsum.photos/seed/jacket/400/400",
    "price3": 255000
  }
]

const CATEGORIES = [
  "T-Shirt", "Jacket", "Shirt", "Jeans", "Bag", "Shoes", "Watches", "Cap"
]

function Header() {
  return (
    <header className="w-full bg-white text-sm font-medium">
      <div className="text-gray-500 flex border-b border-gray-300 w-full px-16 py-2 justify-between">
        <div className="flex gap-2 items-end">
          <Smartphone />
          <a href="#">Download BeliBeli App</a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline hover:text-black">Mitra BeliBeli</a>
          <a href="#" className="hover:underline hover:text-black">About BeliBeli</a>
          <a href="#" className="hover:underline hover:text-black">BeliBeli Care</a>
          <a href="#" className="hover:underline hover:text-black">Promo</a>
          <div className="py-1">
            <Separator orientation="vertical" />
          </div>
          <a href="#" className="font-bold text-black">Sign up</a>
          <div className="py-1">
            <Separator orientation="vertical" />
          </div>
          <a href="#" className="font-bold text-black">Login</a>
        </div>
      </div>
      <div className="text-gray-500 flex h-20 border-b border-gray-300 items-center justify-between px-16 gap-4">
        <div className="flex items-center gap-1">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            alt="logo"
            className="w-10 h-10 cursor-pointer md:h-14 md:w-14"
          />
          <p className="font-bold text-black text-lg">BeliBeli.com</p>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-ring w-[75%]">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center whitespace-nowrap px-2 gap-2">
              All Category
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Category</DropdownMenuItem>
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="h-10 bg-gray-300 mr-4" />
          <Search className="w-5 h-5 text-gray-400" strokeWidth={3} />
          <Input className="p-0 border-none shadow-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-400" placeholder="Search product or brand here..."
          />
        </div>
        <div className="flex gap-6">
          <ShoppingBag className="cursor-pointer" />
          <Bell className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

function SalesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel opts={{
        align: "center",
        loop: true,
      }}
        setApi={setApi}
        className="w-full mx-auto text-gray-500 relative"
      >
        <CarouselContent>
          {[0, 1, 2].map((value) => (
            <CarouselItem key={value} className="flex items-center">
              <div className="w-[40%] pl-20 flex flex-col gap-4">
                <p className="text-2xl font-medium">#Big Fashion Sale</p>
                <p className="text-black text-5xl font-bold tracking-wide">Limited Time Offer!</p>
                <p className="text-black text-5xl font-bold tracking-wide">Up to <i>50%</i> OFF!</p>
                <p className="text-xl font-medium">Redefine Your Everyday Style</p>
              </div>
              <img src="https://picsum.photos/800/600" alt="" className="w-[60%] h-96" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-1 absolute bottom-6 left-20">
          {[...new Array(count)].map((_, i) => (
            <Circle className={twMerge("w-3 h-3 fill-black opacity-30 text-black", current === i + 1 && 'opacity-100')} key={i} />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

function Category() {


  return (
    <div className="bg-white text-black font-bold text-sm flex items-center py-10 justify-evenly ">
      {CATEGORIES.map((value, i) => (
        <div key={value} className="text-center cursor-pointer">
          <Avatar className="w-14 h-14 mb-1">
            <AvatarImage src={`https://picsum.photos/800/${600 + i * 50}`} />
          </Avatar>
          <p>{value}</p>
        </div>
      ))}
      <div className="flex flex-col items-center cursor-pointer">
        <div className="rounded-full p-2 border border-gray-300 w-14 h-14 flex items-center justify-center mb-1">
          <LayoutGrid className="fill-gray-300 text-gray-300" />
        </div>
        <p>All Category</p>
      </div>
    </div>
  )
}

function ItemCard({ name, price, salePrice, totalItems, remainingItems, imageSrc, stars, className, hideSlider, addStar }: Vesture & { className?: string; hideSlider?: boolean; addStar?: boolean }) {
  const [liked, setLiked] = useState(false);
  return (
    <Card className={twMerge("relative overflow-hidden bg-white w-full h-96 border-none", className)}>
      <div className="absolute right-5 top-4 bg-white rounded-full p-1 flex items-center justify-center" onClick={() => setLiked(prevState => !prevState)}>
        <Heart className={twMerge("fill-gray-300 w-6 h-6 transition-all duration-200", liked && 'fill-red-500')} />
      </div>
      <div className="text-black h-full">
        <img src={imageSrc} alt="Vesture items" className="h-3/5" />
        <div className="h-2/5 p-4 flex flex-col justify-between">
          <div className="flex flex-col justify-evenly h-full">
            <p className="font-bold text-xl">{name}</p>
            <div className={twMerge("hidden items-center gap-1", addStar && 'flex')}>
              <Star className="text-amber-500 fill-amber-500 h-4 w-4" />
              <span className="text-sm font-bold">{stars}</span>
              <span className="text-sm font-bold text-gray-300">• {totalItems - remainingItems} sold</span>
            </div>
            <div className="font-bold text-lg mt-2">
              <span className="mr-2">{salePrice}</span>
              <span className="text-base text-red-300 line-through">{price}</span>
            </div>
          </div>
          <div className={twMerge('mt-4', hideSlider && 'hidden')}>
            <Separator className="absolute left-0 bg-gray-300" />
            <div className="mt-4 flex gap-2">
              <SliderPrimitive.Root
                className={twMerge(
                  "relative flex w-full touch-none select-none items-center",
                )}
                defaultValue={[100 - ((remainingItems * 100) / totalItems)]}
                disabled
              >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-300">
                  <SliderPrimitive.Range className="absolute h-full bg-black" />
                </SliderPrimitive.Track>
              </SliderPrimitive.Root>
              <p className="text-sm whitespace-nowrap text-gray-400 font-medium">{totalItems}/{remainingItems} Sale</p>
            </div>
          </div>
        </div>
      </div>
    </Card >
  )
}


const FUTURE_DATE = new Date('2026-10-10');

function FlashSale() {
  const [date, setDate] = useState<Date>();
  const distance = date ? FUTURE_DATE.getTime() - date.getTime() : 0;

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="p-14 pr-0">
      <div className="flex items-center gap-4 pb-8">
        <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
          <Zap className="fill-white text-white" />
        </div>
        <p className="text-2xl text-black font-bold">Flash Sale</p>
        <div className="flex items-center text-white gap-2 justify-center text-xs font-bold">
          <p className="flex items-center justify-center rounded-full bg-red-400 w-8 h-8">{(hours < 10 ? '0' : '') + hours}</p>
          <p className="text-black font-bold text-lg">:</p>
          <p className="flex items-center justify-center rounded-full bg-red-400 w-8 h-8">{(minutes < 10 ? '0' : '') + minutes}</p>
          <p className="text-black font-bold text-lg">:</p>
          <p className="flex items-center justify-center rounded-full bg-red-400 w-8 h-8">{(seconds < 10 ? '0' : '') + seconds}</p>
        </div>
      </div>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {SALE_ITEMS.map((vesture: Vesture) => (
            <CarouselItem key={vesture.name} className="basis-1/5 ml-2">
              <ItemCard {...vesture} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

function ForYou() {
  return (
    <div className="mt-4 bg-white p-14 w-full">
      <div className="flex mb-8 w-full justify-between px-10">
        <p className="text-black font-bold text-2xl">Todays For You!</p>
        <div className="flex place-self-end gap-6 font-semibold">
          <Button className="hover:bg-black hover:text-white">Best Seller </Button>
          <Button className="hover:bg-black hover:text-white">Keep Stylish </Button>
          <Button className="hover:bg-black hover:text-white">Special Discount </Button>
          <Button className="hover:bg-black hover:text-white">Official Store</Button>
          <Button className="hover:bg-black hover:text-white">Coveted Product</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-evenly">
        {SALE_ITEMS.map((item) => <ItemCard {...item} key={item.name} className="w-1/5" hideSlider addStar />)}
      </div>
    </div>
  )
}


function BestSell() {
  return (
    <div className="bg-white">
      <div className="flex justify-center">
        <p className="font-bold text-xl text-black">Best Selling Store</p>
      </div>
      <div className="grid grid-cols-3 grid-rows-2">
        <Card className="bg-[#CCCED4] flex flex-col items-center justify-center w-60 h-96 overflow-hidden border border-[#CCCED4] row-span-2">
          <div className="h-3/4">
            <img src="https://picsum.photos/seed/clothing1/400/400" alt="clothingimage" />
          </div>
          <div className="text-[#595F68] flex flex-col items-center">
            <p className="font-bold text-2xl pt-4">BeliBeli Mall</p>
            <p className="pt-2">Shop, Explore, Delight and Experience Mall Magic!</p>
          </div>
        </Card>
        {
          DIFFERENT_SHOP.map(({ mark, slogan, img1, price1, img2, price2, img3, price3 }) => (
            <Card className="border border-zinc-400 rounded-lg bg-white w-60 h-44 flex">
              <div>
                <div className="flex">
                  <img
                    src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
                    alt="logo"
                    className="w-10 h-10 cursor-pointer md:h-14 md:w-14"
                  />
                  <div className="bg-[#3488D6] w-5 h-5 rounded-full p-1">
                    <Crown className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-black text-sm">{mark}</p>
                    <p className="text-gray-500 text-xs">{slogan}</p>
                  </div>
                </div>
                <div className="text-black flex text-xs">
                  <div className="flex flex-col items-center p-1">
                    <img src={img1} alt="" className="w-20 rounded-lg" />
                    <p>{price1}</p>
                  </div>
                  <div className="flex flex-col items-center p-1">
                    <img src={img2} alt="" className="w-20 rounded-lg" />
                    <p>{price2}</p>
                  </div>
                  <div className="flex flex-col items-center p-1">
                    <img src={img3} alt="" className="w-20 rounded-lg" />
                    <p>{price3}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

function Contacts() {
  return (
    <div className="bg-[#1C242D]">
      <div className="relative flex justify-center ">
        <img src="https://picsum.photos/800/600" alt="" className="brightness-50 w-full h-64" />
        <p className="text-white absolute top-24 text-6xl">"Let's Shop Beyond Boundaries"</p>
      </div>
      <div>
        <div className="flex items-center text-white">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            alt="logo"
            className="w-6 h-6 cursor-pointer md:h-14 md:w-14"
          />
          <p className="font-bold text-xl">BeliBeli.com</p>
        </div>
        <p className="text-sm">"Let's Shop Beyond Boundaries"</p>
        <div className="flex text-[#777C80]">
          <Facebook />
          <Twitter />
          <Youtube />
          <Instagram />
        </div>
      </div>
      <div className="flex text-sm">
        <div className="flex flex-col">
          <p className="text-[#777C80]">BeliBeli</p>
          <a href="#">About BeliBeli</a>
          <a href="#">Career</a>
          <a href="#">Mitra Blog</a>
          <a href="#">B2B Digital</a>
        </div>
        <div className="flex flex-col">
          <p className="text-[#777C80]">Buy</p>
          <a href="#">Bill & Top Up</a>
          <a href="#">CarBeliBeli CODeer</a>
          <a href="#">Mitra Blog</a>
          <a href="#">Promo</a>
        </div>
        <div className="flex flex-col">
          <p className="text-[#777C80]">Sell</p>
          <a href="#">Seller Education Center</a>
          <a href="#">Brand Index</a>
          <a href="#">Register Official Store</a>
        </div>
        <div className="flex flex-col">
          <p className="text-[#777C80]">Guide and Help</p>
          <a href="#">BeliBeli Care</a>
          <a href="#">Term and Confition</a>
          <a href="#">Privacy Mitra</a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className={`${inter.className} bg-[#F4F4F5] w-screen h-screen pb-32 overflow-auto`}>
      <Header />
      <SalesCarousel />
      <Category />
      <FlashSale />
      <ForYou />
      <BestSell />
      <Contacts />
    </div>
  )
}
