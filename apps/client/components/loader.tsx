interface Props {
  full?: boolean
}

const Loader = ({ full = true }: Props) => {
  return (
    <div className={`flex items-center gap-1 justify-center ${full ? 'w-full h-[70vh]':''}`}>
      <div className="w-3 aspect-square rounded-full bg-gray-300 animate-pulse" />
      <div className="w-3 aspect-square rounded-full bg-gray-300 animate-pulse" />
      <div className="w-3 aspect-square rounded-full bg-gray-300 animate-pulse" />
    </div>
  )
}

export default Loader