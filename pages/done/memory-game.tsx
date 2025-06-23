import { Luckiest_Guy } from 'next/font/google';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { twMerge } from 'tailwind-merge';
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const font = Luckiest_Guy({
  weight: ['400'],
  subsets: ['latin']
})

type CardData = {
  id: number;
  content: string;
  isMatched: boolean;
  selected: boolean;
}

const initialCards: CardData[] = [
  { id: 1, content: "https://i.postimg.cc/zVXy77Fn/Screenshot-2025-06-19-at-23-35-45.png", isMatched: false, selected: false },
  { id: 2, content: "https://i.postimg.cc/zyyVZfMv/Screenshot-2025-06-19-at-23-35-53.png", isMatched: false, selected: false },
  { id: 3, content: "https://i.postimg.cc/gx1rYWFD/Screenshot-2025-06-19-at-23-36-01.png", isMatched: false, selected: false },
  { id: 4, content: "https://i.postimg.cc/2VcVKW0g/Screenshot-2025-06-19-at-23-37-45.png", isMatched: false, selected: false },
  { id: 5, content: "https://i.postimg.cc/zVXy77Fn/Screenshot-2025-06-19-at-23-35-45.png", isMatched: false, selected: false },
  { id: 6, content: "https://i.postimg.cc/zyyVZfMv/Screenshot-2025-06-19-at-23-35-53.png", isMatched: false, selected: false },
  { id: 7, content: "https://i.postimg.cc/gx1rYWFD/Screenshot-2025-06-19-at-23-36-01.png", isMatched: false, selected: false },
  { id: 8, content: "https://i.postimg.cc/2VcVKW0g/Screenshot-2025-06-19-at-23-37-45.png", isMatched: false, selected: false },
  { id: 9, content: "https://i.postimg.cc/bGbrrBqj/Screenshot-2025-06-19-at-23-38-02.png", isMatched: false, selected: false },
  { id: 10, content: "https://i.postimg.cc/CBg1qsKn/Screenshot-2025-06-19-at-23-38-27.png", isMatched: false, selected: false },
  { id: 11, content: "https://i.postimg.cc/VrWNB0SG/Screenshot-2025-06-19-at-23-38-36.png", isMatched: false, selected: false },
  { id: 12, content: "https://i.postimg.cc/FkFHPF39/Screenshot-2025-06-19-at-23-38-57.png", isMatched: false, selected: false },
  { id: 13, content: "https://i.postimg.cc/bGbrrBqj/Screenshot-2025-06-19-at-23-38-02.png", isMatched: false, selected: false },
  { id: 14, content: "https://i.postimg.cc/CBg1qsKn/Screenshot-2025-06-19-at-23-38-27.png", isMatched: false, selected: false },
  { id: 15, content: "https://i.postimg.cc/VrWNB0SG/Screenshot-2025-06-19-at-23-38-36.png", isMatched: false, selected: false },
  { id: 16, content: "https://i.postimg.cc/FkFHPF39/Screenshot-2025-06-19-at-23-38-57.png", isMatched: false, selected: false },
  { id: 17, content: "https://i.postimg.cc/MXzHZ54h/Screenshot-2025-06-19-at-23-39-12.png", isMatched: false, selected: false },
  { id: 18, content: "https://i.postimg.cc/MXzHZ54h/Screenshot-2025-06-19-at-23-39-12.png", isMatched: false, selected: false },
];

function Card({ selected, isMatched, content, onClick }: CardData & { onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ rotateY: 0 }}
      animate={{
        rotateY: selected || isMatched ? 180 : 0,
      }}
      transition={{ duration: 0.3 }}
      style={{
        transformStyle: "preserve-3d",
      }}>
      <div
        className={twMerge('cursor-pointer w-full h-full flex items-center justify-center border-gray-900 border-[2px] rounded-lg transition-all duration-300 hover:border-gray-300 hover:shadow-md hover:shadow-white bg-white',
          isMatched && 'border-green-600 border-4 hover:border-green-600 hover:shadow-none cursor-default'
        )}
        onClick={onClick}
      >
        {selected || isMatched ? <img src={content} className="object-contain w-16 h-16" style={{ transform: "rotateY(180deg)" }} alt="card" /> :
          <div className="w-full h-full bg-contain bg-no-repeat bg-center bg-[url('https://static.wikia.nocookie.net/mariofanon/images/d/d9/What.png')]" />
        }
      </div>
    </motion.div>
  );
}

