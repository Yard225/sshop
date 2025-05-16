import { UniqueEntityID } from "./unique-entity-id";

export interface IRepository<T> {
  findById(id: UniqueEntityID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: UniqueEntityID): Promise<void>;
  findPaginated(page: number, limit: number): Promise<T[]>;
  findByFilter(filter: Partial<T>): Promise<T[]>;
  // findOneByField<K extends keyof T>(field: K, value: T[K]): Promise<T | null>;
}

export abstract class RepositoryBase<T> implements IRepository<T> {
  abstract findById(id: UniqueEntityID): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract save(entity: T): Promise<void>;
  abstract update(entity: T): Promise<void>;
  abstract delete(id: UniqueEntityID): Promise<void>;
  abstract findPaginated(page: number, limit: number): Promise<T[]>;
  abstract findByFilter(filter: Partial<T>): Promise<T[]>;
  // abstract findOneByField<K extends keyof T>(field: K, value: T[K]): Promise<T | null>;
}
