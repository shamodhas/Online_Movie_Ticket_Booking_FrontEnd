
type MovieCardProps = {
  image: any;
  name: string;
  language: string;
};

export default function MovieCard({ image, name, language }: MovieCardProps) {
  return (
    <div className="mx-auto bg-white rounded-lg shadow-xl overflow-hidden text-black transition-transform transform hover:cursor-pointer hover:shadow-2xl hover:scale-105">
      <div>
        <img src={image} alt="Movie Poster" className="w-full h-auto" />
      </div>
      <div className="bg-white text-black font-normal p-2">
        <h1 className="text-lg font-bold">{name}</h1>
        <p className="text-sm text-gray-600">{language}</p>
      </div>
    </div>
  );
}
