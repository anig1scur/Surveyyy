const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: 'collection#/definitions/Collection',
  $id: 'collection',
  definitions: {
    Collection: {
      $id: 'Collection',
      type: 'object',
      properties: {
        surveyId: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        data: {
          type: 'any',
        },
      },
      required: ['data', 'surveyId'],
      additionalProperties: false,
    },
  },
};

export const create = {
  body: schema.definitions.Collection,
} as const;

export const list = {
  response: {
    200: {
      type: 'array',
      items: {
        $ref: 'collection#/definitions/Collection',
      },
    },
  },
} as const;

export const get = {
  response: {
    200: {
      $ref: 'collection#/definitions/Collection',
    },
  },
} as const;

export default { create, list, schema, get };
