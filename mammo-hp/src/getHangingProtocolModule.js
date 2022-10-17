const defaultProtocols = {
  id: 'mammo-hp.hangingProtocolModule.default1',
  locked: true,
  hasUpdatedPriorsInformation: false,
  name: 'mammo-hp.hangingProtocolModule.default1',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2021-02-23T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [
    {
      id: 'Mammography',
      weight: 151,
      attribute: 'StudyInstanceUID',
      constraint: {
        equals: '2.16.840.1.114151.4.666.39421.6592.8997625',
      },
      required: true,
    },
  ],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    RCC: {
      imageMatchingRules: [],
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'ViewPosition',
          constraint: {
            equals: {
              value: 'CC',
            },
          },
          required: true,
        },
        {
          weight: 1,
          attribute: 'ImageLaterality',
          constraint: {
            equals: {
              value: 'R',
            },
          },
          required: true,
        },
      ],
      studyMatchingRules: [],
    },
    LCC: {
      imageMatchingRules: [],
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'ViewPosition',
          constraint: {
            equals: {
              value: 'CC',
            },
          },
          required: true,
        },
        {
          weight: 1,
          attribute: 'ImageLaterality',
          constraint: {
            equals: {
              value: 'L',
            },
          },
          required: true,
        },
      ],
      studyMatchingRules: [],
    },
    RMLO: {
      imageMatchingRules: [],
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'ViewPosition',
          constraint: {
            equals: {
              value: 'MLO',
            },
          },
          required: true,
        },
        {
          weight: 1,
          attribute: 'ImageLaterality',
          constraint: {
            equals: {
              value: 'R',
            },
          },
          required: true,
        },
      ],
      studyMatchingRules: [],
    },
    LMLO: {
      imageMatchingRules: [],
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'ViewPosition',
          constraint: {
            equals: {
              value: 'MLO',
            },
          },
          required: true,
        },
        {
          weight: 1,
          attribute: 'ImageLaterality',
          constraint: {
            equals: {
              value: 'L',
            },
          },
          required: true,
        },
      ],
      studyMatchingRules: [],
    }
  },
  stages: [
    {
      id: 'hYbmMy3b7pz7GLiaT',
      name: 'default',
      viewportStructure: {
        type: 'grid',
        properties: {
          rows: 2,
          columns: 2,
        },
      },
      viewports: [
        {
          viewportOptions: {
            toolGroupId: 'default',
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
          },
          displaySets: [
            {
              options: [],
              id: 'RCC',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
          },
          displaySets: [
            {
              options: [],
              id: 'LCC',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
          },
          displaySets: [
            {
              options: [],
              id: 'RMLO',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
          },
          displaySets: [
            {
              options: [],
              id: 'LMLO',
            },
          ],
        },
      ],
      createdDate: '2021-02-23T18:32:42.850Z',
    },
  ],
  numberOfPriorsReferenced: -1,
};

function getHangingProtocolModule() {
  return [
    {
      id: defaultProtocols.id,
      protocol: defaultProtocols,
    },
  ];
}

export default getHangingProtocolModule;
