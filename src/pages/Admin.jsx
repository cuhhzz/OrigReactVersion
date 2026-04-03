import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

export default function Admin() {
  return (
    <div className="app-container">
      <SiteHeader />
      <main style={{ padding: '2rem 1rem' }}>
        <h1>Admin</h1>
        <p>This is a placeholder admin route. (setup-admin is excluded from the client build.)</p>
      </main>
    </div>
  )
}