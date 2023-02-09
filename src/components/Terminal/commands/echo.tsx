export function echo(cmd: string) {
  let output: string;

  if (cmd.startsWith("echo \"")) {
    output = cmd.slice(6, cmd.length - 2)
  } else {
    output = cmd.slice(5, cmd.length - 1)
  }

  return <p>{output}</p>
}