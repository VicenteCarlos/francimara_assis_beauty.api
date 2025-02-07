export interface IGenericProps<T> {
  table?: string;
  id?: number;
  data?: T | T[];
  select?: object;
  include?: object;
  orderBy?: object;
  where?: object;
}

export interface IRepository<T> {
  getAll(props: IGenericProps<T>): Promise<T[]>;
  getById(props: IGenericProps<T>): Promise<T | null>;
  findUnique(props: IGenericProps<T>): Promise<T | null>;
  create(props: IGenericProps<T>): Promise<T>;
  update(props: IGenericProps<T>): Promise<T>;
  delete(props: IGenericProps<T>): Promise<T>;
  count(props: IGenericProps<T>): Promise<T | null>;
}
