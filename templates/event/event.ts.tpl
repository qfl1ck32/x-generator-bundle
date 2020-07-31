import { Event } from "@kaviar/core";

{{# if hasInterfaceDefined }}
export interface {{ interfaceDefinition.name }} {
 {{ interfaceDefinition.tsContents }}
}
{{/ if }}

export class {{ eventClass }} extends Event<{{ eventInterfaceName }}> {

}