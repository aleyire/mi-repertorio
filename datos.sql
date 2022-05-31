CREATE DATABASE repertorio;

CREATE TABLE repertorios (
    id SERIAL, 
    cancion VARCHAR(50), 
    artista VARCHAR(50), 
    tono VARCHAR(10)
);