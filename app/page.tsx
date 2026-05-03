"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Flame,
  Crown,
  Heart,
  Video,
  Gem,
  Star,
  MapPin,
  MessageCircle,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";

/* -----------------------------
   CATEGORIES
------------------------------*/
const categories = [
  {
    id: "hookups",
    name: "Hookups",
    subtitle: "One Night Stand",
    icon: Flame,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "wamamas",
    name: "Wamamas",
    subtitle: "Sugar Mummies",
    icon: Crown,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: "serious",
    name: "Serious Love",
    subtitle: "Long Term",
    icon: Heart,
    gradient: "from-rose-500 to-red-600",
  },
  {
    id: "videocalls",
    name: "Video Calls",
    subtitle: "Private Sessions",
    icon: Video,
    gradient: "from-violet-500 to-purple-600",
  },
 
];

const messagesByCategory: Record<string, string[]> = {
  hookups: [
    "Available tonight. Looking for a mature gentleman for fun, vibes and unforgettable chemistry.",
    "Clean, discreet and classy. Ready for a private meetup this evening.",
    "Weekend plans? Let's make memories together tonight ❤️",
  ],
  wamamas: [
    "Successful and generous woman seeking a younger confident man.",
    "Spoiling the right gentleman with luxury, gifts and unforgettable moments.",
    "Mature, classy and financially stable. Looking for premium company.",
  ],
  serious: [
    "Ready for genuine love, loyalty and a meaningful relationship.",
    "Looking for marriage-minded men who value commitment and honesty.",
    "Tired of games. Seeking real connection and long-term happiness.",
  ],
  videocalls: [
    "Available for exciting private video sessions tonight.",
    "Flirty, playful and ready for unforgettable late-night conversations.",
    "Let's connect privately and enjoy exclusive premium moments.",
  ],
  wababaz: [
    "Affluent gentleman seeking an elegant lady for luxury companionship.",
    "Travel, shopping and premium experiences await the right woman.",
    "Generous, mature and successful. Seeking a beautiful queen.",
  ],
};

/* -----------------------------
   PROFILES (300)
------------------------------*/
/* ADD "category" TO EVERY PROFILE */

