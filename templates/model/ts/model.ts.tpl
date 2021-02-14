{{# if yupValidation }}
  import { Schema, Is, a, an } from "@kaviar/validator-bundle";
{{/ if }}
{{# each enums }}
  import { {{ className }} } from "./enums/{{ className }}.enum";
  export { {{ className }} };
{{/ each }}


{{# if yupValidation }}@Schema(){{/ if }}
export class {{ modelClass }} {
  {{ tsContents }}
}

