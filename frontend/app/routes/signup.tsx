import { Form, json, redirect, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <>
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
                placeholder="Email.."
                className="bg-slate-600 rounded-sm py-2 px-2 text-[#FFFDF2]"
              />
              {actionData?.errors?.email ? (
                <em className="[#FFFDF2]">{actionData?.errors.email}</em>
              ) : null}
            </p>
            <p>
              <input
                type="password"
                name="password"
                placeholder="Password.."
                className="bg-slate-600 rounded-sm my-3 py-2 px-2"
              />
              {actionData?.errors?.password ? (
                <em>{actionData?.errors.password}</em>
              ) : null}
            </p>
            <button
              type="submit"
              className="text-[#FFFDF2] font-bold my-2 py-2 px-2 rounded border-lg border-solid border-cyan-600 w-full bg-cyan-600"
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  console.log(formData);

  const errors = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (password.length < 12) {
    errors.password = "Password must be at least 12 characters";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }
  console.log(errors);

  return redirect("/dashboard");
}
