export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date Custom scalar type */
  Date: any;
  /** The `EJSON` scalar type represents EJSON values as specified by [Meteor EJSON](https://docs.meteor.com/api/ejson.html). */
  EJSON: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** ObjectId custom scalar type */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type ChangePasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type DocumentUpdateInput = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type EndUserBoard = {
  __typename?: 'EndUserBoard';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  membersViewersIds: Array<Maybe<Scalars['ObjectId']>>;
  membersViewers: Array<Maybe<User>>;
  membersManagersIds: Array<Maybe<Scalars['ObjectId']>>;
  membersManagers: Array<Maybe<User>>;
  savedSupplierPackagesIds: Array<Maybe<Scalars['ObjectId']>>;
  savedSupplierPackages: Array<Maybe<SupplierPackage>>;
  ownerId: Scalars['ObjectId'];
  owner: User;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};



export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  EndUserBoardsInsertOne?: Maybe<EndUserBoard>;
  EndUserBoardsUpdateOne: EndUserBoard;
  EndUserBoardsDeleteOne?: Maybe<Scalars['Boolean']>;
  OrderItemsInsertOne?: Maybe<OrderItem>;
  OrderItemsUpdateOne: OrderItem;
  OrderItemsDeleteOne?: Maybe<Scalars['Boolean']>;
  OrdersInsertOne?: Maybe<Order>;
  OrdersUpdateOne: Order;
  OrdersDeleteOne?: Maybe<Scalars['Boolean']>;
  PackageAvailabilitySlotsInsertOne?: Maybe<PackageAvailabilitySlot>;
  PackageAvailabilitySlotsUpdateOne: PackageAvailabilitySlot;
  PackageAvailabilitySlotsDeleteOne?: Maybe<Scalars['Boolean']>;
  PaymentsInsertOne?: Maybe<Payment>;
  PaymentsUpdateOne: Payment;
  PaymentsDeleteOne?: Maybe<Scalars['Boolean']>;
  ReviewsInsertOne?: Maybe<Review>;
  ReviewsUpdateOne: Review;
  ReviewsDeleteOne?: Maybe<Scalars['Boolean']>;
  SubscriptionsInsertOne?: Maybe<Subscription>;
  SubscriptionsUpdateOne: Subscription;
  SubscriptionsDeleteOne?: Maybe<Scalars['Boolean']>;
  SupplierCategoriesInsertOne?: Maybe<SupplierCategory>;
  SupplierCategoriesUpdateOne: SupplierCategory;
  SupplierCategoriesDeleteOne?: Maybe<Scalars['Boolean']>;
  SupplierPackageInsertOne?: Maybe<SupplierPackage>;
  SupplierPackageUpdateOne: SupplierPackage;
  SupplierPackageDeleteOne?: Maybe<Scalars['Boolean']>;
  SupplierPackageAvailabilitySlotInsertOne?: Maybe<SupplierPackageAvailabilitySlot>;
  SupplierPackageAvailabilitySlotUpdateOne: SupplierPackageAvailabilitySlot;
  SupplierPackageAvailabilitySlotDeleteOne?: Maybe<Scalars['Boolean']>;
  SupplierProfilesInsertOne?: Maybe<SupplierProfile>;
  SupplierProfilesUpdateOne: SupplierProfile;
  SupplierProfilesDeleteOne?: Maybe<Scalars['Boolean']>;
  SupplierServiceBundlesInsertOne?: Maybe<SupplierServiceBundle>;
  SupplierServiceBundlesUpdateOne: SupplierServiceBundle;
  SupplierServiceBundlesDeleteOne?: Maybe<Scalars['Boolean']>;
  SupplierServicesInsertOne?: Maybe<SupplierService>;
  SupplierServicesUpdateOne: SupplierService;
  SupplierServicesDeleteOne?: Maybe<Scalars['Boolean']>;
  UsersInsertOne?: Maybe<User>;
  UsersUpdateOne: User;
  UsersDeleteOne?: Maybe<Scalars['Boolean']>;
  register: RegistrationResponse;
  changePassword?: Maybe<Scalars['Boolean']>;
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  resetPassword: ResetPasswordResponse;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  verifyEmail: VerifyEmailResponse;
};


