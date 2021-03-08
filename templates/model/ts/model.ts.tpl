{{# if yupValidation }}
  import { Schema, Is, a, an } from "@kaviar/validator-bundle";
{{/ if }}
{{# each remoteModels }}
  {{# if referenceBundle }}
    import { {{ name }} } from "../../../{{ bundle }}/collections";
  {{ else }}
    {{# if absoluteImport }}
      import { {{ name }} } from "{{ absoluteImport }}";
    {{ else }}
      import { {{ name }} } from "../";
    {{/ if }}
  {{/ if }}
{{/ each }}
{{# each enums }}
  import { {{ className }} } from "./enums/{{ className }}.enum";
  export { {{ className }} };
{{/ each }}


{{# if yupValidation }}@Schema(){{/ if }}
export class {{ modelClass }} {
  {{ toTypescript }}
}

{{# each localModels }}
class {{ name }} {
  {{ @root.toTypescriptSubmodel this }}
}

{{/ each }}
