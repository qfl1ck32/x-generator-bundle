export class MicroserviceModel {
  name: string;
  type: MicroserviceTypeEnum;
  projectName: string;
  /**
   * Applies to frontend only
   */
  adminMode: boolean;
}

export enum MicroserviceTypeEnum {
  BACKEND = "backend",
  FRONTEND = "frontend",
}
