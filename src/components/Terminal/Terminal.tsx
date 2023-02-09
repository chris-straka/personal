import type { CollectionEntry } from "astro:content"
import { useState, useRef } from 'preact/hooks'
import { processCmd } from "./processCmd"
import { Prompt } from "./Prompt"
import "./Terminal.css"

type Props = {
  posts: CollectionEntry<'blog'>[]
  switchPaw: (() => void)
}

const initialOutput = ([
  <li key={"0"}>
    <p>Welcome to the web terminal for Chris56974</p>
    <p>Try using 'help' for more information</p>
  </li>
])

const Terminal = ({ posts, switchPaw }: Props) => {
  const termInputRef = useRef<HTMLSpanElement>(null)
  const termBodyRef = useRef<HTMLDivElement>(null)
  const [typing, setTyping] = useState(false);
  const [termOutput, setTermOutput] = useState(initialOutput)
  const [key, setKey] = useState(1)

  const onKeyDownHandler = (e: KeyboardEvent) => {
    // I don't want to listen to these keys
    if (e.altKey && e.shiftKey && e.ctrlKey) return

    if (!typing) {
      setTyping(true) // cursor should stop blinking
      switchPaw()     // cat should type
      setTimeout(() => { setTyping(false) }, 100)
    }

    // if the user entered a command
    if (e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()

      const terminalCli = e.target as HTMLSpanElement
      const userCmd = terminalCli.textContent!.trim()

      processCmd(userCmd, setTermOutput, key, posts)
      setKey(key + 1)

      // get ready for the next cmd
      terminalCli.textContent = ''

      // this makes sure the user is always scrolled at the bottom
      setTimeout(() => {
        termBodyRef.current!.scrollTop = termBodyRef.current!.scrollHeight
      })
    }
  }

  return (
    <div id="terminal">
      <div
        id="terminal__body"
        onClick={() => termInputRef.current?.focus()}
        ref={termBodyRef}
      >
        <ol id="terminal__output">{termOutput}</ol>
        <div id="terminal__content">
          <Prompt />
          <span
            id="terminal__cli"
            className={typing ? "typing" : undefined}
            contentEditable={true}
            spellCheck={false}
            ref={termInputRef}
            onKeyDown={onKeyDownHandler}
            onKeyUp={() => setTyping(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default Terminal