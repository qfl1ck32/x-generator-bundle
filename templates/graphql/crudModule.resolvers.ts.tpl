import * as X from "@kaviar/x-bundle";
{{ collectionImportLine }}

export default {
  Query: [
    [
      {{# if checkLoggedIn }}
      X.CheckLoggedIn(),
      {{/ if }}
      {{# if permissionCheck }}
      X.PermissionCheck(['ADMIN']),
      {{/ if }}
    ], 
    {
      {{ crudName }}FindOne: [
      X.ToNovaOne({{ collectionClass }})
      ],
      {{ crudName }}Find: [
      X.ToNova({{ collectionClass }})
      ],
      {{ crudName }}Count: [
      X.ToCollectionCount({{ collectionClass }})
      ]
    }
  ],
  Mutation: [
    [
    {{# if checkLoggedIn }}
    X.CheckLoggedIn(),
    {{/ if }}
    {{# if permissionCheck }}
      X.CheckPermission(['ADMIN']),
    {{/ if }}
    ], {
      {{ crudName }}InsertOne: [
        X.ToDocumentInsert({{ collectionClass }}),
        X.ToNovaByResultID({{ collectionClass }})
      ],
      {{ crudName }}UpdateOne: [
        X.CheckDocumentExists({{ collectionClass }}),
        X.ToDocumentUpdateByID({{ collectionClass }}),
        X.ToNovaByResultID({{ collectionClass }})
      ],
      {{ crudName }}DeleteOne: [
        X.CheckDocumentExists({{ collectionClass }}),
        X.ToDocumentDeleteByID({{ collectionClass }}),
        X.ToNovaByResultID({{ collectionClass }})
      ]
    }
  ]
}