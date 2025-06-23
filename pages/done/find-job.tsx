import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Toggle } from "@/components/ui/toggle";
import { ArrowLeft, ArrowRight, ChevronRight, Circle, CircleDollarSign, ClipboardList, Clock, Ellipsis, Grid, House, LayoutGrid, Locate, Mail, MapPin, Search, Settings, SlidersHorizontal, SquareMousePointer, SquareUser, StickyNote, ThumbsUp, User, UserRoundSearch } from "lucide-react";
import { useMemo, useState } from "react";

interface JobCardProps {
  role: string;
  logoSrc: string;
  companyName: string;
  location: string;
  time: string;
  salaryRange: string;
  applicants?: number;
  type?: string;
  category?: string;
}
interface UserData {
  avatar: string;
  name: string;
  email: string;
  description: string;
  location: string;
  updatedAt: Date;
  role: string;
}
interface Message {
  company: JobCardProps;
  title: string;
  sentAt: Date;
}

const mockedUser: UserData = {
  avatar: 'https://github.com/shadcn.png',
  name: 'Nabhan LD',
  email: 'email@email.com',
  description: 'Some cool description about him',
  location: 'Jakarta, Indonesia',
  updatedAt: new Date(),
  role: 'UIUX Desgin'
}



const mockedData: JobCardProps[] =
  [
    {
      "role": "Frontend Developer",
      "logoSrc": "https://picsum.photos/50",
      "companyName": "TechCorp",
      "location": "San Francisco, CA",
      "time": "Full-time",
      "salaryRange": "$90,000 - $120,000",
      "applicants": 24,
      "type": "Permanent",
      "category": "Engineering"
    },
    {
      "role": "Backend Engineer",
      "logoSrc": "https://picsum.photos/55",
      "companyName": "DevSolutions",
      "location": "Remote",
      "time": "Part-time",
      "salaryRange": "$100,000 - $130,000",
      "applicants": 10,
      "type": "Contractor",
      "category": "Engineering"
    },
    {
      "role": "Data Scientist",
      "logoSrc": "https://picsum.photos/60",
      "companyName": "DataSight AI",
      "location": "New York, NY",
      "time": "Full-time",
      "salaryRange": "$110,000 - $145,000",
      "applicants": 35,
      "type": "Permanent",
      "category": "Data Science"
    },
    {
      "role": "Product Manager",
      "logoSrc": "https://picsum.photos/65",
      "companyName": "Launchpad",
      "location": "Austin, TX",
      "time": "Full-time",
      "salaryRange": "$105,000 - $135,000",
      "applicants": 18,
      "type": "Contractor",
      "category": "Product Management"
    },
    {
      "role": "UX Designer",
      "logoSrc": "https://picsum.photos/70",
      "companyName": "DesignHub",
      "location": "Seattle, WA",
      "time": "Part-time",
      "salaryRange": "$85,000 - $110,000",
      "applicants": 12,
      "type": "Freelance",
      "category": "Design"
    },
    {
      "role": "DevOps Engineer",
      "logoSrc": "https://picsum.photos/75",
      "companyName": "Cloudify",
      "location": "Denver, CO",
      "time": "Full-time",
      "salaryRange": "$95,000 - $125,000",
      "applicants": 27,
      "type": "Permanent",
      "category": "Infrastructure"
    },
    {
      "role": "Mobile App Developer",
      "logoSrc": "https://picsum.photos/80",
      "companyName": "Mobix Labs",
      "location": "Chicago, IL",
      "time": "Full-time",
      "salaryRange": "$92,000 - $118,000",
      "type": "Internship",
      "category": "Engineering"
    },
    {
      "role": "AI Researcher",
      "logoSrc": "https://picsum.photos/85",
      "companyName": "Neuraware",
      "location": "Boston, MA",
      "time": "Full-time",
      "salaryRange": "$120,000 - $160,000",
      "applicants": 5,
      "type": "Research",
      "category": "Artificial Intelligence"
    },
    {
      "role": "QA Engineer",
      "logoSrc": "https://picsum.photos/90",
      "companyName": "Testify",
      "location": "Phoenix, AZ",
      "time": "Full-time",
      "salaryRange": "$75,000 - $100,000",
      "applicants": 20,
      "type": "Permanent",
      "category": "Quality Assurance"
    },
    {
      "role": "Cloud Architect",
      "logoSrc": "https://picsum.photos/95",
      "companyName": "SkyStack",
      "location": "Remote",
      "time": "Full-time",
      "salaryRange": "$130,000 - $170,000",
      "type": "Permanent",
      "category": "Infrastructure"
    },
    {
      "role": "Technical Writer",
      "logoSrc": "https://picsum.photos/100",
      "companyName": "DocByte",
      "location": "Portland, OR",
      "time": "Part-time",
      "salaryRange": "$50,000 - $75,000",
      "type": "Contractor",
      "category": "Documentation"
    },
    {
      "role": "Security Analyst",
      "logoSrc": "https://picsum.photos/105",
      "companyName": "SecurePath",
      "location": "San Diego, CA",
      "time": "Full-time",
      "salaryRange": "$100,000 - $140,000",
      "applicants": 7,
      "type": "Permanent",
      "category": "Security"
    },
    {
      "role": "Business Analyst",
      "logoSrc": "https://picsum.photos/110",
      "companyName": "AnalyTech",
      "location": "Atlanta, GA",
      "time": "Full-time",
      "salaryRange": "$80,000 - $105,000",
      "type": "Permanent",
      "category": "Business"
    },
    {
      "role": "Site Reliability Engineer",
      "logoSrc": "https://picsum.photos/115",
      "companyName": "ReliBox",
      "location": "Remote",
      "time": "Full-time",
      "salaryRange": "$110,000 - $150,000",
      "category": "Infrastructure",
      "type": "Permanent"
    },
    {
      "role": "Graphic Designer",
      "logoSrc": "https://picsum.photos/120",
      "companyName": "Pixology",
      "location": "Miami, FL",
      "time": "Part-time",
      "salaryRange": "$60,000 - $80,000",
      "type": "Freelance",
      "category": "Design"
    },
    {
      "role": "IT Support Specialist",
      "logoSrc": "https://picsum.photos/125",
      "companyName": "TechMate",
      "location": "Dallas, TX",
      "time": "Full-time",
      "salaryRange": "$55,000 - $70,000",
      "type": "Permanent",
      "category": "IT Support"
    },
    {
      "role": "Machine Learning Engineer",
      "logoSrc": "https://picsum.photos/130",
      "companyName": "MindMesh",
      "location": "Remote",
      "time": "Full-time",
      "salaryRange": "$125,000 - $160,000",
      "type": "Permanent",
      "category": "Artificial Intelligence"
    },
    {
      "role": "Scrum Master",
      "logoSrc": "https://picsum.photos/135",
      "companyName": "AgileHub",
      "location": "Philadelphia, PA",
      "time": "Full-time",
      "salaryRange": "$90,000 - $115,000",
      "type": "Contractor",
      "category": "Project Management"
    },
    {
      "role": "Data Engineer",
      "logoSrc": "https://picsum.photos/140",
      "companyName": "DataPump",
      "location": "Salt Lake City, UT",
      "time": "Full-time",
      "salaryRange": "$105,000 - $140,000",
      "type": "Permanent",
      "category": "Data Engineering"
    },
    {
      "role": "Blockchain Developer",
      "logoSrc": "https://picsum.photos/145",
      "companyName": "CryptoWorks",
      "location": "Remote",
      "time": "Full-time",
      "salaryRange": "$130,000 - $180,000",
      "type": "Contractor",
      "category": "Blockchain"
    },
    {
      "role": "AR/VR Developer",
      "logoSrc": "https://picsum.photos/150",
      "companyName": "VirtualForge",
      "location": "Los Angeles, CA",
      "time": "Full-time",
      "salaryRange": "$115,000 - $150,000",
      "type": "Permanent",
      "category": "Mixed Reality"
    },
    {
      "role": "Marketing Analyst",
      "logoSrc": "https://picsum.photos/155",
      "companyName": "MetricWave",
      "location": "New Orleans, LA",
      "time": "Part-time",
      "salaryRange": "$65,000 - $85,000",
      "type": "Internship",
      "category": "Marketing"
    },
    {
      "role": "Solutions Architect",
      "logoSrc": "https://picsum.photos/160",
      "companyName": "Archify",
      "location": "Houston, TX",
      "time": "Full-time",
      "salaryRange": "$135,000 - $170,000",
      "type": "Permanent",
      "category": "Architecture"
    },
    {
      "role": "Support Engineer",
      "logoSrc": "https://picsum.photos/165",
      "companyName": "SupportGrid",
      "location": "Remote",
      "time": "Full-time",
      "salaryRange": "$70,000 - $95,000",
      "type": "Permanent",
      "category": "Customer Success"
    },
    {
      "role": "Full Stack Developer",
      "logoSrc": "https://picsum.photos/170",
      "companyName": "CodeTide",
      "location": "Detroit, MI",
      "time": "Full-time",
      "salaryRange": "$105,000 - $140,000",
      "type": "Permanent",
      "category": "Engineering"
    },
    {
      "role": "Content Strategist",
      "logoSrc": "https://picsum.photos/175",
      "companyName": "WordLine",
      "location": "Nashville, TN",
      "time": "Part-time",
      "salaryRange": "$60,000 - $85,000",
      "type": "Freelance",
      "category": "Content"
    },
    {
      "role": "Game Developer",
      "logoSrc": "https://picsum.photos/180",
      "companyName": "PlayGrid",
      "location": "Orlando, FL",
      "time": "Full-time",
      "salaryRange": "$95,000 - $130,000",
      "type": "Permanent",
      "category": "Game Development"
    },
    {
      "role": "Network Engineer",
      "logoSrc": "https://picsum.photos/185",
      "companyName": "NetLayer",
      "location": "Cincinnati, OH",
      "time": "Full-time",
      "salaryRange": "$85,000 - $115,000",
      "type": "Contractor",
      "category": "Networking"
    },
    {
      "role": "Research Intern",
      "logoSrc": "https://picsum.photos/190",
      "companyName": "InsightLabs",
      "location": "Palo Alto, CA",
      "time": "Part-time",
      "salaryRange": "$30,000 - $40,000",
      "type": "Internship",
      "category": "Research"
    },
    {
      "role": "Data Analyst",
      "logoSrc": "https://picsum.photos/195",
      "companyName": "Quantio",
      "location": "Minneapolis, MN",
      "time": "Full-time",
      "salaryRange": "$80,000 - $105,000",
      "type": "Permanent",
      "category": "Analytics"
    }
  ];

