import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props }) => {
   return (
      <div>
         <Paginator
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
         />
         <div>
            {users.map(u => (
               <User
                  user={u}
                  followingInProgress={props.followingInProgress}
                  unfollow={props.unfollow}
                  follow={props.follow}
                  key={u.id}
               />
            ))}
         </div>
      </div>
   );
};

export default Users;
