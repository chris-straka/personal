import type { CollectionEntry } from "astro:content"
import type { StateUpdater, JSX } from "preact/compat"
import { useState, useRef } from 'preact/hooks'
import { useStore } from "@nanostores/preact"
import { cat, clearTerminal, echo, emacs, grep, head, help, hostname, locate, ls, lsl, lsDefault, uname, whoami, commandNotFound } from "./commands"
import { isLeftPaw } from "../../store"

import styles from "./Terminal.module.scss"

const initialOutput = ([
  <li key={"0"}>
    <p>
      Welcome to the web terminal for Chris56974
      <br />
      <br />
      Try using 'help' for more information
    </p>
  </li>
])

type TerminalProps = {
  posts: CollectionEntry<'blog'>[]
  className: string
}

/** 
 * I pass the entire blog into this terminal because it actually uses all of the frontmatter and data
 */
export default function Terminal({ posts, className }: TerminalProps) {
  const [typing, setTyping] = useState(false);
  const [termOutput, setTermOutput] = useState(initialOutput)
  const [key, setKey] = useState(1)

  const termInputRef = useRef<HTMLSpanElement>(null)
  const termBodyRef = useRef<HTMLDivElement>(null)

  const $isLeftPawShown = useStore(isLeftPaw)

  const onKeyDownHandler = (e: KeyboardEvent) => {
    // I don't want to listen to these keys
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) return

    isLeftPaw.set(!$isLeftPawShown) // cat should type 

    if (!typing) {
      setTyping(true) // cursor should stop blinking
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
    <section
      role="application"
      aria-label="Web Terminal Emulator"
      className={`${styles.terminal} ${className}`}>
      <div
        className={styles.terminal__body}
        onClick={() => termInputRef.current?.focus()}
        ref={termBodyRef}
      >
        <ol className={styles.terminal__output}>{termOutput}</ol>
        <div className={styles.terminal__content}>
          <TerminalPrompt />
          <span
            className={`${styles.terminal__cli} ${styles.typing ? "typing" : undefined}`}
            contentEditable={true}
            spellCheck={false}
            ref={termInputRef}
            onKeyDown={onKeyDownHandler}
            onKeyUp={() => setTyping(false)}
          />
        </div>
      </div>
    </section>
  )
}

/** 
 * My commands reuse this for every command so don't inline it in Terminal.tsx
 */
export function TerminalPrompt({ output }: { output?: string | null }) {
  // [visitor@chris56974 ~]
  return (
    <span>
      <span style={{ color: 'red' }}>[</span>
      <span style={{ color: 'orange' }}>visitor</span>
      <span style={{ color: 'olive' }}>@</span>
      <span style={{ color: 'skyblue' }}>chris56974&nbsp;</span>
      <span style={{ color: 'purple' }}>~</span>
      <span style={{ color: 'red', marginRight: '3px' }}>]</span>
      {output && output}
    </span>
  )
}

export function processCmd(
  cmd: string | null,
  setTerminalOutput: StateUpdater<JSX.Element[]>,
  key: number,
  posts: CollectionEntry<'blog'>[],
) {
  if (cmd == null) return
  cmd = cmd.toLowerCase()

  let result: JSX.Element | null = null

  switch (cmd) {
    case "clear":
      clearTerminal(setTerminalOutput)
      break
    case "emacs":
      result = emacs()
      break
    case "help":
      result = help()
      break
    case "hostname":
      result = hostname()
      break
    case "ls":
      result = ls(posts)
      break
    case "ls -l":
      result = lsl(posts)
      break
    case "uname":
      result = uname()
      break
    case "whoami":
      result = whoami()
      break
    default:
      result = advanced(cmd, posts)
      break
  }

  if (result) {
    setTerminalOutput((prevState) => [
      ...prevState,
      <li key={key}>
        <TerminalPrompt output={cmd} />
        <samp>{result}</samp>
      </li>
    ])
  }
}

function advanced(cmd: string, posts: CollectionEntry<'blog'>[]) {
  let result: JSX.Element | null = null

  switch (true) {
    case cmd.startsWith("cat"):
      result = cat(cmd, posts)
      break
    case cmd.startsWith("echo"):
      result = echo(cmd)
      break
    case cmd.startsWith("grep"):
      grep(cmd, posts)
      break
    case cmd.startsWith("head"):
      result = head(cmd, posts)
      break
    case cmd.startsWith("locate"):
      result = locate(cmd, posts)
      break
    case cmd.startsWith("ls"):
      result = lsDefault(cmd)
      break
    default:
      result = commandNotFound(cmd)
      break
  }

  return result
}
