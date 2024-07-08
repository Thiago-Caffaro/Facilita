import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Chat: a
    .model({
        content: a.string(),
        sender: a.string(),
        receiver: a.string()
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;
// Aqui estou exportando o modelo do esquema que foi criado

export const data = defineData({

  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
