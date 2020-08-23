export default /* GraphQL */`
  type Query {
    {{ crudName }}FindOne(query: QueryInput!): {{ entityType }}
    {{ crudName }}Find(query: QueryInput!): [{{ entityType }}]!
    {{ crudName }}Count(filters: JSON!): Int!
  }

  type Mutation {
    {{ crudName }}InsertOne(document: JSON!): {{ entityType }}
    {{ crudName }}UpdateOne(_id: ObjectId!, dataSet: JSON!): {{ entityType }}!
    {{ crudName }}DeleteOne(_id: ObjectId!): Boolean
  }
`