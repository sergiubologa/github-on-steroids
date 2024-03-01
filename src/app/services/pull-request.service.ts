import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { IPullRequests } from "../models/pull-requests.model";

@Injectable({
  providedIn: "root"
})
export class PullRequestService {
  private _endpoint = "/repos/uipath/activities/pulls";

  constructor(
    private _httpService: HttpClient,
    private _authService: AuthService
  ) {}

  getMyPullRequests(): Observable<IPullRequests> {
    const username = localStorage.getItem(
      this._authService.USERNAME_LOCAL_STORAGE_KEY
    );
    return this._httpService.get<IPullRequests>(
      // `https://api.github.com/search/issues?q=is:pr+is:open+repo:uipath/du-app+author:${username}`, { headers:{'Authorization': `Bearer ${this._authService.accessToken}` }}
      `https://api.github.com/search/issues?q=is:pr+is:open+repo:sergiubologa/github-on-steroids`, { headers:{'Authorization': `Bearer ${this._authService.accessToken}` }}
    );
  }
}
