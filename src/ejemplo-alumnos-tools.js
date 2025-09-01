import { tool } from "llamaindex";
import { z } from "zod";
import { Estudiantes } from "./lib/estudiantes.js";

// Instancia de la clase Estudiantes
const estudiantes = new Estudiantes();
estudiantes.cargarEstudiantesDesdeJson();

// Tool para buscar por nombre
const buscarPorNombre = tool({
    name: "buscarPorNombre",
    description: "Usa esta función para encontrar estudiantes por su nombre",
    parameters: z.object({
        nombre: z.string().describe("El nombre del estudiante a buscar"),
    }),
    execute: ({ nombre }) => {
        try {
            return estudiantes.buscarEstudiantePorNombre(nombre);
        } catch (error) {
            return `Error al buscar estudiante: ${error.message}`;
        }
    },
});

// Tool para buscar por apellido
const buscarPorApellido = tool({
    name: "buscarPorApellido",
    description: "Usa esta función para encontrar estudiantes por su apellido",
    parameters: z.object({
        apellido: z.string().describe("El apellido del estudiante a buscar"),
    }),
    execute: ({ apellido }) => {
        try {
            return estudiantes.buscarEstudiantePorApellido(apellido);
        } catch (error) {
            return `Error al buscar estudiante: ${error.message}`;
        }
    },
});

// Tool para agregar estudiante
const agregarEstudiante = tool({
    name: "agregarEstudiante",
    description: "Usa esta función para agregar un nuevo estudiante",
    parameters: z.object({
        nombre: z.string().describe("El nombre del estudiante"),
        apellido: z.string().describe("El apellido del estudiante"),
        curso: z.string().describe("El curso del estudiante (ej: 4A, 4B, 5A)"),
    }),
    execute: ({ nombre, apellido, curso }) => {
        try {
            return estudiantes.agregarEstudiante(nombre, apellido, curso);
        } catch (error) {
            return `Error al agregar estudiante: ${error.message}`;
        }
    },
});

// Tool para listar estudiantes
const listarEstudiantes = tool({
    name: "listarEstudiantes",
    description: "Usa esta función para mostrar todos los estudiantes",
    parameters: z.object({}),
    execute: () => {
        try {
            return estudiantes.listarEstudiantes();
        } catch (error) {
            return `Error al listar estudiantes: ${error.message}`;
        }
    },
});

export {
    buscarPorNombre,
    buscarPorApellido,
    agregarEstudiante,
    listarEstudiantes
};
