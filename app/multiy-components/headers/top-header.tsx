import Link from "next/link";
import { FaFacebook,FaInstagram,FaTwitter, FaYoutube} from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

export default function Top_Head() {
  return (
    <main className=' hidden md:hidden lg:block bg-[#2c3452]'>
    <header className="text-white flex justify-between p-4 px-6 font-sans font-semibold">

        {/* first */}
          <div>
            <ul className="flex gap-6">
            <li
              className='flex items-center gap-2'

            >
              <IoCallOutline size={20} />
              (225) 555-0118
            
          </li>
          <li
           
              className='flex items-center gap-2'

            >
              <TfiEmail size={18}/>
              michelle.rivera@example.com
            
          </li>
            </ul>
          </div>


          {/* second */}
          <div>
            <p>Follow Us  and get a chance to win 80% off</p>
          </div>


          {/* third */}
          <div>
          <ul className='flex items-center gap-3'>
            <p>Follow Us : </p>
          <li >
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </Link>
          </li>

          <li className=''>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20}/>
            </Link>
          </li>

          <li >
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20}/>
            </Link>
          </li>     

           <li >
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20}/>
            </Link>
          </li>       
        </ul>
          </div>
    </header>
    </main>
  )
}
