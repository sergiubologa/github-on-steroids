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
    return this._httpService.get<IPullRequests>(
      `https://api.github.com/search/issues?q=is:pr+repo:uipath/activities+author:sergiubologa&access_token=${
        this._authService.accessToken
      }`
    );
  }
}
