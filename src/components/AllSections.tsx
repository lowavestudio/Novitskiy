import { useEffect, useState, useRef, useCallback } from 'react'
import { siteData } from '../content/data'
import { useReveal } from '../hooks/useReveal'

// ── Background Music ─────────────────────────────────────────────────────────
function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.18
    return () => { audioRef.current?.pause() }
  }, [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play().catch(() => {}); setPlaying(true) }
  }, [playing])

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Выключить музыку' : 'Включить фоновую музыку'}
      style={{
        position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 200,
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.6rem 1rem',
        background: 'rgba(24,36,33,0.85)',
        border: '1px solid rgba(181,154,107,0.4)',
        color: 'var(--color-brass)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        {playing ? (
          <>
            <rect x="1" y="2" width="3.5" height="10" rx="1" />
            <rect x="7" y="2" width="3.5" height="10" rx="1" />
          </>
        ) : (
          <path d="M2 1.5l10 5.5-10 5.5z" />
        )}
      </svg>
      {playing ? 'Музыка' : 'Музыка'}
    </button>
  )
}

// ── Chapter Nav ─────────────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 'prologue', label: 'Пролог' },
  { id: 'character', label: 'Характер' },
  { id: 'freedom', label: 'Свобода' },
  { id: 'together', label: 'Вместе' },
  { id: 'dogs', label: 'Верность' },
  { id: 'family', label: 'Семья' },
  { id: 'wife', label: 'Письмо' },
  { id: 'heritage', label: 'История' },
  { id: 'finale', label: 'Финал' },
]

