const BASE_URL = "https://valorant-api.com/v1";
    const backgroundImage = document.getElementById("background-image");
    const bustImage = document.getElementById("bust-image");
    const descriptionText = document.getElementById("description-text");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const navbar = document.getElementById("navbar");
    const carouselContainer = document.getElementById("carousel-container");
    const descriptionContainer = document.getElementById("description-container");

    // Variables globales para el carrusel
    let agents = [];
    let currentIndex = 0;

    // Función para cargar los agentes desde la API
    fetch(`${BASE_URL}/agents`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        agents = jsonResponse.data.filter(
          (agent) => agent.displayIcon && agent.background && agent.bustPortrait
        );
        if (agents.length > 0) {
          showAgentDetails(0); // Mostrar el primer agente
        }
      });

    // Función para mostrar los detalles del agente actual
    const showAgentDetails = (index) => {
      const agent = agents[index];
      backgroundImage.src = agent.background;
      bustImage.src = agent.bustPortrait;
      descriptionText.textContent =
        agent.description || "No hay descripción disponible para este agente.";
    };

    // Función para navegar al agente anterior
    prevBtn.addEventListener("click", () => {
      if (agents.length > 0) {
        currentIndex = (currentIndex - 1 + agents.length) % agents.length;
        showAgentDetails(currentIndex);
      }
    });

    // Función para navegar al siguiente agente
    nextBtn.addEventListener("click", () => {
      if (agents.length > 0) {
        currentIndex = (currentIndex + 1) % agents.length;
        showAgentDetails(currentIndex);
      }
    });

    // Modo claro/oscuro
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      const isDarkMode = body.classList.contains("dark");

      // Cambiar colores de fondo y texto dinámicamente
      navbar.classList.toggle("bg-white", !isDarkMode);
      navbar.classList.toggle("bg-black", isDarkMode);

      carouselContainer.classList.toggle("bg-white", !isDarkMode);
      carouselContainer.classList.toggle("bg-black", isDarkMode);

      descriptionContainer.classList.toggle("bg-gray-50", !isDarkMode);
      descriptionContainer.classList.toggle("bg-black", isDarkMode);

      descriptionText.classList.toggle("text-gray-800", !isDarkMode);
      descriptionText.classList.toggle("text-black", isDarkMode);

      body.classList.toggle("bg-black", !isDarkMode);
      body.classList.toggle("bg-black", isDarkMode);

      themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    });

     // Menu hamburguesa/toggle
     const menuToggle = document.getElementById("menu-toggle");
     const menu = document.getElementById("menu");
 
     menuToggle.addEventListener("click", () => {
       menu.classList.toggle("hidden");
     });