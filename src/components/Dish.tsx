// components/Dish.tsx

type DishProps = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function Dish({ name, description, price, image }: DishProps) {
  return (
    <div className="group border-b border-white/5 py-12">
      <div className="grid md:grid-cols-[220px_1fr_auto] gap-8 items-center">
        {/* Image */}
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-52 md:h-40 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </div>

        {/* Texte */}
        <div>
          <h3 className="text-[#F5F3EF] text-xl md:text-2xl font-light tracking-wide">
            {name}
          </h3>

          <p className="text-[#9F988C] text-sm md:text-base mt-4 leading-relaxed max-w-xl font-light">
            {description}
          </p>
        </div>

        {/* Prix */}
        <div className="mt-6 md:mt-0">
          <span className="text-[#C6A75E] tracking-widest text-sm md:text-base font-medium">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
