
import { useCookiesHooks } from '../../hooks';
import { ConfirmButton, ConfirmDialog } from '../dialog';

const Header = () => {
  const { logOut } = useCookiesHooks();

  return (
    <div className='absolute top-0 w-full'>
      <div className='absolute right-0 py-2 px-5'>
        <ConfirmButton title="サインアウト" message={"サインアウトしてよろしいですか？"} icon="/images/logout_white_icon.png" />
      </div>
      <ConfirmDialog action={() => logOut()} />
    </div>
  );
};

export default Header;