const mockedMessages: Message[] = [
  {
    company: mockedData[10],
    sentAt: new Date(),
    title: 'Job offer for you!'
  },
  {
    company: mockedData[20],
    sentAt: new Date(),
    title: 'Follow-Up on Job Application'
  },
  {
    company: mockedData[16],
    sentAt: new Date(),
    title: 'Interview Availability'
  },
  {
    company: mockedData[3],
    sentAt: new Date(),
    title: 'Job Offer Acceptance'
  }
]

const CATEGORIES = Array.from(new Set(mockedData.map(({ category }) => category)));

const JobCard = ({ onApply, ...props }: JobCardProps & { onApply?: (role: JobCardProps) => void }) => {
  const { type, companyName, location, logoSrc, role, salaryRange, time, } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  return (
    <Card className="bg-white border-[#e6e6e6] shadow-sm text-black my-2 md:h-80 md:w-96">
      <CardHeader className="flex-row justify-between items-center md:pb-3">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={logoSrc} />
          </Avatar>
          <h3 className="md:font-bold">{companyName}</h3>
        </div>
        <Button key={isLiked.toString()} className={`rounded-full w-10 h-10 shadow-none border border-gray-200 ${isLiked ? 'bg-[#2258DC]' : 'bg-white'}`} onClick={() => setIsLiked((prevState) => !prevState)}><ThumbsUp color={isLiked ? "#fff" : "#2258DC"} /></Button>
      </CardHeader>
      <CardContent>
        <h1 className="text-4xl font-semibold tracking-tight md:text-2xl">{role}</h1>
        <Separator className="my-4 bg-gray-300 md:hidden" />
        <div className="flex flex-wrap gap-y-2 md:pt-4">
          <div className="flex w-1/2 items-center gap-2">
            <MapPin className="text-gray-500" />
            <p>{location}</p>
          </div>
          <div className="flex w-1/2 items-center gap-2">
            <Clock className="text-gray-500" />
            <p>{time}</p>
          </div>
          <div className="flex w-1/2 items-center gap-2">
            <StickyNote className="text-gray-500" />
            <p>{type}</p>
          </div>
          <div className="flex w-1/2 items-center gap-2">
            <CircleDollarSign className="text-gray-500" />
            <p>{salaryRange}/mo</p>
          </div>
        </div>
        {onApply && <Button key={isApplied.toString()} className="mt-4 w-full rounded-full bg-black text-white font-bold py-7 text-lg md:rounded-lg hover:bg-black hover:text-white" disabled={isApplied} onClick={() => { setIsApplied((prevState) => !prevState); onApply(props) }}>{isApplied ? 'Applied' : 'Apply now'}</Button>}
      </CardContent>
    </Card >
  )
}

