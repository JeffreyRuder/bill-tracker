import Ember from 'ember';

export function formatParty(params) {
  if (params[0].party === "Democrat") {
    return "democrat";
  } else if (params[0].party === "Republican") {
    return "republican";
  } else {
    return "";
  }
}

export default Ember.Helper.helper(formatParty);
