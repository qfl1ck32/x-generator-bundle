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

const commands: ICommand[] = [
  {
    namespace: "x",
    name: "project",
    inquirer: ProjectInquirer,
    writer: ProjectWriter,
  },
  {
    namespace: "x",
    name: "microservice",
    inquirer: MicroserviceInquirer,
    writer: MicroserviceWriter,
  },
  {
    namespace: "x",
    name: "create-bundle",
    inquirer: CreateBundleInquirer,
    writer: CreateBundleWriter,
  },
  {
    namespace: "x",
    name: "collection",
    inquirer: CollectionInquirer,
    writer: CollectionWriter,
  },
  {
    namespace: "x",
    name: "graphql-input",
    inquirer: GraphQLInputInquirer,
    writer: GraphQLInputWriter,
  },
  {
    namespace: "x",
    name: "graphql-entity",
    inquirer: GraphQLEntityInquirer,
    writer: GraphQLEntityWriter,
  },
  {
    namespace: "x",
    name: "service",
    inquirer: ServiceInquirer,
    writer: ServiceWriter,
  },
  {
    namespace: "x",
    name: "listener",
    inquirer: ListenerInquirer,
    writer: ListenerWriter,
  },
  {
    namespace: "x",
    name: "event",
    inquirer: EventInquirer,
    writer: EventWriter,
  },
  {
    namespace: "x",
    name: "exception",
    inquirer: ExceptionInquirer,
    writer: ExceptionWriter,
  },
  {
    namespace: "x",
    name: "graphql-mutation",
    inquirer: GraphQLMutationInquirer,
    writer: GraphQLMutationWriter,
  },
  {
    namespace: "x",
    name: "graphql-crud",
    inquirer: GraphQLCRUDInquirer,
    writer: GraphQLCRUDWriter,
  },
  {
    namespace: "x",
    name: "collection-link",
    inquirer: CollectionLinkInquirer,
    writer: CollectionLinkWriter,
  },
];

export default commands;
