import { createEffect, createSignal, on } from 'solid-js'

const framesImported = import.meta.glob('./frames/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const frames = Object.values(framesImported) as string[]

export const FRAMES_COUNT = frames.length

function renderFrame(num: number) {
  let html = ''
  const lines = frames[num].split('\n')
  for (const line of lines) {
    let renderedLine = ''
    let pending = ''

    function reset() {
      renderedLine += pending
      if (pending) renderedLine += '</span>'
      pending = ''
    }

    for (const char of line) {
      if (char === 'H') {
        reset()
        renderedLine += '<span class="homura">'
      } else if (char === 'M') {
        reset()
        renderedLine += '<span class="madoka">'
      } else if (char === 'R') {
        reset()
      } else if (char === '\\') {
        pending += '<span class="backslash">/</span>'
      } else if (char === '∥') {
        pending += '<i class="parallel">⁄⁄</i>'
      } else {
        pending += char
      }
    }
    reset()

    html += `${renderedLine}\n`
  }

  return html
}

const FRAME_MS = 82

export function Player(props: {
  frame: number
  setFrame: (frame: number) => void
  playing: boolean
  onMadokerClicked: (madoker: 'madoka' | 'homura') => void
}) {
  const [html, setHtml] = createSignal('')

  createEffect(() => {
    setHtml(renderFrame(props.frame))
  })

  let timer: number | null
  createEffect(on(() => props.playing, (playing) => {
    if (!playing) {
      clearInterval(timer!)
      return
    }

    timer = setInterval(() => {
      props.setFrame((props.frame + 1) % FRAMES_COUNT)
    }, FRAME_MS)
  }))

  return (
    <div
      id="player"
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={html()}
      onMouseUp={(e) => {
        const span = e.target.closest('.madoka, .homura')
        if (span) {
          props.onMadokerClicked(span.classList.contains('madoka') ? 'madoka' : 'homura')
        }
      }}
    />
  )
}
