import {
  ArrayInput,
  BooleanInput,
  Edit,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  FormDataConsumer,
  SelectInput,
  Create,
  required,
  ChipField,
} from 'react-admin';

import { Fragment } from 'react';
import { QuestionType, fillInType, PageType } from '../../../common/types';

const ChoiceForm = ({ getSource }) => {
  return (
    <Fragment>
      <TextInput
        source={getSource('title')}
        shouldUnregister
        required
      />
      <ArrayInput source={getSource('options')} required>
        <SimpleFormIterator>
          <TextInput
            source='value'
            shouldUnregister
          />
          <ArrayInput source='skip'>
            <SimpleFormIterator>
              <TextInput shouldUnregister />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <BooleanInput
        shouldUnregister
        defaultValue={false}
        source={getSource('allowMultiple')}
      />
      <BooleanInput
        shouldUnregister
        defaultValue={false}
        source={getSource('allowCustom')}
      />
    </Fragment>
  );
};

const SliderForm = ({ getSource }) => (
  <Fragment>
    <TextInput
      source={getSource('title')}
      shouldUnregister
    />
    <ArrayInput source={getSource('options')} required>
      <SimpleFormIterator>
        <NumberInput
          source='value'
          shouldUnregister
        />
        <TextInput
          source='label'
          shouldUnregister
        />
      </SimpleFormIterator>
    </ArrayInput>
  </Fragment>
);

const SwiperForm = ({ getSource }) => (
  <Fragment>
    <TextInput
      source={getSource('title')}
      shouldUnregister
    />
    <ArrayInput source={getSource('options')} required>
      <SimpleFormIterator>
        <TextInput
          source='text'
          shouldUnregister
        />
        <TextInput
          source='image'
          shouldUnregister
        />
      </SimpleFormIterator>
    </ArrayInput>
  </Fragment>
);

const FillInBlankForm = ({ getBaseSource }) => (
  <ArrayInput source={getBaseSource('options')}>
    <SimpleFormIterator>
      <TextInput source='text' />
      <SelectInput
        shouldUnregister
        validate={required()}
        source='type'
        choices={Object.values(fillInType).map((type) => ({
          id: type,
          name: type,
        }))}
        defaultValue={fillInType.blank}
      />
      <FormDataConsumer>
        {({
          formData, // The whole form data
          scopedFormData, // The data for this item of the ArrayInput
          getSource, // A function to get the valid source inside an ArrayInput
          ...rest
        }) => {
          return scopedFormData && scopedFormData.type === fillInType.blank ? (
            <ArrayInput required source={getSource('options')}>
              <SimpleFormIterator>
                <TextInput />
              </SimpleFormIterator>
            </ArrayInput>
          ) : null;
        }}
      </FormDataConsumer>
    </SimpleFormIterator>
  </ArrayInput>
);

const IntroPage = ({ getSource }) => (
  <Fragment>
      <TextInput
      source={getSource('title')}
      required
      multiline
      shouldUnregister
    />
    <TextInput
      source={getSource('text')}
      required
      multiline
      shouldUnregister
    />
    <TextInput
      source={getSource('iframeSrc')}
      shouldUnregister
    />
    <TextInput
      source={getSource('redirectUri')}
      shouldUnregister
    />
    <NumberInput
      shouldUnregister
      source={getSource('redirectDelay')}
    />
  </Fragment>
);

const NormalPage = IntroPage;

const renderSection = (type, getSource) => {
  switch (type) {
    case QuestionType.choice:
      return <ChoiceForm getSource={getSource} />;
    case QuestionType.slider:
      return <SliderForm getSource={getSource} />;
    case QuestionType.swiper:
      return <SwiperForm getSource={getSource} />;
    case QuestionType.fillInBlank:
      return <FillInBlankForm getBaseSource={getSource} />;
    case PageType.intro:
      return <IntroPage getSource={getSource} />;
    case PageType.normal:
      return <NormalPage getSource={getSource} />;
    default:
      return null;
  }
};

const SurveyComponent = () => (
  <SimpleForm>
    <TextInput source='title' />
    <ArrayInput source='sections'>
      <SimpleFormIterator>
        <ChipField source='id' />
        <SelectInput
          source='type'
          validate={required()}
          choices={Object.values({ ...QuestionType, ...PageType }).map((type) => ({
            id: type,
            name: type,
          }))}
          defaultValue={QuestionType.choice}
        />
        <BooleanInput source='expanded' defaultValue={false} />
        <FormDataConsumer>
          {(props) => {
            const {
              formData, // The whole form data
              scopedFormData, // The data for this item of the ArrayInput
              getSource, // A function to get the valid source inside an ArrayInput
              ...rest
            } = props;
            // bug of React Admin or my fault use?
            if(scopedFormData.type === QuestionType.choice) {
              scopedFormData.allowMultiple = scopedFormData.allowMultiple || false;
              scopedFormData.allowCustom = scopedFormData.allowCustom || false;
            }
            return scopedFormData && scopedFormData.expanded && renderSection(scopedFormData.type, getSource);
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
);

const SurveyEdit = () => (
  <Edit>
    <SurveyComponent />
  </Edit>
);
const SurveyCreate = () => (
  <Create redirect='edit'>
    <SurveyComponent />
  </Create>
);
export { SurveyEdit, SurveyCreate };
