import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../Context';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
function SignIn() {
  const context = useContext(ShoppingCartContext);

  // Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  // Has an account

  // Se hace un check tnato del estado en el context como si lo tiene en localStorage para asegurarse
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  // Password
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderShowHideIcon = () => {
    if (showPassword) {
      return <EyeSlashIcon className='h-4 w-4' />;
    } else {
      return <EyeIcon className='h-4 w-4' />;
    }
  };

  //General Render
  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome!</h1>
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <div className='flex'>
          <p className='mb-0'>
            <span className='font-light text-sm'>Password: </span>
            <span>
              {' '}
              {showPassword ? (
                <span>{parsedAccount?.password}</span>
              ) : (
                <span>{'*'.repeat(parsedAccount?.password.length)}</span>
              )}
            </span>
          </p>

          <div
            className='flex justify-center items-center ml-1'
            onClick={toggleShowPassword}
          >
            <a className='font-light text-xs underline-offset-4 cursor-pointer'>
              {renderShowHideIcon()}
            </a>
          </div>
        </div>
        <Link to='/'>
          <button
            className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
            disabled={!hasUserAnAccount}
          >
            Log In
          </button>
        </Link>
        {/* Esta parte por ahora no tiene utilidad alguna ya que todo es frontend */}
        <div className='text-center'>
          <a
            className='font-light text-xs underline underline-offset-4'
            href='/'
          >
            Forgot my password
          </a>
        </div>
        <button
          className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'
          disabled={hasUserAnAccount}
        >
          Sign up
        </button>
      </div>
    </Layout>
  );
}

export default SignIn;
