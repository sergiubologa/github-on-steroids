import { Component, OnInit } from "@angular/core";
import { PullRequestService } from "src/app/services/pull-request.service";
import { Observable } from "rxjs";
import {
  IPullRequests,
  IPullRequest
} from "src/app/models/pull-requests.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public pullRequests: IPullRequest[];
  displayedColumns: string[] = ["title", "updated_at", "state", "comments"];

  constructor(private _pullRequestsService: PullRequestService) {}

  ngOnInit() {
    this._pullRequestsService
      .getMyPullRequests()
      .subscribe((result: IPullRequests) => {
        this.pullRequests = result.items;
      });
  }
}