const profiles = [
  {
    id: 1,
    category: "hookups",
    name: "Damaris",
    age: 20,
    location: "SouthB",
    time: "05/02/2026 • 1:58 PM",
    image: "/1.jpg",
    message:
      "Hi Admin, am Damaris a cute chocolate thick short lady from South B, I am staying here with my siz so u can't host I need someone to treat me over the weekend as I will give him best sex. I would like someone to make me feel like real woman in bed,I can give maximumly love as long I'm happy with the way you take good care of my libido..",
  },
  {
    id: 2,
    category: "hookups",
    name: "Harriet",
    age: 22,
    location: "Nakuru",
    time: "05/02/2026 • 10:36 AM",
    image: "/2.jpg",
    message:
      "Hi Admin. Am Harriet from mawanga nakuru, I want to be hooked up with a man who is ready to have some satisfaction in bed I'm really in need of a good fuck today for fun I will host and please hide my detail."

  },
  {
    id: 3,
    category: "hookups",
    name: "Caro",
    age: 20,
    location: "Kangemi, Nairobi",
    time: "05/02/2026  • 11:42 AM",
    image: "/3.jpg",
    message:
      "Hi admn, am Caroline from kangemi, 20yrs, short brown with big loose ass, need a man to fuck me hard. I'm a young petite lady been trying to get one but not successful in thinking about it but now am more than ready,, I have a debt of 1500 that needs to be cleared  anyone willing to pay me that amount for sex I'll appreciate."
},
  {
    id: 4,
    category: "hookups",
    name: "Winnie",
    age: 24,
    location: "kasarani",
    time: "2/5/2026 • 1:26 PM",
    image: "/4.jpg",
    message:
      "Hi Admin, am winnie 24years old , am beautiful, petite with a nice ass,am located in Nairobi kasarani. please hook me up with a nice gentleman for some nice fuck. He should be ready to appreciate me too. Hide id na upee mtu ako interested namba anicall tuelewane",
  },
  {
    id: 5,
    category: "hookups",
    name: "Fay",
    age: 20,
    location: "K road",
    time: "02/05/2026 • 12:46 PM",
    image: "/6.jpg",
    message:
      "Hello hi . Am fay 20 years of age currently in K road I'd love to be hooked up with a man 25 and above years Just getting freaky no strings attached and maybe a token of appreciation",
  },
  {
    id: 6,
    category: "hookups",
    name: "Joyce",
    age: 25,
    location: "malindi",
    time: "02/05/2026 • 4:01 PM",
    image: "/5.jpg",
    message:
      "Afternoon admin, I'm Joyce from malindi, a friend linked me up to you. I'm looking for a hook up for fun. I'm having some fantasy of how it would feel having my gender working their magic on me. I have never done it before so if you hook me up with a transgender, Les or bi. I would love to explore. Hope you get me one with experience soon. Ama threesome ya 2 female 1 man."

  },
  {
    id: 7,
    category: "hookups",
    name: "Ivone",
    age: 25,
    location: "waiyaki",
    time: "02/05/2026 • 6:09 PM",
    image: "/7.jpg",
    message:
      "Good morning , Iam ivon 25yrsInterested in meeting any man in Waiyaki who's sex in marriage is not working connect us we will vibe Iam married but it's not good at all.",
  },
  {
    id: 8,
    category: "hookups",
    name: "Esther",
    age: 25,
    location: "juja",
    time: "4/1/2026 • 1:08 PM",
    image: "/8.jpg",
    message:
      "Hello Admin, am esther from Juja, 25yrs old, brown curvey and short, am so horny, i need a cute man to crush my juicy sweet pussy today, need man to touch harder my boobs, i miss a man over my body, i can host or he host, am available anytime from now please connect me",
  },
  {
    id: 9,
    category: "hookups",
    name: "Ashley",
    age: 23,
    location: "Kabete",
    time: "4/1/2026 • 1:08 PM",
    image: "/9.jpg",
    message:
      "My name is Ashley and am 23yrs old. I live around Kabete.I would like aman whose good looking anywhere around nariobi to Dick me well in bed and in pocket my token is from 1000and above and should be ready to host me and bless me with tokens of appreciation, I wouldn't disappoint but rather make him think of me, yes rough sex included",
  },
  {
    id: 10,
    category: "hookups",
    name: "Sonia",
    age: 25,
    location: "kirinyaga",
    time: "4/1/2026 • 1:08 PM",
    image: "/11.jpg",
    message:
      "Hi admin mintque, Sonia 22yr old here. I was referred here. Please hide my Identity. I need a man we start dating now akuwe mtu 30 to 50 please I need mtu mature. Kindly post this for me. Am here looking for a man who needs a serious relationship that can lead to marriage am stable, focused & mature woman, I live in Kirinyaga but would appreciate any man within nakuru, Nairobi or even kiambu.",
  },

  {
    id: 11,
    category: "hookups",
    name: "Cate",
    age: 21,
    location: "Around Nairobi",
    time: "02/05/2026 • 10:51 AM",
    image: "/10.jpg",
    message:
      "Hello admin 👋I’m Cate working, independent, and easy to get along with. Mimi Niko 25 yrs have always had the urge to get my clit sucked and licked but sijawai meet na mtu anapenda hiyo I don't care who licks me whether it a lady or a man I just want to feel the experience i like that as a foreplay or if kuna Dem anapenda hizo mambo😁 I would love we connect."

  },
  {
    id: 12,
    category: "hookups",
    name: "Gloria",
    age: 19,
    location: "Nairobi",
    time: "2/5/2026 • 10:51 AM",
    image: "/14.jpg",
    message:
      "Hi Admin, I am Gloria 19yr old from Meru. I'm travelling tonight to Nairobi . Can i get someone who can host me for a night or 2 just within town . I need an able man who is loaded and has a car(s) if possible. I will really appreciate, since lasttime we communicated sikupata mtu mint.Lo",
  },
  {
    id: 13,
    category: "hookups",
    name: "Linda",
    age: 30,
    location: "Ronga",
    time: "2/5/2026 • 1:29 PM",
    image: "/26.jpg",
    message:
      "Hello Admin, am a Kenyan lady working in Rongai, Am 32 yrs old, I would like to be connected with a man who is ready for a serious relationship, serious guys only pls",
  },
  {
    id: 14,
    category: "hookups",
    name: " Betty",
    age: 25,
    location: "Kimbo",
    time: "2/5/2026 • 11:33 AM",
    image: "/13.jpg",
    message:
      "Hi Admin am Betty from Kasarani near Equity, connect me with a Nice man who is ready to fuck me till satisfaction, am 24yrs, am flexible and i can host. The guy should be Willing to Appreciate."

  },
  {
    id: 15,
    category: "hookups",
    name: "Nicole",
    age: 26,
    location: "Umoja",
    time: "2/5/2026 • 7:44 PM",
    image:"/16.jpg",
    message:
      "Heey Admin am Nicole from Umoja Nairobi, am available today ,I need someone I can hang out with today at my place, I have a few drinks we can share,the man should be good in bed and sexually active, I will accommodate.",
  },
  {
    id: 16,
    category: "hookups",
    name: "Cherry",
    age: 30,
    location: "Wendani",
    time: "2/5/2026 • 7:46 PM",
    image: "/17.jpg",
    message:
      "I need a fuckmate man from wendani town, I need a guy above 20yrs ,I want a guy who I can spend my day with and should not be married or engaged in a serious relationship, I need this to be kept discreet, I will appreciate.Am 33 years.",
  },
  {
    id: 17,
    category: "hookups",
    name: "winnie",
    age: 27,
    location: "Utawala",
    time: "2/5/2026 • 9:56 AM",
    image: "/18.jpg",
    message:
      "Afternoon .I was referred here.Am Winnie from Shooters, have just joined, please hook me up with a man from here for a no strings attached affair and may be something else will follow. We can be long term fuckmate thanks, can be hosting.",
  },
  {
    id: 18,
    category: "hookups",
    name: "Alicia",
    age: 24,
    location: "Dagoreti",
    time: "2/5/2026 • 9:56 AM",
    image: "/19.jpg",
    message:
      "am Alicia from dagoretti looking for a serious available mature man preferably 21+ for a satisfying sweet intimate session together.lets create some warmth in this cold weather.i offer sloppy and deep throat bj, and enjoy good sex.I am outgoing, chocolate skin tone and medium body size.I also do massage including body to body massage.",
  },
  {
    id: 19,
    category: "hookups",
    name: "Nancy",
    age: 23,
    location: "Embakasi Fedha",
    time: "2/5/2026 • 9:56 AM",
    image: "/20.jpg",
    message:
      "Hello ,am Nancy 28yr from Fedha brown lady slim with a great ass, connect me with a man who need some sex as I do, am so horny, I need a man who as missed sex, am flexible within Embakazi and I can host too, I don't need any money from him, but he must be so romantic and beast in bed.",
  },
  {
    id: 20,
    category: "hookups",
    name: "IVone",
    age: 26,
    location: "Kiserian",
    time: "2/5/2026 • 9:57 AM",
    image: "/15.jpg",
    message:
      "Evening Admin. Am Ivone from Kiserian 23yr beautiful lady, am so horny today, can I get a nice man to fuck me well please, I can host him if necessary. Hook me up to a descent, romantic and energetic guy for a regular s3x affair.",
  },
  {
    id: 21,
    category: "hookups",
    name: "Rose",
    age: 24,
    location: "Ruai, Nairobi",
    time: "4/12/2026 • 9:56 AM",
    image: "/23.jpg",
    message:
      "Hi admin. Am Rose 33yrs located in Ruai. Mother of 2 children. Ready for something beautiful. I am fun-loving, curious, and always ready to try something new! I enjoy exploring new places, good food, and a great sense of humor. Life’s too short not to laugh, so I’m hoping to meet someone who doesn’t take themselves too seriously ",
  },
  {
    id: 22,
    category: "hookups",
    name: "Millie",
    age: 21,
    location: "Juja",
    time: "2/5/2026 • 12:53 PM",
    image: "/21.jpg",
    message:
      "Hey, am Millie , living in Juja, am 23 yrs old, am freaky, can do phone sex, sex chats and can do anything in bed, hook me up with a man who want more fun. It's been long since I had sex. I'm free during the day get me someone.",
  },
  {
    id: 23,
    category: "hookups",
    name: "Joy",
    age: 25,
    location: "Allsops, Nairobi",
    time: "2/5/2026 • 12:53 PM",
    image: "/22.jpg",
    message:
      ", I was referred by some of my friends. Am Sonia a 25 year old ,thick curvy and chocolate who is very shy but down to earth on all nasty bedroom stuff..looking for a night stand I'll meet all his bedroom desire and any other service he needs and he'll meet my financial needs...pov I will be loyal",
  },
  {
    id: 24,
    category: "hookups",
    name: "Sarah",
    age: 22,
    location: "Ruai, Nairobi",
    time: "2/5/2026 • 9:56 AM",
    image: "/25.jpg",
    message:
      "Hey am 22 years old from Nairobi. I am hoping to get a longterm sugardaddy/fuckmate. I offer very good massage at a cost. Hkp services are also available. I can't host the guy. Age is just a number I will be happy if you hook me up,am horny.",
  },
  {
    id: 25,
    category: "hookups",
    name: "Grace",
    age: 28,
    location: "Thika road",
    time: "2/5/2026 • 9:57 AM",
    image: "/24.jpg",
    message:
      "Hi am Grace I stay along thika road am looking for a man how can satisfy me I love some how is crazy n bed take long to cum....I enjoy it more when someone takes longer to cum will both enjoy token is a must thanks n advance",
  },
  {
    id: 26,
    category: "hookups",
    name: "Linda",
    age: 24,
    location: "Lucky summer",
    time: "2/5/2026 • 4:34 PM",
    image: "/28.jpg",
    message:
      "Hi Admin.I am Linda we would like to try a 3 sum two females and one male we need one man it will be highly appreciated if I get , we try this we are in lucky summer any man willing to try this we can cetch up,iam 24 ",
  },
  {
    id: 27,
    category: "hookups",
    name: "Emma",
    age: 26,
    location: " weiteithie, Nairobi",
    time: "2/5/2026 • 9:19 AM",
    image: "/29.jpg",
    message:
      "I'm 26 years old, I am very beautiful with a delicate skin, I have a modern lifestyle and good taste. My personality is very outgoing, fun and open. Offering a fully discreet and emotional massage and hot sensual sex. I am here to care for you with my seductive charm, making you feel as comfortable as possible. I can host in Weteithie Thika Rd anytime of the day ",
  },
  {
    id: 28,
    category: "hookups",
    name: "Dona",
    age: 24,
    location: "Kimbo, Nairobi",
    time: "3/5/2026 • 4:25 PM",
    image: "/30.jpg",
    message:
      "Hello there Admin am Dona  from Kimbo. Hook me up with a guy who is good and can last for in bed .Someone who can give me an orgasm ,I want a long term thing .I will give him good sex .I can host him let this remain anonymous",
  },
  {
    id: 29,
    category: "hookups",
    name: "Nicole",
    age: 28,
    location: "Kisumu",
    time: "3/5/2026 • 8:25 PM",
    image: "/31.jpg",
    message:
      "Name: NicoleAge: 23yrsService: Video Calls at a FeeService: Incalls/Outcalls anywhere around Kisumu/MasenoToken: Yes",
  },
  {
    id: 30,
    category: "hookups",
    name: "Millie",
    age: 30,
    location: "Wendani",
    time: "4/5/2026 • 12:53 PM",
    image: "/32.jpg",
    message:
      "Evening admin, my name is Millie, 30ys, petite and chocolate and currently in wendani area. Please hook me up with a mature gentleman who is mature. He should be willing to appreciate me. I can host, if necessary.",
  },


  // (continues similarly up to 70 if you want full expansion)
];

