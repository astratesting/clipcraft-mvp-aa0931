import { Captions, Download, Music2, Scissors, Type, UploadCloud } from 'lucide-react';

const projects = [
  { name: 'Launch teaser', status: 'Captions ready', length: '00:28', export: '9:16 MP4' },
  { name: 'Founder story', status: 'Needs trim', length: '01:12', export: 'Draft' },
  { name: 'Feature drop', status: 'Music synced', length: '00:34', export: '9:16 MP4' }
];

const actions = [
  { icon: UploadCloud, label: 'Upload video', detail: 'MOV or MP4 up to 500MB' },
  { icon: Scissors, label: 'Trim clip', detail: 'Set start/end points' },
  { icon: Captions, label: 'Auto-caption', detail: 'Whisper transcript + timing' },
  { icon: Type, label: 'Add overlay', detail: 'Title, CTA, and labels' },
  { icon: Music2, label: 'Pick music', detail: 'Licensed background tracks' },
  { icon: Download, label: 'Export 9:16', detail: 'TikTok/Reels-ready MP4' }
];

export default function DashboardPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mint">ClipCraft workspace</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Create next short-form edit</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Manage uploads, captions, overlays, music, templates, and exports from one creator dashboard.</p>
          </div>
          <button className="rounded-full bg-electric px-5 py-3 font-semibold text-white hover:bg-violet-500">New project</button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-ink p-5 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Active projects</p>
            <p className="mt-2 text-4xl font-black text-white">12</p>
          </div>
          <div className="rounded-3xl bg-ink p-5 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Caption minutes</p>
            <p className="mt-2 text-4xl font-black text-white">84</p>
          </div>
          <div className="rounded-3xl bg-ink p-5 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Exports this week</p>
            <p className="mt-2 text-4xl font-black text-white">27</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
          <h2 className="font-bold text-white">Quick editor</h2>
          <div className="mt-5 grid gap-3">
            {actions.map(({ icon: Icon, label, detail }) => (
              <button key={label} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-left hover:bg-white/15">
                <span className="rounded-xl bg-electric/20 p-2 text-electric"><Icon size={18} /></span>
                <span><span className="block font-semibold text-white">{label}</span><span className="text-sm text-slate-400">{detail}</span></span>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
          <h2 className="font-bold text-white">Recent projects</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            {projects.map((project) => (
              <div key={project.name} className="grid grid-cols-4 gap-3 border-b border-white/10 bg-ink/70 p-4 text-sm last:border-b-0">
                <span className="font-semibold text-white">{project.name}</span>
                <span className="text-slate-300">{project.status}</span>
                <span className="text-slate-300">{project.length}</span>
                <span className="text-mint">{project.export}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
