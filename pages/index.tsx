import Image from 'next/image'
import { Montserrat, Noto_Sans_KR } from 'next/font/google'
import Head from 'next/head';
import mainstyle from '../styles/Main.module.css'
const montserrat = Montserrat({ subsets: ['latin'] });
const notoSansKR = Noto_Sans_KR({ // 이거 못받음.
  preload:false, 
  weight:["100","300","400","500","700","900"]
}) //구글 폰트에 요청할 필요가 없다함. 


export default function Home() {
  return (
    <>
    <Head>
      <title>PORTFOLIO | 2023</title>
    </Head>
    <main className={`min-h-screen ${montserrat.className}`}>
      <div>
        <div className={mainstyle.menu_icon}>
          
        </div>
        <ul>
          <li></li>
        </ul>
      </div>
    <section className={`w-full h-screen border border-red-600`}>
      <div className={mainstyle.title_box}>
      <h1 className={`${montserrat.className} ${mainstyle.h1}`}>2023 PORTFOLIO</h1>
      <p className={`${montserrat.className} ${mainstyle.title_sub}`}>Logical thinking skills and research techniques, with interests as well as AI and UX/UI design</p>
      </div>
    </section>
    <section className={`w-full h-screen border border-red-600`}>
      <h2 className={`${mainstyle.title1} ${mainstyle.gray2}`}>HELLO</h2>
      <div>

      </div>
      <div>

      </div>
    </section>
    </main>
    </>
  )
}
