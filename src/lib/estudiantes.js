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
    // Validar que los parámetros no estén vacíos
    if (!nombre || !apellido || !curso) {
      throw new Error("Nombre, apellido y curso son obligatorios");
    }
    
    // Crear nuevo estudiante
    const nuevoEstudiante = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      curso: curso.trim()
    };
    
    // Verificar si el estudiante ya existe
    const existe = this.estudiantes.some(est => 
      est.nombre.toLowerCase() === nuevoEstudiante.nombre.toLowerCase() &&
      est.apellido.toLowerCase() === nuevoEstudiante.apellido.toLowerCase()
    );
    
    if (existe) {
      throw new Error("El estudiante ya existe en la base de datos");
    }
    
    // Agregar el estudiante
    this.estudiantes.push(nuevoEstudiante);
    
    // Guardar en el archivo
    this.guardarEstudiantes();
    
    return `Estudiante ${nuevoEstudiante.nombre} ${nuevoEstudiante.apellido} agregado exitosamente al curso ${nuevoEstudiante.curso}`;
  }

  // TODO: Implementar método para buscar estudiante por nombre
  buscarEstudiantePorNombre(nombre) {
    if (!nombre) {
      return "Por favor proporciona un nombre para buscar";
    }
    
    const nombreBuscar = nombre.toLowerCase().trim();
    const estudiantesEncontrados = this.estudiantes.filter(est => 
      est.nombre.toLowerCase().includes(nombreBuscar)
    );
    
    if (estudiantesEncontrados.length === 0) {
      return `No se encontraron estudiantes con el nombre "${nombre}"`;
    }
    
    return estudiantesEncontrados.map(est => 
      `${est.nombre} ${est.apellido} - Curso: ${est.curso}`
    ).join('\n');
  }

  // TODO: Implementar método para buscar estudiante por apellido
  buscarEstudiantePorApellido(apellido) {
    if (!apellido) {
      return "Por favor proporciona un apellido para buscar";
    }
    
    const apellidoBuscar = apellido.toLowerCase().trim();
    const estudiantesEncontrados = this.estudiantes.filter(est => 
      est.apellido.toLowerCase().includes(apellidoBuscar)
    );
    
    if (estudiantesEncontrados.length === 0) {
      return `No se encontraron estudiantes con el apellido "${apellido}"`;
    }
    
    return estudiantesEncontrados.map(est => 
      `${est.nombre} ${est.apellido} - Curso: ${est.curso}`
    ).join('\n');
  }

  // TODO: Implementar método para listar estudiantes
  listarEstudiantes() {
    if (this.estudiantes.length === 0) {
      return "No hay estudiantes registrados en la base de datos";
    }
    
    const lista = this.estudiantes.map((est, index) => 
      `${index + 1}. ${est.nombre} ${est.apellido} - Curso: ${est.curso}`
    ).join('\n');
    
    return `Lista de estudiantes (${this.estudiantes.length} total):\n${lista}`;
  }
}

export { Estudiantes }
