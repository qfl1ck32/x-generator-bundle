import { Kernel } from "@kaviar/core";
import { XUIBundle } from "@kaviar/x-ui";
import { UIAppBundle } from "../bundles/UIAppBundle/UIAppBundle";
{{# if adminMode }}
  import { XUIAdminBundle } from "@kaviar/x-ui-admin";
{{/ if }}

// All UI bundles need to be prefixed with UI
// All X-Framework bundles have the first prefix X
export const kernel = new Kernel({
  bundles: [
    new XUIBundle({
      graphql: {
        // ApolloClient Options
        // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClientOptions
        uri: process.env.API_URL,
      },
    }),
    new UIAppBundle(),
    {{# if adminMode }}
      new XUIAdminBundle(),
    {{/ if }}
  ],
});
