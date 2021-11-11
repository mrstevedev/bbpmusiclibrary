import Link from 'next/link'
import Image from 'next/image'
import userImg from '/public/images/user.svg'
import CoverImage from '../components/coverimages/CoverImage'

export default function Dashboard() {
    return (
        <> 
        <CoverImage />
            <div className="container">
                <h1 style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontWeight: 100, 
                    margin: '3rem 0 2rem 0', 
                    fontSize: '0.7rem', 
                    textTransform: 'uppercase' }}>My Dashboard</h1>
                <div>
                    <aside>
                        <nav>
                            <ul style={{ listStyle: 'none', padding: '0' }}>                             
                                <li>
                                    <Link href="#">
                                        <a className="link">Puchases</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a className="link">Coupons</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a className="link">Newsletter</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a className="link">Log out</a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </>
    )
}