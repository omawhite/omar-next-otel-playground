import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  logoImgSrc: string;
  logoLink: string;
}

function Header({ logoImgSrc, logoLink }: HeaderProps) {
  return (
    <Link href={logoLink}>
      <Image src={logoImgSrc} alt="Logo" width={100} height={100} />
    </Link>
  );
}

export default Header;