import { ButtonFrom } from "../components/uiComponents";
import { useCookiesHooks } from "../hooks";

const Error500 = () => {
  const { logOut } = useCookiesHooks();
  const backToTop = () => {
    logOut();
  };
  return (
    <div className='flex justify-center items-center min-h-screen landscape:max-h-full'>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-gray-700 ">Internal Server Error</h1>
        <p className="mb-5 text-black">管理者へお問い合わせください。</p>
        <p className="mb-5 text-black"></p>
        <div className=" w-64">
          <ButtonFrom title="TOPページ" type="button" textColor="text-white" bgColor="bg-gray-500" icon="" clickEvent={backToTop} disabled={false} />
        </div>
      </div>
    </div>
  );
};

export default Error500;