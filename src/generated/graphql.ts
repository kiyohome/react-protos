import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Cursor: number;
  Date: string;
  Datetime: string;
  JSON: string;
  Time: string;
  UUID: string;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars['JSON']>;
  neq?: InputMaybe<Scalars['JSON']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the collection */
  deleteFromevent_schedulesCollection: Event_SchedulesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromeventsCollection: EventsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromgroupsCollection: GroupsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrommembersCollection: MembersDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromprofilesCollection: ProfilesDeleteResponse;
  /** Adds one or more `event_schedulesInsertResponse` records to the collection */
  insertIntoevent_schedulesCollection?: Maybe<Event_SchedulesInsertResponse>;
  /** Adds one or more `eventsInsertResponse` records to the collection */
  insertIntoeventsCollection?: Maybe<EventsInsertResponse>;
  /** Adds one or more `groupsInsertResponse` records to the collection */
  insertIntogroupsCollection?: Maybe<GroupsInsertResponse>;
  /** Adds one or more `membersInsertResponse` records to the collection */
  insertIntomembersCollection?: Maybe<MembersInsertResponse>;
  /** Adds one or more `profilesInsertResponse` records to the collection */
  insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Updates zero or more records in the collection */
  updateevent_schedulesCollection: Event_SchedulesUpdateResponse;
  /** Updates zero or more records in the collection */
  updateeventsCollection: EventsUpdateResponse;
  /** Updates zero or more records in the collection */
  updategroupsCollection: GroupsUpdateResponse;
  /** Updates zero or more records in the collection */
  updatemembersCollection: MembersUpdateResponse;
  /** Updates zero or more records in the collection */
  updateprofilesCollection: ProfilesUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromevent_SchedulesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_SchedulesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromeventsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<EventsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromgroupsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<GroupsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrommembersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MembersFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfilesFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoevent_SchedulesCollectionArgs = {
  objects: Array<Event_SchedulesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoeventsCollectionArgs = {
  objects: Array<EventsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntogroupsCollectionArgs = {
  objects: Array<GroupsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntomembersCollectionArgs = {
  objects: Array<MembersInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateevent_SchedulesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_SchedulesFilter>;
  set: Event_SchedulesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateeventsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<EventsFilter>;
  set: EventsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdategroupsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<GroupsFilter>;
  set: GroupsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatemembersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MembersFilter>;
  set: MembersUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
  DescNullsLast = 'DescNullsLast',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `event_schedules` */
  event_schedulesCollection?: Maybe<Event_SchedulesConnection>;
  /** A pagable collection of type `events` */
  eventsCollection?: Maybe<EventsConnection>;
  /** A pagable collection of type `groups` */
  groupsCollection?: Maybe<GroupsConnection>;
  /** A pagable collection of type `members` */
  membersCollection?: Maybe<MembersConnection>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
};

/** The root type for querying data */
export type QueryEvent_SchedulesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_SchedulesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_SchedulesOrderBy>>;
};

/** The root type for querying data */
export type QueryEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};

/** The root type for querying data */
export type QueryGroupsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<GroupsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupsOrderBy>>;
};

/** The root type for querying data */
export type QueryMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ProfilesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type Event_Schedules = {
  __typename?: 'event_schedules';
  end_date: Scalars['Datetime'];
  event_id?: Maybe<Scalars['Int']>;
  events?: Maybe<Events>;
  id: Scalars['Int'];
  start_date: Scalars['Datetime'];
};

export type Event_SchedulesConnection = {
  __typename?: 'event_schedulesConnection';
  edges: Array<Event_SchedulesEdge>;
  pageInfo: PageInfo;
};

export type Event_SchedulesDeleteResponse = {
  __typename?: 'event_schedulesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Schedules>;
};

export type Event_SchedulesEdge = {
  __typename?: 'event_schedulesEdge';
  cursor: Scalars['String'];
  node?: Maybe<Event_Schedules>;
};

export type Event_SchedulesFilter = {
  end_date?: InputMaybe<DatetimeFilter>;
  event_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  start_date?: InputMaybe<DatetimeFilter>;
};

export type Event_SchedulesInsertInput = {
  end_date?: InputMaybe<Scalars['Datetime']>;
  event_id?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['Datetime']>;
};

export type Event_SchedulesInsertResponse = {
  __typename?: 'event_schedulesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Schedules>;
};

export type Event_SchedulesOrderBy = {
  end_date?: InputMaybe<OrderByDirection>;
  event_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  start_date?: InputMaybe<OrderByDirection>;
};

export type Event_SchedulesUpdateInput = {
  end_date?: InputMaybe<Scalars['Datetime']>;
  event_id?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['Datetime']>;
};

export type Event_SchedulesUpdateResponse = {
  __typename?: 'event_schedulesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Schedules>;
};

export type Events = {
  __typename?: 'events';
  event_schedulesCollection?: Maybe<Event_SchedulesConnection>;
  group_id?: Maybe<Scalars['Int']>;
  groups?: Maybe<Groups>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type EventsEvent_SchedulesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_SchedulesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_SchedulesOrderBy>>;
};