export type MutationEndUserBoardsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationEndUserBoardsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationEndUserBoardsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationOrderItemsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationOrderItemsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationOrderItemsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationOrdersInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationOrdersUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationOrdersDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationPackageAvailabilitySlotsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationPackageAvailabilitySlotsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationPackageAvailabilitySlotsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationPaymentsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationPaymentsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationPaymentsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationReviewsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationReviewsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationReviewsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationSubscriptionsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationSubscriptionsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationSubscriptionsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationSupplierCategoriesInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationSupplierCategoriesUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationSupplierCategoriesDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationSupplierPackageInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationSupplierPackageUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationSupplierPackageDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationSupplierPackageAvailabilitySlotInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationSupplierPackageAvailabilitySlotUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationSupplierPackageAvailabilitySlotDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationSupplierProfilesInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationSupplierProfilesUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationSupplierProfilesDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationSupplierServiceBundlesInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationSupplierServiceBundlesUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationSupplierServiceBundlesDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationSupplierServicesInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationSupplierServicesUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationSupplierServicesDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationUsersInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationUsersUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationUsersDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationRegisterArgs = {
  input: RegistrationInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};


export type Order = {
  __typename?: 'Order';
  _id: Scalars['ObjectId'];
  totalPrice: Scalars['Float'];
  createdAt: Scalars['Date'];
  ownerId: Scalars['ObjectId'];
  owner: User;
  orderItems: Array<Maybe<OrderItem>>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  _id: Scalars['ObjectId'];
  totalPrice: Scalars['Float'];
  numberOfPersons: Scalars['Float'];
  pricePerPerson: Scalars['Float'];
  description: Scalars['String'];
  relatedPackageId: Scalars['ObjectId'];
  relatedPackage: SupplierPackage;
  availabilitySlotId: Scalars['ObjectId'];
  availabilitySlot: SupplierPackageAvailabilitySlot;
  orderId: Scalars['ObjectId'];
  order: Order;
};

export type PackageAvailabilitySlot = {
  __typename?: 'PackageAvailabilitySlot';
  _id: Scalars['ObjectId'];
  date: Scalars['Date'];
  hourStart: Scalars['Date'];
  hourEnd: Scalars['Date'];
  isBooked: Scalars['Boolean'];
  availabilitySupplierPackage: Array<Maybe<SupplierPackage>>;
  orderItem?: Maybe<OrderItem>;
};

export type Payment = {
  __typename?: 'Payment';
  _id: Scalars['ObjectId'];
  amount: Scalars['Float'];
  subscriptionId: Scalars['ObjectId'];
  subscription: Subscription;
};

export type Query = {
  __typename?: 'Query';
  EndUserBoardsFindOne?: Maybe<EndUserBoard>;
  EndUserBoardsFind: Array<Maybe<EndUserBoard>>;
  EndUserBoardsCount: Scalars['Int'];
  OrderItemsFindOne?: Maybe<OrderItem>;
  OrderItemsFind: Array<Maybe<OrderItem>>;
  OrderItemsCount: Scalars['Int'];
  OrdersFindOne?: Maybe<Order>;
  OrdersFind: Array<Maybe<Order>>;
  OrdersCount: Scalars['Int'];
  PackageAvailabilitySlotsFindOne?: Maybe<PackageAvailabilitySlot>;
  PackageAvailabilitySlotsFind: Array<Maybe<PackageAvailabilitySlot>>;
  PackageAvailabilitySlotsCount: Scalars['Int'];
  PaymentsFindOne?: Maybe<Payment>;
  PaymentsFind: Array<Maybe<Payment>>;
  PaymentsCount: Scalars['Int'];
  ReviewsFindOne?: Maybe<Review>;
  ReviewsFind: Array<Maybe<Review>>;
  ReviewsCount: Scalars['Int'];
  SubscriptionsFindOne?: Maybe<Subscription>;
  SubscriptionsFind: Array<Maybe<Subscription>>;
  SubscriptionsCount: Scalars['Int'];
  SupplierCategoriesFindOne?: Maybe<SupplierCategory>;
  SupplierCategoriesFind: Array<Maybe<SupplierCategory>>;
  SupplierCategoriesCount: Scalars['Int'];
  SupplierPackageFindOne?: Maybe<SupplierPackage>;
  SupplierPackageFind: Array<Maybe<SupplierPackage>>;
  SupplierPackageCount: Scalars['Int'];
  SupplierPackageAvailabilitySlotFindOne?: Maybe<SupplierPackageAvailabilitySlot>;
  SupplierPackageAvailabilitySlotFind: Array<Maybe<SupplierPackageAvailabilitySlot>>;
  SupplierPackageAvailabilitySlotCount: Scalars['Int'];
  SupplierProfilesFindOne?: Maybe<SupplierProfile>;
  SupplierProfilesFind: Array<Maybe<SupplierProfile>>;
  SupplierProfilesCount: Scalars['Int'];
  SupplierServiceBundlesFindOne?: Maybe<SupplierServiceBundle>;
  SupplierServiceBundlesFind: Array<Maybe<SupplierServiceBundle>>;
  SupplierServiceBundlesCount: Scalars['Int'];
  SupplierServicesFindOne?: Maybe<SupplierService>;
  SupplierServicesFind: Array<Maybe<SupplierService>>;
  SupplierServicesCount: Scalars['Int'];
  UsersFindOne?: Maybe<User>;
  UsersFind: Array<Maybe<User>>;
  UsersCount: Scalars['Int'];
  me: User;
  framework?: Maybe<Scalars['String']>;
};


