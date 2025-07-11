import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, } from "@/components/ui/carousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Bell, Check, ChevronDown, Circle, Copyright, Crown, Heart, LayoutGrid, Menu, Minus, Plus, Search, ShoppingBag, ShoppingCart, Smartphone, Star, Zap } from "lucide-react";
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
  soldItems: number;
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
      "totalItems": 45,
      "soldItems": 42,
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
      "soldItems": 17,
      "imageSrc": "https://picsum.photos/seed/denimjacket/500/350",
      "stars": "4.8",
      "category": "Watches",
      "specialCategory": "Keep Stylish"
    },
    {
      "name": "Black Slim Jeans",
      "price": "$69.90",
      "salePrice": "$49.90",
      "totalItems": 150,
      "soldItems": 56,
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
      "soldItems": 23,
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
      "soldItems": 30,
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
      "soldItems": 14,
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
      "soldItems": 40,
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
      "soldItems": 12,
      "imageSrc": "https://picsum.photos/seed/cardigan/500/350",
      "stars": "4.7",
      "category": "T-Shirt",
      "specialCategory": "Special Discount"
    }
  ]
const FOR_YOU_ITEMS: Vesture[] = [
  {
    "name": "Yellow Pants",
    "price": "$39.90",
    "salePrice": "$29.90",
    "totalItems": 120,
    "soldItems": 42,
    "imageSrc": "https://picsum.photos/seed/tshirt/500/350",
    "stars": "4.5",
    "category": "Cap",
    "specialCategory": "Coveted Product"
  },
  {
    "name": "Black Hoodie",
    "price": "$59.90",
    "salePrice": "$44.90",
    "totalItems": 80,
    "soldItems": 18,
    "imageSrc": "https://picsum.photos/seed/hoodie/500/350",
    "stars": "4.8",
    "category": "Hoodie",
    "specialCategory": "Best Seller"
  },
  {
    "name": "Robust Jacket",
    "price": "$99.90",
    "salePrice": "$79.90",
    "totalItems": 65,
    "soldItems": 23,
    "imageSrc": "https://picsum.photos/seed/denim/500/350",
    "stars": "4.7",
    "category": "Jacket",
    "specialCategory": "Special Discount"
  },
  {
    "name": "Graphic Tee",
    "price": "$45.00",
    "salePrice": "$35.00",
    "totalItems": 100,
    "soldItems": 56,
    "imageSrc": "https://picsum.photos/seed/graphictee/500/350",
    "stars": "4.3",
    "category": "T-Shirt",
    "specialCategory": "Official Store"
  },
  {
    "name": "Red Sneakers",
    "price": "$120.00",
    "salePrice": "$95.00",
    "totalItems": 90,
    "soldItems": 12,
    "imageSrc": "https://picsum.photos/seed/sneakers/500/350",
    "stars": "4.9",
    "category": "Shoes",
    "specialCategory": "Official Store"
  },
  {
    "name": "Cargo Pants",
    "price": "$75.90",
    "salePrice": "$59.90",
    "totalItems": 70,
    "soldItems": 31,
    "imageSrc": "https://picsum.photos/seed/cargopants/500/350",
    "stars": "4.4",
    "category": "Pants",
    "specialCategory": "Best Seller"
  },
  {
    "name": "Baseball Cap",
    "price": "$25.90",
    "salePrice": "$19.90",
    "totalItems": 200,
    "soldItems": 80,
    "imageSrc": "https://picsum.photos/seed/baseballcap/500/350",
    "stars": "4.6",
    "category": "Cap",
    "specialCategory": "Keep Stylish"
  },
  {
    "name": "Leather Belt",
    "price": "$39.00",
    "salePrice": "$27.00",
    "totalItems": 110,
    "soldItems": 43,
    "imageSrc": "https://picsum.photos/seed/belt/500/350",
    "stars": "4.2",
    "category": "Accessories",
    "specialCategory": "Best Seller"
  },
  {
    "name": "Slim Fit Jeans",
    "price": "$89.90",
    "salePrice": "$69.90",
    "totalItems": 75,
    "soldItems": 21,
    "imageSrc": "https://picsum.photos/seed/slimjeans/500/350",
    "stars": "4.5",
    "category": "Jeans",
    "specialCategory": "Keep Stylish"
  },
  {
    "name": "Nike Shirt",
    "price": "$65.00",
    "salePrice": "$48.00",
    "totalItems": 60,
    "soldItems": 19,
    "imageSrc": "https://picsum.photos/seed/flannel/500/350",
    "stars": "4.7",
    "category": "Shirt",
    "specialCategory": "Best Seller"
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
const MENU_BELIBELI = [
  'Mitra BeliBeli',
  'About BeliBeli',
  'BeliBeli Care',
  'Promo'
]
const MENU_ABOUT = [
  [
    'Beli Beli',
    'About BeliBeli',
    'Career',
    'Mitra Blog',
    'B2B Digital'
  ],
  [
    'Buy',
    'Bill & Top Up',
    'BeliBeli COD',
    'Mitra Blog',
    'Promo'
  ],
  [
    'Sell',
    'Seller Education Center',
    'Brand Index',
    'Register Official Store'
  ],
  [
    'Guide and Help',
    'BeliBeli Care',
    'Term and Condition',
    'Privacy',
    'Mitra'
  ]
]

function Header({ search, onChangeSearch, category, onChangeCategory, likeCarShop, handleChangeCart, onBuy }: { onBuy: (name: string, quantity: number) => void; search: string; onChangeSearch: React.Dispatch<React.SetStateAction<string>>; category: string; onChangeCategory: React.Dispatch<React.SetStateAction<string>>; likeCarShop: (Vesture & { quantity: number })[]; handleChangeCart: (name: string, quantity: number) => void; }) {
  const [open, setOpen] = useState(false);

  function onClickBuy() {
    setOpen(false);
    toast.success("Congratulations, the items were purchased!");
    likeCarShop.forEach(({ name }) => onBuy(name, 0));
  }

  return (
    <header className="w-full bg-white text-sm font-medium sticky top-0 z-10">
      <div className="text-gray-500 flex border-b border-gray-300 w-full px-2 md:px-4 xl:px-16 py-2 justify-between items-center">
        <div className="flex gap-2 items-end cursor-pointer">
          <Smartphone />
          <div onClick={() => toast.info("This feature is under development.")}>
            Download BeliBeli App
          </div>
        </div>
        <div className="hidden gap-4 lg:flex">
          {MENU_BELIBELI.map((name) => (
            <div key={name} className="hover:underline hover:text-black cursor-pointer"
              onClick={() => toast.info("This feature is under development.")}>
              {name}
            </div>
          ))}
          <div className="py-1">
            <Separator orientation="vertical" />
          </div>
          <div className="font-bold text-black cursor-pointer" onClick={() => toast.info("This feature is under development.")}>
            Sign up
          </div>
          <div className="py-1">
            <Separator orientation="vertical" />
          </div>
          <div className="font-bold text-black cursor-pointer" onClick={() => toast.info("This feature is under development.")}>
            Login
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='lg:hidden'>
            <Button variant="outline" className="border-none shadow-none"><Menu /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-5 bg-gray-800 border-none text-white font-medium px-0" align="start">
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">Mitra BeliBeli</a></DropdownMenuItem>
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">About BeliBeli</a></DropdownMenuItem>
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">BeliBeli Care</a></DropdownMenuItem>
            <DropdownMenuItem ><a href="#" className="px-2 hover:underline hover:text-black">Promo</a></DropdownMenuItem>
            <Separator className="bg-gray-400" />
            <DropdownMenuItem>
              <div className="px-2 font-bold" onClick={() => toast.info("This feature is under development.")}>
                Sign up
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="px-2 font-bold" onClick={() => toast.info("This feature is under development.")}>
                Login
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-2 grid grid-rows-2 grid-cols-2 lg:grid-cols-6 lg:grid-rows-1 text-gray-500 border-b border-gray-300 items-center justify-between xl:px-16 lg:gap-4">
        <div className="flex items-center gap-1">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            alt="logo"
            className="w-10 h-10 cursor-pointer lg:h-14 lg:w-14"
          />
          <p className="font-bold text-black text-lg">BeliBeli.com</p>
        </div>
        <div className="mb-3 lg:ml-4 lg:mb-0 col-span-2 lg:col-span-4 flex items-center place-self-center gap-1 rounded-md bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-ring w-[98%] lg:w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center whitespace-nowrap pl-2 lg:px-2 gap-2">
              {category}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white border-none">
              <DropdownMenuItem onSelect={() => onChangeCategory('All Category')}>All Category</DropdownMenuItem>
              {CATEGORIES.map(({ name }) => (
                <DropdownMenuItem key={name} onSelect={() => onChangeCategory(name)}>{name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="h-10 bg-gray-300 lg:mr-4" />
          <Search className="w-7 h-7 lg:w-5 lg:h-5 text-gray-400" strokeWidth={3} />
          <Input
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            className="p-0 border-none shadow-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-400 placeholder:text-sm"
            placeholder="Search product or brand here..."
          />
        </div>
        <div className="flex gap-6 row-start-1 lg:col-start-6 col-start-2 justify-self-end">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <ShoppingBag className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="bg-white text-black w-full md:w-2/3">
              <SheetHeader>
                <SheetTitle className="text-2xl">Your Cart</SheetTitle>
                <SheetDescription>
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col justify-between h-[90%]">
                <div>
                  {likeCarShop.map(({ imageSrc, name, price, quantity, soldItems, totalItems, salePrice }) =>
                    <article key={name} className="relative flex gap-2 items-center w-full mt-2 bg-white py-4 px-2 rounded-md border border-gray-200 justify-between">
                      <div className="flex gap-2 items-center">
                        <div className={`flex items-center justify-center h-10 shadow-none rounded-lg overflow-hidden`}>
                          <img src={imageSrc} alt="Vesture items" className="h-full w-full" />
                        </div>
                        <div>
                          <p className="font-bold text-black">{name}</p>
                          <p className="text-sm text-black">{salePrice ?? price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleChangeCart(name, quantity - 1)} className="p-1 bg-black rounded-md text-white">
                          <Minus className="w-4 h-4" />
                        </button>
                        <p>{quantity}</p>
                        <Button className="bg-black hover:bg-black w-fit h-fit p-1 rounded-md text-white" onClick={() => handleChangeCart(name, quantity + 1)} disabled={quantity + soldItems >= totalItems}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </article>
                  )}
                </div>
                <Button className="bg-black hover:bg-gray-800 text-white rounded-lg w-full h-10 flex justify-center items-center font-semibold text-lg" onClick={() => onClickBuy()} disabled={likeCarShop.length === 0}>
                  Buy
                </Button>
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

function Category({ onSelectCategory }: { onSelectCategory: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div className="bg-white text-black font-bold text-sm flex items-center py-6 md:py-10 justify-evenly overflow-auto gap-8 px-8">
      {CATEGORIES.map(({ name, imageSrc }) => (
        <div key={name} className="text-center cursor-pointer" onClick={() => onSelectCategory(name)}>
          <Avatar className="w-14 h-14 mb-1">
            <AvatarImage src={imageSrc} />
          </Avatar>
          <p>{name}</p>
        </div>
      ))}
      <div className="flex flex-col items-center cursor-pointer" onClick={() => onSelectCategory('All Category')}>
        <div className="rounded-full p-2 border border-gray-300 w-14 h-14 flex items-center justify-center mb-1">
          <LayoutGrid className="fill-gray-300 text-gray-300" />
        </div>
        <p className="whitespace-nowrap">All Category</p>
      </div>
    </div>
  )
}

function ItemCard({ className, hideSlider, addStar, onApply, isInCart, ...props }: Vesture & { quantity?: number; className?: string; hideSlider?: boolean; addStar?: boolean; onApply?: (likedItem: Vesture) => void; isInCart?: (name: string) => boolean; }) {
  const { name, price, salePrice, totalItems, soldItems, imageSrc, stars } = props;
  const [liked, setLiked] = useState(false);

  function handleLike() {
    setLiked(prevState => !prevState);
  }
  function handleAddToCart() {
    onApply?.(props);
  }

  return (
    <Card className={twMerge("relative overflow-hidden bg-white w-full border-none", className)}>
      <div className="absolute right-5 top-4 p-1 bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={() => handleLike()}>
        <Heart className={twMerge("text-gray-300 fill-gray-300 w-6 h-6 transition-all duration-200", liked && 'fill-red-500 text-red-500')} />
      </div>
      <div className="text-black h-full">
        <img src={imageSrc} alt="Vesture items" className="h-1/2 w-full" />
        <div className="h-1/2 p-4 flex flex-col justify-between">
          <div className="relative flex flex-col justify-evenly h-2/3">
            <p className="font-bold text-xl">{name}</p>
            <div className={twMerge("hidden items-center gap-1", addStar && 'flex')}>
              <Star className="text-amber-500 fill-amber-500 h-4 w-4" />
              <span className="text-sm font-bold">{stars}</span>
              <span className="text-sm font-bold text-gray-300">• {soldItems} sold</span>
            </div>
            <div className="flex flex-col items-start">
              <div className="font-bold text-lg">
                <span className="mr-2">{salePrice}</span>
                <span className="text-base text-red-300 line-through">{price}</span>
              </div>
              <Button
                className="relative bg-black text-white hover:bg-gray-800 my-2 w-full"
                onClick={handleAddToCart}
                disabled={!isInCart?.(props.name) && soldItems === totalItems}
              >
                <div className="flex gap-2 items-center relative w-full h-full justify-center">
                  {isInCart?.(props.name) ? `${props.quantity + (props.quantity && props.quantity > 1 ? ' items' : ' item')} added to cart` : 'Add to cart'}
                  {isInCart?.(props.name) ? <Check /> : <ShoppingCart />}
                </div>

              </Button>
            </div>
          </div>
          <div className={twMerge('h-1/3 flex flex-col justify-end', hideSlider && 'hidden')}>
            <Separator className="absolute left-0 bg-gray-300 mb-7" />
            <div className="mt-4 flex gap-2">
              <SliderPrimitive.Root
                className={twMerge(
                  "relative flex w-full touch-none select-none items-center",
                )}
                value={[((soldItems * 100) / totalItems)]}
                disabled
              >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-300">
                  <SliderPrimitive.Range className="absolute h-full bg-black" />
                </SliderPrimitive.Track>
              </SliderPrimitive.Root>
              <p className="text-sm whitespace-nowrap text-gray-400 font-medium">{soldItems}/{totalItems} Sale</p>
            </div>
          </div>
        </div>
      </div>
    </Card >
  )
}


const FUTURE_DATE = new Date('2026-10-10');

function FlashSale({ onApply, items, isInCart }: { onApply: (likedItem: Vesture) => void; items: (Vesture & { quantity?: number })[]; isInCart: (name: string) => boolean; }) {
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
    <div className="p-4 pt-6 md:p-14 md:pr-4">
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
      <Carousel opts={{ loop: true, align: 'start' }} >
        <CarouselContent>
          {items.map((vesture) => (
            <CarouselItem key={vesture.name} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 max-w-60 md:max-w-80">
              <ItemCard {...vesture} onApply={onApply} isInCart={isInCart} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

function ForYou({ selectedCategories, onSelect, onApply, items, isInCart }: { items: (Vesture & { quantity?: number })[]; selectedCategories: string[]; onSelect: React.Dispatch<React.SetStateAction<string[]>>, onApply: (likedItem: Vesture) => void; isInCart: (name: string) => boolean; }) {
  function handleClickCategory(category: string) {
    onSelect((prevState) => {
      if (prevState.includes(category)) return prevState.filter((item) => item !== category);
      return [...prevState, category]
    })
  }
  const filteredData = useMemo(() => items.filter(({ specialCategory }) => selectedCategories.length === 0 || selectedCategories.includes(specialCategory)), [selectedCategories, items])

  return (
    <div className="mt-6 pt-6 bg-white p-4 lg:p-14 w-full">
      <div className="lg:flex mb-12 w-full justify-between md:px-4 lg:px-10 items-center">
        <p className="text-black font-bold text-2xl mb-4 md:mb-10 lg:mb-0">Todays For You!</p>
        <div className="flex place-self-end gap-6 font-semibold flex-wrap justify-around lg:flex-nowrap">
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
      <Carousel opts={{ loop: true, align: 'start' }} className="md:hidden">
        <CarouselContent>
          {filteredData.map((vesture) => (
            <CarouselItem key={vesture.name} className="ml-2 mb-10 max-w-60 md:max-w-80">
              <ItemCard {...vesture} hideSlider addStar onApply={onApply} isInCart={isInCart} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex-wrap gap-5 justify-evenly hidden md:flex">
        {filteredData.map((item) => <ItemCard {...item} key={item.name} className="w-1/3 lg:w-1/5  max-w-80 cursor-pointer" hideSlider addStar onApply={onApply} isInCart={isInCart} />)}
      </div>
    </div>
  )
}

function BestSell() {
  return (
    <div className="bg-white p-4 md:p-14 lg:p-0 lg:pb-14">
      <div className="md:text-center mb-10">
        <p className="font-bold text-3xl text-black">Best Selling Store</p>
      </div>
      <div className="grid grid-rows-4 grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-3 w-fit place-self-center">
        <Card className={`bg-[#CCCED4] flex flex-col items-center px-6 pb-10 md:p-0 justify-end md:justify-center w-full md:w-80 lg:w-72 h-full overflow-hidden border border-[#CCCED4] row-span-2 col-span-2 md:col-span-1 bg-[url("https://picsum.photos/seed/clothing1/400/400")] md:bg-none place-self-end`} >
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
                      <img src={img} alt="" className="rounded-lg max-h-14 md:max-h-none" />
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
      <div className="relative">
        <div className="relative h-96 bg-no-repeat bg-cover brightness-50 bg-[url('https://picsum.photos/id/22/800/600')]" />
        <p className="text-white text-center w-full absolute top-[45%] text-2xl font-bold md:text-6xl">{`"Let's Shop Beyond Boundaries"`}</p>
      </div>
      <div className="flex items-center flex-col pt-4 lg:flex-row lg:p-10">
        <div className="lg:w-1/3">
          <div className="flex items-center text-white">
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="logo"
              className="w-6 h-6 cursor-pointer lg:h-14 lg:w-14"
            />
            <p className="font-bold text-xl">BeliBeli.com</p>
          </div>
          <p className="text-sm font-bold">{`"Let's Shop Beyond Boundaries"`}</p>
          <div className="flex text-[#777C80] justify-between w-full px-0 p-4 lg:mt-10 lg:justify-normal lg:gap-4 fill-[#777C80]">
            <div className="w-7 lg:w-5 cursor-pointer" onClick={() => { toast.info('Coming soon') }}>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>
            </div>
            <div className="w-7 lg:w-5 cursor-pointer" onClick={() => { toast.info('Coming soon') }}>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
            </div>
            <div className="w-7 lg:w-5 cursor-pointer" onClick={() => { toast.info('Coming soon') }}>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </div>
            <div className="w-7 lg:w-5 cursor-pointer" onClick={() => { toast.info('Coming soon') }}>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
            </div>
          </div>
        </div>
        <div className="flex text-sm flex-wrap items-start justify-between pb-4 w-2/3 gap-3 lg:gap-0 my-4 lg:my-0">
          {MENU_ABOUT.map((menu) => (
            <div key={menu.join()} className="flex flex-col w-[45%] md:w-1/3 lg:w-fit gap-1 lg:gap-3 lg:h-full">
              {menu.map((title, i) => (
                <p key={title} className={twMerge("hover:underline cursor-pointer", i === 0 && "text-[#777C80] text-base font-bold hover:no-underline cursor-default")}
                  onClick={() => i !== 0 ? toast.info("This feature is under development.") : null}>
                  {title}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-10 border-t border-gray-600 flex items-center justify-center gap-2 text-gray-400 text-sm lg:text-base">
        <Copyright /> 2001 - 2003, BeliBeli.com
      </div>
    </div>
  )
}

function SearchPage({ items, search, category, isInCart, onApply }: { items: Vesture[]; search: string; category: string; isInCart: (name: string) => boolean; onApply: (item: Vesture) => void }) {
  const filteredData = useMemo(() => items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && (category === 'All Category' || item.category === category)), [search, category, items])

  return (
    <div key={filteredData.length} className="flex flex-wrap pt-4 gap-1 gap-y-4 w-full h-[80%] justify-evenly">
      {filteredData.length === 0 ? (
        <div className="w-full h-full flex items-center text-center flex-col justify-center text-black gap-4 text-2xl">
          <Search className="w-16 h-16" />
          <p>Sorry, we didn&apos;t find any results matching this search</p>
        </div>
      ) : filteredData.map((item) => <ItemCard {...item} key={item.name} className="md:w-1/4 max-w-60 md:max-w-80" isInCart={isInCart} onApply={onApply} />)}
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Category');
  const [specialCategories, setSpecialCategories] = useState<string[]>([]);
  const [likeCarShop, setLikeCarShop] = useState<(Vesture & { quantity: number })[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<(Vesture & { quantity: number })[]>([]);

  const salesItems = useMemo(() => SALE_ITEMS.filter((item) =>
    (search === '' || item.name.toLowerCase().includes(search.toLowerCase())) &&
    (category === 'All Category' || item.category === category)
  ).map(item => {
    const foundItem = likeCarShop.find((like) => like.name === item.name);
    const purchasedItem = purchasedItems.find((like) => like.name === item.name);
    if (foundItem) {
      return { ...item, soldItems: item.soldItems + foundItem.quantity + (purchasedItem?.quantity ?? 0), quantity: foundItem.quantity }
    }
    return { ...item, soldItems: item.soldItems + (purchasedItem?.quantity ?? 0) };
  })
    , [search, category, likeCarShop, purchasedItems]);

  const forYouItems = useMemo(() => FOR_YOU_ITEMS.filter((item) =>
    (search === '' || item.name.toLowerCase().includes(search.toLowerCase())) &&
    (category === 'All Category' || item.category === category)
  ).map(item => {
    const foundItem = likeCarShop.find((like) => like.name === item.name);
    const purchasedItem = purchasedItems.find((like) => like.name === item.name);
    if (foundItem) {
      return { ...item, soldItems: item.soldItems + foundItem.quantity + (purchasedItem?.quantity ?? 0), quantity: foundItem.quantity }
    }
    return { ...item, soldItems: item.soldItems + (purchasedItem?.quantity ?? 0) };
  })
    , [search, category, purchasedItems, likeCarShop]);

  const allItems = useMemo(() => [...forYouItems, ...salesItems], [forYouItems, salesItems])

  function handleLikeCard(likedItem: Vesture) {
    const formattedItem = { ...likedItem, quantity: 1 }

    if (likeCarShop.some((item) => item.name === likedItem.name)) {
      setLikeCarShop((prevState) => prevState.filter((item) => item.name !== likedItem.name))
    } else {
      setLikeCarShop((prevState) => [...prevState, formattedItem])
    }
  }
  function handlePurchaseItems(name: string, quantity: number) {
    const purchasedItem = likeCarShop.find(item => item.name === name);
    setPurchasedItems((prevState) => {
      if (prevState.some(item => item.name === name)) {
        return prevState.map((item) => item.name === name ? { ...item, quantity: item.quantity + (purchasedItem?.quantity ?? 0) } : item)
      }
      return [...prevState, purchasedItem!];
    });
    handleChangeCart(name, quantity);
  }

  function handleChangeCart(name: string, quantity: number) {
    if (quantity > 0) {
      setLikeCarShop((prevState) => prevState.map((vesture) =>
        vesture.name !== name ? vesture : { ...vesture, quantity }
      ))
    } else {
      setLikeCarShop((prevState) => prevState.filter((item) => item.name !== name))
    }
  }

  function isInCart(name: string) {
    return likeCarShop.some((item) => item.name === name);
  }

  return (
    <div className={`${inter.className} bg-[#F4F4F5] w-screen h-screen overflow-auto`}>
      <Toaster richColors />
      <Header
        handleChangeCart={handleChangeCart}
        onBuy={handlePurchaseItems}
        onChangeSearch={setSearch}
        search={search}
        category={category}
        onChangeCategory={setCategory}
        likeCarShop={likeCarShop}
      />
      {
        search.length !== 0 && <SearchPage items={allItems} search={search} category={category} isInCart={isInCart} onApply={handleLikeCard} />
      }
      {
        search.length === 0 && (
          <>
            <SalesCarousel />
            <Category onSelectCategory={setCategory} />
            <FlashSale onApply={handleLikeCard} items={salesItems} isInCart={isInCart} />
            <ForYou
              isInCart={isInCart}
              items={forYouItems}
              onSelect={setSpecialCategories}
              selectedCategories={specialCategories}
              onApply={handleLikeCard}
            />
            <BestSell />
            <Contacts />
          </>
        )
      }
    </div>
  )
}
