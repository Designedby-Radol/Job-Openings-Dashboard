import { getJobs, addJob } from "./controllers.js";

let allJobs = [];

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

    const filteredJobs = allJobs.filter((job) => {
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
    // Limpiar las opciones excepto la primera ("Todas las ubicaciones")
    locationSelect.options.length = 1;
    const locations = [...new Set(allJobs.map((job) => job.location))];

    locations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });
}


document.addEventListener("DOMContentLoaded", async () => {
    // Cargar y mostrar empleos
    allJobs = await getJobs();
    populateLocationFilter();
    displayJobs(allJobs);

    document.getElementById("searchInput").addEventListener("input", filterJobs);
    document
        .getElementById("locationFilter")
        .addEventListener("change", filterJobs);

    // Manejo del modal para agregar empleo
    const addJobBtn = document.getElementById("addJobBtn");
    const jobModal = document.getElementById("jobModal");
    const closeBtn = jobModal.querySelector(".close");
    const jobForm = document.getElementById("jobForm");

    addJobBtn.addEventListener("click", () => {
        jobModal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        jobModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === jobModal) {
            jobModal.style.display = "none";
        }
    });

    // Envío del formulario para agregar empleo
    jobForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.getElementById("jobTitle").value;
        const company = document.getElementById("jobCompany").value;
        const location = document.getElementById("jobLocation").value;

        const newJob = { title, company, location };
        const addedJob = await addJob(newJob);
        if (addedJob) {
            // Actualizar lista de empleos tras agregar uno nuevo
            allJobs = await getJobs();
            populateLocationFilter();
            displayJobs(allJobs);
            jobModal.style.display = "none";
            jobForm.reset();
        } else {
            alert("Error al agregar el empleo, intente de nuevo.");
        }
    });
});
