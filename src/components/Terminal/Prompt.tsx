type PromptProps = {
  output?: string | null
}

export const Prompt = ({ output }: PromptProps) => {

  // [visitor@chris56974 ~]
  return (
    <span>
      <span style={{ color: 'red' }}>[</span>
      <span style={{ color: 'orange' }}>visitor</span>
      <span style={{ color: 'olive' }}>@</span>
      <span style={{ color: 'skyblue' }}>chris56974&nbsp;</span>
      <span style={{ color: 'purple' }}>~</span>
      <span style={{ color: 'red', marginRight: '3px' }}>]</span>
      {output ? output : ""}
    </span>
  )
}