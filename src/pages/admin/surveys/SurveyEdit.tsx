import {
  ArrayInput,
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  FormDataConsumer,
  SelectInput,
  Create,
} from 'react-admin';
import Sortable from '../utils/SortableArrayInput';

// QuestionType
import { QuestionType } from '../../../common/types';

const ChoiceForm = ({ getSource }) => {
  return (
    <>
      <TextInput source={getSource('title')} />
      {/* <Sortable> */}
      <ArrayInput source={getSource('options')}>
        <SimpleFormIterator>
          <TextInput source='value' />
        </SimpleFormIterator>
      </ArrayInput>
      {/* </Sortable> */}
      <BooleanInput source={getSource('allowMultiple')} />
      <BooleanInput source={getSource('allowCustom')} />
    </>
  );
};

const SliderForm = ({ getSource }) => (
  <>
    <NumberInput source={getSource('min')} />
    <NumberInput source={getSource('max')} />
    <NumberInput source={getSource('step')} />
    <NumberInput source={getSource('value')} />
    <TextInput source={getSource('labelConfig')} />
    <TextInput source={getSource('valueType')} />
  </>
);

const SwiperForm = ({ getSource }) => (
  <>
    <TextInput source={getSource('title')} />
    <TextInput source={getSource('cards')} />
    <ArrayInput>
      <SimpleFormIterator>
        <TextInput source='text' />
        <TextInput source='image' />
      </SimpleFormIterator>
    </ArrayInput>
  </>
);

const FillInBlankForm = ({ getSource }) => (
  // <Sortable>
  <ArrayInput source={getSource('config')}>
    <SimpleFormIterator>
      <TextInput source='text' />
      <TextInput source='type' />
      <TextInput source='id' />
      <TextInput source='options' />
    </SimpleFormIterator>
  </ArrayInput>
  // </Sortable>
);

const renderForm = (type: QuestionType, getSource) => {
  switch (type) {
    case QuestionType.choice:
      return <ChoiceForm getSource={getSource} />;
    case QuestionType.slider:
      return <SliderForm getSource={getSource} />;
    case QuestionType.swiper:
      return <SwiperForm getSource={getSource} />;
    case QuestionType.fillInBlank:
      return <FillInBlankForm getSource={getSource} />;
    default:
      return null;
  }
};

const SurveyComponent = () => (
  <SimpleForm>
    <TextInput source='title' />
    <Sortable source='sections'>
    {/* <ArrayInput source='sections'> */}
      {/* <SimpleFormIterator> */}
      <SelectInput
        source='type'
        choices={Object.values(QuestionType).map((type) => ({
          id: type,
          name: type,
        }))}
      />
      <FormDataConsumer>
        {(props) => {
          const {
            formData, // The whole form data
            scopedFormData, // The data for this item of the ArrayInput
            getSource, // A function to get the valid source inside an ArrayInput
            ...rest
          } = props;
          return scopedFormData && renderForm(scopedFormData.type, getSource);
        }}
      </FormDataConsumer>
      {/* </SimpleFormIterator> */}
    {/* </ArrayInput> */}
    </Sortable>
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