const SearchJobCard = ({ companyName, logoSrc, location, role, salaryRange, time, applicants }: JobCardProps) => {
  return (
    <Card className="bg-white border-[#e6e6e6] shadow-sm text-black my-2 md:w-full md:max-w-[80vw] md:h-36">
      <CardHeader className="flex-row justify-between items-center md:pb-0 md:pt-4">
        <div className="flex items-center gap-2">
          <Avatar className="md:relative md:top-6">
            <AvatarImage src={logoSrc} />
          </Avatar>
          <div>
            <h3 className="font-bold">{role}</h3>
            <p>{companyName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="md:ml-12">
        <div className="flex justify-between items-end md:justify-normal">
          <div className="md:flex md:items-center md:gap-2">
            <p className="text-xl text-gray-500 md:text-base">Salary</p>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-base">
                {salaryRange}
                <span className="text-xl font-normal text-gray-500 tracking-wide md:text-base md:text-black md:font-bold">
                  /Month
                </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-end md:flex-row md:gap-2 md:pl-2">
            <p className="text-xl text-gray-500 text-right md:text-base">Applicant</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="rounded-full bg-[#F57B23] w-6 h-6 flex justify-center items-center md:hidden">
                <UserRoundSearch className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-base md:text-[#F57B23] md:bg-[#FFEDD5] md:px-2 md:rounded-sm">
                {applicants}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-between md:pt-1">
          <div className="w-[75%]">
            <Separator className="my-4 bg-gray-300 w-full md:hidden" />
            <div className="flex gap-2 flex-wrap">
              <div className="w-fit bg-white flex py-1 px-2 rounded-full gap-2 items-center border-gray-300 border">
                <p className="text-sm">{location}</p>
              </div>
              <div className="w-fit bg-white flex py-1 px-2 rounded-full gap-2 items-center border-gray-300 border">
                <p className="text-sm">{time}</p>
              </div>
              <div className="w-fit bg-white flex py-1 px-2 rounded-full gap-2 items-center border-gray-300 border">
                <p className="text-sm">{role}</p>
              </div>
            </div>
          </div>
          <Button className="mt-4 w-14 h-14 rounded-full bg-black text-white md:relative md:bottom-16" ><ArrowRight /></Button>
        </div>
      </CardContent>
    </Card >
  )
}

const MainPage = ({ search, onApply }: { search: string; onApply: (job: JobCardProps) => void; }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0 && search.length === 0) return mockedData;
    let filter: JobCardProps[] = mockedData;
    if (selectedCategories.length !== 0) {
      filter = filter.filter(({ category }) => selectedCategories.includes(category as string))
    }
    if (search.length !== 0) {
      filter = filter.filter(({ role }) => role.toLowerCase().includes(search.toLowerCase()))
    }
    return filter;
  }, [selectedCategories, search])

  function handleClickCategory(name: string, enabled: boolean) {
    setSelectedCategories((prevState) =>
      enabled ? [...prevState, name] : prevState.filter((category) => category !== name)
    )
  }
  return (
    <div className="p-4 pt-0 md:bg-gray-50 md:p-0 w-full h-full">
      {search.length === 0 && (
        <section className="flex pt-8 justify-between md:flex-col md:p-4">
          <h1 className="text-4xl font-bold tracking-tight">Find Job</h1>
          <div className="md:flex md:gap-1">
            <p className="text-right text-gray-700 md:text-left md:after:content-[':']">Last Update</p>
            <p className="text-right pr-1 md:text-left">{new Date().toLocaleString('en-US', { weekday: 'long', day: '2-digit', month: 'short' })}</p>
          </div>
        </section>
      )}
      <section className="pt-4  md:p-4">
        <Carousel opts={{ loop: true }} className="md:hidden">
          <CarouselContent className="-ml-2">
            {CATEGORIES.map((name) => <CarouselItem key={name} className="basis-1/3 h-16 pl-2"><Toggle variant="outline" className="rounded-xl w-full border border-gray-200 data-[state=on]:bg-[#2258DC] active:bg-[#2258DC] font-semibold h-11" onPressedChange={(enabled) => handleClickCategory(name as string, enabled)}>{name}</Toggle></CarouselItem>)}
          </CarouselContent>
        </Carousel>
        <div className="flex-wrap gap-2 mb-8 hidden md:flex">
          {CATEGORIES.map((name) => <Toggle key={name} variant="outline" className="rounded-xl border border-gray-200 data-[state=on]:bg-[#2258DC] active:bg-[#2258DC] font-semibold h-11" onPressedChange={(enabled) => handleClickCategory(name as string, enabled)}>{name}</Toggle>)}
        </div>
      </section>
      <section className="bg-white md:p-4 md:bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Circle color="#2258DC" fill="#2258DC" className="w-2 h-2" />
            <h2 className="text-lg font-medium md:font-bold">{search.length === 0 ? filteredData.length + ' new jobs available' : 'Recent Result'}</h2>
          </div>
          {search.length !== 0 && <p className="font-bold">{filteredData.length + ' Result'}</p>}
        </div>
        <Carousel orientation="vertical" className="w-full h-full mt-2 md:hidden" opts={{ align: 'start' }}>
          <CarouselContent className={search.length === 0 ? "h-[65vh]" : 'h-[75vh]'}>
            {filteredData.map((props, i) => <CarouselItem key={i} className="basis-1/2">{search.length === 0 ? <JobCard {...props} onApply={onApply} /> : <SearchJobCard {...props} />}</CarouselItem>)}
          </CarouselContent>
        </Carousel>
        <div className={`hidden gap-8 mt-8 md:flex ${search.length === 0 ? 'flex-wrap' : 'flex-col'}`}>
          {filteredData.map((props, i) => <div key={props.role + i}>{search.length === 0 ? <JobCard {...props} onApply={onApply} /> : <SearchJobCard {...props} />}</div>)}
        </div>
      </section>
    </div>
  )
}

