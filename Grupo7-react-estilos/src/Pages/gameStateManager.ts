// gameStateManager.ts
// Sistema centralizado para gestionar el estado de los juegos
import * as React from 'react';

// Interfaz unificada para los juegos
export interface UnifiedGame {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
  date: string;
  rating: number;
  videoUrl?: string;
  galeria?: string[];
}

// Interfaz para el admin (ACTUALIZADA para incluir videoUrl)
export interface AdminGame {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
  date: string;
  rating?: number;      // Agregado
  videoUrl?: string;    // Agregado - ESTO ES LO QUE FALTABA
}

// Interfaz para la página principal (compatibilidad con código existente)
export interface MainPageGame {
  id: number;
  nombre: string;
  imagen: string;
  videoUrl: string;
  descripcion: string;
  galeria: string[];
  rating: number;
  precio: number;
  categoria: string;
}

// Datos iniciales de juegos
const juegosIniciales: UnifiedGame[] = [
  {
    id: 1,
    name: "Sven Co-op",
    description: "Sven Co-op es un mod cooperativo para Half-Life que te permite jugar en equipo con amigos.",
    category: "Cooperativo",
    price: 9.99,
    discount: 0,
    photo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/225840/header.jpg?t=1735034103",
    date: "2023-01-01",
    rating: 4.5,
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ]
  },
  {
    id: 2,
    name: "God of War",
    description: "Una épica aventura de Kratos y Atreus en la mitología nórdica.",
    category: "Aventura",
    price: 59.99,
    discount: 0,
    photo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1729030762",
    date: "2023-01-02",
    rating: 5,
    videoUrl: "https://www.youtube.com/embed/K0u_kAWLJOA",
    galeria: [
      "https://url.imagen4.jpg",
      "https://url.imagen5.jpg",
      "https://url.imagen6.jpg"
    ]
  },
  {
    id: 3,
    name: "Counter Strike 2",
    description: "Durante las dos últimas décadas, Counter‑Strike ha proporcionado una experiencia competitiva de primer nivel para los millones de jugadores de todo el mundo que contribuyeron a darle forma. Ahora el próximo capítulo en la historia de CS está a punto de comenzar. Hablamos de Counter‑Strike 2.",
    category: "FPS",
    price: 19.99,
    discount: 0,
    photo: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595",
    date: "2023-01-03",
    rating: 4.5,
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ]
  },
  {
    id: 4,
    name: "Red Dead Redemption 2",
    description: "Una historia épica del salvaje oeste con Arthur Morgan y la banda de Dutch van der Linde.",
    category: "Aventura",
    price: 69.99,
    discount: 0,
    photo: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643",
    date: "2023-01-04",
    rating: 5,
    videoUrl: "https://www.youtube.com/embed/someVideoID2",
    galeria: [
      "https://url.imagen4.jpg",
      "https://url.imagen5.jpg",
      "https://url.imagen6.jpg"
    ]
  },
  {
    id: 5,
    name: "Gang Beasts",
    description: "Gang Beasts es un desternillante juego multijugador de peleas absurdas entre personajes gelatinosos y gruñones.",
    category: "Multijugador",
    price: 14.99,
    discount: 0,
    photo: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/285900/header.jpg?t=1732109683",
    date: "2023-01-05",
    rating: 4.5,
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ]
  }
];

// Clase para gestionar el estado de los juegos
class GameStateManager {
  private static instance: GameStateManager;
  private juegos: UnifiedGame[] = [];
  private nextId: number = 6;
  private listeners: Array<() => void> = [];

  private constructor() {
    this.loadGames();
  }

  public static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  // Cargar juegos desde localStorage
  private loadGames(): void {
    const juegosGuardados = localStorage.getItem('juegos_unificados');
    if (juegosGuardados) {
      try {
        const juegosParseados = JSON.parse(juegosGuardados);
        if (Array.isArray(juegosParseados) && juegosParseados.length > 0) {
          this.juegos = juegosParseados;
          // Calcular el siguiente ID
          const maxId = Math.max(...this.juegos.map(j => j.id), 0);
          this.nextId = maxId + 1;
          return;
        }
      } catch (e) {
        console.warn('Error al cargar juegos desde localStorage:', e);
      }
    }
    // Si no hay juegos guardados, usar los iniciales
    this.juegos = [...juegosIniciales];
    this.saveGames();
  }

  // Guardar juegos en localStorage
  private saveGames(): void {
    localStorage.setItem('juegos_unificados', JSON.stringify(this.juegos));
    this.notifyListeners();
  }

