import { Field } from 'redux-form';

import { Textarea } from '../../common/FormsControls/FormsControls';

import { maxLengthCreator, required } from '../../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

export const DialogsForm = props => {
   return (
      <form onSubmit={props.handleSubmit}>
         <Field
            placeholder="Type your message"
            name="newMessageElement"
            component={Textarea}
            validate={[required, maxLength50]}
         />
         <div>
            <button>Send message</button>
         </div>
      </form>
   );
};
