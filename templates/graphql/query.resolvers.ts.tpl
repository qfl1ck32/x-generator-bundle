import { expose } from "@kaviar/expose";
import {
  CheckLoggedIn,
  CheckPermissions,
  CheckDocumentExists,
  ToModel,
  ToNova,
  ToNovaOne,
  Validate,
  ToService,
} from "@kaviar/x-bundle";

{{ collectionImportLine }}
{{ inputImportLine  }}
{{ serviceImportLine }}

export default {
  Query: expose({
    {{ mutationName }}: [
      {{# if checkLoggedIn }}
        CheckLoggedIn(),
      {{/ if }}
      {{# if permissionCheck }}
        PermissionCheck(['ADMIN']),
      {{/ if }}
      {{# if checkCollectionExistence }}
        CheckDocumentExists({{ collectionClass }})
      {{/ if }}
      {{# if hasInput }}
        ToModel({{ inputClass }}),
        Validate(),
      {{/ if }}
      {{{ endOperation }}}
    ]
  })
}