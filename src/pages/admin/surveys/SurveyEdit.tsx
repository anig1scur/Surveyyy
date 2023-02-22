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

// QuestionType
import { QuestionType } from '../../../common/types';

const ChoiceForm = () => {
  return (
    <>
      <TextInput source='title' />
      <ArrayInput source='options'>
        <SimpleFormIterator>
          <TextInput source='value' />
        </SimpleFormIterator>
      </ArrayInput>
      <BooleanInput source='allowMultiple' />
      <BooleanInput source='allowCustom' />
    </>
  );
};

const SliderForm = () => (
  <>
    <NumberInput source='min' />
    <NumberInput source='max' />
    <NumberInput source='value' />
    <NumberInput source='step' />
    <TextInput source='labelConfig' />
    <TextInput source='valueType' />
  </>
);

const SwiperForm = () => (
  <>
    <TextInput source='title' />
    <ArrayInput source='cards'>
      <SimpleFormIterator>
        <TextInput source='text' />
        <TextInput source='image' />
      </SimpleFormIterator>
    </ArrayInput>
  </>
);

const FillInBlankForm = () => (
  <>
    <ArrayInput source='config'>
      <SimpleFormIterator>
        <TextInput source='text' />
        <TextInput source='type' />
        <TextInput source='id' />
        <TextInput source='options' />
      </SimpleFormIterator>
    </ArrayInput>
  </>
);

const renderForm = (type: QuestionType) => {
  switch (type) {
    case QuestionType.choice:
      return <ChoiceForm />;
    case QuestionType.slider:
      return <SliderForm />;
    case QuestionType.swiper:
      return <SwiperForm />;
    case QuestionType.fillInBlank:
      return <FillInBlankForm />;
    default:
      return null;
  }
};

const SurveyComponent = () => (
  <SimpleForm>
    <TextInput source='title' />
    <ArrayInput source='sections'>
      <SimpleFormIterator>
        <SelectInput
          source='type'
          choices={Object.values(QuestionType).map((type) => ({
            id: type,
            name: type,
          }))}
        />
        <FormDataConsumer>
          {({
            formData, // The whole form data
            scopedFormData, // The data for this item of the ArrayInput
            getSource, // A function to get the valid source inside an ArrayInput
            ...rest
          }) => scopedFormData && renderForm(scopedFormData.type)}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
);

const SurveyEdit = () => <Edit><SurveyComponent /></Edit>;
const SurveyCreate = () => <Create redirect="edit"><SurveyComponent /></Create>;
export { SurveyEdit, SurveyCreate };
