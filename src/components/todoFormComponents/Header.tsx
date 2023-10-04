
import { useCookiesHooks } from '../../hooks';
import { ConfirmButton, ConfirmationDialog } from '../confirmComponents';

const Header = () => {
  const { logOut } = useCookiesHooks();
  const logout = () => {
    logOut();
  };

  return (
    <div className='absolute top-0 w-full'>
      <div className='absolute right-0 py-2 px-5'>
        <ConfirmButton title="サインアウト" message='サインアウトしてよろしいですか？' icon="/images/logout_white_icon.png" />
      </div>
      <ConfirmationDialog action={logout} />
    </div>
  );
};

export default Header;