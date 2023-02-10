import type { StateUpdater, JSX } from "preact/compat"
import { cat } from "./cat"
import { echo } from "./echo"
import { grep } from "./grep"
import { head } from "./head"
import { locate } from "./locate"
import { ls, lsl, lsDefault } from "./ls"

const whoami = () => <p>visitor</p>
const hostname = () => <p>chris56974</p>
const uname = () => <p>Linux (Netlify)</p>
const emacs = () => <p>emacs: trash not found ;)</p>
const commandNotFound = (cmd: string) => <p>{cmd}: command not found</p>

function clearTerminal(setTerminalOutput: StateUpdater<JSX.Element[]>) {
  setTerminalOutput([])
}

const help = () => (
  <p style={{ marginTop: '16px', marginBottom: '16px' }}>
    You can use this terminal to read and find posts on this site.

    It's merely for novelty purposes. Keyboard shortcuts are not supported.

    All available commands are listed below.

    <br />
    <br />

    cat, clear, echo, grep, head, help, hostname, locate, ls (-l), uname, whoami
  </p>
)

export {
  cat,
  clearTerminal,
  commandNotFound,
  echo,
  emacs,
  grep,
  head,
  help,
  hostname,
  locate,
  ls,
  lsl,
  lsDefault,
  uname,
  whoami
}