function ChapterNav({ activeChapter }: { activeChapter: string }) {
  return (
    <nav className="chapter-nav hidden lg:flex" aria-label="Навигация по главам">
      {CHAPTERS.map((ch) => (
        <button
          key={ch.id}
          className={`chapter-nav-dot ${activeChapter === ch.id ? 'active' : ''}`}
          onClick={() => document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={`Перейти к главе: ${ch.label}`}
        >
          <span className="chapter-nav-dot-label">{ch.label}</span>
          <span className="chapter-nav-dot-line" />
        </button>
      ))}
    </nav>
  )
}

// ── Prologue ─────────────────────────────────────────────────────────────────
function Prologue() {
  const { prologue } = siteData
  const [loaded, setLoaded] = useState(false)

  return (
    <section
      id="prologue"
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ background: '#182421' }}
      aria-label="Пролог"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={prologue.heroImage}
          alt={prologue.heroImageAlt}
          fetchPriority="high"
          className={`w-full h-full object-cover object-top transition-opacity duration-1000 img-cinematic ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #182421 0%, rgba(24,36,33,0.65) 50%, transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(24,36,33,0.5) 0%, transparent 60%)' }} />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-24">
        <div className={`transition-all duration-[1.4s] delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="chapter-label mb-6 tracking-[0.3em]">{siteData.birthday}</p>
          <h1
            className="font-display font-light leading-none mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)' }}
          >
            Игорь<br />
            <span style={{ color: 'var(--color-brass)', fontStyle: 'italic' }}>Новицкий</span>
          </h1>
          <div className="brass-divider" />
          <p
            className="font-display italic max-w-xl mb-8"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-stone-light)', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
          >
            «{prologue.subtitle}»
          </p>
          <p className="font-body text-sm tracking-widest uppercase" style={{ color: 'var(--color-stone-light)' }}>
            {prologue.fromFamily}
          </p>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-[1800ms] ${loaded ? 'opacity-60' : 'opacity-0'}`}>
          <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-stone-light)' }}>
            {prologue.scrollHint}
          </span>
          <div className="w-px h-12 animate-bounce" style={{ background: 'linear-gradient(to bottom, var(--color-brass), transparent)', animationDuration: '2s' }} />
        </div>
      </div>
    </section>
  )
}

// ── Character ────────────────────────────────────────────────────────────────
function Character() {
  const { character } = siteData
  const textRef = useReveal(0.1) as React.RefObject<HTMLDivElement>
  const imgRef = useReveal(0.1) as React.RefObject<HTMLDivElement>

  return (
    <section id="character" className="relative py-24 md:py-36 overflow-hidden" style={{ background: '#1a2420' }} aria-label="Характер">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="reveal order-2 md:order-1">
            <span className="chapter-label block mb-6">Глава {character.chapterLabel}</span>
            <h2 className="font-display font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)' }}>
              {character.headline}
            </h2>
            <div className="brass-divider" />
            <div className="space-y-4">
              {character.text.map((para, i) => (
                <p key={i} className="font-body leading-relaxed" style={{ color: 'var(--color-stone-light)', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div ref={imgRef} className="reveal-right order-1 md:order-2">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img src={character.image} alt={character.imageAlt} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 80px rgba(24,36,33,0.4)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Freedom ──────────────────────────────────────────────────────────────────
function FreedomScene({ scene, index }: { scene: typeof siteData.freedom.scenes[0]; index: number }) {
  const ref = useReveal(0.1) as React.RefObject<HTMLDivElement>
  const isEven = index % 2 === 0
  const bgColors = ['#152018', '#0f1a1e', '#111820']

  return (
    <div ref={ref} className="reveal relative min-h-[70vh] flex items-center overflow-hidden" style={{ background: bgColors[index] }}>
      <div className="absolute inset-0 overflow-hidden">
        <img src={scene.image} alt={scene.imageAlt} loading="lazy" className="w-full h-full object-cover img-cinematic" style={{ objectPosition: index === 1 ? 'center 30%' : 'center center' }} />
        <div className="absolute inset-0" style={{ background: isEven ? 'linear-gradient(to right, #152018 0%, rgba(21,32,24,0.75) 50%, transparent 100%)' : 'linear-gradient(to left, #0f1a1e 0%, rgba(15,26,30,0.75) 50%, transparent 100%)' }} />
      </div>
      <div className={`relative z-10 max-w-lg px-8 md:px-16 py-16 ${isEven ? '' : 'ml-auto text-right'}`}>
        <span className="chapter-label block mb-4">{scene.label}</span>
        <p className="font-display italic leading-relaxed" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)', fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
          «{scene.text}»
        </p>
      </div>
    </div>
  )
}

function Freedom() {
  const { freedom } = siteData
  const headerRef = useReveal(0.1) as React.RefObject<HTMLDivElement>
  return (
    <section id="freedom" aria-label="Свобода быть собой">
      <div ref={headerRef} className="reveal py-20 px-6 md:px-16 text-center" style={{ background: '#152018' }}>
        <span className="chapter-label block mb-4">Глава {freedom.chapterLabel}</span>
        <h2 className="font-display font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)' }}>{freedom.headline}</h2>
      </div>
      {freedom.scenes.map((scene, i) => <FreedomScene key={scene.id} scene={scene} index={i} />)}
    </section>
  )
}

// ── Together ─────────────────────────────────────────────────────────────────
function TogetherSlide({ slide, index }: { slide: typeof siteData.together.slides[0]; index: number }) {
  const ref = useReveal(0.1) as React.RefObject<HTMLDivElement>
  const bgColors = ['#1a2535', '#152030', '#12192a']
  return (
    <div ref={ref} className="reveal relative min-h-screen flex items-end overflow-hidden" style={{ background: bgColors[index % bgColors.length] }}>
      <div className="absolute inset-0 overflow-hidden">
        <img src={slide.image} alt={slide.imageAlt} loading="lazy" className="w-full h-full object-cover img-cinematic" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
      </div>
      <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-2xl">
        <p className="font-display italic" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)', fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
          {slide.text}
        </p>
      </div>
    </div>
  )
}

function Together() {
  const { together } = siteData
  const finalRef = useReveal(0.1) as React.RefObject<HTMLDivElement>
  const headerRef = useReveal(0.1) as React.RefObject<HTMLDivElement>
  return (
    <section id="together" aria-label="Путешествия вместе">
      <div ref={headerRef} className="reveal py-20 px-6 md:px-16 text-center" style={{ background: '#1a2535' }}>
        <span className="chapter-label block mb-4">Глава {together.chapterLabel}</span>
        <h2 className="font-display font-light max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)' }}>{together.headline}</h2>
      </div>
      {together.slides.map((slide, i) => <TogetherSlide key={i} slide={slide} index={i} />)}
      <div ref={finalRef} className="reveal py-28 md:py-40 px-6 md:px-16 text-center" style={{ background: '#152030' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-body mb-6 text-sm tracking-widest uppercase" style={{ color: 'var(--color-stone-light)' }}>{together.airBalloonText}</p>
          <div className="brass-divider mx-auto" />
          <p className="font-display font-light mt-8 leading-tight whitespace-pre-line" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)', fontSize: 'clamp(1.5rem, 4vw, 2.8rem)' }}>
            {together.finalText}
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Dogs ─────────────────────────────────────────────────────────────────────
function Dogs() {
  const { dogs } = siteData
  const imgRef = useReveal(0.1) as React.RefObject<HTMLDivElement>
  const textRef = useReveal(0.1) as React.RefObject<HTMLDivElement>
  return (
    <section id="dogs" className="py-24 md:py-36 overflow-hidden" style={{ background: 'var(--color-soft-white)' }} aria-label="Четыре лапы">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={imgRef} className="reveal-left">
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <img src={dogs.image} alt={dogs.imageAlt} loading="lazy" className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <div ref={textRef} className="reveal">
            <span className="chapter-label block mb-6" style={{ color: 'var(--color-charcoal)', opacity: 0.6 }}>Глава {dogs.chapterLabel}</span>
            <h2 className="font-display font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>{dogs.headline}</h2>
            <div className="brass-divider" />
            <div className="space-y-5 mt-8">
              {dogs.text.map((para, i) => (
                <p key={i} className="font-body leading-relaxed" style={{ color: 'var(--color-charcoal)', opacity: 0.75, fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)' }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Family ────────────────────────────────────────────────────────────────────
function Family() {
  const { family } = siteData
  const textRef = useReveal(0.05) as React.RefObject<HTMLDivElement>
  return (
    <section id="family" className="relative overflow-hidden" style={{ background: 'var(--color-ivory)' }} aria-label="Семья">
      <div className="relative min-h-[60vh] overflow-hidden">
        <img src={family.image} alt={family.imageAlt} loading="lazy" className="w-full h-full object-cover" style={{ minHeight: '60vh', display: 'block' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--color-ivory) 100%)' }} />
      </div>
      <div ref={textRef} className="reveal max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24" style={{ color: 'var(--color-charcoal)' }}>
        <span className="chapter-label block mb-6" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>Глава {family.chapterLabel}</span>
        <h2 className="font-display font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>{family.headline}</h2>
        <div className="brass-divider" />
        <div className="space-y-5 mt-8">
          {family.congratulation.map((para, i) => (
            <p key={i} className="font-body leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'var(--color-charcoal)', opacity: 0.8, fontWeight: i === 0 ? 600 : 400 }}>{para}</p>
          ))}
        </div>
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(181,154,107,0.3)' }}>
          <p className="font-display italic" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'var(--color-charcoal)' }}>{family.signature}</p>
        </div>
      </div>
    </section>
  )
}

// ── Wife ──────────────────────────────────────────────────────────────────────
function WifeMessage() {
  const { wifeMessage } = siteData
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const letterRef = useReveal(0.05) as React.RefObject<HTMLDivElement>

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else { audio.play(); setIsPlaying(true) }
  }

  return (
    <section id="wife" className="overflow-hidden" style={{ background: 'var(--color-soft-white)' }} aria-label="Письмо от жены">
      <div className="relative min-h-screen overflow-hidden flex items-end">
        <img src={wifeMessage.image} alt={wifeMessage.imageAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-soft-white) 0%, transparent 60%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 pb-16 md:pb-24 text-center w-full">
          <span className="font-display italic block" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', color: 'var(--color-charcoal)' }}>
            А теперь я хочу сказать тебе самое главное...
          </span>
        </div>
      </div>

      <div ref={letterRef} className="reveal max-w-2xl mx-auto px-6 md:px-12 py-16 md:py-24" style={{ color: 'var(--color-charcoal)' }}>
        <span className="chapter-label block mb-6" style={{ color: 'var(--color-charcoal)', opacity: 0.4 }}>Глава {wifeMessage.chapterLabel} — Личное</span>
        <div className="space-y-5">
          {wifeMessage.letter.map((line, i) => (
            <p key={i} className="font-body leading-relaxed" style={{
              fontSize: (i === 0 || i >= wifeMessage.letter.length - 2) ? 'clamp(1rem, 2vw, 1.2rem)' : 'clamp(0.95rem, 1.8vw, 1.05rem)',
              fontWeight: i === 0 ? 600 : 400,
              color: 'var(--color-charcoal)',
              opacity: 0.85,
            }}>{line}</p>
          ))}
        </div>

        {wifeMessage.audioFile && (
          <div className="mt-12">
            <audio ref={audioRef} src={wifeMessage.audioFile} onEnded={() => setIsPlaying(false)} />
            <button className="audio-btn" onClick={toggleAudio} aria-label={wifeMessage.audioButtonLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                {isPlaying ? <><rect x="2" y="2" width="4" height="12" /><rect x="10" y="2" width="4" height="12" /></> : <path d="M3 2l11 6-11 6z" />}
              </svg>
              {wifeMessage.audioButtonLabel}
            </button>
          </div>
        )}

        <div className="mt-16">
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
            <img src={wifeMessage.couplePortrait} alt={wifeMessage.couplePortraitAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Heritage ──────────────────────────────────────────────────────────────────
function Heritage() {
  const { heritage } = siteData
  const ref = useReveal(0.1) as React.RefObject<HTMLDivElement>
  return (
    <section id="heritage" className="py-24 md:py-36 overflow-hidden" style={{ background: 'var(--color-charcoal)' }} aria-label="История фамилии">
      <div ref={ref} className="reveal max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 items-start">
          <div className="flex justify-center md:justify-end">
            <div className="relative overflow-hidden p-6" style={{ background: 'rgba(181,154,107,0.08)', border: '1px solid rgba(181,154,107,0.2)' }}>
              <img src={heritage.coatOfArms} alt={heritage.coatOfArmsAlt} loading="lazy" className="w-48 h-auto mx-auto opacity-80" style={{ filter: 'sepia(0.2) brightness(0.9)' }} />
            </div>
          </div>
          <div className="md:col-span-2">
            <span className="chapter-label block mb-6">Глава {heritage.chapterLabel}</span>
            <h2 className="font-display font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)' }}>{heritage.headline}</h2>
            <div className="brass-divider" />
            <div className="space-y-4 mt-8">
              {heritage.text.map((para, i) => (
                <p key={i} className="font-body leading-relaxed" style={{ color: 'var(--color-stone-light)', fontSize: 'clamp(0.9rem, 1.6vw, 1rem)' }}>{para}</p>
              ))}
            </div>
            <p className="mt-8 font-body leading-relaxed" style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-stone)', borderLeft: '2px solid var(--color-brass)', paddingLeft: '1rem' }}>* {heritage.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Finale ────────────────────────────────────────────────────────────────────
function Finale() {
  const { finale } = siteData
  const ref = useReveal(0.1) as React.RefObject<HTMLElement>
  return (
    <section id="finale" ref={ref} className="reveal relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--color-forest)' }} aria-label="Финал">
      <div className="absolute inset-0 overflow-hidden">
        <img src={finale.image} alt={finale.imageAlt} loading="lazy" className="w-full h-full object-cover object-top img-cinematic" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(24,36,33,0.92) 0%, rgba(24,36,33,0.5) 50%, rgba(0,0,0,0.2) 100%)' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 py-24 text-center w-full">
        <h2 className="font-display font-light leading-tight mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-soft-white)' }}>{finale.headline}</h2>
        <h2 className="font-display font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-brass)' }}>{finale.headlineContinue}</h2>
        <p className="font-display italic mb-16" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-stone-light)', fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>{finale.subtext}</p>
        <div className="brass-divider mx-auto" />
        <div className="mt-10 space-y-3">
          <p className="font-display font-light" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'var(--color-soft-white)' }}>{finale.wish}</p>
          <p className="chapter-label tracking-[0.3em]">{finale.date}</p>
          <p className="font-display italic mt-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--color-stone-light)' }}>{finale.from}</p>
        </div>
      </div>
    </section>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeChapter, setActiveChapter] = useState('prologue')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveChapter(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <MusicToggle />
      <ChapterNav activeChapter={activeChapter} />
      <Prologue />
      <Character />
      <Freedom />
      <Together />
      <Dogs />
      <Family />
      <WifeMessage />
      <Heritage />
      <Finale />
    </main>
  )
}
