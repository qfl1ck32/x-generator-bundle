import { Exception } from "@kaviar/core";

export class NearestElementNotFoundException extends Exception<{
  type: string;
}> {
  getMessage() {
    return `We could not find a parent ${this.data.type}.`;
  }
}
