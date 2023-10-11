CREATE DATABASE rrff;
USE rrff;

CREATE TABLE rol (
    idRol BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombreRol TEXT
);

CREATE TABLE persona (
    idPersona BIGINT AUTO_INCREMENT PRIMARY KEY,
    ad TEXT,
    password TEXT,
    idRol BIGINT,
    activo INT,
    FOREIGN KEY (idRol) REFERENCES rol(idRol)
);

CREATE TABLE historialCambios (
    idHistorialCambios BIGINT AUTO_INCREMENT PRIMARY KEY,
    cambio TEXT,
    idPersona BIGINT,
    fecha DATETIME,
    FOREIGN KEY (idPersona) REFERENCES persona(idPersona)
);

CREATE TABLE historialConsulta (
    idHistorialConsulta BIGINT AUTO_INCREMENT PRIMARY KEY,
    idPersona BIGINT,
    fecha DATETIME,
    rangoBusqueda TEXT,
    entradaBusqueda TEXT,
    datoSolicitado TEXT
);
