import { ContainerInstance } from "@kaviar/core";
import { IRouteType, express } from "@kaviar/apollo-bundle";

export const {{ name }}Route: IRouteType = {
  path: "{{ path }}",
  type: "{{ type }}",
  handler: async (container: ContainerInstance, req: express.Request, res: express.Response, next) => {
    // Access parameters via req.params
    // Return json via res.json()
  }
}