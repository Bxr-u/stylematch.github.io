-- StyleMatch - Esquema de base de datos actualizado
CREATE DATABASE IF NOT EXISTS stylematch_db;
USE stylematch_db;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    ciudad VARCHAR(100),
    bio TEXT,
    avatar VARCHAR(10) DEFAULT '👤',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion DATETIME,
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
    direccion TEXT,
    descripcion TEXT,
    experiencia VARCHAR(50),
    rating DECIMAL(3,2) DEFAULT 0.0,
    proyectos INT DEFAULT 0,
    tiempo_respuesta VARCHAR(50),
    avatar VARCHAR(10) DEFAULT '🧵',
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de redes sociales de costureros
CREATE TABLE costureros_redes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    costurero_id INT,
    tipo ENUM('whatsapp', 'facebook', 'instagram', 'email', 'telefono'),
    valor VARCHAR(255),
    FOREIGN KEY (costurero_id) REFERENCES costureros(id) ON DELETE CASCADE
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
    colores JSON,
    imagen VARCHAR(255),
    costurero_id INT,
    activa BOOLEAN DEFAULT TRUE,
    recomendada BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (costurero_id) REFERENCES costureros(id)
);

-- Tabla de favoritos
CREATE TABLE favoritos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    tipo ENUM('prenda', 'costurero') NOT NULL,
    item_id INT NOT NULL,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO costureros (nombre, especialidad, telefono, email, ciudad, descripcion, experiencia, rating, proyectos) VALUES
('María González', 'Vestidos de noche', '2221234567', 'maria@costurera.com', 'Tlaxcala', 'Especialista en vestidos elegantes y trajes formales', '15 años', 4.8, 120),
('Juan Pérez', 'Ropa casual', '2227654321', 'juan@costurero.com', 'Apizaco', 'Creo ropa cómoda y moderna para el día a día', '8 años', 4.5, 85),
('Ana Rodríguez', 'Trajes tradicionales', '2225558899', 'ana@artesana.com', 'Huamantla', 'Preservando las técnicas tradicionales de confección', '20 años', 4.9, 200);

INSERT INTO costureros_redes (costurero_id, tipo, valor) VALUES
(1, 'whatsapp', '+522221234567'),
(1, 'email', 'maria.costurera@email.com'),
(2, 'whatsapp', '+522227654321'),
(3, 'whatsapp', '+522225558899');

INSERT INTO test_preguntas (tipo, pregunta, opciones, orden) VALUES
('colorimetria', '¿Cómo describes tu tono de piel?', '["Muy claro", "Claro", "Medio", "Oscuro", "Muy oscuro"]', 1),
('colorimetria', '¿Tu piel tiene tonos cálidos (amarillentos/dorados) o fríos (rosados/azulados)?', '["Cálidos", "Fríos", "Neutral"]', 2),
('estilo', '¿Cómo describirías tu estilo personal?', '["Clásico", "Moderno", "Bohemio", "Deportivo", "Elegante"]', 1);

INSERT INTO catalogo_prendas (nombre, descripcion, tipo, estilo, colorimetria, colores, costurero_id, recomendada) VALUES
('Blazer Clásico de Lana', 'Blazer estructurado en lana merino, perfecto para looks formales y casuales', 'superior', 'clasico', 'otonio', '["#8B5A2B", "#2C2C2C", "#654321"]', 1, true),
('Vestido Fluido Bohemio', 'Vestido midi con estampado floral y mangas abullonadas, ideal para eventos casuales', 'vestido', 'bohemio', 'primavera', '["#FFB6C1", "#98FB98", "#DDA0DD"]', 3, true),
('Jeans Slim Elásticos', 'Jeans de corte slim con elastano para máxima comodidad y movimiento', 'inferior', 'deportivo', 'invierno', '["#2C2C2C", "#696969", "#36454F"]', 2, false);