export type QueryEndUserBoardsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryEndUserBoardsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryEndUserBoardsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryOrderItemsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryOrderItemsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryOrderItemsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryOrdersFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryOrdersFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryOrdersCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPackageAvailabilitySlotsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPackageAvailabilitySlotsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPackageAvailabilitySlotsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPaymentsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPaymentsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPaymentsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryReviewsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryReviewsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryReviewsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySubscriptionsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySubscriptionsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySubscriptionsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierCategoriesFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierCategoriesFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierCategoriesCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierPackageFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierPackageFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierPackageCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierPackageAvailabilitySlotFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierPackageAvailabilitySlotFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierPackageAvailabilitySlotCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierProfilesFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierProfilesFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierProfilesCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierServiceBundlesFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierServiceBundlesFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierServiceBundlesCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierServicesFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierServicesFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QuerySupplierServicesCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersCountArgs = {
  query?: Maybe<QueryInput>;
};

export type QueryInput = {
  filters?: Maybe<Scalars['EJSON']>;
  options?: Maybe<QueryOptionsInput>;
};

export type QueryOptionsInput = {
  sort?: Maybe<Scalars['JSON']>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  /** This is the Nova body that will get merged deeply with your request body. Useful for passing arguments. */
  sideBody?: Maybe<Scalars['EJSON']>;
};

export type RegistrationInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegistrationResponse = {
  __typename?: 'RegistrationResponse';
  /** Please not that if the user is required to validate his email for logging in, token will be null */
  token?: Maybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  username: Scalars['String'];
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  token: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ObjectId'];
  stars: Scalars['Float'];
  supplierId: Scalars['ObjectId'];
  supplier: SupplierProfile;
  byUserId: Scalars['ObjectId'];
  byUser: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  _id: Scalars['ObjectId'];
  expiresAt: Scalars['Date'];
  inTrial: Scalars['Boolean'];
  userId: Scalars['ObjectId'];
  user: User;
  subscriptionPayments: Array<Maybe<Payment>>;
  EndUserBoardsSubscription?: Maybe<SubscriptionEvent>;
  EndUserBoardsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  OrderItemsSubscription?: Maybe<SubscriptionEvent>;
  OrderItemsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  OrdersSubscription?: Maybe<SubscriptionEvent>;
  OrdersSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  PackageAvailabilitySlotsSubscription?: Maybe<SubscriptionEvent>;
  PackageAvailabilitySlotsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  PaymentsSubscription?: Maybe<SubscriptionEvent>;
  PaymentsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  ReviewsSubscription?: Maybe<SubscriptionEvent>;
  ReviewsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  SubscriptionsSubscription?: Maybe<SubscriptionEvent>;
  SubscriptionsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  SupplierCategoriesSubscription?: Maybe<SubscriptionEvent>;
  SupplierCategoriesSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  SupplierPackageSubscription?: Maybe<SubscriptionEvent>;
  SupplierPackageSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  SupplierPackageAvailabilitySlotSubscription?: Maybe<SubscriptionEvent>;
  SupplierPackageAvailabilitySlotSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  SupplierProfilesSubscription?: Maybe<SubscriptionEvent>;
  SupplierProfilesSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  SupplierServiceBundlesSubscription?: Maybe<SubscriptionEvent>;
  SupplierServiceBundlesSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  SupplierServicesSubscription?: Maybe<SubscriptionEvent>;
  SupplierServicesSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  UsersSubscription?: Maybe<SubscriptionEvent>;
  UsersSubscriptionCount?: Maybe<SubscriptionCountEvent>;
};


export type SubscriptionEndUserBoardsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionEndUserBoardsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionOrderItemsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionOrderItemsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionOrdersSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionOrdersSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionPackageAvailabilitySlotsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionPackageAvailabilitySlotsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionPaymentsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionPaymentsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionReviewsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionReviewsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSubscriptionsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSubscriptionsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierCategoriesSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierCategoriesSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierPackageSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierPackageSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierPackageAvailabilitySlotSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierPackageAvailabilitySlotSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierProfilesSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierProfilesSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierServiceBundlesSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierServiceBundlesSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierServicesSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionSupplierServicesSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionUsersSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionUsersSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};