export type EventsConnection = {
  __typename?: 'eventsConnection';
  edges: Array<EventsEdge>;
  pageInfo: PageInfo;
};

export type EventsDeleteResponse = {
  __typename?: 'eventsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type EventsEdge = {
  __typename?: 'eventsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Events>;
};

export type EventsFilter = {
  group_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type EventsInsertInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type EventsInsertResponse = {
  __typename?: 'eventsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type EventsOrderBy = {
  group_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type EventsUpdateInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type EventsUpdateResponse = {
  __typename?: 'eventsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type Groups = {
  __typename?: 'groups';
  eventsCollection?: Maybe<EventsConnection>;
  id: Scalars['Int'];
  membersCollection?: Maybe<MembersConnection>;
  name: Scalars['String'];
};

export type GroupsEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};

export type GroupsMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

export type GroupsConnection = {
  __typename?: 'groupsConnection';
  edges: Array<GroupsEdge>;
  pageInfo: PageInfo;
};

export type GroupsDeleteResponse = {
  __typename?: 'groupsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Groups>;
};

export type GroupsEdge = {
  __typename?: 'groupsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Groups>;
};

export type GroupsFilter = {
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type GroupsInsertInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type GroupsInsertResponse = {
  __typename?: 'groupsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Groups>;
};

export type GroupsOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type GroupsUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type GroupsUpdateResponse = {
  __typename?: 'groupsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Groups>;
};

export type Members = {
  __typename?: 'members';
  group_id: Scalars['Int'];
  groups?: Maybe<Groups>;
  profiles?: Maybe<Profiles>;
  user_id: Scalars['UUID'];
};

export type MembersConnection = {
  __typename?: 'membersConnection';
  edges: Array<MembersEdge>;
  pageInfo: PageInfo;
};

export type MembersDeleteResponse = {
  __typename?: 'membersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersEdge = {
  __typename?: 'membersEdge';
  cursor: Scalars['String'];
  node?: Maybe<Members>;
};

export type MembersFilter = {
  group_id?: InputMaybe<IntFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type MembersInsertInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type MembersInsertResponse = {
  __typename?: 'membersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersOrderBy = {
  group_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type MembersUpdateInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type MembersUpdateResponse = {
  __typename?: 'membersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type Profiles = {
  __typename?: 'profiles';
  avatar_url?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  membersCollection?: Maybe<MembersConnection>;
  nickname: Scalars['String'];
};

export type ProfilesMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

export type ProfilesConnection = {
  __typename?: 'profilesConnection';
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  __typename?: 'profilesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  __typename?: 'profilesEdge';
  cursor: Scalars['String'];
  node?: Maybe<Profiles>;
};

export type ProfilesFilter = {
  avatar_url?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nickname?: InputMaybe<StringFilter>;
};

export type ProfilesInsertInput = {
  avatar_url?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type ProfilesInsertResponse = {
  __typename?: 'profilesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  avatar_url?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  nickname?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  avatar_url?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type ProfilesUpdateResponse = {
  __typename?: 'profilesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type GetGroupsQueryVariables = Exact<{
  userId: Scalars['UUID'];
}>;

export type GetGroupsQuery = {
  __typename?: 'Query';
  membersCollection?: {
    __typename?: 'membersConnection';
    edges: Array<{
      __typename?: 'membersEdge';
      node?: {
        __typename?: 'members';
        groups?: {
          __typename?: 'groups';
          id: number;
          name: string;
          membersCollection?: {
            __typename?: 'membersConnection';
            edges: Array<{
              __typename?: 'membersEdge';
              node?: {
                __typename?: 'members';
                profiles?: {
                  __typename?: 'profiles';
                  id: string;
                  nickname: string;
                  avatar_url?: string | null;
                } | null;
              } | null;
            }>;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type AddGroupMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type AddGroupMutation = {
  __typename?: 'Mutation';
  insertIntogroupsCollection?: {
    __typename?: 'groupsInsertResponse';
    records: Array<{ __typename?: 'groups'; id: number }>;
  } | null;
};

export type AddMemberMutationVariables = Exact<{
  grougId: Scalars['Int'];
  userId: Scalars['UUID'];
}>;

export type AddMemberMutation = {
  __typename?: 'Mutation';
  insertIntomembersCollection?: {
    __typename?: 'membersInsertResponse';
    records: Array<{
      __typename?: 'members';
      group_id: number;
      user_id: string;
    }>;
  } | null;
};

export type RemoveMemberMutationVariables = Exact<{
  grougId: Scalars['Int'];
  userId: Scalars['UUID'];
}>;

export type RemoveMemberMutation = {
  __typename?: 'Mutation';
  deleteFrommembersCollection: {
    __typename?: 'membersDeleteResponse';
    records: Array<{
      __typename?: 'members';
      group_id: number;
      user_id: string;
    }>;
  };
};

export type GetProfileQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;

export type GetProfileQuery = {
  __typename?: 'Query';
  profilesCollection?: {
    __typename?: 'profilesConnection';
    edges: Array<{
      __typename?: 'profilesEdge';
      node?: {
        __typename?: 'profiles';
        id: string;
        nickname: string;
        avatar_url?: string | null;
      } | null;
    }>;
  } | null;
};

export type FindProfileQueryVariables = Exact<{
  first: Scalars['Int'];
  likeName: Scalars['String'];
}>;

export type FindProfileQuery = {
  __typename?: 'Query';
  profilesCollection?: {
    __typename?: 'profilesConnection';
    edges: Array<{
      __typename?: 'profilesEdge';
      node?: {
        __typename?: 'profiles';
        id: string;
        nickname: string;
        avatar_url?: string | null;
      } | null;
    }>;
  } | null;
};

export const GetGroupsDocument = `
    query getGroups($userId: UUID!) {
  membersCollection(filter: {user_id: {eq: $userId}}) {
    edges {
      node {
        groups {
          id
          name
          membersCollection {
            edges {
              node {
                profiles {
                  id
                  nickname
                  avatar_url
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetGroupsQuery = <TData = GetGroupsQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetGroupsQueryVariables,
  options?: UseQueryOptions<GetGroupsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetGroupsQuery, TError, TData>(
    ['getGroups', variables],
    fetcher<GetGroupsQuery, GetGroupsQueryVariables>(
      client,
      GetGroupsDocument,
      variables,
      headers
    ),
    options
  );
export const AddGroupDocument = `
    mutation addGroup($name: String!) {
  insertIntogroupsCollection(objects: [{name: $name}]) {
    records {
      id
    }
  }
}
    `;
export const useAddGroupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    AddGroupMutation,
    TError,
    AddGroupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<AddGroupMutation, TError, AddGroupMutationVariables, TContext>(
    ['addGroup'],
    (variables?: AddGroupMutationVariables) =>
      fetcher<AddGroupMutation, AddGroupMutationVariables>(
        client,
        AddGroupDocument,
        variables,
        headers
      )(),
    options
  );
export const AddMemberDocument = `
    mutation addMember($grougId: Int!, $userId: UUID!) {
  insertIntomembersCollection(objects: {group_id: $grougId, user_id: $userId}) {
    records {
      group_id
      user_id
    }
  }
}
    `;
export const useAddMemberMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    AddMemberMutation,
    TError,
    AddMemberMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<AddMemberMutation, TError, AddMemberMutationVariables, TContext>(
    ['addMember'],
    (variables?: AddMemberMutationVariables) =>
      fetcher<AddMemberMutation, AddMemberMutationVariables>(
        client,
        AddMemberDocument,
        variables,
        headers
      )(),
    options
  );
export const RemoveMemberDocument = `
    mutation removeMember($grougId: Int!, $userId: UUID!) {
  deleteFrommembersCollection(
    filter: {group_id: {eq: $grougId}, user_id: {eq: $userId}}
  ) {
    records {
      group_id
      user_id
    }
  }
}
    `;
export const useRemoveMemberMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RemoveMemberMutation,
    TError,
    RemoveMemberMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    RemoveMemberMutation,
    TError,
    RemoveMemberMutationVariables,
    TContext
  >(
    ['removeMember'],
    (variables?: RemoveMemberMutationVariables) =>
      fetcher<RemoveMemberMutation, RemoveMemberMutationVariables>(
        client,
        RemoveMemberDocument,
        variables,
        headers
      )(),
    options
  );
export const GetProfileDocument = `
    query getProfile($id: UUID!) {
  profilesCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        id
        nickname
        avatar_url
      }
    }
  }
}
    `;
export const useGetProfileQuery = <TData = GetProfileQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetProfileQueryVariables,
  options?: UseQueryOptions<GetProfileQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetProfileQuery, TError, TData>(
    ['getProfile', variables],
    fetcher<GetProfileQuery, GetProfileQueryVariables>(
      client,
      GetProfileDocument,
      variables,
      headers
    ),
    options
  );
export const FindProfileDocument = `
    query findProfile($first: Int!, $likeName: String!) {
  profilesCollection(first: $first, filter: {nickname: {like: $likeName}}) {
    edges {
      node {
        id
        nickname
        avatar_url
      }
    }
  }
}
    `;
export const useFindProfileQuery = <TData = FindProfileQuery, TError = unknown>(
  client: GraphQLClient,
  variables: FindProfileQueryVariables,
  options?: UseQueryOptions<FindProfileQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<FindProfileQuery, TError, TData>(
    ['findProfile', variables],
    fetcher<FindProfileQuery, FindProfileQueryVariables>(
      client,
      FindProfileDocument,
      variables,
      headers
    ),
    options
  );
