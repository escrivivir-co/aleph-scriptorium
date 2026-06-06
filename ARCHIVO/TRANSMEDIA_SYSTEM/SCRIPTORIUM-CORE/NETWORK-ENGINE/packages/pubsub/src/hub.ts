import { Server } from 'socket.io';

export interface HubConfig {
  port: number;
}

export class PubSubHub {
  private io: Server;

  constructor(private config: HubConfig) {
    this.io = new Server({
      cors: { origin: '*' }
    });
  }

  public async start(): Promise<void> {
    // Interceptar conexiones para logging y routing global si es necesario
    this.io.on('connection', (socket) => {
      console.log(`[PubSub Hub] New client connected: ${socket.id} on namespace ${socket.nsp.name}`);
      
      socket.on('disconnect', () => {
        console.log(`[PubSub Hub] Client disconnected: ${socket.id}`);
      });
      
      // Permitir unirse a rooms dinámicamente
      socket.on('join_room', (room: string) => {
        socket.join(room);
        console.log(`[PubSub Hub] Socket ${socket.id} joined room ${room}`);
      });
      
      socket.on('leave_room', (room: string) => {
        socket.leave(room);
        console.log(`[PubSub Hub] Socket ${socket.id} left room ${room}`);
      });
    });

    this.io.listen(this.config.port);
    console.log(`[PubSub Hub] Running on port ${this.config.port}`);
  }

  public async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.io.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

export function createPubSubHub(config: HubConfig): PubSubHub {
  return new PubSubHub(config);
}