/* -----------------------------
   MAIN APP
------------------------------*/
export default function WeekendApp() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleProfiles, setVisibleProfiles] = useState(24);
const filteredWomen = useMemo(() => {
  return profiles;
}, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const timer = setInterval(() => {
      setVisibleProfiles((prev) =>
        prev >= filteredWomen.length ? 24 : prev + 2
      );
    }, 2500);

    return () => clearInterval(timer);
  }, [selectedCategory, filteredWomen.length]);

  /* -----------------------------
     CATEGORY PAGE
  ------------------------------*/
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-pink-500/20 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setVisibleProfiles(24);
              }}
              className="px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800"
            >
              ← Back
            </button>

            <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              WEEKENDAPP
            </h1>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-3 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWomen.slice(0, visibleProfiles).map((woman) => (
              <ProfileCard key={woman.id} profile={woman} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  /* -----------------------------
     HOME PAGE
  ------------------------------*/
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <section className="relative px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/30 via-black to-black" />

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
            WEEKENDAPP
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-6">
            Kenya&apos;s hottest adult dating platform for instant connections, luxury matches, video calls and unforgettable weekends.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            <StatCard icon={<Users />} value="25,000+" label="Active Members" />
            <StatCard icon={<Shield />} value="100%" label="Private" />
            <StatCard icon={<Sparkles />} value="300+" label="New Daily" />
            <StatCard icon={<Heart />} value="4.9/5" label="Rating" />
          </div>

          {/* CATEGORIES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group p-8 rounded-3xl bg-gradient-to-br ${category.gradient} hover:scale-105 transition-all duration-300 shadow-2xl text-left`}
                >
                  <Icon className="w-12 h-12 mb-5" />
                  <h3 className="text-3xl font-black mb-2">{category.name}</h3>
                  <p className="text-white/90 text-lg">{category.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* REVIEWS */}
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <ReviewCard name="Kevin, Nairobi" text="Met amazing ladies within hours. Smooth and premium experience." />
            <ReviewCard name="Brian, Kisumu" text="Very active platform. Real profiles and instant replies." />
            <ReviewCard name="Alex, Mombasa" text="Best dating site in Kenya right now. Highly recommended." />
          </div>
        </div>
      </section>



{/* FOOTER */}
<footer className="mt-20 border-t border-pink-500/20 bg-gradient-to-b from-zinc-950 to-black">
  <div className="max-w-7xl mx-auto px-4 py-16">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side */}
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
          Weekend App Kenya
        </h2>

        <p className="text-zinc-300 text-lg leading-relaxed mb-8">
          Meet real, active singles across Kenya. Chat instantly, connect privately,
          and plan exciting weekend meetups with members near you.
        </p>

        <div className="space-y-4">
          <div className="bg-zinc-900/70 border border-pink-500/10 rounded-2xl p-4">
            <h4 className="text-white font-semibold mb-1">
              No Registration just Quick meets
            </h4>
          
          </div>

          <div className="bg-zinc-900/70 border border-pink-500/10 rounded-2xl p-4">
            <h4 className="text-white font-semibold mb-1">
              Active Members
            </h4>
            <p className="text-zinc-400 text-sm">
              Browse hundreds of online profiles near your location.Updated Every Minute
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-pink-500/10 rounded-2xl p-4">
            <h4 className="text-white font-semibold mb-1">
              Instant Chat and connected both sides
            </h4>
            <p className="text-zinc-400 text-sm">
              Select patner and start chatting or call ,privacy is priority
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-8 text-center shadow-2xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-3xl font-bold text-white mb-4">
          Need Help?
        </h3>

        <p className="text-zinc-400 text-lg mb-8">
          Our admin is available 24/7 to assist with registration,
          activation, payments, or any questions.
        </p>

        <a
          href="https://t.me/WoodsHelper"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl shadow-pink-500/30">
            Text Admin Now
          </button>
        </a>
      </div>
    </div>

    <div className="mt-14 pt-8 border-t border-zinc-800 text-center">
      <p className="text-zinc-500 text-sm">
        © 2026 Weekend App Kenya. All rights reserved.
      </p>
    </div>
  </div>
</footer>



    </div>
  );
}