const ProfilePage = ({ onClickBack, user }: { onClickBack: () => void; user: UserData }) => {
  return (
    <div className="w-full h-full">
      <header className="text-black gap-2 w-full bg-gradient-to-b from-[#2258DC] via-[#2258DC] via-50% to-90% to-white p-4 pb-2 md:bg-none md:bg-gray-50 md:w-[80%] md:pt-5 md:pl-10">
        <section className="flex w-full justify-between items-center h-fit">
          <Button className="rounded-full w-10 h-10  bg-transparent ring-1 md:hidden" onClick={onClickBack}>
            <ArrowLeft color="white" />
          </Button>
          <h2 className="text-2xl text-white font-bold md:text-black">Profile</h2>
          <Button className="rounded-full w-10 h-10  bg-transparent ring-1 md:shadow-none md:ring-0">
            <Ellipsis className="text-white md:text-black" />
          </Button>
        </section>
        <Avatar className="w-28 h-28 m-auto mt-6 outline-dashed outline-offset-4 outline-sidebar-ring">
          <AvatarImage src={user.avatar} />
        </Avatar>
        <div className="w-fit bg-white text-[#2258DC] flex py-1 px-2 rounded-full gap-2 items-center m-auto mt-6 md:text-white md:bg-[#2258DC]">
          <SquareMousePointer className="md:hidden" />
          <p className="text-sm font-bold">{user.role}</p>
        </div>
        <Card className="text-center p-4 text-[#B1B1B1] mt-4 bg-black">
          <p className="text-white text-2xl font-bold">{user.name}</p>
          <p>{user.email}</p>
          <p className="mt-4">{user.description}</p>
          <div className="flex gap-1 items-center justify-center text-white mt-2">
            <Locate />
            <p>{user.location}</p>
          </div>
        </Card>
      </header>
      <section className="p-4 pt-0 md:bg-gray-50 md:w-[80%] md:pl-10">
        <div className="flex items-center gap-1">
          <Circle color="#2258DC" fill="#2258DC" className="w-2 h-2" />
          <h2 className="text-lg font-medium">Experience Details</h2>
        </div>
        <article className="flex gap-2 items-center w-full mt-3 md:bg-white md:py-4 md:px-2 md:rounded-md md:border md:border-gray-200">
          <div className={`flex items-center justify-center rounded-full w-10 h-10 shadow-none border border-gray-200 bg-[#2258DC] p-2`}>
            <StickyNote color="white" />
          </div>
          <div>
            <p className="font-bold">Resume of {user.name}</p>
            <p className="text-sm text-gray-600">Last Update | {user.updatedAt.toLocaleString('en-US', { weekday: 'long', day: '2-digit', month: 'short' })}</p>
          </div>
          <ChevronRight className="ml-auto" />
        </article>
        <article className="flex gap-2 items-center w-full mt-3 md:bg-white md:py-4 md:px-2 md:rounded-md md:border md:border-gray-200">
          <div className={`flex items-center justify-center rounded-full w-10 h-10 shadow-none border border-gray-200 bg-[#2258DC] p-2`}>
            <LayoutGrid fill="white" color="white" />
          </div>
          <div>
            <p className="font-bold">Tools and Skill</p>
            <p className="text-sm text-gray-600">Last Update |  {user.updatedAt.toLocaleString('en-US', { weekday: 'long', day: '2-digit', month: 'short' })}</p>
          </div>
          <ChevronRight className="ml-auto" />
        </article>
      </section>
    </div>
  )
}

