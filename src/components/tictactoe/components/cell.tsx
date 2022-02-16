import s from './../components/../index.module.css';

const Cell = ({ id, value, onClick }: PropsType) => {
   const handleClick = () => {
      if (value) {
         return;
      }

      onClick(id);
   };

   const renderContent = () => {
      if (!value) {
         return null;
      }

      return value === '0' ? (
         <img alt="" src="https://pngimg.com/uploads/circle/circle_PNG44.png" />
      ) : (
         <img alt="" src="https://cdn-icons-png.flaticon.com/512/59/59836.png" />
      );
   };

   return (
      <div className={s.cell} onClick={handleClick}>
         {renderContent()}
      </div>
   );
};

type PropsType = {
   id: string;
   value: CellValueType;
   onClick: (id: string) => void;
};

type CellValueType = '0' | 'X' | undefined;

export default Cell;
