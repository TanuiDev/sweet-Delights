export const Featured = () => {
  const cakes = [
    {
      id: 1,
      name: "Chocolate Ganache Dream",
      description:
        "Rich chocolate cake with silky ganache frosting, topped with fresh raspberries and chocolate shavings",
      price: "ksh 3,000",
      image:
        "https://i.pinimg.com/736x/9d/25/93/9d2593780fe22eba7acf1ea6e9e57110.jpg",
      category: "ready-made" as const,
    },
    {
      id: 2,
      name: "Elegant Wedding Tier",
      description:
        "Classic white fondant wedding cake with delicate lace patterns and fresh florals",
      price: "ksh 2,300",
      image:
        "https://i.pinimg.com/736x/5b/d1/a2/5bd1a2689ac916f9b24b83e3a1136112.jpg",
      category: "ready-made",
    },
    {
      id: 3,
      name: "Strawberry Shortcake",
      description:
        "Light and fluffy vanilla cake layered with fresh strawberries and whipped cream",
      price: "ksh 1,500",
      image:
        "https://i.pinimg.com/736x/9c/15/b0/9c15b08d019a99dd1703de44a570068b.jpg",
      category: "ready-made" as const,
    },
  ];
  return (
    <>
      <div className="py-10 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
          Our Featured <span className="text-pink-500 text-3xl">Desserts</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-24">
          {cakes.map((cake) => (
            <div
              key={cake.id}
              className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-6"
            >
              <img
                className="w-full h-48 object-cover"
                src={cake.image}
                alt={cake.name}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {cake.name}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {cake.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-pink-500 font-bold text-lg">
                    {cake.price}
                  </span>
                  Order Now
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
