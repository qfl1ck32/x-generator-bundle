type Query {
  {{ prefix }}FindOne(query: QueryInput!): {{ entityName }}
  {{ prefix }}Find(query: QueryInput!): [{{ entityName }}]!
  {{ prefix }}Count(filters: JSON!): Int!
}

type Mutation {
  {{ prefix }}InsertOne(document: JSON!): {{ entityName }}
  {{ prefix }}UpdateOne(_id: ID!, dataSet: JSON!): {{ entityName }}!
  {{ prefix }}DeleteOne(_id: ID!): Boolean
}