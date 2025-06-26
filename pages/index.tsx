import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, } from "@/components/ui/carousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Bell, ChevronDown, Circle, Heart, LayoutGrid, Menu, Search, ShoppingBag, Smartphone, Star, Zap } from "lucide-react";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const inter = Inter({
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
  category: string;
  specialCategory: string;
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

const SALE_ITEMS: Vesture[] =
  [
    {
      "name": "Classic White T-Shirt",
      "price": "$39.90",
      "salePrice": "$29.90",
      "totalItems": 120,
      "remainingItems": 42,
      "imageSrc": "https://picsum.photos/seed/tshirt/500/350",
      "stars": "4.5",
      "category": "Cap",
      "specialCategory": "Special Discount"
    },
    {
      "name": "Denim Jacket",
      "price": "$89.90",
      "salePrice": "$69.90",
      "totalItems": 80,
      "remainingItems": 17,
      "imageSrc": "https://picsum.photos/seed/denimjacket/500/350",
      "stars": "4.8",
      "category": "Watches",
      "specialCategory": "Coveted Product"
    },
    {
      "name": "Black Slim Jeans",
      "price": "$69.90",
      "salePrice": "$49.90",
      "totalItems": 150,
      "remainingItems": 56,
      "imageSrc": "https://picsum.photos/seed/jeans/500/350",
      "stars": "4.2",
      "category": "Watches",
      "specialCategory": "Best Seller"
    },
    {
      "name": "Oversized Hoodie",
      "price": "$59.90",
      "salePrice": "$44.90",
      "totalItems": 100,
      "remainingItems": 23,
      "imageSrc": "https://picsum.photos/seed/hoodie/500/350",
      "stars": "4.6",
      "category": "Bag",
      "specialCategory": "Official Store"
    },
    {
      "name": "Beige Chino Pants",
      "price": "$54.90",
      "salePrice": "$39.90",
      "totalItems": 95,
      "remainingItems": 30,
      "imageSrc": "https://picsum.photos/seed/chinos/500/350",
      "stars": "4.1",
      "category": "Jeans",
      "specialCategory": "Coveted Product"
    },
    {
      "name": "Cotton Summer Dress",
      "price": "$79.90",
      "salePrice": "$59.90",
      "totalItems": 60,
      "remainingItems": 14,
      "imageSrc": "https://picsum.photos/seed/dress/500/350",
      "stars": "4.9",
      "category": "Shirt",
      "specialCategory": "Best Seller"
    },
    {
      "name": "Striped Polo Shirt",
      "price": "$44.90",
      "salePrice": "$34.90",
      "totalItems": 110,
      "remainingItems": 40,
      "imageSrc": "https://picsum.photos/seed/polo/500/350",
      "stars": "4.0",
      "category": "Jacket",
      "specialCategory": "Best Seller"
    },
    {
      "name": "Wool Cardigan",
      "price": "$89.90",
      "salePrice": "$69.90",
      "totalItems": 70,
      "remainingItems": 12,
      "imageSrc": "https://picsum.photos/seed/cardigan/500/350",
      "stars": "4.7",
      "category": "T-Shirt",
      "specialCategory": "Special Discount"
    },
    {
      "name": "Linen Button-Up Shirt",
      "price": "$59.90",
      "salePrice": "$44.90",
      "totalItems": 90,
      "remainingItems": 27,
      "imageSrc": "https://picsum.photos/seed/linen/500/350",
      "stars": "4.3",
      "category": "Jeans",
      "specialCategory": "Best Seller"
    },
    {
      "name": "Athletic Joggers",
      "price": "$49.90",
      "salePrice": "$39.90",
      "totalItems": 130,
      "remainingItems": 48,
      "imageSrc": "https://picsum.photos/seed/joggers/500/350",
      "stars": "4.4",
      "category": "Shoes",
      "specialCategory": "Official Store"
    }
  ]

const DIFFERENT_SHOP = [
  {
    "mark": "Nike Sae Mall",
    "slogan": "Just do it bro!",
    "img1": "https://picsum.photos/seed/bag/400/400",
    "price1": 650000,
    "img2": "https://picsum.photos/seed/heels/400/400",
    "price2": 270000,
    "img3": "https://picsum.photos/seed/hat/400/400",
    "price3": 99000
  },
  {
    "mark": "Barudak Disaster Mall",
    "slogan": "Unleash Your Fashion",
    "img1": "https://picsum.photos/seed/coat/400/400",
    "price1": 324000,
    "img2": "https://picsum.photos/seed/sneakers/400/400",
    "price2": 199000,
    "img3": "https://picsum.photos/seed/tshirt/400/400",
    "price3": 120000
  },
  {
    "mark": "Galaxy Galleria Mall",
    "slogan": "Be Extraordinary",
    "img1": "https://picsum.photos/seed/shirts/400/400",
    "price1": 179000,
    "img2": "https://picsum.photos/seed/runningshoes/400/400",
    "price2": 199000,
    "img3": "https://picsum.photos/seed/pants/400/400",
    "price3": 253000
  },
]


