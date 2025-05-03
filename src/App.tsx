import { createSignal, onMount } from 'solid-js'
import { FRAMES_COUNT, Player } from './Player.tsx'

export function App() {
  const [frame, setFrame] = createSignal(0)
  const [playing, setPlaying] = createSignal(import.meta.env.PROD)

  onMount(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        setPlaying(!playing())
      }
    })
  })

  return (
    <>
      <Player
        frame={frame()}
        setFrame={setFrame}
        playing={playing()}
        onMadokerClicked={(madoker) => {
          if (madoker === 'homura') {
            location.href = '//homu.gay'
          } else {
            location.href = '//tei.su'
          }
        }}
      />

      <button
        id="playpause"
        data-playing={playing() ? 'true' : 'false'}
        onClick={() => setPlaying(!playing())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          {playing()
            ? <rect width="6" height="6" x="9" y="9" rx="1" />
            : <path d="m10 8l6 4l-6 4z" />}
        </svg>
      </button>

      <div id="credits">
        &lt;3
        {' '}
        <a href="//tei.su">alina</a>
        {' & '}
        <a href="//std.mem.transmute.me">polina</a>
        <br />
        source:
        {' '}
        <a href="https://aahub.org/mlt/dac18c26776a9961339aadb2d8239945" target="_blank">animation</a>
        {', '}
        <a href="https://github.com/teidesu/mado-gay" target="_blank">code</a>
      </div>

      {import.meta.env.DEV && (
        <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
          <button onClick={() => setFrame(frame => (frame - 1 + FRAMES_COUNT) % FRAMES_COUNT)}>Prev</button>
          {frame() + 1}
          /
          {FRAMES_COUNT}
          <button onClick={() => setFrame(frame => (frame + 1) % FRAMES_COUNT)}>Next</button>
        </div>
      )}
    </>
  )
}