const BoardPage = ({ appliedJobs }: { appliedJobs: JobCardProps[] }) => {
  return (
    <div className="p-4 md:bg-gray-50 w-full h-full">
      <h1 className="text-4xl font-bold tracking-tight">Jobs you applied</h1>
      <section className="bg-white md:p-4 md:bg-gray-50">
        <Carousel orientation="vertical" className="w-full h-full mt-2 md:hidden" opts={{ align: 'start' }}>
          <CarouselContent className="h-[90vh]">
            {appliedJobs.map((props, i) => <CarouselItem key={i} className="basis-1/2"><JobCard {...props} /></CarouselItem>)}
          </CarouselContent>
        </Carousel>
      </section>
      <div className={`hidden gap-8 mt-8 md:flex flex-wrap`}>
        {appliedJobs.map((props, i) => <div key={props.role + i}>{<JobCard {...props} />}</div>)}
      </div>
    </div>
  )
}

const MessagesPage = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="p-4 md:bg-gray-50 w-full h-[80vh]">
      <h1 className="text-4xl font-bold tracking-tight">Your messages</h1>
      <section className="bg-white md:p-4 md:bg-gray-50">
        {messages.map(message => (
          <article key={message.title} className="flex gap-2 items-center w-full mt-3 bg-gray-100 py-4 px-2 rounded-md border border-gray-200">
            <div className={`flex items-center justify-center rounded-full w-10 h-10 shadow-none border border-gray-200 bg-[#2258DC] p-2`}>
              <Avatar>
                <AvatarImage src={message.company.logoSrc} />
              </Avatar>
            </div>
            <div>
              <p className="font-bold">{message.title}</p>
              <p className="text-sm text-gray-600">{message.sentAt.toLocaleString('en-US', { weekday: 'long', day: '2-digit', month: 'short' })}</p>
            </div>
            <ChevronRight className="ml-auto" />
          </article>
        ))}
      </section>
    </div>
  )
}

