import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Chat: a
    .model({
        content: a.string(),
        senderId: a.string(),
        receiverId: a.string(),
        senderName: a.string(),
        receiverName: a.string()
    })
    .authorization((allow) => [allow.authenticated()]),
    Post : a
    .model({
      id: a.id(),
      user: a.string(),
      title: a.string(),
      content: a.string(),
      upvotes: a.integer(),
      downvotes: a.integer(),
    }).authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;
// Aqui estou exportando o modelo do esquema que foi criado

export const data = defineData({

  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

