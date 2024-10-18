import { Form } from "@remix-run/react";

export default function Index() {
  return (
    <>
      {/* <h2 className="text-7xl">hi</h2> */}
      <div className="h-full min-h-dvh bg-[#FFFDF2] flex flex-col items-center justify-center">
        <div className="w-3/4 h-96 bg-[#2C2E39] rounded-3xl flex flex-col items-center justify-center">
          <h2 className="text-center font-semibold text-lg text-[#FFFDF2] mb-2">
            Sign up
          </h2>
          <Form method="post">
            <p>
              <input
                type="email"
                name="email"
                className="bg-slate-600 rounded-sm py-2 px-2"
              />
            </p>
            <p>
              <input
                type="password"
                name="password"
                className="bg-slate-600 rounded-sm my-3 py-2 px-2"
              />
            </p>
            <button
              type="submit"
              className="text-[#FFFDF2] font-bold my-2 py-2 px-2 rounded border border-solid border-cyan-600 w-full bg-cyan-600"
            >
              Sign up
            </button>
          </Form>
          <div className="w-3/4 flex gap-2">
            <p className="text-[#FFFDF2] font-light">Have an account?</p>
            <button className="text-cyan-500 font-semibold">Log in</button>
          </div>
        </div>
      </div>
    </>
  );
}
