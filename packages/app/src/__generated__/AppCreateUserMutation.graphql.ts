/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateUserInput = {
    clientMutationId?: string | null;
    user: UserInput;
};
export type UserInput = {
    id?: string | null;
    username?: string | null;
    createdAt?: unknown | null;
};
export type AppCreateUserMutationVariables = {
    input: CreateUserInput;
};
export type AppCreateUserMutationResponse = {
    readonly createUser: {
        readonly user: {
            readonly id: string;
        } | null;
    } | null;
};
export type AppCreateUserMutation = {
    readonly response: AppCreateUserMutationResponse;
    readonly variables: AppCreateUserMutationVariables;
};



/*
mutation AppCreateUserMutation(
  $input: CreateUserInput!
) {
  createUser(input: $input) {
    user {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateUserPayload",
    "kind": "LinkedField",
    "name": "createUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
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
    "name": "AppCreateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppCreateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c1a2887ef999a851445a3965e7b6a947",
    "id": null,
    "metadata": {},
    "name": "AppCreateUserMutation",
    "operationKind": "mutation",
    "text": "mutation AppCreateUserMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    user {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c3ed6ebc99f99364d1d9fe16e4fc6f95';
export default node;
