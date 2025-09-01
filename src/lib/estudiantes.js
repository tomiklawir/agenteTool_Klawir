// Gestión de estudiantes
import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = './data/alumnos.json';

class Estudiantes {
  constructor() {
    this.estudiantes = [];
  }
  
  cargarEstudiantesDesdeJson() {
    try {
        const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
        this.estudiantes = data.alumnos || [];
    } catch (e) {
        console.error("Error al leer el archivo de datos:", e);
    }
  }

  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
      this.cargarEstudiantesDesdeJson();
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }

  // TODO: Implementar método para agregar estudiante
  agregarEstudiante(nombre, apellido, curso) {
    // Tu código aquí
  }

  // TODO: Implementar método para buscar estudiante por nombre
  buscarEstudiantePorNombre(nombre) {
    // Tu código aquí
  }

  // TODO: Implementar método para buscar estudiante por apellido
  buscarEstudiantePorApellido(apellido) {
    // Tu código aquí
  }

  // TODO: Implementar método para listar estudiantes
  listarEstudiantes() {
    // Tu código aquí
  }
}

export { Estudiantes }
