import { group } from "@kaviar/expose";
{{ collectionImportLine }}

export default {
Query: group([
{{# if checkLoggedIn }}
X.CheckLoggedIn(),
{{/ if }}
{{# if permissionCheck }}
X.PermissionCheck(['ADMIN']),
{{/ if }}
], [
{{ prefix }}FindOne: [
X.ToNovaOne({{ collectionClass }})
],
{{ prefix }}Find: [
X.ToNova({{ collectionClass }})
],
{{ prefix }}Count: [
X.ToCollectionCount({{ collectionClass }})
]
]
},
Mutation: group([
{{# if checkLoggedIn }}
X.CheckLoggedIn(),
{{/ if }}
{{# if permissionCheck }}
X.CheckPermission(['ADMIN']),
{{/ if }}
], [
{{ prefix }}InsertOne: [
X.ToDocumentUpdateByID({{ collectionClass }}),
X.ToNovaByID({{ collectionClass }})
],
{{ prefix }}UpdateOne: [
X.CheckDocumentExists({{ collectionClass }}),
X.ToDocumentUpdateByID({{ collectionClass }}),
X.ToNovaByID({{ collectionClass }})
],
{{ prefix }}DeleteOne: [
X.CheckDocumentExists({{ collectionClass }}),
X.ToDocumentDeleteByID({{ collectionClass }}),
X.ToNovaByID({{ collectionClass }})
]
])
}