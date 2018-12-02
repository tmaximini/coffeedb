import Nav from './Nav'

const Header = () => (
  <div>
    <div className="bar">
      <a href="">CoffeeDB</a>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>coffees</div>
  </div>
)

export default Header
