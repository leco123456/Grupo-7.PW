import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Juego {
  id: number;
  nombre: string;
  imagen: string;
  videoUrl: string;
  descripcion: string;
  galeria: string[];
  rating: number;
  precio: number;
  categoria: string; // <-- Agrega esta línea
}

interface JuegoContextType {
  juegos: Juego[];
  agregarJuego: (juego: Juego) => void;
  eliminarJuego: (id: number) => void;
  editarJuego: (juego: Juego) => void;
}

const JuegoContext = createContext<JuegoContextType | undefined>(undefined);

export const useJuegos = () => {
  const context = useContext(JuegoContext);
  if (!context) {
    throw new Error("useJuegos debe usarse dentro de un JuegoProvider");
  }
  return context;
};

// Todos los juegos tienen precio distinto de 0
const juegosIniciales: Juego[] = [
  {
    id: 1,
    nombre: "Sven Co-op",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/225840/header.jpg?t=1735034103",
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    descripcion: "Sven Co-op es un mod cooperativo para Half-Life que te permite jugar en equipo con amigos.",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ],
    rating: 4.5,
    precio: 9.99,
    categoria: "Cooperativo", // <-- Añade esto
  },
  {
    id: 2,
    nombre: "God of War",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1729030762",
    videoUrl: "https://www.youtube.com/embed/K0u_kAWLJOA",
    descripcion: "Una épica aventura de Kratos y Atreus en la mitología nórdica.",
    galeria: [
      "https://url.imagen4.jpg",
      "https://url.imagen5.jpg",
      "https://url.imagen6.jpg"
    ],
    rating: 5,
    precio: 59.99,
    categoria: "Aventura",
  },
  {
    id: 3,
    nombre: "Counter Strike 2",
    imagen: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595",
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    descripcion: "Durante las dos últimas décadas, Counter‑Strike ha proporcionado una experiencia competitiva de primer nivel para los millones de jugadores de todo el mundo que contribuyeron a darle forma. Ahora el próximo capítulo en la historia de CS está a punto de comenzar. Hablamos de Counter‑Strike 2.",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ],
    rating: 4.5,
    precio: 19.99,
    categoria: "Shooter",
  },
  {
    id: 4,
    nombre: "Red Dead Redemption 2",
    imagen: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643",
    videoUrl: "https://www.youtube.com/embed/someVideoID2",
    descripcion: "Una épica aventura de Kratos y Atreus en la mitología nórdica.",
    galeria: [
      "https://url.imagen4.jpg",
      "https://url.imagen5.jpg",
      "https://url.imagen6.jpg"
    ],
    rating: 5,
    precio: 69.99,
    categoria: "Aventura",
  },
  {
    id: 5,
    nombre: "Gang Beasts",
    imagen: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/285900/header.jpg?t=1732109683",
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    descripcion: "Gang Beasts es un desternillante juego multijugador de peleas absurdas entre personajes gelatinosos y gruñones.",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ],
    rating: 4.5,
    precio: 14.99,
    categoria: "Multijugador",
  },
];

export const JuegoProvider = ({ children }: { children: ReactNode }) => {
  // Persistencia en localStorage
  const [juegos, setJuegos] = useState<Juego[]>(() => {
    const guardados = localStorage.getItem('juegos');
    return guardados ? JSON.parse(guardados) : juegosIniciales;
  });

  useEffect(() => {
    localStorage.setItem('juegos', JSON.stringify(juegos));
  }, [juegos]);

  const agregarJuego = (nuevo: Juego) => {
    setJuegos(prev => [...prev, nuevo]);
  };

  const eliminarJuego = (id: number) => {
    setJuegos(prev => prev.filter(juego => juego.id !== id));
  };

  const editarJuego = (juegoEditado: Juego) => {
    setJuegos(prev =>
      prev.map(juego =>
        juego.id === juegoEditado.id ? juegoEditado : juego
      )
    );
  };

  return (
    <JuegoContext.Provider value={{ juegos, agregarJuego, eliminarJuego, editarJuego }}>
      {children}
    </JuegoContext.Provider>
  );
};
