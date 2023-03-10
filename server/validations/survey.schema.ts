const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: 'survey#/definitions/Survey',
  $id: 'survey',
  definitions: {
    Survey: {
      $id: 'Survey',
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
      required: ['sections', 'title'],
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
        id: {
          type: 'string',
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
      required: ['options', 'type'],
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
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['value'],
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
        id: {
          type: 'string',
        },
        type: {
          const: 'slider',
        },
        title: {
          type: 'string',
        },
        options: {
          type: 'array',
          items: {
            $ref: 'survey#/definitions/rangeItem',
          },
        },
        value: {
          type: 'string',
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
        surveyIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['options', 'type'],
    },
    rangeItem: {
      type: 'object',
      properties: {
        value: {
          type: 'number',
        },
        label: {
          type: 'string',
        },
      },
      required: ['value', 'label'],
      additionalProperties: false,
    },
    valueType: {
      type: 'string',
      enum: ['number', 'string'],
    },
    SwiperQ: {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: {
          type: 'string',
        },
        type: {
          const: 'swiper',
        },
        options: {
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
      required: ['options', 'type'],
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
      additionalProperties: false,
    },
    FillInBlankQ: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          const: 'fillInBlank',
        },
        id: {
          type: 'string',
        },
        options: {
          $ref: 'survey#/definitions/FillInBlankConfig',
        },
        attachment: {
          $ref: 'survey#/definitions/Attachment',
        },
        tip: {
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
      required: ['options', 'type'],
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
      required: ['text', 'type', 'options'],
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
        title: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        id: {
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
        surveyIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['type'],
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

const put = create;

export default { create, list, schema, get, put };
