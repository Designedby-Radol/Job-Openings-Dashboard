async function getJobs() {
    try {
      const response = await fetch("http://localhost:4000/jobOpenings");
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener los empleos:", error);
      return [];
    }
  }
  
  async function addJob(job) {
    try {
      const response = await fetch("http://localhost:4000/jobOpenings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
      });
      if (!response.ok) {
        throw new Error(`Error al agregar el empleo: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al agregar el empleo:", error);
      return null;
    }
  }
  
  export { getJobs, addJob };