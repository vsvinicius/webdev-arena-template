import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, } from "@/components/ui/carousel";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Bell, ChevronDown, Circle, ClipboardSignature, Copyright, Crown, Heart, LayoutGrid, Menu, Search, ShoppingBag, Smartphone, Star, Zap } from "lucide-react";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
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

type Shop = {
  mark: string;
  slogan: string;
  products: { img: string; price: number; }[]
}

const SALE_ITEMS: Vesture[] =
  [
    {
      "name": "White T-Shirt",
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
      "name": "Summer Dress",
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
    }
  ]

const DIFFERENT_SHOP: Shop[] = [
  {
    "mark": "Nike Sae Mall",
    "slogan": `"Just do it bro!"`,
    products: [
      {
        img: "https://picsum.photos/seed/bag/400/400",
        price: 650,
      },
      {
        img: "https://picsum.photos/seed/heels/400/400",
        price: 270,
      },
      {
        img: "https://picsum.photos/seed/hat/400/400",
        price: 99
      },
    ]
  },
  {
    "mark": "Barudak Disaster Mall",
    "slogan": `"Unleash Your Fashion"`,
    products: [
      {
        img: "https://picsum.photos/seed/coat/400/400",
        price: 324,
      },
      {
        img: "https://picsum.photos/seed/sneakers/400/400",
        price: 199,
      },
      {
        img: "https://picsum.photos/seed/tshirt/400/400",
        price: 120
      },
    ]
  },
  {
    "mark": "Galaxy Galleria Mall",
    "slogan": `"Be Extraordinary"`,
    products: [
      {
        img: "https://picsum.photos/seed/shirts/400/400",
        price: 179,
      },
      {
        img: "https://picsum.photos/seed/runningshoes/400/400",
        price: 199,
      },
      {
        img: "https://picsum.photos/seed/pants/400/400",
        price: 253
      },
    ]
  },
  {
    "mark": "Aurora Well Mall",
    "slogan": `"Chic, Bold, Confident"`,
    products: [
      {
        img: "https://picsum.photos/seed/bag2/400/400",
        price: 250,
      },
      {
        img: "https://picsum.photos/seed/shorts/400/400",
        price: 162,
      },
      {
        img: "https://picsum.photos/seed/jacket/400/400",
        price: 255
      },
    ]
  }
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

function Header({ search, onChangeSearch, category, onChangeCategory, likeCarShop }: { search: string; onChangeSearch: React.Dispatch<React.SetStateAction<string>>; category: string; onChangeCategory: React.Dispatch<React.SetStateAction<string>>; likeCarShop: Vesture[] }) {
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
      <div className="px-1 grid grid-rows-2 grid-cols-2 md:grid-cols-6 md:grid-rows-1 text-gray-500 border-b border-gray-300 items-center justify-between md:px-16 md:gap-4">
        <div className="flex items-center gap-1">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            alt="logo"
            className="w-10 h-10 cursor-pointer md:h-14 md:w-14"
          />
          <p className="font-bold text-black text-lg">BeliBeli.com</p>
        </div>
        <div className="mb-3 md:mb-0 col-span-2 md:col-span-4 flex items-center place-self-center gap-1 rounded-md bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-ring w-[98%] md:w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center whitespace-nowrap pl-2 md:px-2 gap-2">
              {category}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white">
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
        <div className="flex gap-6 row-start-1 md:col-start-6 col-start-2 justify-self-end">
          <Sheet>
            <SheetTrigger>
              <ShoppingBag className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="bg-gray-700 opacity-95">
              <SheetHeader>
                <SheetTitle className="mt-4 ml-28">Your Cart</SheetTitle>
                <SheetDescription>
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col justify-between h-[90%]">
                <div>
                  {likeCarShop.map(({ imageSrc, name, price }) =>
                    <article key={name} className="flex gap-2 items-center w-full mt-2 bg-white py-4 px-2 rounded-md border border-gray-200">
                      <div className={`flex items-center justify-center h-10 shadow-none rounded-lg overflow-hidden`}>
                        <img src={imageSrc} alt="Vesture items" className="h-full w-full" />
                      </div>
                      <div>
                        <p className="font-bold text-black">{name}</p>
                        <p className="text-sm text-black">{price}</p>
                      </div>
                    </article>
                  )}
                </div>
                <div className="bg-[#F87171] rounded-lg w-20 flex justify-center font-semibold ml-28">
                  <button className="text-lg">Buy</button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Bell className="cursor-pointer"
            onClick={() =>
              toast.info("This feature is under development.")
            }
          />
        </div>
      </div >
    </header >
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
              <div className={`md:w-[40%] pl-10 md:pl-20 h-80 flex flex-col gap-4 w-full bg-[url("https://picsum.photos/800/600")] md:bg-none`}>
                <p className="mt-10 text-lg md:text-2xl font-medium">#Big Fashion Sale</p>
                <p className="text-white md:text-black text-4xl md:text-5xl font-bold tracking-wide">Limited Time Offer!</p>
                <p className="text-white md:text-black text-4xl md:text-5xl font-bold tracking-wide">Up to <i>50%</i> OFF!</p>
                <p className="text-base md:text-xl font-medium">Redefine Your Everyday Style</p>
              </div>
              <img src="https://picsum.photos/800/600" alt="" className="w-[60%] h-96 hidden md:block" />
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

function ItemCard({ className, hideSlider, addStar, onApply, ...props }: Vesture & { className?: string; hideSlider?: boolean; addStar?: boolean; onApply?: (likedItem: Vesture) => void }) {
  const { name, price, salePrice, totalItems, remainingItems, imageSrc, stars } = props;
  const [liked, setLiked] = useState(false);
  function handleLike() {
    setLiked(prevState => !prevState)
    onApply?.(props)
  }
  return (
    <Card className={twMerge("relative overflow-hidden bg-white w-full h-96 border-none", className)}>
      <div className="absolute right-5 top-4 p-1 flex items-center justify-center" onClick={() => handleLike()}>
        <Heart className={twMerge("text-white fill-white w-6 h-6 transition-all duration-200", liked && 'fill-red-500 text-red-500')} />
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

function FlashSale({ onApply }: { onApply: (likedItem: Vesture) => void }) {
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
      <div className="flex items-center gap-4 pb-8 justify-between md:justify-normal">
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
              <ItemCard {...vesture} onApply={onApply} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

function ForYou({ selectedCategories, onSelect, onApply }: { selectedCategories: string[]; onSelect: React.Dispatch<React.SetStateAction<string[]>>, onApply: (likedItem: Vesture) => void }) {
  function handleClickCategory(category: string) {
    onSelect((prevState) => {
      if (prevState.includes(category)) return prevState.filter((item) => item !== category);
      return [...prevState, category]
    })
  }
  const filteredData = useMemo(() => SALE_ITEMS.filter(({ specialCategory }) => selectedCategories.length === 0 || selectedCategories.includes(specialCategory)), [selectedCategories])

  return (
    <div className="mt-6 pt-6 bg-white p-4 md:p-14 w-full">
      <div className="md:flex mb-8 w-full justify-between md:px-10">
        <p className="text-black font-bold text-2xl mb-4">Todays For You!</p>
        <div className="flex place-self-end gap-6 font-semibold flex-wrap justify-around md:flex-nowrap">
          {
            SPECIAL_CATEGORIES.map((category) => (
              <Button
                className={twMerge("hover:bg-black hover:text-white w-[40%] bg-white text-black", selectedCategories.includes(category) && 'bg-black text-white')}
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
          {filteredData.map((vesture: Vesture) => (
            <CarouselItem key={vesture.name} className="ml-2 mb-10">
              <ItemCard {...vesture} hideSlider addStar onApply={onApply} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex-wrap gap-5 justify-evenly hidden md:flex">
        {filteredData.map((item) => <ItemCard {...item} key={item.name} className="w-1/5 cursor-pointer" hideSlider addStar onApply={onApply} />)}
      </div>
    </div>
  )
}

function BestSell() {
  return (
    <div className="bg-white p-4 md:p-14 md:pt-0">
      <div className="md:text-center mb-10">
        <p className="font-bold text-3xl text-black">Best Selling Store</p>
      </div>
      <div className="grid grid-rows-4 grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 w-fit place-self-center">
        <Card className={`bg-[#CCCED4] flex flex-col items-center px-6 pb-10 md:p-0 justify-end md:justify-center w-full md:w-72 h-full overflow-hidden border border-[#CCCED4] row-span-2 col-span-2 md:col-span-1 bg-[url("https://picsum.photos/seed/clothing1/400/400")] md:bg-none place-self-end`} >
          <div className="h-3/4 hidden md:block">
            <img src="https://picsum.photos/seed/clothing1/400/400" alt="clothing-image" />
          </div>
          <div className="text-white md:text-[#595F68] flex flex-col items-center justify-evenly h-full w-full text-center">
            <p className="font-bold text-2xl">BeliBeli Mall</p>
            <p className="">Shop, Explore, Delight and Experience Mall Magic!</p>
          </div>
        </Card>
        {
          DIFFERENT_SHOP.map(({ mark, slogan, products }: Shop) => (
            <Card className="border border-zinc-400 rounded-lg bg-white w-full md:w-80 h-40 md:h-52 flex border-none p-2" key={mark}>
              <div>
                <div className="flex h-1/2">
                  <div className="relative w-1/2 md:w-fit">
                    <img
                      src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
                      alt="logo"
                      className="w-14 h-14 cursor-pointer md:h-14 md:w-14"
                    />
                    <div className="bg-[#3488D6] w-5 h-5 rounded-full p-1 absolute top-8 left-7 ring ring-white">
                      <Crown className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="md:mt-3">
                    <p className="text-black font-bold text-xs md:text-sm">{mark}</p>
                    <p className="text-gray-500 text-xs">{slogan}</p>
                  </div>
                </div>
                <div className="text-black font-bold flex text-xs h-1/2 gap-2 items-end">
                  {products.map(({ img, price }) => (
                    <div className="flex flex-col items-center gap-1" key={img + price}>
                      <img src={img} alt="" className="rounded-lg" />
                      <p>${price.toLocaleString('en-US', { currency: 'USD' })}</p>
                    </div>
                  ))}
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
    <div className="bg-[#1C242D] text-white">
      <div className="relative flex justify-center text-center">
        <img src="https://picsum.photos/800/600" alt="" className="brightness-50 w-full h-64" />
        <p className="text-white absolute top-24 text-2xl font-bold md:text-6xl">{`"Let's Shop Beyond Boundaries"`}</p>
      </div>
      <div className="flex items-center flex-col pt-4 md:flex-row md:p-10">
        <div className="md:w-1/3">
          <div className="flex items-center text-white">
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="logo"
              className="w-6 h-6 cursor-pointer md:h-14 md:w-14"
            />
            <p className="font-bold text-xl">BeliBeli.com</p>
          </div>
          <p className="text-sm font-bold">{`"Let's Shop Beyond Boundaries"`}</p>
          <div className="flex text-[#777C80] justify-between w-full px-0 p-4 md:mt-10 md:justify-normal md:gap-4 fill-[#777C80]">
            <a href="#" className="w-7 md:w-5">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>
            </a>
            <a href="#" className="w-7 md:w-5">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
            </a>
            <a href="#" className="w-7 md:w-5">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="#" className="w-7 md:w-5">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
            </a>
          </div>
        </div>
        <div className="flex text-sm flex-wrap items-start justify-between pb-4 w-2/3 gap-3 md:gap-0 my-4 md:my-0">
          <div className="flex flex-col w-[45%] md:w-fit gap-1 md:gap-3 md:h-full">
            <p className="text-[#777C80] font-bold">BeliBeli</p>
            <a href="#" className="hover:underline">About BeliBeli</a>
            <a href="#" className="hover:underline">Career</a>
            <a href="#" className="hover:underline">Mitra Blog</a>
            <a href="#" className="hover:underline">B2B Digital</a>
          </div>
          <div className="flex flex-col w-[45%] md:w-fit gap-1 md:gap-3 md:h-full">
            <p className="text-[#777C80] font-bold">Buy</p>
            <a href="#" className="hover:underline">Bill & Top Up</a>
            <a href="#" className="hover:underline">CarBeliBeli CODeer</a>
            <a href="#" className="hover:underline">Mitra Blog</a>
            <a href="#" className="hover:underline">Promo</a>
          </div>
          <div className="flex flex-col w-[45%] md:w-fit gap-1 md:gap-3 md:h-full">
            <p className="text-[#777C80] font-bold">Sell</p>
            <a href="#" className="hover:underline">Seller Education Center</a>
            <a href="#" className="hover:underline">Brand Index</a>
            <a href="#" className="hover:underline">Register Official Store</a>
          </div>
          <div className="flex flex-col w-[45%] md:w-fit gap-1 md:gap-3 md:h-full">
            <p className="text-[#777C80] font-bold">Guide and Help</p>
            <a href="#" className="hover:underline">BeliBeli Care</a>
            <a href="#" className="hover:underline">Term and Condition</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Mitra</a>
          </div>
        </div>
      </div>
      <div className="w-full h-10 border-t border-gray-600 flex items-center justify-center gap-2 text-gray-400 text-sm md:text-base">
        <Copyright /> 2001 - 2003, BeliBeli.com
      </div>
    </div>
  )
}

function SearchPage({ search, category }: { search: string; category: string; }) {
  const filteredData = useMemo(() => SALE_ITEMS.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || (category !== 'All Category' && item.category === category)), [search, category])
  return (
    <div className="flex flex-wrap p-4 gap-4">
      {filteredData.map((item) => <ItemCard {...item} key={item.name} className="md:w-fit" />)}
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Category');
  const [specialCategories, setSpecialCategories] = useState<string[]>([]);
  const [likeCarShop, setLikeCarShop] = useState<Vesture[]>([]);
  function handleLikeCard(likedItem: Vesture) {
    setLikeCarShop((prevState) => [...prevState, likedItem])
  }
  return (
    <div className={`${inter.className} bg-[#F4F4F5] w-screen h-screen overflow-auto`}>
      <Toaster richColors />
      <Header onChangeSearch={setSearch} search={search} category={category} onChangeCategory={setCategory} likeCarShop={likeCarShop} />
      {
        search.length !== 0 && <SearchPage search={search} category={category} />
      }
      {
        search.length === 0 && (
          <>
            <SalesCarousel />
            <Category />
            <FlashSale onApply={handleLikeCard} />
            <ForYou onSelect={setSpecialCategories} selectedCategories={specialCategories} onApply={handleLikeCard} />
            <BestSell />
            <Contacts />
          </>
        )
      }
    </div>
  )
}
