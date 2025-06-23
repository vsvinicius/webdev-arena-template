import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowRight, Menu } from 'lucide-react';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const inter = Inter({ subsets: ['latin'], variable: '--inter' })
const ibm = IBM_Plex_Mono({ weight: ["100", "200", "300", "400", "500", "600", "700"], subsets: ['latin'], variable: '--ibm' })
const fintech = 'https://framerusercontent.com/images/2mQHaw0ld3IZ8dISed0UxJ5AE.png';
const healthcare = 'data:image/jpeg;base64,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';
const four = 'data:image/jpeg;base64,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';

const FintechPage = () => {
  return (
    <main className='h-full mt-10 md:mt-32 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:pl-8 text-4xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>Powered by Technology</h1>
        <h1 className='pb-4 md:pb-2'>Committed to</h1>
        <h1 className='pb-4 md:pb-2'>Financial Empowerment</h1>
      </section>
      <p className='pt-8 pl-4 text-md opacity-60 font-semibold pb-5'>From code to capital—building the fintech solutions that move business forward.</p>
      <button className='mx-auto md:ml-8 mt-10 flex gap-2 relative px-16 md:px-20 py-4 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
        <div className="absolute top-0 left-0 w-14 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute top-5 -left-[12rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
        Launch Your Fintech
        <ArrowRight />
      </button>
    </main >
  )
}
const HealthPage = () => {
  return (
    <main className='h-full mt-10 md:mt-32 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:pl-8 text-4xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>Powered by Precision</h1>
        <h1 className='pb-4 md:pb-2'>Focused on</h1>
        <h1 className='pb-4 md:pb-2'>Patient Outcomes</h1>
      </section>
      <p className='pt-8 pl-4 pr-2 text-md opacity-60 font-semibold pb-5'>Supporting you through every stage of healthcare transformation to improve care and operational efficiency</p>
      <button className='mx-auto md:ml-8 mt-10 flex gap-2 relative px-16 md:px-20 py-4 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
        <div className="absolute top-0 left-0 w-14 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute top-5 -left-[12rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
        Transform Healthcare
        <ArrowRight />
      </button>
    </main >
  )
}
const WhyUsPage = () => {
  return (
    <main className='h-full mt-10 md:mt-32 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:pl-8 text-5xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>Driving Innovation</h1>
        <h1 className='pb-4 md:pb-2'>Where</h1>
        <h1 className='pb-4 md:pb-2'>It Matters Most</h1>
      </section>
      <p className='pt-4 md:pt-8 pl-4 text-md opacity-60 font-semibold pr-2 md:pb-5 md:w-1/2'>At the intersection of technology and impact, we specialize in building high-performance solutions for the industries that shape our lives: Fintech and Healthcare. We don’t just deliver software—we deliver transformation.</p>
      <p className='pt-4 md:pt-8 pl-4 text-md opacity-60 font-semibold pr-2 md:pb-5 md:w-1/2'>Whether it’s navigating regulatory complexity or optimizing mission-critical workflows, our team understands the unique challenges of your industry.</p>
    </main >
  )
}
const ServicesPage = () => {
  return (
    <main className='h-full mt-10 md:mt-32 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:pl-8 text-4xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>Fintech</h1>
        <h1 className='pb-4 md:pb-2'>And Healthcare</h1>
        <h1 className='pb-4 md:pb-2'>Solutions</h1>
      </section>
      <div className='md:flex bg-[#161D27]'>
        <p className='pt-8 pl-4 text-md opacity-60 font-semibold pb-5 md:w-1/2'>We offer a full spectrum of software development services, designed to solve industry-specific challenges and accelerate your business goals. Whether you&apos;re in Fintech or Healthcare, our cross-functional teams deliver solutions that combine domain expertise, technical excellence, and operational efficiency.</p>
        <div className='pl-4 pr-2 md:w-1/2 md:p-0'>
          <p className='font-bold'>Fintech Solutions</p>
          <p className='pt-2 text-md opacity-60 font-semibold pb-5'>We help financial organizations build fast, scalable, and compliant solutions that keep pace with market demands and regulatory changes.</p>
          <p className='font-bold'>Healthcare Solutions</p>
          <p className='pt-2 text-md opacity-60 font-semibold pb-5 pr-2'>We support healthcare organizations in delivering seamless patient care and improving operational workflows with secure, user-focused software.</p>
        </div>
      </div>
    </main >
  )
}
const CasesPage = () => {
  return (
    <main className='h-full mt-10 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:mb-14 md:pl-8 text-5xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>Our Success Stories</h1>
      </section>
      <Carousel opts={{ loop: true }}>
        <CarouselContent className='h-[80vh] md:h-[50vh]'>
          <CarouselItem className='md:basis-1/2'>
            <Card className='h-full p-8 m-4'>
              <p className='font-bold text-xl'>Seamless Payments Platform for a Global Fintech Startup</p>
              <p className='pt-2'><span className='font-bold pr-2'>Challenge:</span>Needed a scalable, secure payments system to handle high transaction volumes with real-time processing.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Solution:</span>Developed a cloud-native platform with API integrations and built-in compliance checks.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Outcome:</span> Increased transaction speed by 40%, reduced downtime, and accelerated time-to-market by 3 months.</p>
            </Card>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2'>
            <Card className='h-full p-8 m-4'>
              <p className='font-bold text-xl'>Automated KYC/AML Compliance for a Digital Bank</p>
              <p className='pt-2'><span className='font-bold pr-2'>Challenge:</span>Manual identity verification was slow and error-prone, delaying customer onboarding.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Solution:</span>Implemented AI-powered KYC/AML automation integrated with legacy systems.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Outcome:</span>Reduced onboarding time from days to minutes and improved compliance accuracy.</p>
            </Card>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2'>
            <Card className='h-full p-8 m-4'>
              <p className='font-bold text-xl'>Telemedicine Platform for Rural Healthcare Provider</p>
              <p className='pt-2'><span className='font-bold pr-2'>Challenge:</span>Limited access to healthcare services in remote areas.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Solution:</span>Built a HIPAA-compliant telemedicine app with video consultation, appointment scheduling, and patient records.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Outcome:</span>Expanded patient reach by 50% and improved patient satisfaction scores.</p>
            </Card>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2'>
            <Card className='h-full p-8 m-4'>
              <p className='font-bold text-xl'>EHR Integration for Large Hospital Network</p>
              <p className='pt-2'><span className='font-bold pr-2'>Challenge:</span>Fragmented patient data across multiple systems caused inefficiencies.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Solution:</span>Developed a unified EHR integration platform enabling seamless data exchange and workflow automation.</p>
              <p className='pt-2'><span className='font-bold pr-2'>Outcome:</span>Reduced administrative overhead by 30% and improved care coordination.</p>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </main >
  )
}
const CareersPage = () => {
  return (
    <main className='h-full mt-10 md:mt-20 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:pl-8 text-5xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>Join Us</h1>
        <h1 className='pb-4 md:pb-2'>Shaping the Future</h1>
      </section>
      <div className='m-8 flex flex-wrap gap-3 bg-[#161D27] overflow-auto h-[68vh] md:h-fit'>
        <Card className='p-4 md:w-[48%]'>
          <p className='font-bold text-xl'>Software Engineer - fintech</p>
          <p>Build scalable, secure financial platforms that power the future of money.</p>
          <button className='mt-4 flex relative px-14 py-3 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
            <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
            Apply now
          </button>
        </Card>
        <Card className='p-4 md:w-[48%]'>
          <p className='font-bold text-xl'>Healthcare Solutions Developer</p>
          <p>Develop patient-centric applications that improve care and operational efficiency.</p>
          <button className='mt-4 flex relative px-14 py-3 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
            <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
            Apply now
          </button>
        </Card>
        <Card className='p-4 md:w-[48%]'>
          <p className='font-bold text-xl'>Product Manager</p>
          <p>Lead cross-functional teams to deliver fintech or healthcare products that solve real problems.</p>
          <button className='mt-4 flex relative px-14 py-3 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
            <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
            Apply now
          </button>
        </Card>
        <Card className='p-4 md:w-[48%]'>
          <p className='font-bold text-xl'>UX/UI Designer</p>
          <p>Design intuitive interfaces that delight users in complex regulated environments.</p>
          <button className='mt-4 flex relative px-14 py-3 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
            <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
            Apply now
          </button>
        </Card>
      </div>
    </main >
  )
}
const LetsTalkPage = () => {
  return (
    <main className='h-full mt-10 md:mt-20 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:pl-8 text-5xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>{"Let's talk"}</h1>
      </section>
      <p className='text-xl opacity-60 font-semibold pr-20 pl-8 pt-10'>Fill in the form and we will contact you!</p>
      <form className='flex flex-col gap-3 w-full p-5'>
        <Input placeholder='Name' className='bg-black p-4 h-10' />
        <Input type='email' placeholder='Email' className='bg-black p-4 h-10' />
        <Input type='number' placeholder='Phone' className='bg-black p-4 h-10' />
        <button type="submit" className='relative px-14 py-3 w-full mx-auto mt-6 md:w-96 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
          <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
          Send
        </button>
      </form>
    </main >
  )
}
const MainPage = ({ onChangePage }: { onChangePage: (page: string) => void; }) => {
  return (
    <main className='h-full mt-10 md:mt-32 pt-0 pr-0 bg-[#161D27]'>
      <section className='pl-4 md:pl-8 text-5xl md:text-7xl font-semibold tracking-wider bg-gradient-to-r from-[#E1FF63] to-65% to-[#B8BDC0] inline-block text-transparent bg-clip-text'>
        <h1 className='pb-4 md:pb-2'>Powered by Quality</h1>
        <h1 className='pb-4 md:pb-2'>Committed to</h1>
        <h1 className='pb-4 md:pb-2'>Efficiency</h1>
      </section>
      <div className='md:hidden flex flex-col bg-[#161D27]'>
        <p className='pl-4 text-md opacity-60 font-semibold pr-20 pb-5'>Guiding you through the software development lifecycle to achieve ambitious business goals.</p>
        <div className='group h-full bg-gradient-to-r transition-all from-[#161D27] to-[#8A42C5] flex hover:font-bold hover:brightness-125 cursor-pointer items-center justify-between pr-4'>
          <div className="h-24 w-24 relative duration-1000 transition-all top-2 left-0 group-hover:left-14" style={{ backgroundImage: `url(${fintech})`, backgroundSize: 'contain' }} />
          <button className='flex gap-2' onClick={() => onChangePage('fintech')}> Fintech <ArrowRight /></button>
        </div>
        <div className='group h-24 bg-gradient-to-r transition-all from-[#161D27] to-[#1DCE9E] flex hover:font-bold hover:brightness-125 cursor-pointer items-center justify-between pr-4'>
          <div className="h-16 w-16 relative duration-1000 transition-all top-2 left-7 group-hover:left-24" style={{ backgroundImage: `url(${healthcare})`, backgroundSize: 'contain' }} />
          <button className='flex gap-2' onClick={() => onChangePage('health')}> Healthcare <ArrowRight /></button>
        </div>
        <button onClick={() => onChangePage('talk')} className='my-4 w-fit mx-auto flex relative px-14 py-3 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
          <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
          <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
          let&apos;s talk
        </button>
      </div>
      <div className='md:flex w-full h-full hidden'>
        <section className='pt-20 w-1/2' style={{ background: 'conic-gradient(from 180deg at 100% 0%, rgba(225, 255, 99, 0.6) 0deg, #161D27 60deg)' }}>
          <p className='text-xl opacity-60 font-semibold pr-20 pl-8'>Guiding you through the software development lifecycle to achieve ambitious business goals.</p>
          <button onClick={() => onChangePage('talk')} className='ml-8 mt-20 flex gap-2 relative px-20 py-4 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
            <div className="absolute top-0 left-0 w-14 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute top-5 -left-[9rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
            let&apos;s talk
            <ArrowRight />
          </button>
        </section>

        <section className='w-1/2 flex justify-end items-end' style={{ background: 'conic-gradient(from 180deg at 0% 0%, rgba(225, 255, 99, 1) 300deg, rgba(225, 255, 99, 0.6) 360deg)' }}>
          <div className='w-1/3 h-full bg-[#E1FF63] -z-10' />
          <div className='group z-10 h-[120%] w-1/3 bg-gradient-to-b transition-all from-[#161D27] to-[#8A42C5] flex flex-col hover:font-bold hover:brightness-125 cursor-pointer'>
            <div className="h-32 w-32 ml-8 relative duration-1000 transition-all top-0 group-hover:top-32" style={{ backgroundImage: `url(${fintech})`, backgroundSize: 'contain' }} />
            <button className='mt-56 flex gap-2 mx-auto' onClick={() => onChangePage('fintech')}> Fintech <ArrowRight /></button>
          </div>
          <div className='group z-10 h-[120%] w-1/3 bg-gradient-to-b from-[#161D27] to-[#1DCE9E]  flex flex-col hover:font-bold hover:brightness-125 cursor-pointer'>
            <div className="h-32 w-32 ml-8 relative duration-1000 transition-all top-0 group-hover:top-32" style={{ backgroundImage: `url(${healthcare})`, backgroundSize: 'contain' }} />
            <button className='mt-56 flex gap-2 mx-auto' onClick={() => onChangePage('health')}> Healthcare <ArrowRight /></button>
          </div>
        </section>
      </div>
    </main >
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('main');
  return (
    <div className={`${inter.className} ${ibm.className} w-screen h-screen md:overflow-hidden bg-[#161D27] text-white`}>
      <header className="flex w-full items-center justify-between p-4 md:p-8 ">
        <div className={`${inter.className} font-bold tracking-wide flex items-center cursor-pointer`} onClick={() => setCurrentPage('main')}>
          <div className='h-10 w-14 bg-no-repeat' style={{ backgroundImage: `url(${four})`, backgroundSize: 'contain' }} />
          <p>auxility</p>
        </div>
        <div className='gap-2 font-semibold hidden md:flex'>
          <button className={`transition-all rounded-full border border-[#BED872] py-1 px-2 hover:bg-[#BED872] hover:text-[#161D27] ${currentPage === 'fintech' ? 'bg-[#BED872] text-[#161D27]' : ''}`} onClick={() => setCurrentPage('fintech')}>fintech</button>
          <button className={`transition-all rounded-full border border-[#BED872] py-1 px-2 hover:bg-[#BED872] hover:text-[#161D27] ${currentPage === 'health' ? 'bg-[#BED872] text-[#161D27]' : ''}`} onClick={() => setCurrentPage('health')}>health</button>
        </div>
        <div className='gap-2 ml-10 hidden md:flex'>
          <p onClick={() => setCurrentPage('whyUs')} className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'whyUs' ? 'font-extrabold underline' : ''}`}>
            why auxility
          </p>
          <p onClick={() => setCurrentPage('services')} className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'services' ? 'font-extrabold underline' : ''}`}>
            services
          </p>
          <p onClick={() => setCurrentPage('cases')} className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'cases' ? 'font-extrabold underline' : ''}`}>
            cases
          </p>
          <p onClick={() => setCurrentPage('careers')} className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'careers' ? 'font-extrabold underline' : ''}`}>
            careers
          </p>
        </div>
        <button onClick={() => setCurrentPage('talk')} className='hidden md:flex relative px-14 py-3 bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
          <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
          <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
          let&apos;s talk
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='md:hidden'>
            <Button variant="outline"><Menu /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-5 bg-[#161D27]" align="start">
            <DropdownMenuItem onClick={() => setCurrentPage('whyUs')}>
              <p className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'whyUs' ? 'font-extrabold underline' : ''}`}>
                why auxility
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentPage('services')}>
              <p className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'services' ? 'font-extrabold underline' : ''}`}>
                services
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentPage('cases')}>
              <p className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'cases' ? 'font-extrabold underline' : ''}`}>
                cases
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentPage('careers')}>
              <p className={`hover:font-extrabold hover:underline cursor-pointer font-semibold before:content-['<'] after:content-['>'] text-[#BED872] before:text-white after:text-white ${currentPage === 'careers' ? 'font-extrabold underline' : ''}`}>
                careers
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => setCurrentPage('talk')} className='relative px-14 py-3 w-full bg-[#E1FF63] text-[#161D27] font-bold rounded-sm overflow-hidden transition-all hover:outline hover:outline-[#BED872]'>
                <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-bl from-black/30 to-transparent" style={{ 'clipPath': 'polygon(0 0, 100% 0, 0 100%)' }} />
                <div className="absolute top-5 -left-[6.5rem] w-full h-full rotate-45 bg-[#E1FF63] backdrop-blur-sm" style={{ boxShadow: '0px 0px 28px 10px #E1FF63' }} />
                let&apos;s talk
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {currentPage === 'main' && <MainPage onChangePage={(page: string) => setCurrentPage(page)} />}
      {currentPage === 'fintech' && <FintechPage />}
      {currentPage === 'health' && <HealthPage />}

      {currentPage === 'whyUs' && <WhyUsPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'cases' && <CasesPage />}
      {currentPage === 'careers' && <CareersPage />}
      {currentPage === 'talk' && <LetsTalkPage />}
    </div >
  )
}
