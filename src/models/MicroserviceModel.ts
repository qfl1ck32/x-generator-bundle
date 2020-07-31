export class MicroserviceModel {
  name: string;
  type: MicroserviceTypeEnum;
  projectName: string;
}

export enum MicroserviceTypeEnum {
  BACKEND = "backend",
  FRONTEND = "frontend",
}
