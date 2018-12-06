import Link from 'next/link'

const Nav = () => (
  <div>
    <Link href="/items/new">
      <a>New item</a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
)

export default Nav
