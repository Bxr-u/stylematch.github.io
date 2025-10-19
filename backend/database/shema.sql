-- StyleMatch - Esquema de base de datos
CREATE DATABASE IF NOT EXISTS stylematch_db;
USE stylematch_db;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de resultados de tests
CREATE TABLE test_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    tipo_test ENUM('colorimetria', 'estilo') NOT NULL,
    resultados JSON,
    fecha_realizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de costureros
CREATE TABLE costureros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(255),
    ciudad VARCHAR(100),
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de preguntas de tests
CREATE TABLE test_preguntas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('colorimetria', 'estilo') NOT NULL,
    pregunta TEXT NOT NULL,
    opciones JSON,
    orden INT DEFAULT 0,
    activa BOOLEAN DEFAULT TRUE
);

-- Tabla de catálogo de prendas
CREATE TABLE catalogo_prendas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo ENUM('superior', 'inferior', 'vestido', 'accesorio') NOT NULL,
    estilo VARCHAR(50),
    colorimetria VARCHAR(50),
    imagen_url VARCHAR(255),
    costurero_id INT,
    activa BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (costurero_id) REFERENCES costureros(id)
);

-- Insertar datos de ejemplo
INSERT INTO costureros (nombre, especialidad, telefono, email, ciudad, descripcion) VALUES
('María González', 'Vestidos de noche', '2221234567', 'maria@costurera.com', 'Tlaxcala', 'Especialista en vestidos elegantes y trajes formales'),
('Juan Pérez', 'Ropa casual', '2227654321', 'juan@costurero.com', 'Apizaco', 'Creo ropa cómoda y moderna para el día a día'),
('Ana Rodríguez', 'Trajes tradicionales', '2225558899', 'ana@artesana.com', 'Huamantla', 'Preservando las técnicas tradicionales de confección');

INSERT INTO test_preguntas (tipo, pregunta, opciones, orden) VALUES
('colorimetria', '¿Cómo describes tu tono de piel?', '["Muy claro", "Claro", "Medio", "Oscuro", "Muy oscuro"]', 1),
('colorimetria', '¿Tu piel tiene tonos cálidos (amarillentos/dorados) o fríos (rosados/azulados)?', '["Cálidos", "Fríos", "Neutral"]', 2),
('estilo', '¿Cómo describirías tu estilo personal?', '["Clásico", "Moderno", "Bohemio", "Deportivo", "Elegante"]', 1),
('estilo', '¿Qué tipo de prendas usas más frecuentemente?', '["Vestidos", "Pantalones", "Faldas", "Jeans", "Blusas"]', 2);