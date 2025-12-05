import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center header-logo">
        <Image
          src="/DataHelp.cz.svg"
          alt="DataHelp.cz"
          width={240}
          height={60}
          className="h-12 md:h-[3.72rem] w-auto"
          priority
        />
      </Link>
    </div>
  );
}