export default function App() {
  const [selectedPage, setSelectedPage] = useState<string>('main');
  const [appliedRoles, setAppliedRoles] = useState<JobCardProps[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white w-[100vw] h-[100vh] text-[#020202] overflow-hidden md:overflow-auto md:bg-gray-50">
      <header className={`p-4 pb-0 flex gap-2 md:border-b md:border-gray-300 md:pb-4 md:bg-white md:p-4 md:sticky md:top-0 md:z-10 ${selectedPage === 'profile' ? 'hidden md:flex' : ''}`}>
        <div className="flex w-full gap-2">
          <Button
            className="rounded-full w-10 h-10 border border-gray-200 bg-gray-50 md:bg-white md:shadow-none md:border-none hover:bg-gray-300"
            onClick={() => { setOpen(prevState => !prevState) }}
          >
            <LayoutGrid fill="black " className="md:hidden text-black" />
            <Grid className="hidden md:block text-black" />
          </Button>
          <div className="flex items-center gap-1 rounded-full bg-gray-50 border-gray-200 border px-4 focus-within:ring-1  focus-within:ring-ring w-full md:rounded-md md:w-1/3">
            <Search className="w-4 h-4" />
            <Input className="border-none shadow-none p-0 focus-visible:outline-none focus-visible:ring-0" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <Button className="rounded-full w-10 h-10 border border-gray-200 bg-gray-50 md:border-none md:bg-white md:shadow-none">
          <SlidersHorizontal className="md:hidden text-black" />
          <Settings className="hidden md:block text-black" />
        </Button>
        {search.length === 0 && <Avatar>
          <AvatarImage src={mockedUser.avatar} />
        </Avatar>}
      </header>
      <SidebarProvider open={open} className="min-h-[70vh]">
        <Sidebar className="border-gray-300 mt-[73px]">
          <SidebarContent className="bg-white text-black pt-20">
            <SidebarMenu className="flex flex-col gap-4">
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton onClick={() => setSelectedPage('main')} className="pl-10">
                  <House />
                  Find Job
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton onClick={() => setSelectedPage('board')} className="pl-10">
                  <ClipboardList />
                  Board
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton onClick={() => setSelectedPage('message')} className="pl-10">
                  <Mail />
                  Messages
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton onClick={() => setSelectedPage('profile')} className="pl-10">
                  <User />
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        {(selectedPage === 'main' || search.length !== 0) && <MainPage search={search} onApply={(job) => setAppliedRoles(prevState => [...prevState, job])} />}
        {(selectedPage === 'profile' && search.length === 0) && <ProfilePage onClickBack={() => setSelectedPage('main')} user={mockedUser} />}
        {(selectedPage === 'board' && search.length === 0) && <BoardPage appliedJobs={appliedRoles} />}
        {(selectedPage === 'message' && search.length === 0) && <MessagesPage messages={mockedMessages} />}
      </SidebarProvider >
      <footer className="md:hidden sticky bottom-2 bg-black mx-6 h-16 rounded-full text-gray-400 flex justify-evenly items-center">
        <div className="relative">
          <House onClick={() => setSelectedPage('main')} className={selectedPage === 'main' ? 'text-white' : 'text-gray-400'} />
          {selectedPage === 'main' && <Circle color="white" fill="white" className="w-1 h-1 absolute left-[40%] -bottom-2" />}
        </div>
        <div className="relative">
          <ClipboardList onClick={() => setSelectedPage('board')} className={selectedPage === 'board' ? 'text-white' : 'text-gray-400'} />
          {selectedPage === 'board' && <Circle color="white" fill="white" className="w-1 h-1 absolute left-[40%] -bottom-2" />}
        </div>
        <div className="relative">
          <Mail onClick={() => setSelectedPage('message')} className={selectedPage === 'message' ? 'text-white' : 'text-gray-400'} />
          {selectedPage === 'message' && <Circle color="white" fill="white" className="w-1 h-1 absolute left-[40%] -bottom-2" />}
        </div>
        <div className="relative">
          <SquareUser onClick={() => setSelectedPage('profile')} className={selectedPage === 'profile' ? 'text-white' : 'text-gray-400'} />
          {selectedPage === 'profile' && <Circle color="white" fill="white" className="w-1 h-1 absolute left-[40%] -bottom-2" />}
        </div>
      </footer>
    </div>
  )
}
