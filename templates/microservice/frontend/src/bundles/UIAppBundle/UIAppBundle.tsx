import { XRouter, XUIBundle } from "@kaviar/x-ui";
import * as Routes from "./routes";
import { Bundle } from "@kaviar/core";
// import * as ComponentOverrides from "./overrides";

export class UIAppBundle extends Bundle {
  async init() {
    // All routes are added via service
    const router = this.container.get(XRouter);
    router.add(Routes);

    // const xuiBundle = this.container.get(XUIBundle);
    // xuiBundle.updateComponents(ComponentOverrides);
  }
}
