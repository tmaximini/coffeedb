import Link from 'next/link'

const Nav = () => (
  <div>
    <Link href="/sell">
      <a>New!</a>
    </Link>
    <Link href="/">
      <a>Home!</a>
    </Link>
  </div>
)

export default Nav
