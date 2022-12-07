import Image from "next/image";
import Link from "next/link";
import { LogoutBtn } from "./LogoutBtn";
import { unstable_getServerSession } from "next-auth/next";
const Header = async () => {
  const session = await unstable_getServerSession();

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-blue-50 p-4 shadow-md flex justify-between items-center">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={session.user?.image!}
            alt="logo"
            height={10}
            width={50}
          />
          <div>
            <p className="text-blue-400">Logged In as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>
        <LogoutBtn />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-blue-50 p-10 shadow-md">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-2">
          <Image
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c526.png"
            alt="logo"
            height={10}
            width={50}
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 
        hover:bg-blue-700
        text-white
        font-bold
        py-2 px-4 rounded
        "
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export { Header };