const CATEGORIES = [
  {
    name: 'T-Shirt',
    imageSrc: 'https://picsum.photos/50',
  },
  {
    name: 'Jacket',
    imageSrc: 'https://picsum.photos/100',
  },
  {
    name: 'Shirt',
    imageSrc: 'https://picsum.photos/60',
  },
  {
    name: 'Jeans',
    imageSrc: 'https://picsum.photos/110',
  },
  {
    name: 'Bag',
    imageSrc: 'https://picsum.photos/70',
  },
  {
    name: 'Shoes',
    imageSrc: 'https://picsum.photos/75',
  },
  {
    name: 'Watches',
    imageSrc: 'https://picsum.photos/80',
  },
  {
    name: 'Cap',
    imageSrc: 'https://picsum.photos/90',
  },
]
const SPECIAL_CATEGORIES = [
  'Best Seller',
  'Keep Stylish',
  'Special Discount',
  'Official Store',
  'Coveted Product',
]
// console.debug(SALE_ITEMS.map((value) => ({ ...value, specialCategory: SPECIAL_CATEGORIES[Math.floor(Math.random() * SPECIAL_CATEGORIES.length)] })))
function Header({ search, onChangeSearch, category, onChangeCategory }: { search: string; onChangeSearch: React.Dispatch<React.SetStateAction<string>>; category: string; onChangeCategory: React.Dispatch<React.SetStateAction<string>>; }) {
  return (
    <header className="w-full bg-white text-sm font-medium">
      <div className="text-gray-500 flex border-b border-gray-300 w-full px-2 md:px-16 py-2 justify-between items-center">
        <div className="flex gap-2 items-end">
          <Smartphone />
          <a href="#">Download BeliBeli App</a>
        </div>
        <div className="hidden gap-4 md:flex">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='md:hidden'>
            <Button variant="outline" className="border-none shadow-none"><Menu /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-5 bg-gray-800 border-none text-white font-medium px-0" align="start">
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">Mitra BeliBeli</a></DropdownMenuItem>
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">About BeliBeli</a></DropdownMenuItem>
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">BeliBeli Care</a></DropdownMenuItem>
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">Promo</a></DropdownMenuItem>
            <Separator className="bg-gray-400" />
            <DropdownMenuItem><a href="#" className="px-2 font-bold">Sign up</a></DropdownMenuItem>
            <DropdownMenuItem><a href="#" className="px-2 font-bold">Login</a></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-1 grid grid-rows-2 grid-cols-2 text-gray-500 border-b border-gray-300 items-center justify-between md:px-16 md:gap-4">
        <div className="flex items-center gap-1">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            alt="logo"
            className="w-10 h-10 cursor-pointer md:h-14 md:w-14"
          />
          <p className="font-bold text-black text-lg">BeliBeli.com</p>
        </div>
        <div className="mb-3 col-span-2 flex items-center place-self-center gap-1 rounded-md bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-ring w-[98%] md:w-[75%]">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center whitespace-nowrap pl-2 md:px-2 gap-2">
              {category}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800">
              <DropdownMenuItem onSelect={() => onChangeCategory('All Category')}>All Category</DropdownMenuItem>
              {CATEGORIES.map(({ name }) => (
                <DropdownMenuItem key={name} onSelect={() => onChangeCategory(name)}>{name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="h-10 bg-gray-300 md:mr-4" />
          <Search className="w-7 h-7 md:w-5 md:h-5 text-gray-400" strokeWidth={3} />
          <Input
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            className="p-0 border-none shadow-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-400 placeholder:text-sm"
            placeholder="Search product or brand here..."
          />
        </div>
        <div className="flex gap-6 row-start-1 col-start-2 justify-self-end">
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
              <div className="md:w-[40%] pl-10 md:pl-20 h-80 flex flex-col gap-4 w-full" style={{ backgroundImage: "url('https://picsum.photos/800/600')" }}>
                <p className="mt-10 text-lg md:text-2xl font-medium">#Big Fashion Sale</p>
                <p className="text-white md:text-black text-4xl md:text-5xl font-bold tracking-wide">Limited Time Offer!</p>
                <p className="text-white md:text-black text-4xl md:text-5xl font-bold tracking-wide">Up to <i>50%</i> OFF!</p>
                <p className="text-base md:text-xl font-medium">Redefine Your Everyday Style</p>
              </div>
              <img src="https://picsum.photos/800/600" alt="" className="w-[60%] h-96 hidden" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-1 absolute bottom-6 left-[45%] md:left-20">
          {[...new Array(count)].map((_, i) => (
            <Circle className={twMerge("md:w-3 w-2 md:h-3 h-2 fill-black opacity-30 text-black", current === i + 1 && 'opacity-100')} key={i} />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

function Category() {
  return (
    <div className="bg-white text-black font-bold text-sm flex items-center py-6 md:py-10 justify-evenly overflow-auto gap-8 px-8">
      {CATEGORIES.map(({ name, imageSrc }) => (
        <div key={name} className="text-center cursor-pointer">
          <Avatar className="w-14 h-14 mb-1">
            <AvatarImage src={imageSrc} />
          </Avatar>
          <p>{name}</p>
        </div>
      ))}
      <div className="flex flex-col items-center cursor-pointer">
        <div className="rounded-full p-2 border border-gray-300 w-14 h-14 flex items-center justify-center mb-1">
          <LayoutGrid className="fill-gray-300 text-gray-300" />
        </div>
        <p className="whitespace-nowrap">All Category</p>
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
        <img src={imageSrc} alt="Vesture items" className="h-3/5 w-full" />
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
    <div className="p-4 pt-6 md:p-14 md:pr-0">
      <div className="flex items-center gap-4 pb-8 justify-between">
        <div className="bg-black rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center justify-center">
          <Zap className="fill-white text-white w-5 h-5" />
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
            <CarouselItem key={vesture.name} className="md:basis-1/5 ml-2">
              <ItemCard {...vesture} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

function ForYou({ selectedCategories, onSelect }: { selectedCategories: string[]; onSelect: React.Dispatch<React.SetStateAction<string[]>> }) {
  function handleClickCategory(category: string) {
    onSelect((prevState) => {
      if (prevState.includes(category)) return prevState.filter((item) => item !== category);
      return [...prevState, category]
    })
  }
  return (
    <div className="mt-6 pt-6 bg-white p-4 md:p-14 w-full">
      <div className="md:flex mb-8 w-full justify-between md:px-10">
        <p className="text-black font-bold text-2xl mb-4">Todays For You!</p>
        <div className="flex place-self-end gap-6 font-semibold flex-wrap justify-around">
          {
            SPECIAL_CATEGORIES.map((category) => (
              <Button
                className={twMerge("hover:bg-black hover:text-white w-[40%]", selectedCategories.includes(category) && 'bg-black text-white')}
                key={category}
                onClick={() => handleClickCategory(category)}
              >
                {category}
              </Button>
            ))
          }
        </div>
      </div>
      <Carousel opts={{ loop: true }} className="md:hidden">
        <CarouselContent>
          {SALE_ITEMS.filter(({ specialCategory }) => selectedCategories.length === 0 || selectedCategories.includes(specialCategory)).map((vesture: Vesture) => (
            <CarouselItem key={vesture.name} className="ml-2 mb-10">
              <ItemCard {...vesture} hideSlider addStar />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex-wrap gap-5 justify-evenly hidden md:flex">
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
      <Card className="bg-[#CCCED4] flex flex-col items-center w-60 overflow-hidden border border-[#CCCED4]">
        <div className="h-3/5">
          <img src="https://picsum.photos/seed/clothing1/400/400" alt="clothingimage" />
        </div>
        <div className="text-[#595F68] flex flex-col items-center">
          <p className="font-bold text-2xl pt-4">BeliBeli Mall</p>
          <p className="pt-2">Shop, Explore, Delight and Experience Mall Magic!</p>
        </div>
      </Card>
      {
        DIFFERENT_SHOP.map(({ mark, slogan, img1, price1, img2, price2, img3, price3 }) => (
          <Card className="border border-zinc-400 rounded-lg">
            <div>
              <p className="text-black">{mark}</p>
              <p>{slogan}</p>
              <img src={img1} alt="" />
              <p>{price1}</p>
              <img src={img2} alt="" />
              <p>{price2}</p>
              <img src={img3} alt="" />
              <p>{price3}</p>
            </div>
          </Card>
        ))
      }
    </div>
  )
}

function SearchPage({ search, category }: { search: string; category: string; }) {
  const filteredData = useMemo(() => SALE_ITEMS.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || (category !== 'All Category' && item.category === category)), [search, category])
  return (
    <div className="flex flex-wrap p-4 gap-4">
      {filteredData.map((item) => <ItemCard {...item} key={item.name} />)}
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Category');
  const [specialCategories, setSpecialCategories] = useState<string[]>([]);
  return (
    <div className={`${inter.className} bg-[#F4F4F5] w-screen h-screen pb-32 overflow-auto`}>
      <Header onChangeSearch={setSearch} search={search} category={category} onChangeCategory={setCategory} />
      {
        search.length !== 0 && <SearchPage search={search} category={category} />
      }
      {
        search.length === 0 && (
          <>
            <SalesCarousel />
            <Category />
            <FlashSale />
            <ForYou onSelect={setSpecialCategories} selectedCategories={specialCategories} />
            <BestSell />
          </>
        )
      }
    </div>
  )
}
