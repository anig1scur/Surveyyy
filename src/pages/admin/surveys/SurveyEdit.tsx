import {
  ArrayInput,
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from 'react-admin';

export const SurveyEdit = () => (
  <Edit>
    <SimpleForm>
      <ArrayInput source='sections'>
        <SimpleFormIterator>
          <TextInput source='type' />
          <ArrayInput source='options'>
            <SimpleFormIterator>
              <TextInput source='label' />
              <TextInput source='value' />
            </SimpleFormIterator>
          </ArrayInput>
          <BooleanInput source='allowMultiple' />
          <BooleanInput source='allowCustom' />
          <TextInput source='id' />
          <TextInput source='title' />
          <NumberInput source='min' />
          <NumberInput source='max' />
          <NumberInput source='value' />
          <NumberInput source='step' />
          <TextInput source='labelConfig' />
          <TextInput source='valueType' />
          <TextInput source='redirectUri' />
          <NumberInput source='redirectDelay' />
          <ArrayInput source='cards'>
            <SimpleFormIterator>
              <TextInput source='id' />
              <TextInput source='text' />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source='config'>
            <SimpleFormIterator>
              <TextInput source='text' />
              <TextInput source='type' />
              <TextInput source='id' />
              <TextInput source='options' />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source='id' />
      <TextInput source='title' />
      <DateInput source='createdAt' />
    </SimpleForm>
  </Edit>
);

export default SurveyEdit;
