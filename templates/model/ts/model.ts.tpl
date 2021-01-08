{{# if yupValidation }}
import { Schema, Is, a, an } from "@kaviar/validator-bundle";
{{/ if }}

{{# if yupValidation }}@Schema(){{/ if }}
export class {{ modelClass }} {
{{ tsContents }}
}