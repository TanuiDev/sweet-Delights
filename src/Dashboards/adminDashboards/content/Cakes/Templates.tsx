import templatesApi from "../../../../features/Cakes/templatesAPI";

const formatPrice = (price: number | string) => {
  const value =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^0-9.]/g, ""));
  if (Number.isNaN(value)) return price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(value);
};

const loadingPlaceholders = Array.from({ length: 6 });

export const Templates = () => {
  const {
    data: templatesDetails,
    isLoading: templatesLoading,
    isError: templatesError,
  } = templatesApi.useGetDesignsQuery();

  const res = templatesDetails?.data || [];

  const heroStats = [
    {
      label: "Designer Picks",
      value: `${res.length}+`,
      accent: "from-purple-400 to-pink-400",
    },
    {
      label: "Avg. Rating",
      value: "4.9/5",
      accent: "from-pink-400 to-amber-300",
    },
    {
      label: "Customizable",
      value: "100%",
      accent: "from-indigo-400 to-cyan-400",
    },
  ];

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-linear-to-br from-[#f7f0ff] via-[#ffe4f5] to-[#e0edff] px-4 py-10 text-gray-900 sm:px-6 lg:px-12">
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-purple-200/60 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-white to-transparent" />

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
        <header className="grid gap-8 rounded-3xl border border-white/60 bg-white/70 p-8 backdrop-blur-2xl sm:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
              ✨ Curated Cakes by Sweet Delights
            </p>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
                Ready-Made Cakes that Steal the Spotlight
              </h2>
              <p className="mt-4 text-base text-gray-600 md:text-lg">
                Discover couture-inspired cakes with artisanal finishes, bold
                florals, and decadent textures. Each template is crafted to wow
                guests and save you hours of custom work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  (
                    document.getElementById("newcake") as HTMLDialogElement
                  )?.showModal()
                }
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-pink-500/30 transition hover:translate-y-0.5 hover:shadow-xl"
              >
                Add New Template
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-6 py-3 text-sm font-semibold text-pink-500 transition hover:border-pink-400 hover:text-pink-600">
                Preview Catalog
              </button>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 sm:items-start">
            {heroStats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl border border-white/70 bg-white/80 p-4 text-center shadow-lg shadow-black/5"
              >
                <p
                  className={`text-2xl font-black bg-linear-to-r ${stat.accent} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </header>

        <section className="relative z-10">
          {templatesError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              Unable to load cake templates. Please refresh or try again later.
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templatesLoading
              ? loadingPlaceholders.map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="animate-pulse rounded-3xl border border-white/60 bg-white/70 p-6 shadow-2xl shadow-pink-200/40"
                  >
                    <div className="mb-4 h-48 w-full rounded-2xl bg-linear-to-r from-gray-200 to-gray-100" />
                    <div className="mb-2 h-4 w-3/4 rounded-full bg-gray-200" />
                    <div className="mb-6 h-4 w-full rounded-full bg-gray-100" />
                    <div className="mb-4 flex gap-3">
                      <span className="h-6 w-16 rounded-full bg-gray-100" />
                      <span className="h-6 w-20 rounded-full bg-gray-200" />
                    </div>
                    <div className="h-10 rounded-2xl bg-gray-100" />
                  </div>
                ))
              : res.map((template) => {
                  const availabilityLabel =
                    typeof template.Availability === "string"
                      ? template.Availability
                      : template.Availability
                        ? "Available"
                        : "Unavailable";
                  const isAvailable =
                    availabilityLabel.toLowerCase() === "available";

                  return (
                    <article
                      key={template.DesignID}
                      className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-2xl shadow-purple-100/70 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-pink-200/70 hover:ring-pink-100"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={template.ImageUrl}
                          alt={template.DesignName}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600 shadow">
                          Signature
                          <span className="h-2 w-2 rounded-full bg-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-5 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {template.DesignName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {template.Description}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              isAvailable
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {availabilityLabel}
                          </span>
                        </div>

                        <dl className="grid gap-3 text-sm text-gray-600">
                          <div className="flex justify-between rounded-2xl bg-purple-50/60 px-4 py-2">
                            <dt className="font-semibold text-purple-600">
                              Flavor
                            </dt>
                            <dd className="font-bold text-purple-800">
                              {template.BaseFlavor}
                            </dd>
                          </div>
                          <div className="flex justify-between rounded-2xl bg-pink-50/60 px-4 py-2">
                            <dt className="font-semibold text-pink-600">
                              Category
                            </dt>
                            <dd className="font-bold text-pink-800">
                              {template.Category}
                            </dd>
                          </div>
                          <div className="flex justify-between rounded-2xl bg-indigo-50/70 px-4 py-2">
                            <dt className="font-semibold text-indigo-600">
                              Size
                            </dt>
                            <dd className="font-bold text-indigo-800">
                              {template.Size}
                            </dd>
                          </div>
                        </dl>

                        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-3">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-gray-400">
                              Starting at
                            </p>
                            <p className="text-2xl font-black text-gray-900">
                              {formatPrice(template.BasePrice)}
                            </p>
                          </div>
                          <button className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700">
                            View Details
                            <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
          </div>
        </section>
      </section>
    </div>
  );
};
