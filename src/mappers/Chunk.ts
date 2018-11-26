import { IDataValue, IMapper, IMapperConfig, IOutputType } from "./../Typings";

export interface IChunkConfig {
  // Start-index of chunk
  start?: string | number;
  // Size of chunk i char-length
  size?: string | number;
}

export class Chunk implements IMapper {
  static id: string = "CHUNK";
  static description: string = "Chunk";

  name: string = "Chunk";
  outputType: IOutputType = IOutputType.string;

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
      id: Chunk.id,
      params: {
        start: this.start,
        size: this.size,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    return data.toString().substring(this.start, this.start + this.size);
  }
}
