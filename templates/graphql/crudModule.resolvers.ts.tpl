import * as X from "@kaviar/x-bundle";
import { IResolverMap } from "@kaviar/graphql-bundle";

{{ collectionImportLine }}

export default {
  Query: [
    [
      {{# if checkLoggedIn }}
      X.CheckLoggedIn(),
      {{/ if }}
      {{# if permissionCheck }}
      X.CheckPermission(['ADMIN']),
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
        X.ToDocumentDeleteByID({{ collectionClass }})
      ]
    }
  ],
  {{# if hasSubscriptions }}
    Subscription: {
      {{ crudName }}Subscription: {
        resolve: (payload) => payload,
        subscribe: [
          X.ToSubscription({{ collectionClass }}),
        ]
      },
      {{ crudName }}SubscriptionCount: {
        resolve: (payload) => payload,
        subscribe: [
          X.ToSubscriptionCount({{ collectionClass }}),
        ]
      },
    },
  {{/ if }}
} as IResolverMap;