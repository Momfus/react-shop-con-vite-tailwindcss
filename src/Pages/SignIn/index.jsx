import { Link, Navigate } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { useContext, useRef, useState } from 'react';
import { ShoppingCartContext } from '../../Context';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
function SignIn() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const form = useRef(null);

  // Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  // Has an account

  // Se hace un check tnato del estado en el context como si lo tiene en localStorage para asegurarse
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount)?.length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account)?.length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(false);
    //Redirect
    return <Navigate replace to={'/'} />;
  };

  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // Create account
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);

    // Sign in
    handleSignIn();
  };

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

  const renderPassword = () => {
    if (parsedAccount) {
      if (showPassword) {
        return <span>{parsedAccount?.password}</span>;
      } else {
        return <span>{'*'.repeat(parsedAccount?.password.length)}</span>;
      }
    } else {
      return <></>;
    }
  };
  // Login render
  const renderLogIn = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <div className='flex'>
          <p className='mb-0'>
            <span className='font-light text-sm'>Password: </span>
            <span>{renderPassword()}</span>
          </p>

          <div
            className='flex justify-center items-center ml-1'
            onClick={toggleShowPassword}
          >
            <a className='font-light text-xs underline-offset-4 cursor-pointer'>
              {parsedAccount ? renderShowHideIcon() : <></>}
            </a>
          </div>
        </div>
        <Link to='/'>
          <button
            className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
            onClick={() => handleSignIn()}
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
          onClick={() => {
            setView('create-user-info');
            setShowPassword(false);
          }}
          disabled={hasUserAnAccount}
        >
          Sign up
        </button>
      </div>
    );
  };

  // Sign up render
  const renderSignUp = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        {/* Name */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>
            Your name:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            defaultValue={parsedAccount?.name}
            placeholder='John Doe'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        {/* email */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-light text-sm'>
            Your email:{' '}
          </label>
          <input
            type='text'
            id='email'
            name='email'
            defaultValue={parsedAccount?.email}
            placeholder='test@testing.com'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        {/* Password */}
        <div className='flex flex-col gap-1'>
          <div className='flex flex-row'>
            <label htmlFor='password' className='font-light text-sm'>
              Your password:
            </label>
            <div
              className='flex justify-center items-center ml-1'
              onClick={toggleShowPassword}
            >
              <a className='font-light text-xs underline-offset-4 cursor-pointer'>
                {renderShowHideIcon()}
              </a>
            </div>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            defaultValue={parsedAccount?.password}
            placeholder='******'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <Link to='/'>
          <button
            className='bg-black text-white w-full rounded-lg py-3'
            onClick={() => createAnAccount()}
          >
            Create
          </button>
        </Link>
      </form>
    );
  };

  //General Render
  const renderView = () =>
    view === 'create-user-info' ? renderSignUp() : renderLogIn();

  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome!</h1>
      {renderView()}
    </Layout>
  );
}

export default SignIn;