/* -----------------------------
   COMPONENTS
------------------------------*/
function ProfileCard({ profile }: any) {
  const [showPayment, setShowPayment] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "https://starlink-backend-yb3n.onrender.com";

  /* -----------------------------
     PHONE NORMALIZER
  ------------------------------*/
  const normalizePhone = (phone: string) => {
    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("07") || cleaned.startsWith("01")) {
      return "254" + cleaned.slice(1);
    }

    if (cleaned.startsWith("254")) {
      return cleaned;
    }

    if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
      return "254" + cleaned;
    }

    return cleaned;
  };

  /* -----------------------------
     PAYMENT HANDLER
  ------------------------------*/
  const handlePayment = async () => {
    const formattedPhone = normalizePhone(phone);

    if (!formattedPhone || formattedPhone.length < 10) {
      alert("Enter valid M-PESA number (07 / 01 / 254)");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/runPrompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: 299,
          local_id: `WKD-${profile.id}-${Date.now()}`,
          transaction_desc: `WeekendApp - ${profile.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend not reachable");
      }

      const data = await response.json();
if (data.status) {
  setSuccess(true);

  setTimeout(() => {
    window.location.href =
      "https://wa.me/254755997593?text=Hello%20Admin,%20I%20have%20successfully%20paid%20on%20WeekendApp%20and%20would%20like%20access%20to%20the%20profile.";
  }, 2000);
} else {
  alert(data.msg || "Payment failed");
}
    } catch (error) {
      console.error(error);
      alert("Payment server is not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* -----------------------------
          PROFILE CARD (SMALL + CLEAN)
      ------------------------------*/}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3 hover:border-green-500/40 transition-all">
         <div className="flex flex-col gap-2">
          <div className="w-full">
  <Image
    src={profile.image}
    alt={profile.name}
    width={800}
    height={500}
    className="w-full h-[260px] md:h-[300px] object-cover rounded-xl"
    unoptimized
  />
</div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm">
              {profile.name}, {profile.age}
            </h3>

            <p className="text-zinc-400 text-[11px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-pink-500" />
              {profile.location}
            </p>

            <p className="text-zinc-500 text-[10px]">
              {profile.time}
            </p>

            <p className="text-zinc-300 text-xs mt-1 whitespace-pre-wrap break-words">
  {profile.message}
</p>

            {/* CONNECT BUTTON */}
            <button
              onClick={() => setShowPayment(true)}
              className="mt-2 inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all"
            >
              <MessageCircle className="w-3 h-3" />
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* -----------------------------
          PAYMENT MODAL (PROFESSIONAL)
      ------------------------------*/}
      {showPayment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-2xl relative">

            {/* CLOSE */}
            <button
              onClick={() => {
                setShowPayment(false);
                setSuccess(false);
                setPhone("");
              }}
              className="absolute top-2 right-3 text-zinc-500 hover:text-white text-xl"
            >
              ×
            </button>

            {/* CONTENT */}
            {!success ? (
              <>
                <h2 className="text-lg font-black mb-1">
                  Connect with {profile.name}
                </h2>

                <p className="text-zinc-500 text-xs mb-3">
                  Secure private access via M-PESA
                </p>

                {/* PRICE */}
                <div className="bg-zinc-900 rounded-xl p-3 mb-3 text-center border border-zinc-800">
                  <p className="text-zinc-500 text-xs">
                    One-Time Access
                  </p>
                  <h3 className="text-3xl font-black text-green-500">
                    KSh 299
                  </h3>
                </div>

                {/* PHONE INPUT (FIXED) */}
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="07XXXXXXXX / 01XXXXXXXX / 2547XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white text-sm mb-3 outline-none focus:border-green-500"
                />

                {/* RULES */}
                <div className="bg-zinc-900 rounded-xl p-3 mb-3 text-[11px] text-zinc-400 space-y-1">
                  <p>• Instant WhatsApp number unlock</p>
                  <p>• Direct private chat access</p>
                  <p className="italic text-zinc-500">
                    Profile removed after successful connection
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                >
                  {loading ? "Sending STK..." : "Pay with M-PESA"}
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">🎉</div>

                <h3 className="text-lg font-black text-green-500">
                  Payment Sent
                </h3>

                <p className="text-zinc-400 text-sm mt-2">
                  Complete payment on your phone
                </p>

                <p className="text-zinc-500 text-xs mt-1">
                  Access unlocks instantly after confirmation
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
function StatCard({ icon, value, label }: any) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-center">
      <div className="flex justify-center text-pink-500 mb-2">{icon}</div>
      <h3 className="text-2xl font-black">{value}</h3>
      <p className="text-zinc-400 text-sm">{label}</p>
    </div>
  );
}

function ReviewCard({ name, text }: any) {
  return (
    <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-zinc-300 mb-4">{text}</p>
      <p className="font-bold text-pink-400">{name}</p>
    </div>
  );
}