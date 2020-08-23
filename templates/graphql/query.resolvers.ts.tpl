import { execute } from "@kaviar/executor";
import * as X from "@kaviar/x-bundle";

{{ collectionImportLine }}
{{ inputImportLine  }}
{{ serviceImportLine }}

export default {
  Query: execute({
    {{ queryName }}: [
      {{# if checkLoggedIn }}
        X.CheckLoggedIn(),
      {{/ if }}
      {{# if permissionCheck }}
        X.CheckPermission(['ADMIN']),
      {{/ if }}
      {{# if checkCollectionExistence }}
        X.CheckDocumentExists({{ collectionClass }})
      {{/ if }}
      {{# if hasInput }}
        X.ToModel({{ inputClass }}),
        X.Validate(),
      {{/ if }}
      {{{ endOperation }}}
    ]
  })
}