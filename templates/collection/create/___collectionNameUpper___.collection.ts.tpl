import { Collection, Behaviors } from "@kaviar/mongo-bundle";
import * as links from './{{ collectionNameUpper }}.links';
import * as reducers from './{{ collectionNameUpper }}.reducers';
import { {{ collectionModelClass }} } from "./{{ collectionModelClass }}.model";

export class {{ collectionClass }} extends Collection<{{ collectionModelClass }}> {
  static collectionName = "{{ collectionName }}"
  static model = {{ collectionModelClass }}

  static links = links;
  static reducers = reducers;

  {{# if containsBehaviors }}
  static behaviors = [
    {{# if isTimestampable }}
    Behaviors.Timestampable(),
    {{/ if }}

    {{# if isBlameable }}
    Behaviors.Blameable(),
    {{/ if }}

    {{# if isSoftdeletable }}
    Behaviors.Softdeletable(),
    {{/ if }}

    {{# if validationModel }}
    Behaviors.Validate({ model: {{ collectionModelClass }} }),
    {{/ if }}
  ]
  {{/ if }}

  // Create an array of indexes
  static indexes = [
    {{# if isSoftdeletable }}
    {key: {"isDeleted": 1 }},
    {{/ if }}
    {{# if isTimestampable }}
    {key: {"createdAt": 1 }},
    {{/ if }}
    {{# if isBlameable }}
    {key: {"createdBy": 1 }},
    {{/ if }}
  ]
  }