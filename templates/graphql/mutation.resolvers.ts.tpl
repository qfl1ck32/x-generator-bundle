import * as X from "@kaviar/x-bundle";

{{ collectionImportLine }}
{{ inputImportLine  }}
{{ serviceImportLine }}

export default {
  Mutation: {
    {{ mutationName }}: [
      {{# if checkLoggedIn }}
        X.CheckLoggedIn(),
      {{/ if }}
      {{# if permissionCheck }}
        X.PermissionCheck(['ADMIN']),
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
  }
}