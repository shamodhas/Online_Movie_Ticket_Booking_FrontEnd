type MovieCardProps = {
  image: any
  name: string
  language: string
}

export default function MovieCard({ image, name, language }: MovieCardProps) {
  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden text-black transition-transform transform hover:cursor-pointer lg:hover:shadow-2xl lg:hover:scale-105">
      <div className="h-[80%]">
        <img
          src={image}
          alt="Movie Poster"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="bg-white text-black font-normal p-2">
        <h1 className="text-lg font-bold">{name}</h1>
        <p className="text-sm text-gray-600">{language}</p>
      </div>
    </div>
  )
}
