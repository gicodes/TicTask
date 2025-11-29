'use client';

import React from "react";
import { ApolloProvider, useQuery, } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink , gql} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
      }
      teamsSummary {
        totalTeams
        averageMembers
        newThisWeek
        highActivityOrgs
      }
      subsSummary {
        mrr
        activePaying
        trials
        churnPercent
        failedPayments
      }
    }
  }
`;

export const ADMIN_TICKETS_QUERY = gql`
  query AdminTickets($first: Int!, $after: String, $filter: TicketsFilter) {
    adminTickets(first: $first, after: $after, filter: $filter) {
      totalCount
      edges {
        node {
          id
          title
          priority
          status
          createdAt
          updatedAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const DELETE_TICKET_MUTATION = gql`
  mutation AdminDeleteTicket($id: ID!) {
    adminDeleteTicket(id: $id)
  }
`;

export function useAdminOverview() {
  const result = useQuery(ADMIN_OVERVIEW_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  return {
    ...result,
    data:
      result.data ??
      ({
        adminOverview: {
          ticketsSummary: { total: 0, escalatedCount: 0, recent: [] },
          usersSummary: {
            totalUsers: 0,
            activated: 0,
            newThisWeek: 0,
            inTrial: 0,
            suspended: 0,
          },
          teamsSummary: {
            totalTeams: 0,
            averageMembers: 0,
            newThisWeek: 0,
            highActivityOrgs: 0,
          },
          subsSummary: {
            mrr: 0,
            activePaying: 0,
            trials: 0,
            churnPercent: 0,
            failedPayments: 0,
          },
        },
      } as const),
  };
}

export const AdminApolloProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
