import "@kaviar/validator";
import { {{ validatorConfigInterfaceName }} } from './{{ validatorClassName }}';

declare module "@kaviar/validator" {
namespace yup {
export interface {{ yupSchemaClassName }} {
{{ validatorName }}(config?: {{ validatorConfigInterfaceName }}): {{ yupSchemaClassName }}
}
}
}