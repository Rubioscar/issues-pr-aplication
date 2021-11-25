import { apiPath } from "common/constants";
import axios from "axios";

export const apiIssues = {
  list: (user, repo) => axios.get(`${apiPath}repos/${user}/${repo}/issues`),
  comments: (user, repo, issue) =>
    axios.get(`${apiPath}repos/${user}/${repo}/issues/${issue}/comments`),
};