function shuffleCards(cards: CardData[]): CardData[] {
  return [...cards].sort(() => Math.random() - 0.5);
};

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [game, setGame] = useState(initialCards);
  const [muted, setMuted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const points = useMemo(() => game.filter(({ isMatched }) => isMatched).length / 2, [game]);

  useEffect(() => {
    if (points === game.length / 2) {
      setHasFinished(true);
    }
  }, [points, game]);

  useEffect(() => {
    setGame((prevState) => shuffleCards(prevState));
  }, [])

  async function handleSelectCard(card: CardData) {
    if (audioRef.current) {
      audioRef.current.play();
    }
    const hasTwoSelected = game.filter(({ selected }) => selected);
    if (card.selected || card.isMatched || hasTwoSelected.length > 1) return;
    setGame((prevState) => prevState.map((prevCard) => ({ ...prevCard, selected: prevCard.selected || prevCard.id === card.id })))

    const selectedCard = game.find(({ selected }) => selected);
    if (selectedCard) {
      const isMatched = selectedCard.content === card.content;
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      setGame((prevState) => prevState.map((prevCard) => ({
        ...prevCard,
        selected: false,
        isMatched: prevCard.isMatched || (isMatched && (prevCard.id === card.id || prevCard.id === selectedCard.id))
      })))
      return;
    }
  }

  function handleMusicStateChange() {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(prevState => !prevState);
  }

  function restartGame() {
    setHasFinished(false);
    setGame(shuffleCards(initialCards));
  }

  return (
    <div className={`${font.className} text-gray-900 w-screen flex items-end md:items-center justify-center h-screen bg-cover bg-no-repeat bg-[url('https://i.pinimg.com/736x/a5/9a/b1/a59ab151111d074a2281cae5e0c43d14.jpg')]`}>
      <div className='absolute top-4 left-4 flex items-center gap-2 text-3xl'>
        <img src="https://i.postimg.cc/mgsmf7nG/pngkey-com-star-png-transparent-background-918451.png" alt="points" className='w-10 h-10 mb-4' />
        <span>x</span>
        <span>{game.filter(({ isMatched }) => isMatched).length / 2}</span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className='border-gray-900 absolute top-4 right-20 md:right-4 text-3xl rounded-full border-[6px] w-11 h-11 flex items-center justify-center pt-2 transition-all duration-300 hover:text-white hover:border-white'>
            <span>?</span>
          </button>
        </DialogTrigger>
        <DialogContent className={`${font.className} bg-gray-900 rounded-lg tracking-wider text-white`}>
          <DialogHeader>
            <DialogTitle className='text-3xl'>Game Rules</DialogTitle>
            <DialogDescription className='sr-only'>
              Collect all stars!
            </DialogDescription>
          </DialogHeader>
          <p>
            Flip two cards at a time to find matching pairs.
          </p>
          <p>
            If the two cards match, you keep the pair and get one star.
          </p>
          If they don&apos;t match, they&apos;ll flip back over and you can try again.
          <p>
            Keep going until you collect all stars!
          </p>
        </DialogContent>
      </Dialog>

      <button className='absolute top-4 right-4 md:bottom-4 md:top-auto rounded p-3 bg-black bg-opacity-50 text-white hover:bg-opacity-90 transition-all duration-300' onClick={() => handleMusicStateChange()}>{muted ? <VolumeX /> : <Volume2 />}</button>
      <h1 className='capitalize absolute top-20 text-2xl md:text-4xl md:top-24'>Find all the matching cards</h1>
      <main className='w-full h-[80%] md:w-[50%] md:h-[60%] m-2 mt-0 flex items-center from-[#FFB67A] bg-gradient-to-b to-[#BE6835] rounded-3xl outline-8 outline outline-[#944E0E]'>
        <section className='w-full h-[96%] bg-[#FA9744] rounded-3xl grid grid-cols-3 grid-rows-6 gap-2 p-3 md:grid-cols-6 md:grid-rows-3'>
          {game.map((card) => <Card key={card.id} {...card} onClick={() => handleSelectCard(card)} />)}
        </section>
      </main>
      <audio ref={audioRef} src="https://kappa.vgmsite.com/soundtracks/super-mario-bros/rdbqqnni/01.%20Ground%20Theme.mp3" loop />

      <Dialog open={hasFinished} onOpenChange={setHasFinished}>
        <DialogContent className={`${font.className} bg-gray-900 rounded-lg tracking-wider text-white`}>
          <DialogHeader>
            <DialogTitle className='text-3xl text-yellow-400'>congratulations!</DialogTitle>
            <DialogDescription className='sr-only'>
              you won
            </DialogDescription>
          </DialogHeader>
          <p>
            You collected all stars, Let&apos;s try again!
          </p>
          <Button onClick={restartGame} className='bg-white text-gray-900 hover:text-gray-900 hover:bg-opacity-80'>Restart game</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
