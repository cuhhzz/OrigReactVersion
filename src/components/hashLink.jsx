import { Link } from 'react-router-dom'

export function HashLink({ to, children, ...props }) {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}