export type SubscriptionCountEvent = {
  __typename?: 'SubscriptionCountEvent';
  count?: Maybe<Scalars['Int']>;
};

export type SubscriptionEvent = {
  __typename?: 'SubscriptionEvent';
  event: SubscriptionEventType;
  document?: Maybe<Scalars['EJSON']>;
};

export enum SubscriptionEventType {
  Added = 'added',
  Changed = 'changed',
  Removed = 'removed',
  Ready = 'ready'
}

export type SupplierCategory = {
  __typename?: 'SupplierCategory';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  description: Scalars['String'];
  serviceBundles: Array<Maybe<SupplierServiceBundle>>;
};

export type SupplierPackage = {
  __typename?: 'SupplierPackage';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  pricingType: SupplierPackagePricingType;
  isSpecialDeal: Scalars['Boolean'];
  pricePerPerson: Scalars['Float'];
  minimumPersons: Scalars['Float'];
  priceFixed: Scalars['Float'];
  description: Scalars['String'];
  orderForDisplay: Scalars['Float'];
  isBookingRequired: Scalars['Boolean'];
  supplierServiceBundleId: Scalars['ObjectId'];
  supplierServiceBundle: SupplierServiceBundle;
  availabilitySlots: Array<Maybe<SupplierPackageAvailabilitySlot>>;
  orderItems: Array<Maybe<OrderItem>>;
  savedInEndUserBoards: Array<Maybe<EndUserBoard>>;
};

export type SupplierPackageAvailabilitySlot = {
  __typename?: 'SupplierPackageAvailabilitySlot';
  _id: Scalars['ObjectId'];
  date: Scalars['Date'];
  hourStart: Scalars['Date'];
  hourEnd: Scalars['Date'];
  isBooked: Scalars['Boolean'];
  supplierPackageId: Scalars['ObjectId'];
  supplierPackage: SupplierPackage;
  availabilitySlotOrderItems: Array<Maybe<OrderItem>>;
};

export enum SupplierPackagePricingType {
  Fixed = 'FIXED',
  PerPerson = 'PER_PERSON'
}

export type SupplierProfile = {
  __typename?: 'SupplierProfile';
  _id: Scalars['ObjectId'];
  companyName: Scalars['String'];
  description: Scalars['String'];
  phoneNumber: Scalars['Float'];
  address: SupplierProfileAddress;
  ownerId: Scalars['ObjectId'];
  owner: User;
  supplierReviews: Array<Maybe<Review>>;
};

export type SupplierProfileAddress = {
  __typename?: 'SupplierProfileAddress';
  addressLine1: Scalars['String'];
  addressLine2: Scalars['String'];
  country: Scalars['String'];
  city: Scalars['String'];
  zip: Scalars['String'];
  geopoint?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type SupplierService = {
  __typename?: 'SupplierService';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  views: Scalars['Float'];
  numberOfSavesInBoards: Scalars['Float'];
  categoryId: Scalars['ObjectId'];
  category: SupplierCategory;
  packagesIds: Array<Maybe<Scalars['ObjectId']>>;
  packages: Array<Maybe<SupplierPackage>>;
};

export type SupplierServiceBundle = {
  __typename?: 'SupplierServiceBundle';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  views: Scalars['Float'];
  numberOfSavesInBoards: Scalars['Float'];
  categoryId: Scalars['ObjectId'];
  category: SupplierCategory;
  supplierPackages: Array<Maybe<SupplierPackage>>;
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  roles: Array<Maybe<Scalars['String']>>;
  userSubscription?: Maybe<UserSubscription>;
  /** Available for supplier users only */
  supplierProfile: SupplierProfile;
  /** Available for end users only */
  orders: Array<Maybe<Order>>;
  /** Available for end users only */
  givenReviewsToSuppliers: Array<Maybe<Review>>;
  /** Available for end users only */
  boardsWithViewAccess: Array<Maybe<EndUserBoard>>;
  /** Available for end users only */
  boardsWithManagementAccess: Array<Maybe<EndUserBoard>>;
  /** Available for end users only */
  myBoards: Array<Maybe<EndUserBoard>>;
  profile: UserProfile;
  isEnabled: Scalars['Boolean'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  _id: Scalars['ObjectId'];
  expiresAt: Scalars['Date'];
  inTrial: Scalars['Boolean'];
  userId: Scalars['ObjectId'];
  user: User;
  subscriptionPayments: Array<Maybe<Payment>>;
};

export type VerifyEmailInput = {
  username?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  token: Scalars['String'];
};
