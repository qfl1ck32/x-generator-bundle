import { Service, Inject, EventManager, ContainerInstance } from "@kaviar/core";

@Service()
export class {{ serviceClass }} {
  constructor(
    {{# if injectContainer }}
      @Inject()
      protected readonly container: ContainerInstance,
    {{/ if }}
    {{# if injectEventManager }}
      @Inject()
      protected readonly eventManager: EventManager,
    {{/ if }}
  ) {}

  {{# each methodsArray }}
    public {{ this }}() {
      throw new Error("Not implemented, yet.");
    }
  {{/ each }}
}