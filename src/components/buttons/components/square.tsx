import { memo, useCallback } from 'react';

import s from './square.module.css';

export const Square = memo<Square.Props>(({ id, title, deleteSquare, editSquare }) => {
   const handleDelete = useCallback(() => {
      deleteSquare(id);
   }, [deleteSquare, id]);

   const handleEdit = useCallback(() => {
      editSquare(id);
   }, [editSquare, id]);

   return (
      <div className={s.field}>
         <div className={s.square}>
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

export namespace Square {
   export interface Props {
      id: string;
      title: string;
      editSquare: (id: string) => void;
      deleteSquare: (id: string) => void;
   }
}
