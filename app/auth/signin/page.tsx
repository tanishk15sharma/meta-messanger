import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();
  console.log(providers);

  return (
    <main className="grid justify-center ">
      <div>
        <Image
          className="object-cover mx-2 rounded-full my-5 ml-12"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c526.png"
          alt="logo"
          height={100}
          width={100}
        />
      </div>

      <SignInComponent providers={providers} />
    </main>
  );
}

export default SignInPage;
