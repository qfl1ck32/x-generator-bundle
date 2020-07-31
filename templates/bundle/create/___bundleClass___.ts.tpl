import { Bundle } from "@kaviar/core";
import { Loader } from "@kaviar/loader";
import { ValidatorService } from "@kaviar/validator";
import { I{{ bundleClass }}Config } from "./defs";
import * as listeners from "./listeners";
import * as collections from "./collections";
import * as validators from "./validators";
{{# if containsGraphQL }}
  import GraphQLModule from './graphql';
{{/ if }}

export class {{ bundleClass }} extends Bundle<I{{ bundleClass }}Config> {
  async init() {
    const validator = this.container.get<ValidatorService>(ValidatorService);
    {{# if containsGraphQL }}
      const loader = this.container.get<Loader>(Loader);

      loader.load(GraphQLModule);
    {{/ if }}

    // Warming up forces instantiation and initialisastion of classes
    this.warmup([
      ...Object.values(listeners),
      ...Object.values(collections)
    ]);

    // Adding validators
    Object.values(validators).map(validator.addMethod);
  }
}