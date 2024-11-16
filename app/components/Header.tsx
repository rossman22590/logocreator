import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { domain } from "@/app/lib/domain";

export default function Header({ className }: { className: string }) {
  const { user } = useUser();

  return (
<header className={`relative w-full ${className}`}>
      <div className="flex items-center justify-between bg-[#343434] px-4 py-2 md:mt-4">
        {/* Logo - left on mobile, centered on larger screens */}
        <div className="flex flex-grow justify-start xl:justify-center">
          <Link href="https://pixio.myapps.ai" className="flex items-center">
            <Image
              src="https://img.mytsi.org/i/vYwa905.png"
              alt="Pixio Logo"
              width={400}
              height={120}
              className="w-[220px] md:w-[330px] lg:w-[390px]"
              priority
            />
          </Link>
        </div>
        {/* Credits Section */}
        <div className="absolute right-8 flex items-center space-x-2 md:top-20 lg:top-8">
          <SignedOut>
            <SignInButton
              mode="modal"
              signUpForceRedirectUrl={domain}
              forceRedirectUrl={domain}
            />
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata.remaining === "BYOK" ? (
              <p>Your API key</p>
            ) : (
              <p>Credits: {`${user?.unsafeMetadata.remaining ?? 3}`}</p>
            )}
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
