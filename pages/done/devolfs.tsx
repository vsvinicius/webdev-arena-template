import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, Drawer, DrawerDescription } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { ArrowDown, ArrowUp, ArrowUpRight, Copyright, MoveUpRight, Tally2, X } from 'lucide-react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
const inter = Inter({
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

const COMPANY_DECK = 'data:application/pdf;base64,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IAowMDAwMDAzMjQ0IDAwMDAwIG4gCjAwMDAwMDAwMjIgMDAwMDAgbiAKMDAwMDAwMDI1MiAwMDAwMCBuIAowMDAwMDAwMzc1IDAwMDAwIG4gCjAwMDAwMDMyMDggMDAwMDAgbiAKMDAwMDAwMDAwMCAwMDAwMCBuIAowMDAwMDAzMzc3IDAwMDAwIG4gCjAwMDAwMDA0NzIgMDAwMDAgbiAKMDAwMDAwMzE4NyAwMDAwMCBuIAowMDAwMDAzMzI3IDAwMDAwIG4gCjAwMDAwMDM5OTAgMDAwMDAgbiAKMDAwMDAwMzU4MyAwMDAwMCBuIAowMDAwMDAzOTcwIDAwMDAwIG4gCjAwMDAwMDQyMjggMDAwMDAgbiAKMDAwMDAxMjE2NSAwMDAwMCBuIAowMDAwMDEyMTg2IDAwMDAwIG4gCjAwMDAwMTIyMzEgMDAwMDAgbiAKMDAwMDAxMjI4NCAwMDAwMCBuIAowMDAwMDEyMzA3IDAwMDAwIG4gCjAwMDAwMTIzNDkgMDAwMDAgbiAKMDAwMDAxMjM2OCAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDI0IC9Sb290IDEyIDAgUiAvSW5mbyAxIDAgUiAvSUQgWyA8ODQyZTc1NzdhMThkOGM2YTA3NjRiMTQ1MDgwZDg2Mjk+Cjw4NDJlNzU3N2ExOGQ4YzZhMDc2NGIxNDUwODBkODYyOT4gXSA+PgpzdGFydHhyZWYKMTI1MzIKJSVFT0YK';

function SpinButton({ className, onClick, wider }: { className?: string; onClick?: () => void; wider?: boolean }) {
  return (
    <button onClick={onClick} className={twMerge('w-36 h-36 rounded-full bg-black text-white flex items-center justify-center', className, wider && 'w-40 h-40')}>
      <div className={twMerge('w-32 h-32 rounded-full relative flex items-center justify-center', wider && 'w-36 h-36')}>
        <MoveUpRight className='w-8 h-8' />
        <div className='absolute w-full h-full text-[13px] animate-spin uppercase' style={{ animationDuration: '20s' }}>
          {"Let's work together • Let's work together • ".split('').map((char, i) => (<span key={i} className="absolute left-1/2" style={{ transform: `rotate(${i * 8.3}deg)`, transformOrigin: `0 ${wider ? '70px' : '65px'}` }}>{char}</span>))}
        </div>
      </div>
    </button>
  )
}


function FirstHero({ onClick, onClickDown }: { onClick: () => void; onClickDown: () => void; }) {
  return (
    <main>
      <section className="h-[73vh] bg-contain bg-no-repeat relative z-0 md:bg-right md:bg-cover" style={{ backgroundImage: 'url(https://i.postimg.cc/Zqzjs2mY/abstract-web-design-concept-with-3d-triangle-perspective-style-gray-illustration.png)' }}>
        <button className='absolute top-[55%] left-8 rounded-full p-4 bg-[#DFFE51] text-black' onClick={onClickDown}><ArrowDown /></button>
        <SpinButton className='absolute top-[40%] left-[50%] md:left-[80%]' onClick={onClick} />
        <h1 className='text-[2.6rem] leading-10 tracking-[-2px] left-8 absolute bottom-3 font-semibold md:text-7xl md:w-3/4'>Innovative <span className='text-white'>digital solutions</span> for a brighter future</h1>
      </section>
      <div className='w-full p-4'>
        <Separator className='bg-[#BCC3CA]' />
      </div>
      <section className='flex w-full px-4 h-[10vh] text-sm md:text-base'>
        <div className='w-1/2'>
          <p className='uppercase font-black mb-2'>design-driven</p>
          <p className='uppercase '>agency</p>
        </div>
        <div className='w-1/2'>
          <p className='uppercase font-black mb-2'>say hi</p>
          <p className='uppercase'>hey@devolfs.com</p>
        </div>
      </section>
    </main>
  )
}

function SecondHero({ onClick, onClickUp }: { onClick: () => void; onClickUp: () => void; }) {
  return (
    <>
      <main className='bg-cover text-white h-full'>
        <div>
          <section className="h-[73vh] bg-contain relative z-0" >
            <button className='absolute top-[50%] left-8 rounded-full p-4 bg-[#DFFE51] text-black' onClick={onClickUp}><ArrowUp /></button>
            <SpinButton
              className='absolute top-[30%] left-[50%] md:left-[80%] font-black bg-transparent'
              onClick={onClick}
              wider
            />
            <div className='text-[2.6rem] leading-[2.8rem] tracking-[-2px] left-8 absolute bottom-8 font-semibold text-white md:text-6xl'>
              <p>Devolfs.</p>
              <p>Digital creative agency</p>
            </div>
          </section>
          <div className='w-full p-4'>
            <Separator className='bg-[#BCC3CA]' />
          </div>
          <section className='w-full px-4 h-[10vh] text-sm md:text-base'>
            <p className='uppercase font-black mb-2'>based in bih + serbia + croatia</p>
            <p className='uppercase  opacity-70'>working worldwide</p>
          </section>
        </div>
      </main>
    </>
  )
}

export default function App() {
  const firstHero = useRef<HTMLDivElement>(null);
  const secondHero = useRef<HTMLDivElement>(null);
  const [firstHeroVisible, setFirstHeroVisible] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!firstHero.current) return;
    const observer = new window.IntersectionObserver(([entry]) => {
      setFirstHeroVisible(entry.isIntersecting);
    }, { root: null, threshold: 0.2 });
    observer.observe(firstHero.current);
  }, [firstHero]);

  function onClickUp() {
    firstHero.current?.scrollIntoView({ behavior: 'smooth' });
  }
  function onClickDown() {
    secondHero.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={`${inter.className} transition-all duration-700 fade-in-0 fade-out-100 ${firstHeroVisible ? 'text-black bg-[#C9CFD6]' : 'text-white bg-[url(https://picsum.photos/id/1/2400)] bg-cover'}`}>
      <header className={`flex w-full justify-between p-4 h-[12vh] sticky top-0 z-10 ${firstHeroVisible ? 'bg-[#C9CFD6]' : 'bg-transparent'}`}>
        <div className='flex items-center'>
          <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="logo" className='w-10 h-10 md:h-14 md:w-14' />
          <p className='font-semibold tracking-tight text-xl md:text-2xl'>Devolfs.</p>
        </div>
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
          <DrawerTrigger onClick={() => setOpen(true)}><Tally2 className='rotate-90 md:w-10 md:h-10' /></DrawerTrigger>
          <DrawerContent className='bg-[#C9CFD6] h-full text-black [&>*:first-child]:invisible rounded-none'>
            <DrawerHeader className='relative'>
              <DrawerClose className='absolute top-[42%] left-[52%] rounded-full p-4 bg-[#DFFE51] text-black'>
                <ArrowUpRight />
              </DrawerClose>
              <DrawerClose className='absolute -top-2 right-3 text-black'>
                <X />
              </DrawerClose>
              <DrawerTitle className='text-black font-thin text-9xl tracking-wide whitespace-nowrap'>
                Let&apos;s talk
              </DrawerTitle>
              <DrawerDescription className='sr-only'>description</DrawerDescription>
            </DrawerHeader>
            <div className='px-4'>
              <Separator className='bg-[#BCC3CA]' />
            </div>
            <section className='p-4 flex font-semibold'>
              <div className='flex flex-col gap-4 w-1/2'>
                <Link className="hover:underline" href="#">Home</Link>
                <Link className="hover:underline" href="#">Cases</Link>
                <Link className="hover:underline" href="#">Services</Link>
                <Link className="hover:underline" href="#">Agency</Link>
                <Link className="hover:underline" href="#">Blog</Link>
              </div>
              <div className='flex flex-col gap-4 w-1/2'>
                <Link className="hover:underline" href="#">LinkedIn</Link>
                <Link className="hover:underline" href="#">Instagram</Link>
                <Link className="hover:underline" href="#">Dribble</Link>
                <Link className="hover:underline" href="#">Behance</Link>
                <Link className="hover:underline" href="#">Clutch</Link>
              </div>
            </section>
            <section className='p-4'>
              <p className='font-semibold text-gray-500'>Contact us</p>
              <p>hey@devolfs.com</p>
              <p className='font-semibold text-gray-500 pt-10'>You can find us</p>
              <p>Mostar, BiH + Niš, Serbia</p>
            </section>
            <DrawerFooter>
              <a href={COMPANY_DECK} download="company-deck.pdf" className='flex gap-2 items-center font-semibold'>Download Company Deck <ArrowDown className='w-4 h-4' /></a>
              <div className='flex text-sm justify-between text-gray-500'>

                <p className='flex gap-2 items-center'><Copyright className='w-4 h-4' />Devolfs 2023, All rights reserved.</p>
                <p>Privacy Policy</p>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </header>
      <div ref={firstHero} className={firstHeroVisible ? 'visible' : 'invisible'}>
        <FirstHero onClick={() => setOpen(true)} onClickDown={onClickDown} />
      </div>
      <div ref={secondHero}>
        <SecondHero onClick={() => setOpen(true)} onClickUp={onClickUp} />
      </div>
    </div>
  )
}
