// Datos de empleos disponibles
const jobOpenings = [
    { id: 1, title: "Desarrollador Frontend", company: "Globant", location: "Buenos Aires, Argentina" },
    { id: 2, title: "Diseñador UI/UX", company: "Mercado Libre", location: "Ciudad de México, México" },
    { id: 3, title: "Ingeniero de Software", company: "Despegar", location: "Montevideo, Uruguay" },
    { id: 4, title: "Project Manager", company: "Rappi", location: "Bogotá, Colombia" },
    { id: 5, title: "Desarrollador Backend", company: "BairesDev", location: "Santiago, Chile" },
    { id: 6, title: "Analista de Datos", company: "Accenture", location: "Lima, Perú" },
    { id: 7, title: "Ingeniero DevOps", company: "Softtek", location: "Guadalajara, México" },
    { id: 8, title: "Especialista en Ciberseguridad", company: "Telefónica", location: "Santiago, Chile" },
    { id: 9, title: "Ingeniero de Sistemas", company: "Everis", location: "Quito, Ecuador" },
    { id: 10, title: "Arquitecto de Soluciones", company: "Indra", location: "Montevideo, Uruguay" }
];

// Función para mostrar los empleos en el dashboard
function displayJobs(jobs) {
    const container = document.getElementById("jobsContainer");
    container.innerHTML = "";

    if (jobs.length === 0) {
        container.innerHTML =
            "<p>No se encontraron empleos que coincidan con tus criterios.</p>";
        return;
    }

    jobs.forEach((job) => {
        const jobDiv = document.createElement("div");
        jobDiv.className = "job";
        jobDiv.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Empresa:</strong> ${job.company}</p>
      <p><strong>Ubicación:</strong> ${job.location}</p>
    `;
        container.appendChild(jobDiv);
    });
}


function filterJobs() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const selectedLocation = document.getElementById("locationFilter").value;

    const filteredJobs = jobOpenings.filter((job) => {
        const matchesTitle = job.title.toLowerCase().includes(searchText);
        const matchesLocation = selectedLocation
            ? job.location === selectedLocation
            : true;
        return matchesTitle && matchesLocation;
    });

    displayJobs(filteredJobs);
}


function populateLocationFilter() {
    const locationSelect = document.getElementById("locationFilter");
    const locations = [...new Set(jobOpenings.map((job) => job.location))];

    locations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    populateLocationFilter();
    displayJobs(jobOpenings);

    document.getElementById("searchInput").addEventListener("input", filterJobs);
    document
        .getElementById("locationFilter")
        .addEventListener("change", filterJobs);
});
