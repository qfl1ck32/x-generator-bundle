import { ICommand } from "@kaviar/terminal-bundle";
import { GraphQLInputInquirer } from "../inquirers/GraphQLInputInquirer";
import { GraphQLInputWriter } from "../writers/GraphQLInputWriter";
import { GraphQLEntityWriter } from "../writers/GraphQLEntityWriter";
import {
  ProjectInquirer,
  MicroserviceInquirer,
  CreateBundleInquirer,
  CollectionInquirer,
} from "../inquirers";
import {
  ProjectWriter,
  MicroserviceWriter,
  CreateBundleWriter,
  CollectionWriter,
} from "../writers";
import { GraphQLEntityInquirer } from "../inquirers/GraphQLEntityInquirer";
import { ServiceInquirer } from "../inquirers/ServiceInquirer";
import { ServiceWriter } from "../writers/ServiceWriter";
import { ListenerInquirer } from "../inquirers/ListenerInquirer";
import { ListenerWriter } from "../writers/ListenerWriter";
import { EventInquirer } from "../inquirers/EventInquirer";
import { EventWriter } from "../writers/EventWriter";
import { ExceptionInquirer } from "../inquirers/ExceptionInquirer";
import { ExceptionWriter } from "../writers/ExceptionWriter";
import { GraphQLMutationInquirer } from "../inquirers/GraphQLMutationInquirer";
import { GraphQLMutationWriter } from "../writers/GraphQLMutationWriter";
import { GraphQLCRUDInquirer } from "../inquirers/GraphQLCRUDInquirer";
import { GraphQLCRUDWriter } from "../writers/GraphQLCRUDWriter";
import { CollectionLinkInquirer } from "../inquirers/CollectionLinkInquirer";
import { CollectionLinkWriter } from "../writers/CollectionLinkWriter";
import { GraphQLQueryInquirer } from "../inquirers/GraphQLQueryInquirer";
import { GraphQLQueryWriter } from "../writers/GraphQLQueryWriter";
import { ValidatorInquirer } from "../inquirers/ValidatorInquirer";
import { ValidatorWriter } from "../writers/ValidatorWriter";
import { ServerRouteInquirer } from "../inquirers/ServerRouteInquirer";
import { ServerRouteWriter } from "../writers/ServerRouteWriter";
import { FixtureInquirer } from "../inquirers/FixtureInquirer";
import { FixtureWriter } from "../writers/FixtureWriter";

const commands: ICommand[] = [
  {
    id: "x:project",
    inquirer: ProjectInquirer,
    writer: ProjectWriter,
  },
  {
    id: "x:microservice",
    inquirer: MicroserviceInquirer,
    writer: MicroserviceWriter,
  },
  {
    id: "x:bundle",
    inquirer: CreateBundleInquirer,
    writer: CreateBundleWriter,
  },
  {
    id: "x:collection",
    inquirer: CollectionInquirer,
    writer: CollectionWriter,
  },
  {
    id: "x:validator",
    inquirer: ValidatorInquirer,
    writer: ValidatorWriter,
  },
  {
    id: "x:graphql-input",
    inquirer: GraphQLInputInquirer,
    writer: GraphQLInputWriter,
  },
  {
    id: "x:graphql-entity",
    inquirer: GraphQLEntityInquirer,
    writer: GraphQLEntityWriter,
  },

  {
    id: "x:graphql-mutation",
    inquirer: GraphQLMutationInquirer,
    writer: GraphQLMutationWriter,
  },
  {
    id: "x:graphql-query",
    inquirer: GraphQLQueryInquirer,
    writer: GraphQLQueryWriter,
  },
  {
    id: "x:graphql-crud",
    inquirer: GraphQLCRUDInquirer,
    writer: GraphQLCRUDWriter,
  },
  {
    id: "x:service",
    inquirer: ServiceInquirer,
    writer: ServiceWriter,
  },
  {
    id: "x:server-route",
    inquirer: ServerRouteInquirer,
    writer: ServerRouteWriter,
  },
  {
    id: "x:listener",
    inquirer: ListenerInquirer,
    writer: ListenerWriter,
  },
  {
    id: "x:fixtures",
    inquirer: FixtureInquirer,
    writer: FixtureWriter,
  },
  {
    id: "x:event",
    inquirer: EventInquirer,
    writer: EventWriter,
  },
  {
    id: "x:exception",
    inquirer: ExceptionInquirer,
    writer: ExceptionWriter,
  },
  {
    id: "x:collection-link",
    inquirer: CollectionLinkInquirer,
    writer: CollectionLinkWriter,
  },
];

export default commands;
