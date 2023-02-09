import type { CollectionEntry } from "astro:content"
import type { StateUpdater, JSX } from "preact/compat"
import { cat, clearTerminal, echo, emacs, grep, head, help, hostname, locate, ls, lsl, lsDefault, uname, whoami, commandNotFound } from "./commands"
import { Prompt } from "./Prompt";

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
        <Prompt output={cmd} />
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
