import { memo, useCallback } from 'react';

import s from './message.module.css';

export const Message = memo<Message.Props>(({ id, title, deleteMessage, editMessage }) => {
   const handleDelete = useCallback(() => {
      deleteMessage(id);
   }, [deleteMessage, id]);

   const handleEdit = useCallback(() => {
      editMessage(id);
   }, [editMessage, id]);

   return (
      <div className={s.chatField}>
         <div className={s.messageField}>
            <div>{title}</div>
         </div>
         <div onClick={handleDelete} className={s.delete}>
            <img src="https://cdn-icons-png.flaticon.com/512/59/59254.png" alt="" />
         </div>
         <div onClick={handleEdit} className={s.edit}>
            <img src="https://image.flaticon.com/icons/png/512/61/61456.png" alt="" />
         </div>
      </div>
   );
});

export namespace Message {
   export interface Props {
      id: string;
      title: string;
      editMessage: (id: string) => void;
      deleteMessage: (id: string) => void;
   }
}
