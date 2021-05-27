import * as S from "./index";
import { FieldTypes } from "./index";

const project = new S.Project({
  name: "wedding-planner",
  microservices: [
    new S.BackendMicroservice({
      // "graphql"
      collections: [
        new S.Collection({
          name: "posts",
          graphql: true,
          fields: [
            new S.Field({
              variableName: "title",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});

console.log(project.microservices);

const c = new S.Collection({
  name: "posts",
  graphql: true,
  fields: [
    new S.Field({
      variableName: "title",
      type: "string",
    }),
  ],
});
console.log(c);
