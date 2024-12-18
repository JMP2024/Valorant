const BASE_URL = "https://valorant-api.com/v1";
const divResults = document.getElementById("container");
const themeToggle = document.getElementById("theme-toggle");


fetch(`${BASE_URL}/maps`)
  .then((res) => res.json())
  .then((jsonResponse) => {
    jsonResponse.data.forEach((map) => {
      if (map.splash && map.displayIcon && map.listViewIconTall) {
        addMapImage(
          map.splash,
          map.displayName,
          map.displayIcon,
          map.listViewIconTall
        );
      }
    });
  })
  .catch((error) => {
    console.error("Error al obtener los datos de la API:", error);
  });

// Función para agregar imágenes y minimapas
const addMapImage = (src, displayName, minimapSrc, listViewIconSrc) => {
  const mapDiv = document.createElement("div");
  mapDiv.classList.add(
    "w-full",
    "h-screen",
    "flex-shrink-0",
    "relative",
    "snap-start"
  );

  // Imagen de fondo
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Mapa de Valorant: ${displayName}`;
  img.classList.add("w-full", "h-full", "object-cover", "filter", "blur-sm");

  // Nombre del mapa
  const mapName = document.createElement("p");
  mapName.textContent = displayName;
  mapName.classList.add(
    "absolute",
    "top-4",
    "left-4",
    "text-3xl",
    "font-bold",
    "text-black",
    "z-10",
    "md:text-5xl"
  );

  // Contenedor para minimapa 
  const minimapContainer = document.createElement("div");
  minimapContainer.classList.add(
    "absolute",
    "top-20",
    "left-4",
    "w-24",
    "h-24",
    "opacity-60",
    "rounded-full",
    "overflow-hidden",
    "border-2",
    "border-gray-600",
    "opacity-60",
    "z-10",
    "sm:w-32",
    "sm:h-32",
    "md:w-40",
    "md:h-40"
  );

  const minimapImg = document.createElement("img");
  minimapImg.src = minimapSrc;
  minimapImg.alt = `Minimapa de ${displayName}`;
  minimapImg.classList.add("w-full", "h-full", "object-cover", "bg-black");

  // Contenedor para la imagen principal
  const centerImageContainer = document.createElement("div");
  centerImageContainer.classList.add(
    "absolute",
    "top-1/2",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "w-64",
    "h-64",  
    "rounded-lg",
    "overflow-hidden",
    "border-4",
    "border-white",
    "z-20",
    "sm:w-72",
    "sm:h-72",
    "md:w-96",
    "md:h-96"
  );

  const centerImage = document.createElement("img");
  centerImage.src = listViewIconSrc; 
  centerImage.alt = `Icono de vista de lista de ${displayName}`;
  centerImage.classList.add("w-full", "h-full", "object-cover");

  // Append de todos los elementos al mapDiv
  minimapContainer.appendChild(minimapImg);
  centerImageContainer.appendChild(centerImage);
  mapDiv.appendChild(img); 
  mapDiv.appendChild(mapName);
  mapDiv.appendChild(minimapContainer);
  mapDiv.appendChild(centerImageContainer); 
  divResults.appendChild(mapDiv);
};

// Modo claro/oscuro
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  const isDarkMode = body.classList.contains("dark");

  
  navbar.classList.toggle("bg-white", !isDarkMode);
  navbar.classList.toggle("bg-black", isDarkMode);

  themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
});
