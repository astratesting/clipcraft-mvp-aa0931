import Link from 'next/link';
import { ArrowRight, Captions, Music2, Scissors, Sparkles, Type, Upload } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const features = [
  { icon: Scissors, title: 'Frame-tight trimming', text: 'Cut hooks, dead air, and endings with mobile-first timeline controls.' },
  { icon: Captions, title: 'Whisper auto-captions', text: 'Generate editable captions for social videos from uploaded audio.' },
  { icon: Type, title: 'Text overlays', text: 'Add bold creator-style titles, CTAs, and scene labels.' },
  { icon: Music2, title: 'Music library', text: 'Pick background tracks that keep Shorts, Reels, and TikToks moving.' }
];

const workflow = ['Upload source clip', 'Trim best moment', 'Generate captions', 'Add overlays + music', 'Export 9:16'];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">
            <Sparkles size={16} className="text-mint" />
            AI captions + TikTok-ready exports in one lean editor
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl">
            Ship scroll-stopping clips from your phone.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            ClipCraft helps creators upload raw footage, trim it fast, generate Whisper captions, layer text, add music, and export polished 9:16 videos for TikTok, Reels, and Shorts.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 font-semibold text-white shadow-glow hover:bg-violet-500">
              Open demo workspace <ArrowRight size={18} />
            </Link>
            <Link href="/sign-up" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:bg-white/10">
              Create account
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-5">
            {workflow.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-sm text-slate-200">
                <span className="mb-2 block text-xs font-bold text-coral">0{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-white/15 bg-slate-950/90 p-4 shadow-2xl">
          <div className="mobile-frame overflow-hidden rounded-[2rem] bg-gradient-to-b from-violet-500 via-slate-900 to-rose-500 p-5">
            <div className="flex h-full flex-col justify-between">
              <div className="rounded-3xl bg-black/35 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold"><Upload size={16} /> creator-raw.mov</div>
                <div className="mt-4 h-2 rounded-full bg-white/20"><div className="h-2 w-2/3 rounded-full bg-mint" /></div>
                <div className="mt-2 flex justify-between text-xs text-slate-200"><span>00:03</span><span>00:21</span></div>
              </div>
              <div className="rounded-3xl bg-white px-4 py-3 text-center text-xl font-black leading-tight text-ink shadow-xl">
                Build once. Post everywhere.
              </div>
              <div className="grid gap-2 rounded-3xl bg-black/45 p-4 text-sm backdrop-blur">
                <span className="text-mint">Caption track ready</span>
                <span className="text-slate-200">Music: Neon Pulse</span>
                <span className="text-slate-200">Export: 1080x1920 MP4</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 pb-20 md:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <Icon className="text-coral" />
            <h2 className="mt-4 font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
