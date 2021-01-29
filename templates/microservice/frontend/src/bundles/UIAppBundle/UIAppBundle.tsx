import { XRouter } from "@kaviar/x-ui";
import * as routeMap from "./routes";
import { Bundle } from "@kaviar/core";

export class UIAppBundle extends Bundle {
  async init() {
    // All routes are added via service
    const router = this.get<XRouter>(XRouter);

    router.add(routeMap);
  }
}
