import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloClient, ApolloError } from '@apollo/client/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { catchError, map, throwError } from 'rxjs';

export type IGitHubRepository = Record<string, unknown>;
export type IGitHubUser = {
  viewer: {
    avatarUrl: string;
    name: string;
    organizations: {
      nodes: IGitHubUserOrg[];
    };
  };
};
export interface IGitHubUserOrg {
  avatarUrl: string;
  description: string;
  id: string;
  login: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private _apolloClient: Apollo) {
    let pat = localStorage.getItem('pat') || this._promptPat();
    if (pat) localStorage.setItem('pat', pat);
  }

  getCurrentUser$() {
    return this._apolloClient
      .watchQuery<IGitHubUser>({
        query: gql`
          query {
            viewer {
              avatarUrl
              login
              name
              bio
              company
              email
              location
              websiteUrl
              organizations(first: 10) {
                nodes {
                  avatarUrl
                  description
                  id
                  login
                  url
                }
              }
            }
          }
        `,
      })
      .valueChanges.pipe(catchError(this._handleError));
  }

  private _promptPat = (
    message = 'Please enter your GitHub Personal Access Token (PAT)',
  ) => {
    let pat: string | null = null;
    pat = prompt(message);
    return pat;
  };

  private _handleError(_error: ApolloError) {
    const graphQLErrors = _error.graphQLErrors;
    // TODO: Handle GraphQL errors for INSUFFICIENT_SCOPES

    const networkError = _error.networkError as HttpErrorResponse | null;

    if (networkError) {
      if (networkError.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', networkError.error);
      } else if (networkError.status === 401) {
        // When Unauthorized, remove PAT & reload.
        localStorage.removeItem('pat');
        window.location.href = window.location.href;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${networkError.status}, body was: `,
          networkError.error,
        );
      }
    }

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
