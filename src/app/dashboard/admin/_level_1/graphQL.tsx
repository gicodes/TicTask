'use client';

import React from "react";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink , gql} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});

export const ADMIN_OVERVIEW_QUERY = gql`
  query AdminOverview {
    adminOverview {
      ticketsSummary {
        total
        escalatedCount
        recent {
          id
          title
          priority
          type
          status
          createdAt
        }
      }
      usersSummary {
        totalUsers
        activated
        newThisWeek
        inTrial
        suspended
        recent {
          id
          name
          email
          role
          createdAt
        }
      }
      teamsSummary {
        totalTeams
        averageMembers
        newThisWeek
        highActivityOrgs
        recent {
          id
          name
          slug
          memberCount
          createdAt
        }
      }
      subsSummary {
        mrr
        activePaying
        trials
        churnPercent
        failedPayments
        recent {
          id
          plan
          active
          amount
          userId
          teamId
          expiresAt
        }
      }
      blogSummary {
        total
        published
        drafts
        recent {
          id
          title
          slug
          createdAt
        }
      }
      changelogSummary {
        total
        recent {
          id
          version
          date
        }
      }
      faqSummary {
        total
        answered
        missingAnswers
        recent {
          id
          question
          createdAt
        }
      }
      partnerSummary {
        total
        approved
        pending
        recent {
          id
          name
          email
          createdAt
        }
      }
      careerSummary {
        total
        open
        closed
        recent {
          id
          role
          open
          createdAt
        }
      }
    }
  }
`;

// 2. TICKETS
export const ADMIN_TICKETS_QUERY = gql`
  query AdminTickets($first: Int = 20, $after: String, $filter: TicketsFilter) {
    adminTickets(first: $first, after: $after, filter: $filter) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          description
          priority
          status
          tags
          type
          dueDate
          amount
          currency
          createdAt
          updatedAt
          createdById
          assignedToId
          clientId
        }
      }
    }
  }
`;

export const DELETE_TICKET_MUTATION = gql`
  mutation AdminDeleteTicket($id: Int!) {
    adminDeleteTicket(id: $id)
  }
`;

// 3. USERS - FULL CRUD
export const ADMIN_USERS_QUERY = gql`
  query AdminUsers($first: Int = 20, $after: String, $filter: UsersFilter) {
    adminUsers(first: $first, after: $after, filter: $filter) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          email
          role
          isVerified
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      role
      isVerified
      createdAt
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
      role
      isVerified
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation AdminDeleteUser($id: Int!) {
    adminDeleteUser(id: $id)
  }
`;

// 4. TEAMS - FULL CRUD
export const ADMIN_TEAMS_QUERY = gql`
  query AdminTeams($first: Int = 20, $after: String, $filter: TeamsFilter) {
    adminTeams(first: $first, after: $after, filter: $filter) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          slug
          ownerId
          memberCount
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
      slug
      ownerId
      createdAt
    }
  }
`;

export const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam($input: UpdateTeamInput!) {
    updateTeam(input: $input) {
      id
      name
      slug
    }
  }
`;

export const DELETE_TEAM_MUTATION = gql`
  mutation AdminDeleteTeam($id: Int!) {
    adminDeleteTeam(id: $id)
  }
`;

// 5. SUBSCRIPTIONS - FULL CRUD
export const ADMIN_SUBSCRIPTIONS_QUERY = gql`
  query AdminSubscriptions($first: Int = 20, $after: String, $filter: SubscriptionsFilter) {
    adminSubscriptions(first: $first, after: $after, filter: $filter) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          plan
          active
          amount
          startedAt
          expiresAt
          userId
          teamId
          stripeSubscriptionId
        }
      }
    }
  }
`;

export const CANCEL_SUBSCRIPTION_MUTATION = gql`
  mutation CancelSubscription($id: Int!) {
    cancelSubscription(id: $id) {
      id
      active
    }
  }
`;

export const DELETE_SUBSCRIPTION_MUTATION = gql`
  mutation AdminDeleteSubscription($id: Int!) {
    adminDeleteSubscription(id: $id)
  }
`;

export function useAdminOverview() {
  return useQuery(ADMIN_OVERVIEW_QUERY, {
    fetchPolicy: "cache-and-network",
  });
}

export const AdminApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