  // Sistema de suscripción para notificar cambios
  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }

  // Obtener todos los juegos
  public getGames(): UnifiedGame[] {
    return [...this.juegos];
  }

  // Agregar juego nuevo
  public addGame(gameData: Omit<UnifiedGame, 'id' | 'date'>): void {
    const newGame: UnifiedGame = {
      ...gameData,
      id: this.nextId++,
      date: new Date().toISOString().split('T')[0],
      rating: gameData.rating || 4.0,
      videoUrl: gameData.videoUrl || "https://www.youtube.com/embed/defaultVideo",
      galeria: gameData.galeria || [
        "https://url.imagen1.jpg",
        "https://url.imagen2.jpg",
        "https://url.imagen3.jpg"
      ]
    };
    
    this.juegos.push(newGame);
    this.saveGames();
  }

  // Actualizar juego existente
  public updateGame(id: number, gameData: Partial<UnifiedGame>): void {
    const index = this.juegos.findIndex(game => game.id === id);
    if (index !== -1) {
      this.juegos[index] = { ...this.juegos[index], ...gameData };
      this.saveGames();
    }
  }

  // Eliminar juego
  public deleteGame(id: number): void {
    this.juegos = this.juegos.filter(game => game.id !== id);
    this.saveGames();
  }

  // Convertir a formato para el admin (ACTUALIZADO)
  public getGamesForAdmin(): AdminGame[] {
    return this.juegos.map(game => ({
      name: game.name,
      description: game.description,
      category: game.category,
      price: game.price,
      discount: game.discount,
      photo: game.photo,
      date: game.date,
      rating: game.rating,      // Incluido
      videoUrl: game.videoUrl   // INCLUIDO - ESTO ES LO QUE FALTABA
    }));
  }

  // Convertir a formato para la página principal
  public getGamesForMainPage(): MainPageGame[] {
    return this.juegos.map(game => ({
      id: game.id,
      nombre: game.name,
      imagen: game.photo,
      videoUrl: game.videoUrl || "https://www.youtube.com/embed/defaultVideo",
      descripcion: game.description,
      galeria: game.galeria || [
        "https://url.imagen1.jpg",
        "https://url.imagen2.jpg",
        "https://url.imagen3.jpg"
      ],
      rating: game.rating,
      precio: game.price,
      categoria: game.category
    }));
  }

  // Agregar juego desde el admin (CORREGIDO)
  public addGameFromAdmin(adminGame: Omit<AdminGame, 'date'>): void {
    const unifiedGame: Omit<UnifiedGame, 'id' | 'date'> = {
      name: adminGame.name,
      description: adminGame.description,
      category: adminGame.category,
      price: adminGame.price,
      discount: adminGame.discount,
      photo: adminGame.photo,
      rating: adminGame.rating || 4.0,
      videoUrl: adminGame.videoUrl || "https://www.youtube.com/embed/defaultVideo", // CORREGIDO
      galeria: [
        "https://url.imagen1.jpg",
        "https://url.imagen2.jpg",
        "https://url.imagen3.jpg"
      ]
    };
    
    this.addGame(unifiedGame);
  }

  // Actualizar juego desde el admin (CORREGIDO)
  public updateGameFromAdmin(originalDate: string, updatedGame: AdminGame): void {
    const gameToUpdate = this.juegos.find(game => game.date === originalDate);
    if (gameToUpdate) {
      this.updateGame(gameToUpdate.id, {
        name: updatedGame.name,
        description: updatedGame.description,
        category: updatedGame.category,
        price: updatedGame.price,
        discount: updatedGame.discount,
        photo: updatedGame.photo,
        date: updatedGame.date,
        rating: updatedGame.rating,      // CORREGIDO
        videoUrl: updatedGame.videoUrl   // CORREGIDO - ESTO ES LO QUE FALTABA
      });
    }
  }

  // Eliminar juego desde el admin (buscar por fecha)
  public deleteGameFromAdmin(date: string): void {
    const gameToDelete = this.juegos.find(game => game.date === date);
    if (gameToDelete) {
      this.deleteGame(gameToDelete.id);
    }
  }

  // Obtener juego por ID
  public getGameById(id: number): UnifiedGame | undefined {
    return this.juegos.find(game => game.id === id);
  }

  // Resetear a juegos iniciales (útil para testing)
  public resetToInitialGames(): void {
    this.juegos = [...juegosIniciales];
    this.nextId = 6;
    this.saveGames();
  }
}

// Exportar la instancia singleton
export const gameStateManager = GameStateManager.getInstance();

// Hook personalizado de React para usar el estado de juegos
export const useGameState = () => {
  const [games, setGames] = React.useState<UnifiedGame[]>(() => gameStateManager.getGames());

  React.useEffect(() => {
    const unsubscribe = gameStateManager.subscribe(() => {
      setGames(gameStateManager.getGames());
    });

    return unsubscribe;
  }, []);

  return {
    games,
    addGame: (game: Omit<UnifiedGame, 'id' | 'date'>) => gameStateManager.addGame(game),
    updateGame: (id: number, game: Partial<UnifiedGame>) => gameStateManager.updateGame(id, game),
    deleteGame: (id: number) => gameStateManager.deleteGame(id),
    getGamesForMainPage: () => gameStateManager.getGamesForMainPage(),
    getGamesForAdmin: () => gameStateManager.getGamesForAdmin(),
    addGameFromAdmin: (game: Omit<AdminGame, 'date'>) => gameStateManager.addGameFromAdmin(game),
    updateGameFromAdmin: (originalDate: string, game: AdminGame) => gameStateManager.updateGameFromAdmin(originalDate, game),
    deleteGameFromAdmin: (date: string) => gameStateManager.deleteGameFromAdmin(date),
    resetToInitialGames: () => gameStateManager.resetToInitialGames()
  };
};