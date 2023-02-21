import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  SingleFieldList,
  TextField,
} from 'react-admin';

export const SurveyList = () => (
  <List>
    <Datagrid rowClick='edit'>
      <ArrayField source='sections'>
        <SingleFieldList>
          <ChipField source='type' />
        </SingleFieldList>
      </ArrayField>
      <TextField source='id' />
      <TextField source='title' />
      <ChipField
        source='authorId'
      />
      <DateField source='createdAt' />
    </Datagrid>
  </List>
);

export default SurveyList;
