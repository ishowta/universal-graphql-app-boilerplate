/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UsersScreenQueryVariables = {
    id: string;
};
export type UsersScreenQueryResponse = {
    readonly user: {
        readonly username: string;
    } | null;
};
export type UsersScreenQuery = {
    readonly response: UsersScreenQueryResponse;
    readonly variables: UsersScreenQueryVariables;
};



/*
query UsersScreenQuery(
  $id: String!
) {
  user(id: $id) {
    username
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersScreenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersScreenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3bf63f5ef1137f9a37afed2ecf53a1df",
    "id": null,
    "metadata": {},
    "name": "UsersScreenQuery",
    "operationKind": "query",
    "text": "query UsersScreenQuery(\n  $id: String!\n) {\n  user(id: $id) {\n    username\n  }\n}\n"
  }
};
})();
(node as any).hash = '1733f80e030ccd40415f4415f3aac950';
export default node;
