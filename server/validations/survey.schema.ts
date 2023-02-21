const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "survey#/definitions/Survey",
  $id: 'survey',
  definitions: {
    Survey: {
      $id: "Survey",
      type: 'object',
      properties: {
        sections: {
          type: 'array',
          items: {
            $ref: 'survey#/definitions/S',
          },
        },
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        authorId: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
      },
      required: ['sections', 'id', 'title', 'authorId'],
      additionalProperties: false,
    },
    S: {
      anyOf: [
        {
          $ref: 'survey#/definitions/Q',
        },
        {
          $ref: 'survey#/definitions/P',
        },
      ],
    },
    Q: {
      anyOf: [
        {
          $ref: 'survey#/definitions/ChoiceQ',
        },
        {
          $ref: 'survey#/definitions/SliderQ',
        },
        {
          $ref: 'survey#/definitions/SwiperQ',
        },
        {
          $ref: 'survey#/definitions/FillInBlankQ',
        },
      ],
    },
    ChoiceQ: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          const: 'choice',
        },
        options: {
          type: 'array',
          items: {
            $ref: 'survey#/definitions/Option',
          },
        },
        allowMultiple: {
          type: 'boolean',
        },
        allowCustom: {
          type: 'boolean',
        },
        customOptionLabel: {
          type: 'string',
        },
        attachment: {
          $ref: 'survey#/definitions/Attachment',
        },
        tip: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        surveyIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['id', 'options', 'type'],
    },
    Option: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
        },
        value: {
          type: 'string',
        },
        attachment: {
          $ref: 'survey#/definitions/Attachment',
        },
        skip: {
          type: 'object',
          properties: {
            size: {
              type: 'number',
            },
          },
          required: ['size'],
          additionalProperties: false,
        },
      },
      required: ['label', 'value'],
      additionalProperties: false,
    },
    Attachment: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
      },
      required: ['url', 'type'],
      additionalProperties: false,
    },
    SliderQ: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          const: 'slider',
        },
        min: {
          type: 'number',
        },
        max: {
          type: 'number',
        },
        value: {
          type: 'number',
        },
        step: {
          type: 'number',
        },
        labelConfig: {
          type: 'array',
          items: {
            $ref: 'survey#/definitions/rangeItem',
          },
        },
        valueType: {
          $ref: 'survey#/definitions/valueType',
        },
        attachment: {
          $ref: 'survey#/definitions/Attachment',
        },
        tip: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        surveyIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['id', 'labelConfig', 'max', 'min', 'type', 'valueType'],
    },
    rangeItem: {
      type: 'array',
      items: [
        {
          type: 'number',
        },
        {
          type: 'string',
        },
      ],
    },
    valueType: {
      type: 'string',
      enum: ['number', 'string'],
    },
    SwiperQ: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          const: 'swiper',
        },
        cards: {
          type: 'array',
          items: {
            $ref: 'survey#/definitions/cardItem',
          },
        },
        attachment: {
          $ref: 'survey#/definitions/Attachment',
        },
        tip: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        surveyIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['cards', 'id', 'type'],
    },
    cardItem: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        attachment: {
          $ref: 'survey#/definitions/Attachment',
        },
        yesLabel: {
          type: 'string',
        },
        noLabel: {
          type: 'string',
        },
      },
      required: ['id'],
      additionalProperties: false,
    },
    FillInBlankQ: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          const: 'fillInBlank',
        },
        config: {
          $ref: 'survey#/definitions/FillInBlankConfig',
        },
        attachment: {
          $ref: 'survey#/definitions/Attachment',
        },
        tip: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        surveyIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['config', 'id', 'type'],
    },
    FillInBlankConfig: {
      type: 'array',
      items: {
        anyOf: [
          {
            $ref: 'survey#/definitions/BlankItem',
          },
          {
            $ref: 'survey#/definitions/PlainItem',
          },
        ],
      },
    },
    BlankItem: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        type: {
          type: 'string',
          const: 'blank',
        },
        options: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['id', 'text', 'type', 'options'],
      additionalProperties: false,
    },
    PlainItem: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
        },
        type: {
          type: 'string',
          const: 'plain',
        },
      },
      required: ['text', 'type'],
      additionalProperties: false,
    },
    P: {
      $ref: 'survey#/definitions/Page',
    },
    Page: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'string',
          enum: ['normal', 'intro', 'page'],
        },
        text: {
          type: 'string',
        },
        iframeSrc: {
          type: 'string',
        },
        redirectUri: {
          type: 'string',
        },
        redirectDelay: {
          type: 'number',
        },
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        surveyIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['id', 'type'],
    },
  },
};

export const create = {
  body: schema.definitions.Survey,
} as const;

export const list = {
  response: {
    200: {
      type: 'array',
      items: {
        $ref: 'survey#/definitions/Survey',
      },
    },
  },
} as const;

export const get = {
  response: {
    200: {
      $ref: 'survey#/definitions/Survey',
    },
  },
} as const;

export default { create, list, schema, get };
