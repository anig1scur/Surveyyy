
import { Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';
import { JsonField } from "react-admin-json-view";

 const CollectionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReferenceField source="surveyId" reference="surveys" />
            <TextField source="id" />
            <DateField source="createdAt" />
            <JsonField source="data" />
        </Datagrid>
    </List>
);


export default CollectionList;