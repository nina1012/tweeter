import React from 'react';

import { Button } from '@/components/ui/button';

export const HomeRoute: React.FC = () => {
  return (
    <div className="mx-auto max-w-[600px] bg-white p-4 lg:mx-0 lg:w-full lg:max-w-full lg:px-10">
      <div className="relative m-0 box-border flex min-h-0 min-w-0 flex-1 shrink-0 list-none flex-col-reverse items-stretch border-0 border-black p-0 *:justify-center lg:flex-row-reverse lg:*:w-1/2">
        {/*  */}
        <div className="flex max-w-[760px] flex-col *:max-w-[600px]">
          <div className="my-12 mb-auto text-6xl font-bold leading-[84px] lg:mb-6 lg:text-8xl">
            <span>Happening now</span>
          </div>
          <div className="flex flex-col">
            <div className="mb-8 text-3xl font-bold leading-9">
              <span>Join today.</span>
            </div>
            <div className="flex w-[320px] flex-col">
              <Button
                asChild
                variant="outline"
                className="mb-2 border border-primary bg-white text-primary hover:bg-white/70 hover:text-primary/70"
              >
                <a href="/auth/register">Create an account</a>
              </Button>
              <div dir="ltr" className="text-[8px] text-gray-400">
                By signing up, you agree to the{' '}
                <a
                  href="https://x.com/tos"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <span className="text-primary">Terms of Service</span>
                </a>{' '}
                and{' '}
                <a
                  href="https://x.com/privacy"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="text-primary underline"
                >
                  <span className="text-primary">Privacy Policy</span>
                </a>
                , including{' '}
                <a
                  href="https://help.x.com/rules-and-policies/twitter-cookies"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="text-primary underline"
                >
                  <span className="text-primary">Cookie Use.</span>
                </a>
              </div>

              <div className="mb-5 mt-10 font-medium ">
                Already have an account?
              </div>
              <Button asChild>
                <a href="/auth/login">Log in</a>
              </Button>
            </div>
          </div>
        </div>
        {/* left side of landing page */}
        <div className="flex size-full min-h-12 justify-start lg:mx-auto lg:h-dvh lg:items-center lg:justify-center">
          <div className="inset-0 h-14 w-12 lg:h-1/2 lg:min-w-96">
            <img
              alt="logo"
              src="/images/tweeter-small.svg"
              className="m-auto size-full max-w-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
