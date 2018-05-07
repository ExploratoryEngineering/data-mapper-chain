import { IDataValue, IMapper, IMapperConfig } from "./../Models";

export interface IChunkConfig {
  // Start-index of chunk
  start?: string | number;
  // Size of chunk i char-length
  size?: string | number;
}

export class Chunk implements IMapper {
  static ident: string = "CHUNK";
  static description: string = "Chunk";
  name: string = "Chunk";
  start: number = 0;
  size: number = 4;

  constructor({
    start = "0",
    size = "4",
  }: IChunkConfig = { start, size }) {
    this.start = parseInt(start.toString(), 10);
    this.size = parseInt(size.toString(), 10);
  }

  config(): IMapperConfig {
    return {
      ident: Chunk.ident,
      params: {
        start: this.start,
        size: this.size,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    return {
      ...data, ...{
        value: data.value.toString().substring(this.start, this.start + this.size),
      },
    };
  }
}
