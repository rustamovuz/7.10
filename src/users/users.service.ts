import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  provider: string;
}

/**
 * DIQQAT: Bu yerda oddiy xotiradagi (in-memory) massiv ishlatilgan,
 * shunchaki namuna sifatida. Haqiqiy loyihada buni TypeORM / Prisma /
 * Mongoose orqali bazaga ulang.
 */
@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const user: User = { id: this.idCounter++, ...data };
    this.users.push(user);
    return user;
  }
}
